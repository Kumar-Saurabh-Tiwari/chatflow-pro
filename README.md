# ChatFlow Pro

ChatFlow Pro is a real-time chat frontend built with Vite, React, TanStack Router, TanStack Query, and Socket.IO. It connects to the backend API through an environment variable so you can run it locally or point it at the deployed Render service.

## Features

- Real-time messaging with Socket.IO
- Live online user list
- Typing indicators
- Browser notifications for new messages
- Message history loading from the backend
- Optimistic message sending for a smoother chat experience
- Message edit and delete interactions in the chat timeline
- Login screen with backend warmup status
- Responsive chat layout with sidebar and conversation panel

## Tech Stack

- React 19
- TypeScript
- Vite
- TanStack Router
- TanStack Query
- Socket.IO client
- Tailwind CSS v4

## Prerequisites

- Node.js 18+ recommended
- npm, pnpm, or bun
- A backend API that exposes the chat routes

## Environment Setup

Create a `.env` file in the project root and set the API URL.

```env
VITE_API_URL=https://chatapp-backend-nnj1.onrender.com
```

If you want to use a local backend instead, replace the URL with your local server address, for example:

```env
VITE_API_URL=http://localhost:5000
```

Important: the app reads this variable at runtime. If `VITE_API_URL` is missing, the app will throw an error and API calls will fail.

## Getting Started

1. Install dependencies.

```bash
npm install
```

2. Create the `.env` file and add `VITE_API_URL`.

3. Start the development server.

```bash
npm run dev
```

4. Open the app in the browser using the local Vite URL shown in the terminal.

## Available Scripts

- `npm run dev` - start the development server
- `npm run build` - create a production build
- `npm run build:dev` - create a development-mode build
- `npm run preview` - preview the production build locally
- `npm run lint` - run ESLint across the project
- `npm run format` - format the codebase with Prettier

## How It Works

1. The app loads the current user from session storage.
2. It fetches recent messages from `${VITE_API_URL}/api/messages`.
3. It connects to the chat socket and keeps the online user list and typing status updated.
4. It sends messages through the backend and updates the UI optimistically.
5. It requests notification permission so the user can receive desktop alerts for new messages.

## Project Structure

- `src/components/chat` - chat UI components
- `src/hooks` - chat and backend warmup hooks
- `src/lib` - socket, notification, and session helpers
- `src/services/api.ts` - backend API wrapper
- `src/routes` - application routes

## Backend Notes

The frontend expects the backend to provide:

- `GET /health`
- `GET /api/messages`
- `POST /api/messages`

If the backend is deployed on Render, use this URL in your `.env` file:

```env
VITE_API_URL=https://chatapp-backend-nnj1.onrender.com
```

## Troubleshooting

- If the app shows a backend warmup error, confirm the Render service is awake and reachable.
- If messages are not loading, verify `VITE_API_URL` is set correctly and includes the full backend origin.
- If notifications do not appear, check browser notification permissions.

