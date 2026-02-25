# Lenovo x FIFA Project Countdown

This is a countdown and task management dashboard for the Lenovo x FIFA partnership project.

## Features

- **Countdown Timer**: Real-time countdown to the project launch on May 1, 2026.
- **Task Management**: Add, delete, and update project tasks with progress tracking.
- **Dynamic Progress**: Overall project readiness calculation based on individual task completion.
- **Theme**: Dark mode UI inspired by Lenovo (Red/Black) and FIFA (Blue/Gold) branding.

## Tech Stack

- React + Vite
- Tailwind CSS
- Lucide React Icons

## Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Start development server**:
    ```bash
    npm run dev
    ```

3.  **Build for production**:
    ```bash
    npm run build
    ```

## Deployment

### Option 1: GitHub Pages (Recommended for Demo)
This project is configured to deploy automatically to GitHub Pages.
Run the following command to deploy:
```bash
npm run deploy
```

### Option 2: Tencent Cloud Webify (Recommended for Production)
1.  Go to [Tencent Cloud Webify Console](https://console.cloud.tencent.com/webify).
2.  Click "Create Application".
3.  Connect your GitHub account and select this repository (`FIFA-MTP`).
4.  Webify will automatically detect the framework (Vite/React).
5.  Click "Deploy".

### Option 3: Docker (For Cloud Servers / CVM)
If you prefer deploying to a server or container service:

1.  **Build Docker image**:
    ```bash
    docker build -t fifa-mtp .
    ```

2.  **Run container**:
    ```bash
    docker run -d -p 80:80 fifa-mtp
    ```

The application will be available at `http://localhost`.
