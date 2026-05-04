<div align="center">

<img src="./public/preview.png" alt="Portfolio Header" width="100%" style="border-radius: 15px; box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);" />

<br/>

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=30&pause=1000&color=0099FF&center=true&vCenter=true&width=600&lines=🌌+Harshith+Kumar:+Digital+Universe;🚀+AI%2FML+Student;💻+Full+Stack+Architect" alt="Typing SVG" />

<p align="center">
  <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
  <a href="https://www.framer.com/motion/"><img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" /></a>
  <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" /></a>
</p>

<h3>
  <a href="https://www.harshithkumar.in">🚀 Live Demo</a>
  <span> · </span>
  <a href="https://github.com/Harshithk951/My-Portfolio/issues">🐛 Report Bug</a>
  <span> · </span>
  <a href="mailto:mharshithkumar6@gmail.com">📧 Contact Me</a>
</h3>

</div>

---

## 🚀 Executive Summary

<img align="right" src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Alien%20Monster.png" alt="Alien Monster" width="45" />

This repository houses the source code for my **high-performance, motion-driven developer portfolio**. Designed to sit at the bleeding edge of **Artificial Intelligence** and **Modern Web Development**, the architecture is built for extreme speed, fluid cinematic animations, and unparalleled visual storytelling.

It utilizes an advanced **glassmorphic UI**, **bento-style grid layouts**, and a dynamic **macOS-style floating dock** to deliver a premium user experience.

---

## 🏗️ System Design & Architecture

<img align="right" src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Gear.png" alt="Gear" width="45" />

The portfolio is architected using a modern decoupled frontend pattern, prioritizing edge delivery and client-side rendering performance.

```mermaid
flowchart TB
    subgraph Client["Client Tier (Browser)"]
        UI["React 18 Components"]
        Motion["Framer Motion Engine"]
        Styles["Tailwind CSS + PostCSS"]
        UI <--> Motion
        UI <--> Styles
    end

    subgraph Hosting["Deployment & Edge Delivery"]
        Vercel["Vercel Edge Network"]
        CDN["Global CDN Caching"]
        Vercel --> CDN
    end

    subgraph Services["External Integrations"]
        Supabase[/"Supabase (Backend/State)"/]
        GitHub[/"GitHub Actions (CI/CD)"/]
    end

    CDN -.->|Serves Static Bundle| Client
    UI -->|API Requests| Supabase
    GitHub -->|Automated Deployments| Vercel
```

### Component Hierarchy
The UI is built on atomic design principles:
- **Core Layout**: `App.jsx` handles routing, lazy loading, and core state.
- **Sections**: Modularized into `Hero`, `Projects`, `Skills`, `CTASection`.
- **Primitives**: Reusable micro-components (`mac-os-dock`, buttons, cards) styled via Tailwind utility classes and animated via Framer variants.

---

## ✨ Premium Features

<img align="right" src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Star-Struck.png" alt="Star Struck" width="45" />

* 🎨 **Sophisticated UI**: Dark-themed glassmorphism using deep custom CSS utility variables for a highly premium, liquid look.
* ⚡ **Cinematic Animations**: Micro-interactions powered by Framer Motion, utilizing exact spring physics and staggered DOM reveals.
* 📱 **Fluid Responsiveness**: Mobile-first grid systems with pixel-perfect scaling across all device viewports.
* 🛠️ **Optimized Engineering**: Lazy loading, intelligent code splitting, and extreme asset optimization for sub-second load times.
* ♿ **Inclusive Design**: ARIA-labeled interactive elements and semantic HTML for perfect screen reader compatibility.
* 🚀 **Smart Navigation**: A custom-built, scroll-aware macOS style floating dock that dynamically tracks viewport intersections.

---

## 🛠️ Technical Ecosystem

<img align="right" src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Laptop.png" alt="Laptop" width="45" />

### Core Technologies
| Layer | Tech Stack | Purpose |
| --- | --- | --- |
| **Frontend Framework** | React 18 | Component architecture & fast virtual DOM |
| **Styling Engine** | Tailwind CSS | Utility-first rapid styling and responsive design |
| **Animation Engine** | Framer Motion | Declarative physics-based animations |
| **Build Tooling** | Vite | Lightning-fast HMR and optimized production bundles |
| **Icons** | React Icons / Lucide | Lightweight, scalable vector icons |

---

## 📂 Project Structure

```bash
My-Portfolio/
├── public/                 # Static global assets (Images, CV, PWA Service Workers)
├── src/
│   ├── components/         # High-level React components
│   │   ├── layout/         # Structural components (Navbar, Footer, FloatingDock)
│   │   ├── sections/       # Page sections (Hero, Projects, Skills)
│   │   └── ui/             # Reusable primitives (Buttons, Cards, Modals)
│   ├── lib/                # Utility functions and standard helpers (cn, formatters)
│   ├── App.jsx             # Root layout & composition logic
│   └── index.css           # Global CSS tokens, reset, and custom animations
├── index.html              # Entry point
└── vite.config.js          # Vite build and plugin configuration
```

---

## 🚦 Quick Start

<img align="right" src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Rocket.png" alt="Rocket" width="45" />

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Harshithk951/My-Portfolio.git
cd My-Portfolio
```

### 2️⃣ Install Dependencies
```bash
npm install
# or
yarn install
```

### 3️⃣ Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 📊 Performance & SEO Benchmarks

<img align="right" src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Chart%20Increasing.png" alt="Chart" width="45" />

The portfolio is continuously audited to maintain perfection across core web vitals.

| Category       | Score | Metric Focus |
| -------------- | ----- | ------------ |
| **Performance**    | 🟢 98+ | FCP, LCP, TBT optimization |
| **Accessibility**  | 🟢 100 | Contrast, ARIA labels, semantic tags |
| **Best Practices** | 🟢 100 | HTTPS, secure dependencies, no console errors |
| **SEO**            | 🟢 100 | Meta tags, robots.txt, dynamic sitemap |

---

## 🤝 Connect With Me

<img align="right" src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Waving%20Hand.png" alt="Waving Hand" width="45" />

<div align="center">

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/harshith-kumar-dev/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Harshithk951)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:mharshithkumar6@gmail.com)

**Harshith Kumar**  
*Building the future with code and intelligence.*

⭐ **If you like this project or find it helpful, please give it a star!** ⭐

</div>
