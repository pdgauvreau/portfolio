import { useState, useEffect } from 'react'

const VisitorCount = () => {
  const [count, setCount] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Using CountAPI - a free service for counting
    // You can replace this with your own backend if needed
    const namespace = 'pdgauvreau-portfolio'
    const key = 'visitor-count'
    
    const updateCount = async () => {
      try {
        // Check if this is a new visitor (using sessionStorage)
        const hasVisited = sessionStorage.getItem('hasVisited')
        
        if (!hasVisited) {
          // Increment the count
          const incrementResponse = await fetch(
            `https://api.countapi.xyz/hit/${namespace}/${key}`,
            { mode: 'cors' }
          )
          
          if (incrementResponse.ok) {
            const incrementData = await incrementResponse.json()
            setCount(incrementData.value)
            sessionStorage.setItem('hasVisited', 'true')
          }
        } else {
          // Just get the current count without incrementing
          const getResponse = await fetch(
            `https://api.countapi.xyz/get/${namespace}/${key}`,
            { mode: 'cors' }
          )
          
          if (getResponse.ok) {
            const getData = await getResponse.json()
            setCount(getData.value)
          }
        }
      } catch (error) {
        console.warn('Failed to fetch visitor count:', error)
        // Fallback: use localStorage as backup
        const localCount = parseInt(localStorage.getItem('visitorCount') || '0', 10)
        const hasVisited = sessionStorage.getItem('hasVisited')
        
        if (!hasVisited) {
          const newCount = localCount + 1
          localStorage.setItem('visitorCount', newCount.toString())
          setCount(newCount)
          sessionStorage.setItem('hasVisited', 'true')
        } else {
          setCount(localCount)
        }
      } finally {
        setLoading(false)
      }
    }

    updateCount()
  }, [])

  if (loading) {
    return (
      <div className="visitor-count">
        <span className="visitor-text">Loading...</span>
      </div>
    )
  }

  return (
    <div className="visitor-count">
      <span className="visitor-text">
        visitor number #{count !== null ? count.toLocaleString() : '—'}
      </span>
    </div>
  )
}

export default VisitorCount
