# ProjectPilot AI

An AI-powered final-year project idea generator and mentor for college students.

## Project Structure

- `/src/components` - Reusable UI components (Buttons, Cards).
- `/src/pages` - Main application views (Landing, Generator, Mentor Dashboard, User Dashboard).
- `/src/services` - AI service abstractions (`ai-service.ts`).
- `/src/data` - Mock JSON data for offline development.

## Setup Instructions

1. Ensure **Node.js** and **npm** are installed on your system.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## Connecting a Real AI API (OpenAI/Anthropic)

Currently, the application uses mock data in `/src/services/ai-service.ts` so the frontend is fully usable without an API key.

To integrate real AI generation:
1. **Never put your API key in the React frontend.**
2. Set up a lightweight backend (e.g., Node.js/Express, Next.js API Routes, or Firebase Functions).
3. Inside your backend, use the OpenAI SDK to create endpoints (e.g., `POST /api/generate-ideas`).
4. Update the functions in `/src/services/ai-service.ts` to `fetch()` your new backend endpoints instead of returning the mock `setTimeout` promises.
