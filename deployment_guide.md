# Deployment Guide - Video Editing Portal

This guide provides instructions for deploying the **Crossfade Video Editing Portal** to production.

## 0. Prerequisite: Git & GitHub

To deploy to Vercel and Railway, your code needs to be on GitHub.

1.  **Install Git**: Download and install from [git-scm.com](https://git-scm.com/).
2.  **Create a GitHub Account**: Sign up at [github.com](https://github.com/).
3.  **Create a New Repository**: Name it `crossfade-portal`.
4.  **Push your code**:
    ```powershell
    git init
    git add .
    git commit -m "initial commit"
    git branch -M main
    git remote add origin https://github.com/YOUR_USERNAME/crossfade-portal.git
    git push -u origin main
    ```

## 1. Backend Deployment (Node.js & MongoDB)

We recommend using [Railway](https://railway.app/) or [Render](https://render.com/) for the backend.

### Prerequisites
- A MongoDB Atlas account (free tier is fine).
- Your backend code pushed to a GitHub repository.

### Steps:
1.  **MongoDB Atlas**:
    - Create a cluster and get your connection string.
    - Whitelist `0.0.0.0/0` (standard for cloud hosting) or the IP of your hosting provider.
2.  **Hosting Platform**:
    - Connect your GitHub repo.
    - Set the **Root Directory** to `backend`.
    - Set the following **Environment Variables**:
        - `PORT`: `5000`
        - `MONGODB_URI`: Your Atlas connection string.
        - `JWT_SECRET`: A long random string.
        - `CLIENT_URL`: The URL of your deployed frontend (e.g., `https://crossfade-portal.vercel.app`).

## 2. Frontend Deployment (React)

We recommend using [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).

### Steps:
1.  Connect your GitHub repo.
2.  Set the **Root Directory** to `video-editing-portal`.
3.  Set the **Build Command**: `npm run build`.
4.  Set the **Output Directory**: `build`.
5.  Set the following **Environment Variable**:
    - `REACT_APP_API_URL`: The URL of your deployed backend (e.g., `https://backend.railway.app`).

## 3. Post-Deployment Verification
1.  Log in to the frontend.
2.  Verify you can create a project.
3.  Open the chat and ensure it connects to the production backend.

> [!IMPORTANT]
> Ensure that both the Backend and Frontend URLs are updated in each other's environment variables to allow CORS and Socket.io communication.
