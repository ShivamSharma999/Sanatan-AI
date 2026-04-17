# Sanatan AI

Sanatan AI is a specialized AI assistant designed to provide information and guidance related to **Sanatan Dharma**. Powered by Google's Gemini models, it offers a spiritual and educational chat experience with features tailored for immersive interaction.

![Sanatan AI Banner](public/main/Resources/images/logo.png)

> ## ❗Important
> Use this software with permit.
>
> No permit is given without permission of owner.
> Check `LICENSE` for more details.

## ✨ Features

-   **Spiritual AI Assistant**: specialized knowledge base focused on Sanatan Dharma.
-   **Modern UI/UX**:
    -   Glassmorphism design with dark/light mode support.
    -   Smooth animations and transitions.
    -   Responsive layout for all devices.
-   **Interaction Modes**:
    -   **Text Chat**: Natural language conversations.
    -   **Voice Control**: Speak to the AI and hear responses (Text-to-Speech & Speech-to-Text).
    -   **File Analysis**: Upload text or images for the AI to analyze.
-   **Session Management**:
    -   Multiple chat sessions.
    -   Sever storage for chat history.
    -   Manage past conversations.
-   **Integrated Tools**:
    -   **Bhagavad Gita Explorer**: Direct access to shloks and teachings.
    -   **Customizable Settings**: personalize the experience.
-   **Secure Onboarding**: Email verification via OTP.

## 🛠️ Tech Stack

-   **Frontend**: HTML5, CSS3, JavaScript (Vanilla ES6+)
-   **Styling**: Custom CSS with CSS Variables for theming.
-   **Markdown Rendering**: `markdown-it.js` with Hightlight.js for code blocks and KaTeX for math.
-   **Icons**: Google Material Symbols & LordIcon.
-   **Backend API**: Vercel Serverless Functions (`sanatanai-psi.vercel.app`) interacting with Gemini API.

## 🚀 Getting Started

### Prerequisites

-   A modern web browser (Edge, Chrome, Firefox, Safari).
-   Internet connection (for AI responses).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ShivamSharma999/SanatanAI.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd SanatanAI
    ```

3. **Install dependencies:**
    run: 
    ```bash
    npm install
    ```

4. **Run the Application:**
    -   Run `npm run dev`
    -   Open [localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```
Sanatan AI/
├── icons/              # App icons and assets
├── Resources/          # Images and other static resources
├── scripts/            # Application Logic
│   ├── core/           # Core app logic
│   ├── components/     # UI components
│   ├── lib/            # Third-party libraries edited for shortening code and meeting requirements of app.
│   └── utils/          # Utility functions
├── styles/             # CSS Stylesheets
│   ├── base/           # Base styles (main.css, media.css)
│   ├── components/     # Component-specific styles
│   └── vendor/         # Library styles
├── server/             # Backend logic
├── index.html          # Main entry point
└── README.md           # Project Documentation
```

## 📜 License

This project is licensed under the [NO License](LICENSE).

## Important Note:
Libraries used may be edited and could have older versions.

## 🙌 Credits

-   **AI Model**: Google Gemini
-   **Icons**: [LordIcon](https://lordicon.com)
-   **Developer**: Sanatan AI
