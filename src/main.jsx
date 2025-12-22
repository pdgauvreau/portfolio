import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ErrorBoundary from './ErrorBoundary'
import './style.css'

// Render React immediately
const rootElement = document.getElementById('root')
if (!rootElement) {
  console.error('Root element not found!')
} else {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  )
}

// Load external scripts asynchronously (non-blocking)
const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    // Check if script already exists
    const existingScript = document.querySelector(`script[src="${src}"]`)
    if (existingScript) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.src = src
    script.onload = resolve
    script.onerror = () => {
      console.warn(`Failed to load script: ${src}`)
      resolve() // Resolve anyway so other scripts can load
    }
    document.head.appendChild(script)
  })
}

// Load scripts after React renders
setTimeout(() => {
  Promise.allSettled([
    loadScript('https://unpkg.com/aos@2.3.1/dist/aos.js'),
    loadScript('https://cdn.jsdelivr.net/npm/typed.js@2.0.12'),
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js'),
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js')
  ]).then(() => {
    // Initialize AOS
    if (window.AOS) {
      window.AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
      })
    }

    // Register GSAP ScrollTrigger
    if (window.gsap && window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger)
    }
  })
}, 100)
