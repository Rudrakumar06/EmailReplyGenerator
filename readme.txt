EmailReplyGenerator
==================

Overview
--------
An AI-powered email reply assistant that integrates directly into Gmail as a
Chrome Extension, powered by a Java Spring Boot backend deployed on Render.

  Live Backend API: https://emailreplygenerator-7y85.onrender.com

Components
----------
- ReplyGenerator/: Java Spring Boot backend service (deployed on Render).
- Emailwriterextention/: Chrome Extension (Manifest V3) that injects an
  "AI Reply" button directly into Gmail's compose window.

The extension calls the backend REST API to generate professional email replies
using Google's Gemini AI (gemini-3.5-flash).

Repository Structure
--------------------
- ReplyGenerator/ReplyGenerator/: Java Spring Boot application
    - src/main/java/com/email/ReplyGenerator/Controller/EmailController.java
    - src/main/java/com/email/ReplyGenerator/Service/EmailService.java
    - src/main/java/com/email/ReplyGenerator/Entity/EmailRequest.java
    - src/main/java/com/email/ReplyGenerator/config/WebClientConfig.java
    - src/main/resources/application.properties
    - pom.xml
- Emailwriterextention/: Chrome Extension
    - manifest.json (Manifest V3)
    - content.js (Gmail DOM observer + API fetch)
    - content.css (Extension styles)
- Dockerfile: Multi-stage Docker build for Render deployment.

Backend Setup
-------------
1. Open the ReplyGenerator/ReplyGenerator folder.
2. Set your Gemini API key as an environment variable:

     # Windows PowerShell
     $env:GEMINI_API_KEY="your_gemini_api_key"

     # macOS / Linux
     export GEMINI_API_KEY="your_gemini_api_key"

3. Build and run:

     ./mvnw spring-boot:run

   The backend starts on http://localhost:8080.

Chrome Extension Setup
----------------------
1. Open Google Chrome and go to chrome://extensions/.
2. Enable Developer mode (toggle in the top-right corner).
3. Click "Load unpacked".
4. Select the Emailwriterextention folder from this repository.
5. Open Gmail, open or compose an email, and click the "AI Reply" button.

Live Deployment (Render)
------------------------
The backend is deployed as a Dockerized Web Service on Render.

  Endpoint: POST https://emailreplygenerator-7y85.onrender.com/api/email/generate

  Request body:
  {
    "emailContent": "Thanks for reaching out!",
    "tone": "professional"
  }

  Response: Generated reply text.

Note: Render's free tier sleeps after 15 minutes of inactivity. If the first
request takes ~30 seconds, the container is waking up.

Notes
-----
- The extension requires the backend to be running for full functionality.
- The backend requires a valid Google Gemini API key.
- The frontend (React) folder has been removed; only the extension and backend
  remain in this repository.