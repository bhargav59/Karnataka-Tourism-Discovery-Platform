// Database schema for Karnataka Tourism Discovery Platform

/**
 * Users table
 */
const users = {
  id: "SERIAL PRIMARY KEY",
  email: "VARCHAR(255) UNIQUE NOT NULL",
  password_hash: "VARCHAR(255)",
  name: "VARCHAR(255)",
  avatar_url: "TEXT",
  bio: "TEXT",
  role: 'VARCHAR(50) DEFAULT "user"', // "user", "admin", "moderator"
  created_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
  updated_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
};

/**
 * Attractions table
 */
const attractions = {
  id: "SERIAL PRIMARY KEY",
  slug: "VARCHAR(255) UNIQUE NOT NULL",
  name: "VARCHAR(255) NOT NULL",
  name_kannada: "VARCHAR(255)",
  type: "VARCHAR(100)", // "temple", "modern", "quirky", "historical"
  category: "VARCHAR(100)", // "religious", "cultural", "nature", etc.
  description: "TEXT",
  short_description: "TEXT",
  location_lat: "DECIMAL(10, 8)",
  location_lng: "DECIMAL(11, 8)",
  address: "TEXT",
  district: "VARCHAR(100)",
  city: "VARCHAR(100)",
  state: 'VARCHAR(100) DEFAULT "Karnataka"',
  pincode: "VARCHAR(10)",
  timings_json: "JSONB", // Daily timings
  entry_fee: "VARCHAR(255)",
  parking_available: "BOOLEAN DEFAULT true",
  accessibility_info: "TEXT",
  contact_phone: "VARCHAR(20)",
  contact_email: "VARCHAR(255)",
  website_url: "TEXT",
  best_time_to_visit: "TEXT",
  duration_minutes: "INTEGER",
  featured: "BOOLEAN DEFAULT false",
  published: "BOOLEAN DEFAULT true",
  view_count: "INTEGER DEFAULT 0",
  favorite_count: "INTEGER DEFAULT 0",
  created_by_user_id: "INTEGER REFERENCES users(id)",
  created_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
  updated_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
};

/**
 * Temple-specific details (extends attractions)
 */
const temple_details = {
  attraction_id: "INTEGER PRIMARY KEY REFERENCES attractions(id)",
  deity: "VARCHAR(255)",
  prasadam_info: "TEXT",
  dress_code: "TEXT",
  photography_allowed: "BOOLEAN",
  festivals_json: "JSONB", // List of festivals
  special_events_json: "JSONB", // Special events/timings
  archival_significance: "TEXT",
  architecture_style: "VARCHAR(100)",
};

/**
 * Photos table
 */
const photos = {
  id: "SERIAL PRIMARY KEY",
  attraction_id: "INTEGER REFERENCES attractions(id) ON DELETE CASCADE",
  url: "TEXT NOT NULL",
  thumbnail_url: "TEXT",
  alt_text: "TEXT",
  caption: "TEXT",
  uploaded_by_user_id: "INTEGER REFERENCES users(id)",
  is_cover: "BOOLEAN DEFAULT false",
  order_index: "INTEGER DEFAULT 0",
  created_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
};

/**
 * Reviews table
 */
const reviews = {
  id: "SERIAL PRIMARY KEY",
  attraction_id: "INTEGER REFERENCES attractions(id) ON DELETE CASCADE",
  user_id: "INTEGER REFERENCES users(id) ON DELETE CASCADE",
  rating: "INTEGER CHECK (rating >= 1 AND rating <= 5)",
  review_text: "TEXT",
  photos_json: "JSONB", // URLs of review photos
  helpful_count: "INTEGER DEFAULT 0",
  visited_date: "DATE",
  created_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
  updated_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
};

/**
 * Favorites/Wishlist table
 */
const favorites = {
  id: "SERIAL PRIMARY KEY",
  user_id: "INTEGER REFERENCES users(id) ON DELETE CASCADE",
  attraction_id: "INTEGER REFERENCES attractions(id) ON DELETE CASCADE",
  created_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
};

/**
 * Itineraries table
 */
const itineraries = {
  id: "SERIAL PRIMARY KEY",
  user_id: "INTEGER REFERENCES users(id) ON DELETE CASCADE",
  title: "VARCHAR(255) NOT NULL",
  description: "TEXT",
  is_public: "BOOLEAN DEFAULT false",
  attractions_order_json: "JSONB", // Ordered list of attraction IDs
  created_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
  updated_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
};

/**
 * User submissions (pending approval)
 */
const submissions = {
  id: "SERIAL PRIMARY KEY",
  submitted_by_user_id: "INTEGER REFERENCES users(id)",
  attraction_data_json: "JSONB", // Submitted attraction data
  status: 'VARCHAR(50) DEFAULT "pending"', // "pending", "approved", "rejected"
  admin_notes: "TEXT",
  created_at: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
  reviewed_at: "TIMESTAMP",
};

module.exports = {
  users,
  attractions,
  temple_details,
  photos,
  reviews,
  favorites,
  itineraries,
  submissions,
};
