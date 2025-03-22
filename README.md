# DSN Enterprises Website

This is the official website for DSN Enterprises, a leading manufacturer and supplier of high-precision gauges and measuring instruments for industrial applications.

## Technology Stack

- **Framework**: [Next.js](https://nextjs.org)
- **Styling**: Tailwind CSS
- **Fonts**: Geist Sans, Geist Mono, and Oswald
- **Analytics**: Vercel Analytics, Google Analytics, Meta Pixel
- **Content Management**: Contentful
- **Email Service**: Brevo (formerly Sendinblue)

## Getting Started

First, set up the environment variables:
1. Create a `.env.local` file with the following variables:
   ```
   # Contentful Configuration
   CONTENTFUL_SPACE_ID=your_space_id
   CONTENTFUL_ACCESS_TOKEN=your_access_token
   CONTENTFUL_MANAGEMENT_TOKEN=your_management_token
   
   # Brevo Configuration
   BREVO_API_KEY=your_brevo_api_key
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

