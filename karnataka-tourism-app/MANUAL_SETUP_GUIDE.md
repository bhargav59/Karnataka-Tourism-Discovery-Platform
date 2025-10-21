# Karnataka Tourism Discovery Platform - Complete Setup Guide

## 📋 Manual Steps Required for 100% Completion

This document outlines all the manual steps you need to perform to complete the Karnataka Tourism Discovery Platform deployment.

---

## 1. Database Setup (CRITICAL - Must Do First)

### Option A: Local PostgreSQL (Development)

**Step 1:** Install PostgreSQL
```bash
# macOS
brew install postgresql@15
brew services start postgresql@15

# Ubuntu/Debian
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib

# Verify installation
psql --version
```

**Step 2:** Create Database
```bash
# Connect to PostgreSQL
psql postgres

# Create database and user
CREATE DATABASE karnataka_tourism;
CREATE USER tourism_admin WITH ENCRYPTED PASSWORD 'your_secure_password_here';
GRANT ALL PRIVILEGES ON DATABASE karnataka_tourism TO tourism_admin;

# Exit
\q
```

**Step 3:** Run Schema Migration
```bash
cd karnataka-tourism-app
psql karnataka_tourism < lib/db/init.sql
```

**Step 4:** Configure Environment
```bash
# Create .env.local file
cp .env.example .env.local

# Edit .env.local and add:
DATABASE_URL=postgresql://tourism_admin:your_secure_password_here@localhost:5432/karnataka_tourism
JWT_SECRET=your_random_secret_key_min_32_chars_long_123456789
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
NEXTAUTH_SECRET=another_random_secret_for_nextauth
NEXTAUTH_URL=http://localhost:3000
```

### Option B: Supabase (Recommended for Production)

**Step 1:** Create Supabase Project
1. Go to https://supabase.com
2. Click "New Project"
3. Enter project details:
   - Name: `karnataka-tourism`
   - Database Password: (use a strong password)
   - Region: Choose closest to your users
4. Wait for project creation (~2 minutes)

**Step 2:** Run Schema
1. In Supabase Dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy entire contents of `lib/db/init.sql`
4. Paste and click "Run"
5. Verify all tables created successfully

**Step 3:** Get Connection String
1. Go to **Settings** → **Database**
2. Find "Connection string" section
3. Select "URI" tab
4. Copy the connection string
5. Replace `[YOUR-PASSWORD]` with your database password

**Step 4:** Configure Environment
```bash
# In .env.local
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
JWT_SECRET=generate_random_32_char_secret
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
NEXTAUTH_SECRET=another_random_secret
NEXTAUTH_URL=https://your-domain.com  # or http://localhost:3000 for dev
```

---

## 2. Google Maps API Setup (REQUIRED)

**Step 1:** Create Google Cloud Project
1. Go to https://console.cloud.google.com
2. Click "Select a Project" → "New Project"
3. Name: `karnataka-tourism`
4. Click "Create"

**Step 2:** Enable APIs
1. Go to **APIs & Services** → **Library**
2. Search and enable these APIs:
   - **Maps JavaScript API**
   - **Places API**
   - **Geocoding API**
   - **Directions API**

**Step 3:** Create API Key
1. Go to **APIs & Services** → **Credentials**
2. Click "Create Credentials" → "API Key"
3. Copy the API key
4. Click "Restrict Key" (recommended)
5. Add restrictions:
   - **Application restrictions**: HTTP referrers
   - Add: `localhost:3000/*`, `your-domain.com/*`
   - **API restrictions**: Select the 4 APIs enabled above
6. Save

**Step 4:** Add to Environment
```bash
# In .env.local
GOOGLE_MAPS_API_KEY=AIzaSy...your_actual_key_here
```

---

## 3. Image Upload Setup (Cloudinary - Recommended)

**Step 1:** Create Cloudinary Account
1. Go to https://cloudinary.com
2. Sign up for free account
3. Verify email

**Step 2:** Get Credentials
1. Go to Dashboard
2. Copy these values:
   - Cloud Name
   - API Key
   - API Secret

