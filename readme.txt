EmailReplyGenerator
==================

Overview
--------
This repository contains two separate user-facing components:
- `Emailgenerator-frontend/email-generator-frontend`: the React frontend application.
- `Emailwriterextention`: the Gmail browser extension files.

Each component can be used independently:
- The frontend is a standalone UI for generating email replies when run with its own development server.
- The extension is a browser integration that injects reply functionality directly into Gmail.

Using the Frontend Only
-----------------------
1. Open `Emailgenerator-frontend/email-generator-frontend`.
2. Install dependencies:
   - Run `npm install` in that folder.
3. Start the frontend app:
   - Run `npm run dev`.
4. Open the URL shown by Vite (usually `http://localhost:5173`).

This frontend is intended as the UI layer only. If the backend API is not running, it may not be able to generate replies automatically.

Using the Extension Only
------------------------
1. Open the `Emailwriterextention` folder.
2. In your browser, open the extensions or add-ons page.
3. Enable developer mode.
4. Load the extension as an unpacked extension from the `Emailwriterextention` folder.
5. Open Gmail and verify the extension is active.

The extension works by injecting UI into Gmail. If it depends on a backend service, that backend must be running separately for full functionality.
Backend Gemini API Key
----------------------
If you use the backend service for reply generation, configure the Gemini API key in the backend application:
1. Open the `ReplyGenerator/ReplyGenerator` project.
2. Set the Gemini API key in your environment or backend configuration.
   - Example environment variable: `GEMINI_API_KEY=your_api_key_here`
3. If the backend uses `application.properties`, add the corresponding property or ensure the environment variable is available at runtime.
Repository Structure
--------------------
- `Emailgenerator-frontend/email-generator-frontend/`: React frontend application with `package.json`, source code, and build configuration.
- `Emailwriterextention/`: Browser extension files, including `manifest.json`, `content.js`, and `content.css`.
- `ReplyGenerator/`: Backend service (Java Spring application).

Notes
-----
- You can use just the frontend or just the extension, depending on your needs.
- For full end-to-end behavior, both the frontend and extension may require the backend to be available.
