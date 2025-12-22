import { useState, useEffect } from 'react'

const LinkPreview = ({ url }) => {
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!url) return

    // Using a link preview API service
    // Option 1: LinkPreview API (requires API key, but has free tier)
    // Option 2: Microlink API (free, no key required for basic use)
    // Option 3: Manual screenshot service
    
    const fetchPreview = async () => {
      try {
        setLoading(true)
        // Using Microlink API (free, no API key needed)
        const response = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true`)
        const data = await response.json()
        
        if (data.status === 'success' && data.data) {
          setPreview({
            title: data.data.title || '',
            description: data.data.description || '',
            image: data.data.image?.url || data.data.screenshot?.url || null,
            url: data.data.url || url
          })
        } else {
          throw new Error('Failed to fetch preview')
        }
      } catch (err) {
        console.warn('Failed to fetch link preview:', err)
        setError(err)
        // Fallback: try to get Open Graph image from the page
        try {
          const ogResponse = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
          // This is a simplified approach - in production you'd want to parse the HTML
        } catch (fallbackErr) {
          console.warn('Fallback preview fetch failed:', fallbackErr)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchPreview()
  }, [url])

  if (loading) {
    return (
      <div className="link-preview loading">
        <div className="link-preview-skeleton"></div>
      </div>
    )
  }

  if (error || !preview || !preview.image) {
    return null // Don't show anything if preview fails
  }

  return (
    <div className="link-preview">
      <a href={url} target="_blank" rel="noopener noreferrer" className="link-preview-container">
        <img 
          src={preview.image} 
          alt={preview.title || 'Website preview'} 
          className="link-preview-image"
        />
        <div className="link-preview-overlay">
          <span className="link-preview-label">Visit Site</span>
        </div>
      </a>
    </div>
  )
}

export default LinkPreview