**Step 3:** Configure Upload Preset
1. Go to **Settings** → **Upload**
2. Scroll to "Upload presets"
3. Click "Add upload preset"
4. Settings:
   - Name: `karnataka-tourism`
   - Signing Mode: **Unsigned**
   - Folder: `attractions`
   - Format: Auto
   - Image transformation:
     - Width: 1920
     - Height: 1080
     - Crop: Limit
5. Save

**Step 4:** Add to Environment
```bash
# In .env.local
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_UPLOAD_PRESET=karnataka-tourism
```

**Step 5:** Install Cloudinary Package
```bash
npm install cloudinary next-cloudinary
```

---

## 4. Update API Endpoints to Use Database

You need to replace mock data in API endpoints with actual database queries. Here are the files to update:

### Files to Modify:

1. **pages/api/auth/signup.js**
2. **pages/api/auth/login.js**
3. **pages/api/auth/me.js**
4. **pages/api/attractions.js**
5. **pages/api/search.js**
6. **pages/api/favorites.js**
7. **pages/api/reviews.js**
8. **pages/api/itineraries.js**

### Example: Update signup.js

Replace the mock implementation:

```javascript
// BEFORE (Mock):
const mockUser = {
  id: 1,
  email,
  name,
  created_at: new Date(),
};

// AFTER (Real Database):
import { query } from '../../../lib/db/connection';
import { hashPassword, generateToken } from '../../../lib/auth';

const hashedPassword = await hashPassword(password);
const result = await query(
  'INSERT INTO users (email, name, password_hash) VALUES ($1, $2, $3) RETURNING id, email, name, created_at',
  [email, name, hashedPassword]
);
const user = result.rows[0];
const token = generateToken(user);
```

Repeat similar pattern for ALL API endpoints.

---

## 5. Generate Secure Secrets

**Step 1:** Generate Random Secrets
```bash
# Generate JWT_SECRET (32+ characters)
openssl rand -base64 32

# Generate NEXTAUTH_SECRET
openssl rand -base64 32
```

**Step 2:** Add to .env.local
```bash
JWT_SECRET=generated_secret_1
NEXTAUTH_SECRET=generated_secret_2
```

---

## 6. Email Service Setup (Optional but Recommended)

For password reset and email verification:

### Option A: SendGrid

**Step 1:** Create Account
1. Go to https://sendgrid.com
2. Sign up for free (100 emails/day)
3. Verify email

**Step 2:** Create API Key
1. Go to **Settings** → **API Keys**
2. Click "Create API Key"
3. Name: `karnataka-tourism`
4. Permissions: Full Access
5. Copy the API key

**Step 3:** Verify Sender
1. Go to **Settings** → **Sender Authentication**
2. Click "Verify a Single Sender"
3. Fill in your email details
4. Verify email

**Step 4:** Configure
```bash
# In .env.local
SENDGRID_API_KEY=SG.your_api_key_here
EMAIL_FROM=noreply@yourdomain.com
```

**Step 5:** Install Package
```bash
npm install @sendgrid/mail
```

---

## 7. Deployment to Vercel

**Step 1:** Install Vercel CLI
```bash
npm install -g vercel
```

**Step 2:** Login to Vercel
```bash
vercel login
```

**Step 3:** Deploy
```bash
cd karnataka-tourism-app
vercel
```

**Step 4:** Set Environment Variables
1. Go to Vercel Dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add ALL variables from .env.local:
   - DATABASE_URL
   - JWT_SECRET
   - NEXTAUTH_SECRET
   - NEXTAUTH_URL (set to your production URL)
   - GOOGLE_MAPS_API_KEY
   - CLOUDINARY credentials
   - SENDGRID_API_KEY (if using)

**Step 5:** Redeploy
```bash
vercel --prod
```

---

## 8. Create Admin Account

**Step 1:** Sign up via website
1. Go to `/signup`
2. Create account with your email

**Step 2:** Promote to Admin (Database)
```sql
-- Connect to your database
psql karnataka_tourism

-- Update user to admin
UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';

-- Verify
SELECT id, email, name, role FROM users WHERE email = 'your-email@example.com';
```

