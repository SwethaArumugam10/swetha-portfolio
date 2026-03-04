# Swetha Arumugam — Portfolio

A sleek, dark-themed React portfolio built with Vite.

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Run in development
```bash
npm run dev
```
Open http://localhost:5173 in your browser.

### 3. Build for production
```bash
npm run build
```
Output will be in the `dist/` folder.

### 4. Preview production build
```bash
npm run preview
```

---

## 📁 Project Structure

```
swetha-portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── main.jsx        ← React entry point
│   ├── App.jsx         ← Root component
│   └── Portfolio.jsx   ← Full portfolio (all sections + styles)
├── index.html
├── vite.config.js
└── package.json
```

---

## 🌐 Deploy to Netlify

1. Push this project to a GitHub repository
2. Go to https://netlify.com → "Add new site" → "Import from Git"
3. Select your repo
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Click **Deploy site**

Done! Your portfolio will be live in ~60 seconds.

---

## ✏️ Customization

All content lives in `src/Portfolio.jsx`:

- **Personal info / summary** → `hero-content` section
- **Skills** → `skillsData` array
- **Experience / Projects** → `experienceData` array
- **Education** → `educationData` array
- **Certifications** → `certsData` array
- **Colors / fonts** → `:root` CSS variables at the top of the `style` string
