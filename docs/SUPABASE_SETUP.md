# Supabase Setup for Contact Form Submissions

This document explains how to set up Supabase to handle contact form submissions for DSN Enterprises website.

## 1. Create a Supabase Project

1. Sign up or log in to [Supabase](https://supabase.com)
2. Create a new project
3. Choose a name for your project (e.g., "dsn-enterprises")
4. Set a secure database password
5. Choose a region closest to your target audience

## 2. Set up Database Schema

You can set up the database schema in two ways:

### Option 1: Run SQL Script

1. In your Supabase dashboard, go to the SQL Editor
2. Paste the contents of the SQL script from `/supabase/migrations/20240526_create_contacts_table.sql`
3. Run the SQL script to create the table and set up permissions

### Option 2: Create Table Manually

1. In your Supabase dashboard, go to the Table Editor
2. Click "Create a new table"
3. Name the table "contacts"
4. Add the following columns:
   - `id` (type: bigint, primary key, auto-increment)
   - `name` (type: text, not null)
   - `email` (type: text, not null)
   - `phone` (type: text, nullable)
   - `company` (type: text, nullable)
   - `message` (type: text, not null)
   - `product_interest` (type: text, nullable)
   - `source` (type: text, nullable)
   - `status` (type: text, default: 'new')
   - `created_at` (type: timestamptz, default: now())
   - `updated_at` (type: timestamptz, default: now())
   - `notes` (type: text, nullable)

## 3. Configure Row Level Security (RLS)

1. In your Supabase dashboard, go to Authentication > Policies
2. Find the "contacts" table and enable Row Level Security
3. Add the following policies:
   - Policy for public submissions: Allow anyone to insert data
   - Policy for authenticated users: Allow reading and updating data

## 4. Get API Keys

1. In your Supabase dashboard, go to Project Settings > API
2. Copy the URL and anon/public key
3. Update your `.env.local` file with these values:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

## 5. Testing the Contact Form

1. Run your application locally with `npm run dev`
2. Fill out the contact form and submit
3. Check your Supabase dashboard > Table Editor > contacts to verify the submission was successful

## 6. Optional: Set up Email Notifications

For email notifications when a new contact is submitted:

1. In your Supabase dashboard, go to Database > Functions
2. Create a new database function that sends an email notification when a new record is inserted into the "contacts" table
3. Use a service like Resend, SendGrid, or AWS SES for sending emails

## 7. Optional: Admin Dashboard

To create an admin dashboard to view and manage contact submissions:

1. Create a new page in your Next.js application (e.g., `/admin/contacts`)
2. Implement authentication to restrict access to authorized users
3. Use Supabase client to fetch and display contact submissions
4. Add functionality to update the status of submissions (e.g., "new", "contacted", "resolved")

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js with Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security) 