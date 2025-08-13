# Environment Configuration Setup

This project is configured to automatically switch between local development and production API endpoints based on the build mode.

## Environment Files

- `.env` - Default/fallback environment variables
- `.env.development` - Development environment (local Django server)
- `.env.production` - Production environment (live server)
- `.env.example` - Template file with all available variables

## Available Commands

- `npm run dev` - Start development server (uses `.env.development`)
- `npm run build` - Build for production (uses `.env.production`)
- `npm run build:dev` - Build for development (uses `.env.development`)

## Environment Variables

- `VITE_API_BASE_URL` - Backend API base URL
- `VITE_REFRESH_TOKEN_URL` - JWT refresh token endpoint URL

## How it Works

1. **Development Mode** (`npm run dev`):
   - Uses `.env.development`
   - API calls go to `http://localhost:8000/api`
   - Perfect for local Django development

2. **Production Build** (`npm run build`):
   - Uses `.env.production`
   - API calls go to `https://aqalmanagementsolutions.com/api`
   - Ready for deployment

3. **Development Build** (`npm run build:dev`):
   - Uses `.env.development`
   - Builds the app but still points to local server
   - Useful for testing builds locally

## Setup Instructions

1. Make sure you have the environment files with correct URLs
2. Start your local Django server: `python manage.py runserver`
3. Run the frontend in development mode: `npm run dev`
4. For production, run: `npm run build`

The configuration automatically handles the API endpoint switching!
