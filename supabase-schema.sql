-- ============================================================================
-- Roam & Relax Holidays - Supabase Database Schema
-- ============================================================================
-- Run this SQL in your Supabase SQL Editor to create the enquiries table.
-- This table stores all customer trip enquiry submissions.
-- ============================================================================

-- Create the enquiries table
CREATE TABLE IF NOT EXISTS enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  destination VARCHAR(255),
  package VARCHAR(255),
  travel_date DATE,
  travellers VARCHAR(100),
  message TEXT,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create an index on status for faster filtering in admin dashboard
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);

-- Create an index on created_at for faster sorting
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at DESC);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_enquiries_email ON enquiries(email);

-- Add a trigger to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_enquiries_updated_at
  BEFORE UPDATE ON enquiries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Optional: Create a view for recent enquiries (useful for admin dashboard)
CREATE OR REPLACE VIEW recent_enquiries AS
SELECT
  id,
  name,
  phone,
  email,
  package,
  destination,
  travel_date,
  travellers,
  status,
  created_at,
  updated_at
FROM enquiries
ORDER BY created_at DESC
LIMIT 100;

-- Grant necessary permissions (adjust based on your RLS policies)
-- Note: Review and adjust these permissions based on your security requirements
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Example policy: Allow anonymous inserts (for form submissions)
CREATE POLICY "Allow anonymous inserts" ON enquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Example policy: Allow authenticated reads (for admin dashboard - you'll need auth)
-- CREATE POLICY "Allow authenticated reads" ON enquiries
--   FOR SELECT
--   TO authenticated
--   USING (true);

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================
-- Run these to verify the table was created correctly:

-- Check table structure
-- SELECT column_name, data_type, is_nullable, column_default
-- FROM information_schema.columns
-- WHERE table_name = 'enquiries'
-- ORDER BY ordinal_position;

-- Check if table exists and is empty
-- SELECT COUNT(*) FROM enquiries;

-- Test insert (optional - remove after testing)
-- INSERT INTO enquiries (name, phone, email, destination, package, travel_date, travellers, message)
-- VALUES ('Test User', '9876543210', 'test@example.com', 'Goa, India', 'Goa Beach Escape', '2026-12-25', '2 Travellers', 'This is a test enquiry');

-- ============================================================================
-- NOTES FOR FUTURE ADMIN DASHBOARD
-- ============================================================================
-- Status values to use:
-- - 'new' (default for new enquiries)
-- - 'contacted' (after initial contact made)
-- - 'follow-up' (waiting for customer response)
-- - 'converted' (customer booked the trip)
-- - 'closed' (enquiry closed without booking)
--
-- Query examples for admin dashboard:
-- - All new enquiries: SELECT * FROM enquiries WHERE status = 'new' ORDER BY created_at DESC;
-- - Today's enquiries: SELECT * FROM enquiries WHERE created_at::date = CURRENT_DATE;
-- - Enquiries by package: SELECT package, COUNT(*) FROM enquiries GROUP BY package;
-- ============================================================================
