# Portfolio Website - React Version

A modern portfolio website built with React and Vite.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Project Structure

```
portfolio/
├── public/           # Static assets (images, etc.)
├── src/
│   ├── components/   # React components
│   ├── hooks/        # Custom React hooks
│   ├── App.jsx       # Main app component
│   ├── main.jsx      # Entry point
│   └── style.css     # Styles
├── index.html        # HTML template
├── package.json      # Dependencies
└── vite.config.js    # Vite configuration
```

## Technologies Used

- React 18
- Vite
- AOS (Animate On Scroll)
- Typed.js
- GSAP
- ScrollTrigger

## Development

The development server will start on `http://localhost:5173` by default.

## Deployment

**IMPORTANT:** The site must be built before deployment!

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder contents to your hosting service (GitHub Pages, Netlify, Vercel, etc.)

3. For GitHub Pages, you may need to:
   - Set the base path in `vite.config.js` to your repository name
   - Configure GitHub Pages to serve from the `dist` folder
   - Or use a GitHub Action to build and deploy automatically

## Troubleshooting

If you see a white screen:
1. Make sure you've run `npm run build` and deployed the `dist` folder
2. Check browser console for errors (F12)
3. Ensure all assets are loading correctly
4. Verify the build completed successfully
