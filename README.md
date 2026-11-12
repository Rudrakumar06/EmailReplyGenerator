# Email Reply Generator

An AI-powered email reply assistant that integrates directly into Gmail as a Chrome Extension, powered by a Java Spring Boot backend deployed on Render. Uses Google's Gemini AI to generate contextual, professional email replies in seconds.

🌐 **Live Backend API**: `https://emailreplygenerator-7y85.onrender.com`

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
  - [Backend Setup](#backend-setup-local--docker)
  - [Chrome Extension Setup](#chrome-extension-setup)
- [Live Deployment](#-live-deployment-render)
- [License](#-license)

---

## ✨ Features

- **Gmail Integration**: One-click "AI Reply" button injected directly into Gmail's compose window.
- **AI-Powered Generation**: Generates contextual, professional email replies using Google's Gemini AI.
- **Live Cloud Backend**: Spring Boot service containerized with Docker and deployed on Render.
- **RESTful API**: Fast, asynchronous WebFlux client for external API communication.

---

## 🛠️ Tech Stack

### Backend
- **Java 21**
- **Spring Boot 3.x** - Web framework
- **Spring WebFlux** - Reactive HTTP client (`WebClient`)
- **Docker** - Containerization
- **Render** - Cloud hosting platform
- **Google Gemini API** (`gemini-3.5-flash`) - AI reply generation

### Browser Extension
- **Manifest V3**
- **Vanilla JavaScript** (DOM manipulation & MutationObserver)
- **Chrome Extension API**

---

## 📁 Project Structure

```
EmailReplyGenerator/
├── ReplyGenerator/
│   └── ReplyGenerator/
│       ├── src/
│       │   ├── main/java/com/email/ReplyGenerator/
│       │   │   ├── Controller/      # REST Endpoints
│       │   │   ├── Service/         # Gemini API integration logic
│       │   │   ├── Entity/          # Request/Response models
│       │   │   └── config/          # WebClient & CORS configuration
│       │   └── resources/
│       │       └── application.properties
│       └── pom.xml                  # Maven dependencies
├── Emailwriterextention/            # Chrome Extension
│   ├── manifest.json                # Extension configuration (Manifest V3)
│   ├── content.js                   # Gmail DOM observer & API fetch
│   └── content.css                  # Extension styling
└── Dockerfile                       # Multi-stage Docker build for Render
```

---

## 📦 Prerequisites

- **Java 21** & **Maven 3.8+** (for local backend development)
- **Google Chrome** browser (for running the extension)
- **Google Gemini API Key** ([Get one from Google AI Studio](https://aistudio.google.com/))

---

## 🚀 Getting Started

### Backend Setup (Local)

1. Navigate to the backend directory:
   ```bash
   cd ReplyGenerator/ReplyGenerator
   ```

2. Set your Gemini API key as an environment variable:
   ```bash
   # Windows PowerShell
   $env:GEMINI_API_KEY="your_gemini_api_key"

   # macOS / Linux
   export GEMINI_API_KEY="your_gemini_api_key"
   ```

3. Run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```
   The backend will start at `http://localhost:8080`.

---

### Chrome Extension Setup

1. Open Google Chrome and go to `chrome://extensions/`.
2. Enable **Developer mode** (toggle in the top-right corner).
3. Click **Load unpacked**.
4. Select the `Emailwriterextention` folder from this repository.
5. Open [Gmail](https://mail.google.com), open or compose an email, and click the **AI Reply** button!

---

## ☁️ Live Deployment (Render)

The backend is deployed as a Dockerized Web Service on Render.

- **Base Endpoint**: `POST https://emailreplygenerator-7y85.onrender.com/api/email/generate`
- **Request Body**:
  ```json
  {
    "emailContent": "Thanks for reaching out! Let me know when you're available for a call.",
    "tone": "professional"
  }
  ```
- **Response**: String containing the generated reply text.

> ℹ️ *Note: Render's free tier sleeps after 15 minutes of inactivity. If the first request takes ~30 seconds, it is waking up the container.*

---

## 📄 License

This project is licensed under the MIT License.
