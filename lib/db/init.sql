-- Database initialization script for Karnataka Tourism Platform
-- Run this to set up your PostgreSQL database

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  name VARCHAR(255),
  avatar_url TEXT,
  bio TEXT,
  role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
  email_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create attractions table
CREATE TABLE IF NOT EXISTS attractions (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  name_kannada VARCHAR(255),
  type VARCHAR(100) CHECK (type IN ('temple', 'modern', 'quirky', 'historical', 'nature')),
  category VARCHAR(100),
  description TEXT,
  short_description TEXT,
  location_lat DECIMAL(10, 8),
  location_lng DECIMAL(11, 8),
  address TEXT,
  district VARCHAR(100),
  city VARCHAR(100),
  state VARCHAR(100) DEFAULT 'Karnataka',
  pincode VARCHAR(10),
  timings_json JSONB,
  entry_fee VARCHAR(255),
  parking_available BOOLEAN DEFAULT true,
  accessibility_info TEXT,
  contact_phone VARCHAR(20),
  contact_email VARCHAR(255),
  website_url TEXT,
  best_time_to_visit TEXT,
  duration_minutes INTEGER,
  how_to_reach TEXT,
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT true,
  view_count INTEGER DEFAULT 0,
  favorite_count INTEGER DEFAULT 0,
  created_by_user_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create temple_details table
CREATE TABLE IF NOT EXISTS temple_details (
  attraction_id INTEGER PRIMARY KEY REFERENCES attractions(id) ON DELETE CASCADE,
  deity VARCHAR(255),
  prasadam_info TEXT,
  prasadam_timings TEXT,
  dress_code TEXT,
  photography_allowed BOOLEAN DEFAULT true,
  festivals_json JSONB,
  special_events_json JSONB,
  archival_significance TEXT,
  architecture_style VARCHAR(100),
  pooja_timings TEXT,
  special_darshan_info TEXT
);

-- Create photos table
CREATE TABLE IF NOT EXISTS photos (
  id SERIAL PRIMARY KEY,
  attraction_id INTEGER REFERENCES attractions(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  alt_text TEXT,
  caption TEXT,
  uploaded_by_user_id INTEGER REFERENCES users(id),
  is_cover BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  attraction_id INTEGER REFERENCES attractions(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  photos_json JSONB,
  helpful_count INTEGER DEFAULT 0,
  visited_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(attraction_id, user_id)
);

-- Create favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  attraction_id INTEGER REFERENCES attractions(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, attraction_id)
);

-- Create itineraries table
CREATE TABLE IF NOT EXISTS itineraries (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT false,
  attractions_order_json JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create submissions table (user-submitted attractions)
CREATE TABLE IF NOT EXISTS submissions (
  id SERIAL PRIMARY KEY,
  submitted_by_user_id INTEGER REFERENCES users(id),
  attraction_data_json JSONB,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reviewed_at TIMESTAMP,
  reviewed_by_user_id INTEGER REFERENCES users(id)
);

-- Create review_helpful table (track who found reviews helpful)
CREATE TABLE IF NOT EXISTS review_helpful (
  id SERIAL PRIMARY KEY,
  review_id INTEGER REFERENCES reviews(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(review_id, user_id)
);

-- Create user_follows table (social feature)
CREATE TABLE IF NOT EXISTS user_follows (
  id SERIAL PRIMARY KEY,
  follower_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  following_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(follower_id, following_id),
  CHECK(follower_id != following_id)
);

-- Create activity_feed table
CREATE TABLE IF NOT EXISTS activity_feed (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  activity_type VARCHAR(50) CHECK (activity_type IN ('review', 'favorite', 'checkin', 'itinerary', 'submission')),
  attraction_id INTEGER REFERENCES attractions(id) ON DELETE CASCADE,
  metadata_json JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_attractions_type ON attractions(type);
CREATE INDEX IF NOT EXISTS idx_attractions_district ON attractions(district);
CREATE INDEX IF NOT EXISTS idx_attractions_featured ON attractions(featured);
CREATE INDEX IF NOT EXISTS idx_attractions_slug ON attractions(slug);
CREATE INDEX IF NOT EXISTS idx_reviews_attraction ON reviews(attraction_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_attraction ON favorites(attraction_id);
CREATE INDEX IF NOT EXISTS idx_photos_attraction ON photos(attraction_id);
CREATE INDEX IF NOT EXISTS idx_activity_feed_user ON activity_feed(user_id);
CREATE INDEX IF NOT EXISTS idx_user_follows_follower ON user_follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_user_follows_following ON user_follows(following_id);

-- Create full-text search index on attractions
CREATE INDEX IF NOT EXISTS idx_attractions_search ON attractions 
  USING gin(to_tsvector('english', coalesce(name, '') || ' ' || coalesce(description, '') || ' ' || coalesce(district, '')));

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_attractions_updated_at BEFORE UPDATE ON attractions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_itineraries_updated_at BEFORE UPDATE ON itineraries
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default admin user (password: admin123 - change this!)
INSERT INTO users (email, password_hash, name, role) 
VALUES ('admin@karnatakatourism.com', '$2a$10$YourHashedPasswordHere', 'Admin User', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Success message
SELECT 'Database schema created successfully!' as status;
