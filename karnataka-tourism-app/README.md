# Karnataka Tourism Discovery Platform

This is a web application for discovering attractions in Karnataka, India. The platform combines information about temples, quirky places, and modern attractions in one comprehensive guide.

## Features

- Browse attractions by category (temples, quirky places, modern attractions)
- Detailed attraction pages with information, photos, and timings
- Search functionality
- User authentication (login/signup)
- Favorites system
- Responsive design for all devices

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (planned)
- **Authentication**: NextAuth.js (planned)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd karnataka-tourism-app
   ```

3. Install dependencies:
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

## Project Structure

```
karnataka-tourism-app/
├── components/        # Reusable React components
├── pages/             # Next.js pages and API routes
├── public/            # Static assets
├── styles/            # Global styles and Tailwind config
├── lib/               # Utility functions and libraries
└── types/             # TypeScript type definitions
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.