# DealMind

DealMind is a negotiation analysis app built with Next.js. Paste an email, message, contract clause, pricing objection, or deal note, then pick a mode to get structured strategic guidance back from the API.

## Features

- Analyze leverage, urgency, risk, and tactics.
- Generate response options with different tones.
- Evaluate pricing pressure and concession strategy.
- Build a situation-specific playbook.
- Preserve a stable JSON API contract for the UI.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Zod for runtime validation
- Google Gemini via `@google/genai`
- Tailwind CSS v4

## Installation

1. Install dependencies.
2. Create your local environment file from `.env.example`.
3. Add your Gemini API key to `.env.local`.

## Environment Setup

Create a local `.env.local` file with this value:

```dotenv
GEMINI_API_KEY=your_api_key_here
```

## Run Instructions

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

Other available scripts:

```bash
npm run build
npm run start
npm run lint
```

## Screenshots

Add screenshots here before publishing the repository.

## Notes

- The app expects `GEMINI_API_KEY` at runtime.
- Keep `.env.local` out of source control.
- The API route lives at `POST /api/analyze` and returns the same JSON shapes used by the UI.
