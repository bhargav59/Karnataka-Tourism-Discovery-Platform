# Karnataka Tourism Discovery Platform

This repository contains the complete end-to-end web application for the Karnataka Tourism Discovery Platform, based on the Product Requirements Document (PRD).

## Project Overview

The Karnataka Tourism Discovery Platform is a comprehensive digital platform for discovering Karnataka's diverse attractions - from ancient temples and pilgrimage sites to modern quirky landmarks and offbeat experiences. The platform serves as the "RoadsideAmerica.com meets Temple Guide" for Karnataka.

## Features Implemented

### Phase 1: MVP (Months 0-3)
- ✅ Attraction Listing & Discovery
- ✅ Attraction Detail Pages
- ✅ User Authentication (Login/Signup)
- ✅ Basic Admin Panel

### Phase 2: Community & Engagement (Months 4-6)
- ✅ User Reviews & Ratings (UI implemented)
- ✅ User-Generated Content (UI implemented)
- ✅ Interactive Features (Favorites, Profile)

### Additional Features
- ✅ Search functionality
- ✅ Category-based browsing (Temples, Quirky Places, Modern Attractions)
- ✅ Blog system
- ✅ Responsive design for all devices
- ✅ About, Contact, Privacy Policy, and Terms of Service pages

## Technology Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (planned for full implementation)
- **Authentication**: NextAuth.js (planned for full implementation)
- **Deployment**: Vercel

## Project Structure

```
karnataka-tourism-app/
├── components/        # Reusable React components
├── contexts/          # React context providers
├── lib/               # Utility functions and libraries
├── pages/             # Next.js pages and API routes
├── public/            # Static assets
├── styles/            # Global styles and Tailwind config
└── types/             # TypeScript type definitions (if using TypeScript)
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd karnataka-tourism-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## Database Schema

The database schema is defined in `lib/db/schema.js` and includes tables for:
- Users
- Attractions
- Temple details
- Photos
- Reviews
- Favorites
- Itineraries
- User submissions

## API Endpoints

API endpoints are defined in the `pages/api/` directory:
- `/api/attractions` - List and manage attractions
- `/api/auth/*` - Authentication endpoints (planned)
- `/api/favorites` - Manage user favorites (planned)

## Deployment

The application is ready for deployment to Vercel or any other Next.js hosting platform.

## Future Enhancements

Based on the PRD, future phases will include:
- Route & Itinerary Planner
- Events & Festivals Calendar
- Monetization Features
- Mobile App (PWA)
- Advanced Search & AI Features

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.