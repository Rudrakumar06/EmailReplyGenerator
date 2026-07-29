# Email Reply Generator

An intelligent email reply assistant that leverages AI to help compose professional email responses quickly and efficiently. Features a Java Spring Boot backend, modern React frontend, and Chrome extension for seamless Gmail integration.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Chrome Extension Setup](#chrome-extension-setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **AI-Powered Reply Generation**: Generate contextual email replies with a single click
- **Gmail Integration**: Seamless Chrome extension for Gmail
- **Web Interface**: User-friendly React application
- **Professional Responses**: Generates polished, professional email content
- **RESTful API**: Robust Spring Boot backend for processing requests

## 🛠️ Tech Stack

### Backend

- **Java 11+**
- **Spring Boot** - Web framework
- **Spring WebClient** - HTTP client for API calls
- **Maven** - Build tool

### Frontend

- **React 18+**
- **Vite** - Build tool
- **JavaScript ES6+**

### Chrome Extension

- **Vanilla JavaScript**
- **Chrome APIs**

## 📁 Project Structure

```
EmailReplyGenerator/
├── ReplyGenerator/                 # Spring Boot backend
│   └── ReplyGenerator/
│       ├── src/
│       │   ├── main/java/          # Backend source code
│       │   └── resources/          # Configuration files
│       └── pom.xml                 # Maven configuration
├── Emailgenerator-frontend/        # React frontend
│   └── email-generator-frontend/
│       ├── src/                    # React components
│       ├── package.json            # Dependencies
│       └── vite.config.js          # Vite configuration
└── Emailwriterextention/           # Chrome extension
    ├── manifest.json               # Extension configuration
    ├── content.js                  # Extension script
    └── content.css                 # Extension styles
```

## 📦 Prerequisites

- **Java 11 or higher**
- **Node.js 16+ and npm**
- **Maven 3.6+**
- **Google Chrome browser** (for extension)

## 🚀 Getting Started

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd ReplyGenerator/ReplyGenerator
   ```

2. Configure the application properties:

   ```bash
   # Edit src/main/resources/application.properties
   # Update API endpoints and other configurations as needed
   ```

3. Build the project:

   ```bash
   mvn clean install
   ```

4. Run the application:
   ```bash
   mvn spring-boot:run
   ```
   The backend will start on `http://localhost:8080` (or your configured port)

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd Emailgenerator-frontend/email-generator-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173` (Vite default)

4. Build for production:
   ```bash
   npm run build
   ```

### Chrome Extension Setup

1. Navigate to the extension directory:

   ```bash
   cd Emailwriterextention
   ```

2. Load the extension in Chrome:
   - Open `chrome://extensions/`
   - Enable **Developer mode** (toggle in top right)
   - Click **Load unpacked**
   - Select the `Emailwriterextention` folder

3. The extension is now ready to use in Gmail

## 💻 Usage

### Via Web Interface

1. Open the React frontend at `http://localhost:5173`
2. Enter your email text or context
3. Click to generate a reply
4. Copy or customize the generated response

### Via Chrome Extension

1. Open Gmail
2. Click the **Email Reply Generator** extension icon
3. Compose or view an email
4. Use the extension interface to generate replies

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/YourFeature`
3. Commit changes: `git commit -m 'Add YourFeature'`
4. Push to branch: `git push origin feature/YourFeature`
5. Submit a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub or contact the maintainers.
