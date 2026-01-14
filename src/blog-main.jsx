import React from 'react'
import ReactDOM from 'react-dom/client'
import ErrorBoundary from './ErrorBoundary'
import BlogPage from './pages/BlogPage'
import './style.css'

const rootElement = document.getElementById('root')
if (!rootElement) {
  console.error('Root element not found!')
} else {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <BlogPage />
      </ErrorBoundary>
    </React.StrictMode>
  )
}