---

## 9. Populate Initial Data

### Option A: Manual Entry
1. Login as admin
2. Go to `/admin`
3. Use "Add Attraction" form
4. Fill in all details for each attraction

### Option B: Bulk Import (CSV)
Create a CSV file with this structure:

```csv
name,name_kannada,type,description,location_lat,location_lng,district,city,entry_fee
ISKCON Temple,ಇಸ್ಕಾನ್ ದೇವಸ್ಥಾನ,temple,"Beautiful Krishna temple",13.0093,77.5499,Bangalore Urban,Bangalore,Free
```

Then create a bulk import script:

```javascript
// scripts/import-attractions.js
const fs = require('fs');
const csv = require('csv-parser');
const { query } = require('../lib/db/connection');

async function importAttractions() {
  fs.createReadStream('attractions.csv')
    .pipe(csv())
    .on('data', async (row) => {
      await query(
        `INSERT INTO attractions (name, name_kannada, type, description, location_lat, location_lng, district, city, entry_fee)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [row.name, row.name_kannada, row.type, row.description, row.location_lat, row.location_lng, row.district, row.city, row.entry_fee]
      );
    })
    .on('end', () => {
      console.log('CSV import complete');
    });
}

importAttractions();
```

Run:
```bash
npm install csv-parser
node scripts/import-attractions.js
```

---

## 10. SEO & Analytics Setup

### Google Analytics

**Step 1:** Create GA4 Property
1. Go to https://analytics.google.com
2. Create account and property
3. Copy Measurement ID (G-XXXXXXXXXX)

**Step 2:** Add to Website
Create `components/GoogleAnalytics.js`:

```javascript
import Script from 'next/script';

export default function GoogleAnalytics({ measurementId }) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  );
}
```

Add to `pages/_app.js`:
```javascript
import GoogleAnalytics from '../components/GoogleAnalytics';

// In component:
<GoogleAnalytics measurementId="G-XXXXXXXXXX" />
```

### Google Search Console

**Step 1:** Verify Ownership
1. Go to https://search.google.com/search-console
2. Add property (your domain)
3. Verify via HTML file or DNS

**Step 2:** Submit Sitemap
1. Create `public/sitemap.xml` (or use next-sitemap package)
2. Submit to Search Console

---

## 11. Security Checklist

- [ ] Use HTTPS in production (Vercel does this automatically)
- [ ] Set strong database password
- [ ] Rotate JWT secrets regularly
- [ ] Enable CORS only for your domain
- [ ] Add rate limiting to API routes
- [ ] Sanitize user inputs (SQL injection prevention)
- [ ] Validate file uploads (size, type)
- [ ] Enable Vercel's DDoS protection
- [ ] Set up error monitoring (Sentry)
- [ ] Regular database backups

---

## 12. Testing Checklist

### Functionality Tests
- [ ] User signup/login works
- [ ] Password reset flow
- [ ] Search returns results
- [ ] Filters work correctly
- [ ] Add to favorites
- [ ] Submit review
- [ ] Admin can add/edit attractions
- [ ] Image upload works
- [ ] Maps display correctly
- [ ] Language switcher toggles Kannada/English

### Performance Tests
- [ ] Page load time < 3 seconds
- [ ] Images are optimized
- [ ] Lazy loading works
- [ ] Mobile responsive
- [ ] Works on Chrome, Firefox, Safari

### SEO Tests
- [ ] Meta tags present
- [ ] Open Graph tags work
- [ ] Sitemap accessible
- [ ] Robots.txt configured
- [ ] Schema.org markup valid

---

## 13. Post-Launch Tasks

### Week 1
- [ ] Monitor error logs
- [ ] Check analytics data
- [ ] Test all user flows
- [ ] Fix any bugs reported
- [ ] Add more attractions (target: 50+)

### Week 2-4
- [ ] Gather user feedback
- [ ] Optimize slow queries
- [ ] Add missing features
- [ ] Improve SEO rankings
- [ ] Add blog/content marketing

### Month 2
- [ ] Implement social sharing
- [ ] Add user-generated content
- [ ] Build admin analytics dashboard
- [ ] Email newsletter setup
- [ ] Partner with tourism board

---

## 14. Maintenance Schedule

### Daily
- Monitor error logs
- Check uptime
- Respond to user feedback

### Weekly
- Backup database
- Review analytics
- Update content
- Check for security updates

### Monthly
- Update dependencies (`npm update`)
- Review and optimize database
- Analyze user behavior
- Plan new features

---

## 15. Cost Estimates

### Free Tier (Development)
- Vercel: Free (Hobby plan)
- Supabase: Free (500MB database, 2GB bandwidth)
- Cloudinary: Free (25 credits/month)
- SendGrid: Free (100 emails/day)
- **Total: $0/month**

### Production (Small Scale)
- Vercel Pro: $20/month
- Supabase Pro: $25/month
- Cloudinary Essential: $0 (free tier sufficient)
- SendGrid Essential: $15/month
- Domain: $12/year
- **Total: ~$60/month + $12/year**

### Production (Medium Scale)
- Vercel Pro: $20/month
- Supabase Team: $25-$50/month (based on usage)
- Cloudinary Advanced: $99/month
- SendGrid Pro: $60/month
- CDN: $10/month
- **Total: ~$200-250/month**

---

## 16. Support & Resources

### Documentation
- Next.js: https://nextjs.org/docs
- PostgreSQL: https://www.postgresql.org/docs
- Supabase: https://supabase.com/docs
- Cloudinary: https://cloudinary.com/documentation
- Tailwind CSS: https://tailwindcss.com/docs

### Community
- Next.js Discord: https://nextjs.org/discord
- Stack Overflow: Tag questions with `nextjs`, `postgresql`

### Monitoring
- Sentry (errors): https://sentry.io
- Vercel Analytics: Built-in
- Google Analytics: Traffic monitoring

---

## 17. Troubleshooting Common Issues

### Database Connection Errors
```bash
# Check if PostgreSQL is running
brew services list  # macOS
sudo systemctl status postgresql  # Linux

