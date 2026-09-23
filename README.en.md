# Filipi Soares Silva — Personal Portfolio & Landing Page

[![React 19](https://img.shields.io/badge/React-19.2-blue?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict_7.0-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.2-purple?logo=vite&logoColor=white)](https://vite.dev/)
[![GSAP & Motion](https://img.shields.io/badge/Animation-GSAP_%2B_Framer_Motion-green?logo=framer&logoColor=white)](https://gsap.com/)
[![WCAG AA](https://img.shields.io/badge/Accessibility-WCAG_AA-emerald)](https://www.w3.org/WAI/standards-guidelines/wcag/)
[![License](https://img.shields.io/badge/License-MIT-gray)](#license)

High-end personal portfolio and software engineering landing page. Built with an uncompromising focus on clean code, rigorous Atomic Design hierarchy, camelCase-adapted BEMIT namespaces, strict TypeScript typings, and digital accessibility compliance (WCAG AA).

[Live Demo](https://filipiss.github.io) • [Report Bug](https://github.com/Filipiss/personal-landing-page/issues) • [Request Feature](https://github.com/Filipiss/personal-landing-page/issues)

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Architectural Standard](#architectural-standard)
  - [Atomic Design & Co-location](#1-atomic-design--co-location)
  - [CSS Convention: BEMIT in camelCase](#2-css-convention-bemit-in-camelcase)
  - [Design System & Global Tokens](#3-design-system--global-tokens)
- [Technology Stack](#technology-stack)
- [Directory Structure](#directory-structure)
- [Getting Started](#getting-started)
- [Featured Case Studies](#featured-case-studies)
- [Accessibility (WCAG AA)](#accessibility-wcag-aa)
- [Contact](#contact)
- [License](#license)

---

## Overview

This application serves as the engineering showcase for Filipi Soares Silva, a Fullstack Software Developer specializing in modern production architectures (React 19, TypeScript, Python/Flask/FastAPI, PostgreSQL, and Generative AI pipelines).

Drawing visual inspiration from high-craft tools such as Linear, Raycast, and Vercel, the design language features:
- **Obsidian Dark Void Canvas** accentuated by **Electric Cobalt Blue** (`#3B82F6`).
- **Kinetic & 3D Motion**: Perspective-depth 3D showcase carousel accelerated by GSAP, paired with smooth fluid page transitions orchestrated by Framer Motion.
- **Tactile Micro-interactions**: Magnetic 3D folder component, reactive cards, and precision button click states.

---

## Key Features

- **Full Internationalization (i18n):** Instant bilingual switching between Portuguese (pt-BR) and English (en), backed by persistent `localStorage` and client browser auto-detection.
- **Native Dark / Light Mode:** Seamless palette transitions maintaining strict editorial contrast ratios in every setting.
- **Floating Accessibility Suite:** Dedicated accessibility popover panel featuring font size scaling (A- / Standard / A+), WCAG high-contrast mode, grayscale, link target highlights, and reduced-motion suppression.
- **3D Depth Gallery & Lightbox:** Hardware-accelerated 3D carousel with full keyboard and mobile gesture controls, paired with a modal lightbox inspecting production screenshots.
- **Asynchronous Contact Pipeline:** Direct serverless integration with Web3Forms API including validation, submission loaders, and notification states.
- **Curriculum Vitae Downloader:** Interactive modal enabling quick preview and download of verified resumes in English and Portuguese.
- **Privacy & GDPR Compliance:** Granular cookie management and consent system.

---

## Architectural Standard

The codebase enforces software architecture principles optimized for maintainability and team scalability:

### 1. Atomic Design & Co-location
All interface elements are organized by atomic responsibility:
- **Atoms (`src/components/atoms/`):** Fundamental building blocks (`buttonCta`, `badge`, `inputField`, `folder`, `githubIcon`, `depthCarousel`).
- **Molecules (`src/components/molecules/`):** Combinations of atoms (`projectCard`, `profileCard`, `marqueeRibbon`).
- **Organisms (`src/components/organisms/`):** Autonomous sections and complex UI blocks (`heroSection`, `aboutSection`, `projectsSection`, `experienceSection`, `stackSection`, `contactSection`, `headerNav`, `footer`, `accessibilityWidget`, etc.).
- **Templates (`src/components/templates/`):** Structural page layouts (`homeTemplate`, `portfolioTemplate`, `projectDetailTemplate`).

Each component lives in its own dedicated `camelCase` directory with component code (`.tsx`) and styling (`.css`) co-located side by side.

### 2. CSS Convention: BEMIT in camelCase
Pure Vanilla CSS with strict specificity controls and clean namespacing:
- `c-` for **Components** (e.g., `.c-buttonCta`, `.c-projectCard`, `.c-heroSection__title`).
- `l-` for **Layouts** (e.g., `.l-container`, `.l-homeTemplate`, `.l-pageTransition`).
- `u-` for **Utilities** (e.g., `.u-fontMono`, `.u-textCenter`, `.u-colorAccent`).
- **Dynamic States:** Direct semantic classes (e.g., `.isActive`, `.isOpen`, `.isLoading`, `.hasError`).

### 3. Design System & Global Tokens
Centrally governed in `src/styles/global.css`:
- Native CSS variable-driven Dark and Light themes.
- Typography: **Syne** (Monumental display headings), **Inter** (High-legibility body copy), and **IBM Plex Mono** (Engineering metadata and stats).
- **Zero Front-end Comments:** Code is self-explanatory, clean, and concise across all `.tsx`, `.ts`, `.css`, and `.html` files.

---

## Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Core UI** | [React 19](https://react.dev/) | Reactive rendering, modern hooks, and component composition |
| **Language** | [TypeScript 7 (Strict)](https://www.typescriptlang.org/) | Strict static typing, interfaces, and safe API contracts |
| **Build & Tooling** | [Vite 8](https://vite.dev/) | Ultra-fast HMR and optimized production bundling |
| **Styling** | Vanilla CSS (BEMIT) | Native execution without framework runtime overhead |
| **3D & Physics** | [GSAP 3](https://gsap.com/) | 3D stage interpolation and kinetic carousel physics |
| **Transitions** | [Framer Motion](https://www.framer.com/motion/) | Route transitions, modal lifecycles, and micro-interactions |
| **Icons** | [Lucide React](https://lucide.dev/) | Clean, lightweight SVG iconography |
| **Linter** | [Oxlint](https://oxc.rs/) | High-speed static analysis for modern React/TypeScript |

---

## Directory Structure

```text
src/
├── assets/                  # Vectors, high-resolution project captures, and photos
├── components/
│   ├── atoms/               # Atoms (badge, buttonCta, inputField, folder, etc.)
│   ├── molecules/           # Molecules (projectCard, profileCard, marqueeRibbon)
│   ├── organisms/           # Organisms (complete sections across the landing page)
│   └── templates/           # Templates (home, portfolio, projectDetail layouts)
├── context/                 # Reactive global contexts (LanguageContext, ThemeContext)
├── data/                    # Typed screenshot catalog and technical project specs
├── services/                # Typed HTTP API service layer (contactService)
├── styles/
│   └── global.css           # Tokens, base resets, and BEMIT utility definitions
├── translations/            # JSON translation dictionaries (pt.json, en.json)
├── types/                   # TypeScript interfaces and shared type declarations
├── App.tsx                  # Hash router controller and top-level orchestrator
└── main.tsx                 # Application entry point and DOM root mounting
```

---

## Getting Started

### Prerequisites
- Node.js (version 18 or above recommended)
- Package manager: npm, pnpm, or yarn

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Filipiss/personal-landing-page.git
   cd personal-landing-page
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser at: `http://localhost:5173/`

4. **Build production assets:**
   ```bash
   npm run build
   ```

5. **Preview the production build locally:**
   ```bash
   npm run preview
   ```

6. **Run static code inspection:**
   ```bash
   npm run lint
   ```

---

## Featured Case Studies

1. **Time Tracker & Analytics Platform:**
   - Fullstack application for tracking engineering hours, productivity analytics, and billing.
   - **Stack:** Python, Flask, PostgreSQL, React, TypeScript.
   - **Key Features:** Live session timer with reload persistence, multi-currency support (€ EUR / R$ BRL), task breakdown, and calendar views.

2. **AI Assistant Integrator (Ozlo / Multi-Provider):**
   - Intelligent multi-model conversational assistant with real-time SSE streaming.
   - **Stack:** Python, FastAPI, Server-Sent Events (SSE), Google Gemini, Groq Llama, React.
   - **Key Features:** Token streaming, autonomous resident fallback agent with circuit breaker logic, and Time-to-First-Token (TTFT) telemetry.

---

## Accessibility (WCAG AA)

- Verified color contrast ratios (> 4.5:1).
- Comprehensive keyboard navigation (`Tab`, `Shift+Tab`, `Esc`, arrow keys).
- Respects operating system motion settings via `prefers-reduced-motion`.
- Explicit semantic HTML and dynamic `aria-*` attributes across all interactive components.

---

## Contact

- **Developer:** Filipi Soares Silva
- **WhatsApp:** [+55 (48) 99933-0050](https://wa.me/5548999330050)
- **LinkedIn:** [linkedin.com/in/filipiss](https://www.linkedin.com/in/filipiss/)
- **GitHub:** [github.com/filipiss](https://github.com/filipiss)

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for further details.
