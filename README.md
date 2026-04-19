# Lenovo x FIFA Project Countdown Dashboard

A countdown and task management dashboard for the Lenovo x FIFA partnership project, built to track progress toward the project launch on **May 1, 2026**.

## Features

- **Real-Time Countdown**: Live countdown (days, hours, minutes, seconds) to the May 1, 2026 launch date.
- **Task Management**: Create, edit, delete, and track mission objectives with owner assignment and target dates.
- **Progress Tracking**: Per-task progress sliders (0–100%) with an aggregate "Overall Readiness" metric.
- **Import / Export**: Save and restore task configurations as JSON files for offline backup and sharing.
- **Local Persistence**: All tasks are automatically saved to browser `localStorage`.
- **Branded UI**: Dark mode design combining Lenovo (red/black) and FIFA (blue/gold) branding with glassmorphism effects.
- **Responsive Layout**: 2-column grid on desktop, single-column on mobile.

## Tech Stack

| Category | Technology |
|---|---|
| Frontend Framework | React 18 + Vite 5 |
| Styling | Tailwind CSS 3 |
| Icons | Lucide React |
| Fonts | Inter (Google Fonts) |
| Deployment | gh-pages / Docker / Tencent Cloud Webify |

## Getting Started

**Install dependencies:**
```bash
npm install
```

**Start development server:**
```bash
npm run dev
```

**Build for production:**
```bash
npm run build
```

**Preview production build locally:**
```bash
npm run preview
```

## Deployment

### Option 1: GitHub Pages (Recommended for Demo)

Deploy to GitHub Pages with a single command:

```bash
npm run deploy
```

### Option 2: Tencent Cloud Webify (Recommended for Production)

1. Go to [Tencent Cloud Webify Console](https://console.cloud.tencent.com/webify).
2. Click **Create Application**.
3. Connect your GitHub account and select the `FIFA-MTP` repository.
4. Webify will automatically detect the Vite/React framework.
5. Click **Deploy**.

### Option 3: Docker

```bash
# Build image
docker build -t fifa-mtp .

# Run container
docker run -d -p 80:80 fifa-mtp
```

The application will be available at `http://localhost`.

The Docker setup uses a multi-stage build (Node 18 Alpine → Nginx Alpine) with SPA routing configured in `nginx.conf`.

## Project Structure

```
FIFA-MTP/
├── src/
│   ├── App.jsx               # Root component; manages task state and localStorage sync
│   ├── main.jsx              # React entry point
│   ├── index.css             # Global styles and Tailwind imports
│   └── components/
│       ├── Countdown.jsx     # Real-time countdown timer
│       └── TaskBoard.jsx     # Task CRUD, progress sliders, import/export
├── index.html
├── vite.config.js
├── tailwind.config.js        # Custom Lenovo/FIFA color tokens and animations
├── Dockerfile
└── nginx.conf
```
