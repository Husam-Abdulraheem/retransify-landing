# 🌌 Retransify Scrollytelling Landing Page

<div align="center">

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Framework](https://img.shields.io/badge/Framework-React_19-61dafb.svg)](https://react.dev/)
[![Build Tool](https://img.shields.io/badge/Build_Tool-Vite-646cff.svg)](https://vite.dev/)
[![Animation](https://img.shields.io/badge/Animation-GSAP_3-green.svg)](https://greensock.com/gsap/)
[![Language Support](https://img.shields.io/badge/Languages-EN%20%7C%20TR-purple.svg)](#-localization--i18n)

**The official interactive, cinematic scrollytelling landing page for Retransify: Autonomously transition your existing React Web codebases to production-ready React Native Expo mobile apps via intelligent AI parsing.**

[✨ Live Experience](https://github.com) • [💻 Main Compiler Repo](https://github.com) • [📄 Apache 2.0 License](./LICENSE)

</div>

---

## 🎬 About Retransify Showcase

This repository houses the gorgeous, high-fidelity, interactive storytelling landing page designed to present the inner workings of the **Retransify Agentic Translation Pipeline**. 

Rather than standard text grids, this page guides developer-audiences through a majestic cinematic step-by-step visual journey of the compilation workflow: from importing a Web component, exploring AST structures, traversing a LangGraph loop, verifying code compiling, and self-healing compiler errors, to finally committing files to disk.

---

## 🎨 Immersive & Premium Features

*   **🎬 Cinematic Panning Camera**: Leverages **GSAP (GreenSock)** and **ScrollTrigger** for functional-based camera coordinate transitions, ensuring flawless and majestic panning flows.
*   **📐 Auto-Centering Viewport**: Uses reactive wrapper functions and `invalidateOnRefresh` so that the focused presentation cards remain perfectly centered regardless of window resizing or mobile bounds.
*   **🔮 Hover-Expanding HUD Glass Sidebar**: Solving traditional overlay text collisions with a vertical futuristic HUD that expands smoothly upon mouse hovers, keeping a clean layout at all times.
*   **🧪 Interactive Live Simulators**:
    *   **AST Explorer Node**: Renders a dynamic, expandable React tree representing parsed elements in real time.
    *   **LangGraph Orbiting Loop**: A neon SVG pathing canvas illustrating the autonomous verifier-healer feedback cycles.
    *   **AST Committer Console**: An active interactive CLI log demonstrating code writing with dynamic click-to-trigger compilation buttons.
*   **📋 Click-to-Copy Installation**: A frosted-glass copy button on the terminal prompt line with smooth active scaling and dynamic success verification states.
*   **🌐 Dynamic Localization**: Features full dot-notation type-safe Internationalization supporting English (**EN**) and Turkish (**TR**).

---

## 🛠️ Technology Stack

- **Core**: [React 19](https://react.dev/), [TypeScript 6](https://www.typescriptlang.org/)
- **Build System**: [Vite 8](https://vite.dev/)
- **Animation Suite**: [GSAP 3](https://greensock.com/gsap/) (ScrollTrigger)
- **3D Particles & Background**: [Three.js](https://threejs.org/) (via Fiber & Drei)
- **Styling**: Pure Vanilla CSS custom design tokens for maximum flexibility and glassmorphism.

---

## 💻 Getting Started

Follow these steps to run the presentation locally on your machine:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) and `npm` installed.

### 2. Clone the Repository
```bash
git clone https://github.com/your-username/retransify-landing.git
cd retransify-landing
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
Start the local server with hot-module replacement (HMR):
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser!

### 5. Build for Production
Bundle and optimize assets for deployment:
```bash
npm run build
```
The compiled assets will be placed in the `/dist` directory, ready to be hosted on GitHub Pages, Vercel, or Netlify.

---

## 🌐 Localization & i18n

Localization resources are kept in [src/constants/translations.ts](src/constants/translations.ts). It implements type-safe nested maps. Feel free to contribute translation maps for new languages!

---

## 🤝 Contributing

Contributions to improve the showcase, optimize animations, fix layout issues on rare resolutions, or add new languages are extremely welcome!

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

Distributed under the **Apache License 2.0**. See [`LICENSE`](./LICENSE) for more details.

---

<div align="center">
  <sub>Built with ❤️ by the Retransify Open Source Community.</sub>
</div>
