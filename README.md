# Karnataka Tourism Discovery Platform

A comprehensive web platform for discovering Karnataka's spiritual, cultural, and quirky attractions. Built with Next.js, React, and Tailwind CSS.

## 🌟 Features

### Phase 1 (MVP) - Currently Implemented
- ✅ Attraction listing and discovery with filters
- ✅ Detailed attraction pages with comprehensive information
- ✅ User authentication (signup, login, logout)
- ✅ Search functionality
- ✅ Favorites/Wishlist system
- ✅ User reviews and ratings
- ✅ Responsive design (mobile-first)
- ✅ SEO optimization with schema markup
- ✅ Reusable components (AttractionCard, FilterPanel, ReviewCard, SearchBar, GoogleMap)

### Phase 2-3 (Next Steps)
- 🔄 Database integration (PostgreSQL/Supabase)
- 🔄 Itinerary planner with route optimization
- 📋 Events & festivals calendar
- 📋 Admin panel enhancements
- 📋 Monetization features

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- PostgreSQL database (or Supabase/Neon account)
- Google Maps API key
- (Optional) Cloudinary or AWS S3 for image storage

### Installation

1. **Clone the repository**
```bash
git clone git@github.com:bhargav59/Karnataka-Tourism-Discovery-Platform.git
cd Karnataka-Tourism-Discovery-Platform/karnataka-tourism-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_super_secret_jwt_key_min_32_characters
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
karnataka-tourism-app/
├── components/          # Reusable React components
│   ├── Layout.js       # Main layout wrapper
│   ├── AttractionCard.js
│   ├── FilterPanel.js
│   ├── ReviewCard.js
│   ├── SearchBar.js
│   ├── GoogleMap.js
│   └── SEOHead.js
├── contexts/           # React Context providers
│   └── AuthContext.js
├── lib/               # Utility functions
│   ├── api.js         # API client
│   ├── schema.js      # Schema.org data
│   └── db/schema.js   # Database schema
├── pages/             # Next.js pages & API routes
│   ├── api/          # API endpoints
│   │   ├── auth/     # Authentication
│   │   ├── attractions.js
│   │   ├── search.js
│   │   ├── favorites.js
│   │   ├── reviews.js
│   │   └── itineraries.js
│   ├── attractions/
│   ├── itineraries/
│   └── admin/
├── public/            # Static assets
└── styles/            # Global styles
```

## 🔌 API Endpoints

### Public
- `GET /api/attractions` - List attractions
- `GET /api/search?q=query` - Search
- `GET /api/reviews?attraction_id=:id` - Get reviews

### Authenticated
- `POST /api/auth/signup|login|logout` - Auth
- `GET /api/auth/me` - Current user
- `POST /api/favorites` - Add favorite
- `POST /api/reviews` - Create review
- `POST /api/itineraries` - Create itinerary

See `.env.example` for full configuration options.

## 🎨 Key Components

All components are in `components/` directory and include:
- **AttractionCard** - Display attraction in grid/list
- **FilterPanel** - Filter by type, district, category
- **ReviewCard** - Display user reviews with ratings
- **SearchBar** - Search with autocomplete suggestions
- **GoogleMap** - Display locations with markers & directions
- **SEOHead** - SEO meta tags and schema markup

## 📚 Documentation

- [Product Requirements Document](../karnataka-tourism-prd.md) - Complete PRD with all phases
- [Database Schema](lib/db/schema.js) - Full database structure
- [API Documentation](#-api-endpoints) - All endpoints listed above

## 🚢 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

## 🗺️ Roadmap

See [PRD](../karnataka-tourism-prd.md) for detailed roadmap with timelines.

## 📄 License

ISC License

---

**Built with ❤️ for Karnataka Tourism**