# Test connection
psql -d karnataka_tourism -U tourism_admin

# Check connection string format
# Should be: postgresql://user:password@host:port/database
```

### API Routes Not Working
```bash
# Check server logs
npm run dev

# Verify environment variables loaded
console.log(process.env.DATABASE_URL);  // Should not be undefined

# Test API directly
curl http://localhost:3000/api/attractions
```

### Image Upload Fails
```bash
# Verify Cloudinary credentials
# Check upload preset is "Unsigned"
# Ensure file size < 10MB
# Check network inspector for errors
```

### Maps Not Showing
```bash
# Verify API key in .env.local
# Check browser console for errors
# Ensure Maps JavaScript API is enabled
# Check API key restrictions
```

---

## Quick Start Commands Summary

```bash
# 1. Install dependencies
npm install

# 2. Set up database
psql karnataka_tourism < lib/db/init.sql

# 3. Configure environment
cp .env.example .env.local
# Edit .env.local with your credentials

# 4. Run development server
npm run dev

# 5. Build for production
npm run build

# 6. Deploy to Vercel
vercel --prod
```

---

## ✅ Completion Checklist

Use this to track your setup progress:

- [ ] PostgreSQL/Supabase database created
- [ ] Schema migrated successfully
- [ ] Environment variables configured
- [ ] Google Maps API key obtained and added
- [ ] Cloudinary account created and configured
- [ ] All API endpoints updated to use database
- [ ] JWT secrets generated
- [ ] Admin account created
- [ ] Initial attractions data populated
- [ ] Email service configured (optional)
- [ ] Deployed to Vercel
- [ ] Google Analytics added
- [ ] Search Console verified
- [ ] SSL certificate active (HTTPS)
- [ ] All tests passing
- [ ] Performance optimized
- [ ] Security checklist completed

---

**Once all items are checked, your Karnataka Tourism Discovery Platform is 100% complete and production-ready! 🎉**

For questions or issues, refer to the documentation or create an issue in the GitHub repository.
