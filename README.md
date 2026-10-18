# PollVerse

PollVerse is a full-stack polling and survey platform with live results, survey analytics, and an animated glassmorphism interface.

## Project structure

```text
pollverse/
├── client/   React + Vite frontend
└── server/   Node + Express backend
```

## Included application

The repository now contains the separated frontend and backend application:

- `client/`: React 18, Vite, React Router, Zustand, Framer Motion, React Three Fiber, responsive PollVerse UI
- `server/`: Express, MongoDB/Mongoose models, JWT cookie authentication, poll/survey/vote/comment/dashboard APIs, Socket.io, Helmet, CORS, rate limiting

The frontend includes landing, explore, poll details/voting, create poll, dashboard, login/register, dark/light mode, responsive layout, loading/empty states, and a demo fallback so the UI remains inspectable before MongoDB is configured.

## Local setup

### Prerequisites

- Node.js 20+
- npm 10+

### Install dependencies

```bash
npm install
npm run install:all
```

### Run the Phase 1 development shells

```bash
npm run dev
```

The Vite client runs on `http://localhost:5173`. The Express server runs on `http://localhost:5000` and exposes `GET /api/health`.

Copy both environment files:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Set `MONGO_URI` for persistence. Without it, the API still starts in demo mode and the frontend uses sample explore data when an API request is unavailable.

## Separate deployment

### Backend on Render

Create a Render Web Service with root directory `server`, build command `npm install`, and start command `npm start`. Set `MONGO_URI`, `JWT_SECRET`, `JWT_REFRESH_SECRET`, and `CLIENT_URL` to the deployed Vercel URL. The included `render.yaml` can be used as a Blueprint. Render health check: `/api/health`.

### Frontend on Vercel

Import the repository as a Vercel project with root directory `client`, framework preset `Vite`, and build command `npm run build`. Set `VITE_API_URL` to the Render API URL plus `/api`, and `VITE_SOCKET_URL` to the Render API URL. `client/vercel.json` provides SPA rewrites.

### MongoDB Atlas

Create a free cluster, create a database user, copy its connection string into `MONGO_URI`, and add the Render outbound access range (or `0.0.0.0/0` for an initial free-tier deployment). Use a long random JWT secret in production.

### Final smoke checks

```bash
curl https://YOUR-API.onrender.com/api/health
```

Then test registration, login, poll creation, voting once and duplicate-vote rejection, live result loading, survey response submission, mobile navigation, and Vercel deep links such as `/polls/:id`.
