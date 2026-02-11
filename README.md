# 💘 Valentine's Protocol (Code My Heart)

A programmer-themed interactive Valentine's Day web application. This project is designed to be a creative and geeky way to surprise your significant other. It features a hacker-style terminal intro, a retro pixel-art mini-game, and a customizable digital reward card.

**Language:** Russian (Interface & Text)
**Style:** Retro / Pixel Art / Pastel

![Project Preview](https://via.placeholder.com/800x400?text=Valentine%27s+Protocol+Preview)

## ✨ Features

- **Terminal Intro:** A cinematic "hacker" boot sequence that installs "love packages".
- **Pixel Art Mini-Game:** "Love Catcher" - A retro-styled game where the user must catch hearts/coffee and avoid bugs to fill the progress bar.
- **Responsive Design:** Fully optimized for mobile and desktop experiences.
- **Animations:** Smooth transitions using Framer Motion and confetti effects.
- **Tech Stack:** React, Tailwind CSS, Lucide Icons.

## 🚀 Getting Started

### Prerequisites

- Node.js installed on your machine.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/valentines-protocol.git
    cd valentines-protocol
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

## 🛠️ Customization Guide

This project is built to be easily personalized. Here is how you can make it yours:

### 1. Changing the Photo
Open `src/components/ValentineCard.tsx` and locate the image tag inside the Card Header. Replace the `src` with a URL to your photo (or place an image in the `public` folder).

```tsx
// src/components/ValentineCard.tsx
<img 
  src="/your-photo.jpg" // <--- REPLACE THIS URL
  alt="Us" 
  className="..." 
/>
```

### 2. Personalizing the Letter
Open `src/components/ValentineCard.tsx` and modify the text inside the `<p>` tags to write your own heartfelt message.

### 3. Adjusting Game Difficulty
Open `src/components/LoveCatcherGame.tsx` to tweak game mechanics:

```tsx
const WIN_SCORE = 250; // Points needed to win (Higher = Longer game)
const SPAWN_RATE_MS = 550; // How often items spawn
const FALL_SPEED_BASE = 0.35; // Speed of falling items
```

## 📦 Deployment

You can deploy this easily to Vercel, Netlify, or GitHub Pages.

1.  Push your code to GitHub.
2.  Import the repository into Vercel/Netlify.
3.  Deploy!

## 📜 License

MIT License - feel free to use this code to spread the love!
