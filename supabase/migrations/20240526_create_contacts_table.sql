-- Create a table for storing contact form submissions
CREATE TABLE contacts (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  message TEXT NOT NULL,
  product_interest TEXT,
  source TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notes TEXT
);

-- Set up RLS (Row Level Security)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows authenticated users to select data
CREATE POLICY "Allow authenticated users to select" ON contacts
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create a policy that allows authenticated users to insert data
CREATE POLICY "Allow authenticated users to insert" ON contacts
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create a policy that allows authenticated users to update data
CREATE POLICY "Allow authenticated users to update" ON contacts
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Create a policy that allows everyone to insert data (for public form submissions)
CREATE POLICY "Allow public to insert" ON contacts
  FOR INSERT TO anon
  WITH CHECK (true);

-- Create an index on the created_at column for faster sorting
CREATE INDEX contacts_created_at_idx ON contacts (created_at);

-- Add a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger that calls the function whenever a contact is updated
CREATE TRIGGER update_contacts_updated_at
BEFORE UPDATE ON contacts
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column(); 