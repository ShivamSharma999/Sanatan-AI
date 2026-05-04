# Sanatan AI
<div style="display: flex; flex-direction: column; justify-content: center; align-items:center;"><img src="public/main/Resources/images/logo.png" alt="Sanatan AI" style="margin-left: auto; margin-right:auto; width: 200px;">

[![Version](https://img.shields.io/badge/version-2.2.9-blue.svg)](https://github.com/ShivamSharma999/Sanatan-AI)
[![License](https://img.shields.io/badge/license-UNLICENSED-red.svg)](#)</div>

**Sanatan AI** is a powerful, AI-powered assistant designed to provide profound insights, answers, and guidance. Whether used as a deployable web application or a standalone desktop client, it integrates the power of Google's Generative AI (`gemini-2.5-flash`) with an elegant, lightning-fast vanilla Javascript frontend.

---

## ✨ Features

- **Dual Ecosystem:** Runs as a responsive Web Application (via Vercel serverless) AND an installable Desktop App (via Electron).
- **Intelligent Conversations:** Powered by Google's Gemini models for rapid, context-aware text and media discussions.
- **Persistent AI Memory:** Uses Supabase to store sessions, remember user preferences, and maintain chat histories seamlessly.
- **Robust Authentication:** Built-in Google OAuth flow for both the web interface and the desktop client natively.
- **Native-Like UI/UX:** A framework-less vanilla JS frontend mimicking modern SPA capabilities including dynamic markdown rendering, syntax highlighting, theming (Light/Dark toggles), voice synthesis dictation, and smooth animations.
- **File Processing:** Upload text files, code, and images directly into the chat for the AI to analyze.
- **Offline Capable:** Configured with a Service Worker to support Progressive Web App (PWA) behaviors.

---

## 🛠️ Tech Stack

### Frontend (Client-Side)
- **HTML5 / CSS3 / Vanilla Javascript** (No heavy frameworks)
- **KaTeX** (Math rendering) & **Mermaid.js** (Diagram generation)
- **Highlight.js** (Code syntax highlighting)
- **LordIcon** (Animated interactions)

### Backend & API
- **Node.js** & **Express.js**
- **Google Generative AI API** (`@google/genai`)
- **Supabase** (`@supabase/supabase-js`) for database/storage layer
- **Nodemailer** (Email notifications and utilities)

### Desktop Wrapper (Electron)
- **Electron** & **Electron-Builder**
- **Electron-Updater** for seamless auto-updates

### Web Deployment
- **Vercel Serverless Functions** (via `vercel.json` routing)

---

## 📁 Project Structure

```text
Sanatan AI/
│
├── api/                   # Backend Express API and Serverless Functions
│   ├── index.js           # Main Express server and API routes
│   ├── store.js           # DB and memory abstractions
│   ├── supabase.js        # Supabase client instantiation
│   └── admin.js           # Admin specific routes
│
├── electron/              # Desktop App configurations
│   ├── build.js           # Electron main process (Window creation & local auth server)
│   └── preload.js         # Context bridge for safer IPC communication
│
├── public/                # Frontend User Interfaces
│   ├── main/              # Main user application (HTML, CSS, JS)
│   │   ├── index.html     
│   │   ├── scripts/       # Core app logic, components, and utilities
│   │   └── styles/        # Modular CSS (base, animations, components)
│   │
│   └── admin/             # Administrator dashboard interface
│
├── vercel.json            # Vercel deployment and rewrite manifesting
├── package.json           # Dependencies and project scripts
└── ...
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have installed:
- [Node.js](https://nodejs.org/) (Version 18+ recommended)
- Git

You will also need valid API keys for:
- Google Gemini API
- Google OAuth (Client ID & Secret)
- Supabase (URL & Anon Key)

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ShivamSharma999/Sanatan-AI.git
   cd Sanatan-AI
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add the following keys.
   ```env
   PORT=3000
   TRASH=your_google_gemini_api_key
   CLIENT_ID=your_google_oauth_client_id
   GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
   # Add your Supabase and Nodemailer credentials here...
   ```

4. **Run the local Development Server:**
   ```bash
   npm run dev
   # or
   npm start
   ```
   *The application will boot up at `http://localhost:3000`.*

---

## 📦 Desktop Application (Electron)

Sanatan AI can be bundled as an executable desktop application using Electron. The desktop environment employs a custom local server on port `5612` strictly to handle the Google OAuth callback native flow.

To test the Electron app locally:
```bash
npm run test
```

To build the executable for distribution:
```bash
npm run build
```

To build and publish:
```bash
npm run publish
```

---

## 🌐 Web Deployment (Vercel)

This application is tailored to be deployed effortlessly to **Vercel**. 
The `vercel.json` file ensures that:
- API limits and routes (`/chat`, `/generate`, `/memory`) are forwarded to the serverless function `api/index.js`.
- Root traffic and static assets are securely served from the `/public` directory.

---

## 🤝 Contributing
Contributions are always welcome but only when permitted by owner. Please ensure that PRs are accompanied by clear descriptions and that you respect the Vanilla-JS architecture of the `/public` core.

## 📝 License
Copyright © Shivam Sharma. All rights reserved. 
Use of this source code is governed by an UNLICENSED agreement.
