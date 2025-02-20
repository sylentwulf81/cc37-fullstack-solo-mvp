# ScriptHero

ScriptHero is a fullstack application designed to help comics writers develop their craft. Whether you're just starting out or looking for a professional-grade solution for script creation and storage, ScriptHero provides an easy and intuitive environment for writing Western-style comic book scripts.

ScriptHero is built with React and other modern web technologies. It combines a powerful script editor with learning resources. Writers will be able to create, save, and export their scripts easily from any device. The application also features a real-time preview of script layouts, collaborative feedback options, and a growing library of writing templates.

## Features

- Real-time script formatting preview
- Export scripts as PDF or markdown
- Single-page application

## Deployemtn Guide

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to start writing your next comic book masterpiece.

## Environment Setup

1. Clone the repository
2. Set up environment variables:

   ### Backend (.env.local)

   ```bash
   cd server
   cp .env.example .env.local
   ```

   Edit `.env.local` with your PostgreSQL database credentials and other configuration.

   ### Frontend (.env.local)

   ```bash
   cd client
   cp .env.example .env.local
   ```

   Edit `.env.local` with your API configuration.

3. Required environment variables:

   - Database configuration (one of the following):
     - Individual connection parameters (DB_USER, DB_PASSWORD, etc.)
     - DATABASE_URL for production
   - JWT_SECRET for authentication
   - VITE_API_URL for frontend API connection

4. For local development:

   - Install PostgreSQL
   - Create a database
   - Update .env.local with your database credentials
   - Set NODE_ENV=development

5. For production (Render.com):
   - Set NODE_ENV=production
   - Configure DATABASE_URL
   - Set a secure JWT_SECRET
   - Update VITE_API_URL to point to your production backend
