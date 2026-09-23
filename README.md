# Filipi Soares Silva — Personal Portfolio & Landing Page

[🇧🇷 Versão em Português](#-português) • [🇺🇸 English Version](#-english)

---

# 🇧🇷 Português

[![React 19](https://img.shields.io/badge/React-19.2-blue?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict_7.0-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.2-purple?logo=vite&logoColor=white)](https://vite.dev/)
[![GSAP & Motion](https://img.shields.io/badge/Animation-GSAP_%2B_Framer_Motion-green?logo=framer&logoColor=white)](https://gsap.com/)
[![WCAG AA](https://img.shields.io/badge/Accessibility-WCAG_AA-emerald)](https://www.w3.org/WAI/standards-guidelines/wcag/)
[![License](https://img.shields.io/badge/License-MIT-gray)](#licença)

Landing page e portfólio de engenharia de software de alto padrão visual e arquitetural. Projetado com base no padrão estrito de Atomic Design, BEMIT com namespaces em camelCase, tipagem estrita no TypeScript e conformidade com diretrizes internacionais de acessibilidade (WCAG AA).

[Visualizar Demonstração](https://filipiss.github.io) • [Reportar Bug](https://github.com/Filipiss/personal-landing-page/issues) • [Solicitar Funcionalidade](https://github.com/Filipiss/personal-landing-page/issues)

---

## Sumário (PT)

- [Visão Geral](#visão-geral)
- [Destaques & Funcionalidades](#destaques--funcionalidades)
- [Padrão Arquitetural](#padrão-arquitetural)
  - [Atomic Design & Co-location](#1-atomic-design--co-location)
  - [Convenção CSS: BEMIT em camelCase](#2-convenção-css-bemit-em-camelcase)
  - [Design System & Tokens](#3-design-system--tokens)
- [Stack Tecnológica](#stack-tecnológica)
- [Estrutura de Diretórios](#estrutura-de-diretórios)
- [Instalação e Execução](#instalação-e-execução)
- [Projetos em Destaque](#projetos-em-destaque)
- [Acessibilidade (WCAG AA)](#acessibilidade-wcag-aa)
- [Contato](#contato)
- [Licença](#licença)

---

## Visão Geral

Esta aplicação é a vitrine técnica de Filipi Soares Silva, Fullstack Developer com foco em ecossistemas modernos (React 19, TypeScript, Python/Flask/FastAPI, PostgreSQL e IA Generativa).

Inspirada no design de alta densidade estética de ferramentas como Linear, Raycast e Vercel, a interface adota:
- **Obsidian Dark Void Canvas** com acentos energéticos em **Electric Cobalt Blue** (`#3B82F6`).
- **Animações Cinéticas e 3D**: Carrossel tridimensional com profundidade, física e aceleração gráfica via GSAP e Framer Motion.
- **Interações Táteis**: Pastas com efeito magnético, cards editoriais responsivos e microtransições de estado.

---

## Destaques & Funcionalidades

- **Internacionalização Completa (i18n):** Suporte nativo e fluido aos idiomas Português (pt-BR) e Inglês (en), com persistência em `localStorage` e detecção automática de preferências do navegador.
- **Dark / Light Mode Nativo:** Alternância suave com remapeamento semântico de tokens e preservação rigorosa de contraste.
- **Painel de Acessibilidade Flutuante:** Controle dinâmico de redimensionamento tipográfico (A- / Padrão / A+), alto contraste WCAG, escala de cinza (monocromático), realce de links acionáveis e desativação de animações.
- **Vitrine Interativa de Projetos (3D Depth Carousel):** Carrossel interativo em 3D com controle por teclado, toque móvel e modal Lightbox em tela cheia com metadados técnicos.
- **Formulário de Contato Assíncrono:** Integração direta com a API Web3Forms com validação em tempo real e prevenção de envios duplicados.
- **Download de Currículo:** Modal interativo para visualização e download de currículos em múltiplos idiomas e formatos.
- **Privacidade & Cookies:** Painel granular de consentimento de cookies conforme diretrizes da LGPD/GDPR.

---

## Padrão Arquitetural

A base de código foi estruturada com foco em clareza extrema, separação estrita de responsabilidades e escalabilidade:

### 1. Atomic Design & Co-location
Componentes rigorosamente classificados conforme a escala atômica:
- **Atoms (`src/components/atoms/`):** Elementos base indivisíveis (`buttonCta`, `badge`, `inputField`, `folder`, `githubIcon`, `depthCarousel`).
- **Molecules (`src/components/molecules/`):** Combinações funcionais de átomos (`projectCard`, `profileCard`, `marqueeRibbon`).
- **Organisms (`src/components/organisms/`):** Blocos e seções completas (`heroSection`, `aboutSection`, `projectsSection`, `experienceSection`, `stackSection`, `contactSection`, `headerNav`, `footer`, `accessibilityWidget`, etc.).
- **Templates (`src/components/templates/`):** Estruturas e layouts completos de página (`homeTemplate`, `portfolioTemplate`, `projectDetailTemplate`).

Cada componente habita sua própria pasta em `camelCase`, mantendo lógica `.tsx` e estilos `.css` lado a lado.

### 2. Convenção CSS: BEMIT em camelCase
Vanilla CSS puro, com especificidade controlada e namespaces explícitos:
- `c-` para **Componentes** (ex: `.c-buttonCta`, `.c-projectCard`, `.c-heroSection__title`).
- `l-` para **Layouts** (ex: `.l-container`, `.l-homeTemplate`, `.l-pageTransition`).
- `u-` para **Utilitários** (ex: `.u-fontMono`, `.u-textCenter`, `.u-colorAccent`).
- **Estados Dinâmicos:** Classes semânticas diretas (ex: `.isActive`, `.isOpen`, `.isLoading`, `.hasError`).

### 3. Design System & Tokens
Centralizados em `src/styles/global.css`:
- Paleta semântica Dark e Light com suporte completo a variáveis nativas.
- Tipografia: **Syne** (Títulos e display), **Inter** (Texto base e leitura) e **IBM Plex Mono** (Dados analíticos e marcadores técnicos).
- **Regra de Zero Comentários:** O código front-end não possui nenhum comentário em arquivos `.tsx`, `.ts`, `.css` ou `.html`, sendo 100% autoexplicativo, limpo e enxuto.

---

## Stack Tecnológica

| Camada | Tecnologia | Propósito |
| :--- | :--- | :--- |
| **Core UI** | [React 19](https://react.dev/) | Renderização reativa, hooks modernos e composição atômica |
| **Linguagem** | [TypeScript 7 (Strict)](https://www.typescriptlang.org/) | Tipagem estática rigorosa e contratos de dados seguros |
| **Build & Bundler** | [Vite 8](https://vite.dev/) | Compilação ultrarrápida, bundle otimizado e HMR instantâneo |
| **Estilização** | Vanilla CSS (BEMIT) | Desempenho nativo com namespaces arquiteturais previsíveis |
| **Física & 3D** | [GSAP 3](https://gsap.com/) | Interpolação tridimensional contínua e animações cinéticas |
| **Transições** | [Framer Motion](https://www.framer.com/motion/) | Transições de tela, ciclo de modais e microinterações |
| **Ícones** | [Lucide React](https://lucide.dev/) | Ícones vetoriais modernos e consistentes |
| **Linter** | [Oxlint](https://oxc.rs/) | Análise estática ultrarrápida de código TypeScript/React |

---

## Estrutura de Diretórios

```text
src/
├── assets/                  # Vetores, screenshots em alta resolução e fotos
├── components/
│   ├── atoms/               # Átomos (badge, buttonCta, inputField, folder, etc.)
│   ├── molecules/           # Moléculas (projectCard, profileCard, marqueeRibbon)
│   ├── organisms/           # Organismos (seções inteiras da aplicação)
│   └── templates/           # Templates de página (home, portfolio, projectDetail)
├── context/                 # Contextos globais reativos (LanguageContext, ThemeContext)
├── data/                    # Catálogo tipado de screenshots e especificações técnicas
├── services/                # Camada de serviços HTTP tipada (contactService)
├── styles/
│   └── global.css           # Tokens globais, reset CSS e utilitários BEMIT
├── translations/            # Dicionários de tradução JSON (pt.json, en.json)
├── types/                   # Interfaces e contratos de dados TypeScript
├── App.tsx                  # Roteamento baseado em hash e orquestração de páginas
└── main.tsx                 # Ponto de entrada e montagem do React
```

---

## Instalação e Execução

### Pré-requisitos
- Node.js (versão 18 ou superior)
- Gerenciador de pacotes npm, pnpm ou yarn

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Filipiss/personal-landing-page.git
   cd personal-landing-page
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse a aplicação no navegador em: `http://localhost:5173/`

4. **Compilar para produção:**
   ```bash
   npm run build
   ```

5. **Pré-visualizar o build localmente:**
   ```bash
   npm run preview
   ```

6. **Executar verificação de linting:**
   ```bash
   npm run lint
   ```

---

## Projetos em Destaque

1. **Time Tracker & Analytics:**
   - Plataforma completa para gerenciamento de tempo, produtividade de equipes e apuração financeira de projetos.
   - **Tecnologias:** Python, Flask, PostgreSQL, React, TypeScript.
   - **Funcionalidades:** Dashboard analítico de horas, timer em tempo real com tolerância a recargas, parametrização de moedas (€ EUR / R$ BRL) e calendário de entregas.

2. **AI Assistant Integrator (Ozlo / Multi-Provider):**
   - Orquestrador de inteligência artificial com streaming de dados em tempo real e fallback autônomo.
   - **Tecnologias:** Python, FastAPI, Server-Sent Events (SSE), Google Gemini, Groq Llama, React.
   - **Funcionalidades:** Consumo em streaming de tokens, circuit breaker com agente local e monitor de Time-to-First-Token (TTFT).

---

## Acessibilidade (WCAG AA)

- Contraste de cores validado para máxima legibilidade.
- Navegação fluida via teclado (`Tab`, `Shift+Tab`, `Esc`, setas).
- Detecção e respeito ao modo de movimento reduzido (`prefers-reduced-motion`).
- Semântica HTML rigorosa e atributos `aria-*` dinâmicos em todos os componentes.

---

## Contato

- **Desenvolvedor:** Filipi Soares Silva
- **WhatsApp:** [+55 (48) 99933-0050](https://wa.me/5548999330050)
- **LinkedIn:** [linkedin.com/in/filipiss](https://www.linkedin.com/in/filipiss/)
- **GitHub:** [github.com/filipiss](https://github.com/filipiss)

---

## Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para obter mais informações.

[Ir para o topo](#filipi-soares-silva--personal-portfolio--landing-page)

---

# 🇺🇸 English

[![React 19](https://img.shields.io/badge/React-19.2-blue?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict_7.0-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.2-purple?logo=vite&logoColor=white)](https://vite.dev/)
[![GSAP & Motion](https://img.shields.io/badge/Animation-GSAP_%2B_Framer_Motion-green?logo=framer&logoColor=white)](https://gsap.com/)
[![WCAG AA](https://img.shields.io/badge/Accessibility-WCAG_AA-emerald)](https://www.w3.org/WAI/standards-guidelines/wcag/)
[![License](https://img.shields.io/badge/License-MIT-gray)](#license)

High-end personal portfolio and software engineering landing page. Built with an uncompromising focus on clean code, rigorous Atomic Design hierarchy, camelCase-adapted BEMIT namespaces, strict TypeScript typings, and digital accessibility compliance (WCAG AA).

[Live Demo](https://filipiss.github.io) • [Report Bug](https://github.com/Filipiss/personal-landing-page/issues) • [Request Feature](https://github.com/Filipiss/personal-landing-page/issues)

---

## Table of Contents (EN)

- [Overview](#overview)
- [Key Features](#key-features)
- [Architectural Standard](#architectural-standard)
  - [Atomic Design & Co-location](#1-atomic-design--co-location-1)
  - [CSS Convention: BEMIT in camelCase](#2-css-convention-bemit-in-camelcase)
  - [Design System & Global Tokens](#3-design-system--global-tokens)
- [Technology Stack](#technology-stack)
- [Directory Structure](#directory-structure)
- [Getting Started](#getting-started)
- [Featured Case Studies](#featured-case-studies)
- [Accessibility (WCAG AA)](#accessibility-wcag-aa-1)
- [Contact](#contact-1)
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

[Back to top](#filipi-soares-silva--personal-portfolio--landing-page)
