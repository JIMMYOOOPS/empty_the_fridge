## Description
Clean the fridge is an app powered by AI to help you manage whats left in your fridge. It suggests recipes based on the food you have and help you eat a variety of food you have never imagined.

## Prerequisites
- Node.js   v22.2.0
- pnpm  9.5.0
- PostgreSQL  16.3 (Homebrew)
- PostgreSQL Database URL
- Gemini API key

## Environment Variables
```bash
# Database
DATABASE_URL=postgres://username:password@localhost:5432/database?schema=public
# Gemini API
GEMINI_API_KEY=your_gemini_api_key
```

## Installation
```bash
$ pnpm install
```

## Husky and Postgres setup
```bash
$ pnpm run prepare

## Running the app
```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:debug

# production mode
$ pnpm run start:prod
```
