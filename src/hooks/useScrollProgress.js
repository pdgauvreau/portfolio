import { useEffect, useState } from 'react'

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const updateScrollProgress = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const newProgress = (scrollTop / documentHeight) * 100
      setProgress(newProgress)
    }

    const throttledUpdate = () => {
      let timeout
      return () => {
        clearTimeout(timeout)
        timeout = setTimeout(updateScrollProgress, 10)
      }
    }

    const handleScroll = throttledUpdate()
    window.addEventListener('scroll', handleScroll)
    updateScrollProgress()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  return { progress, isMobile }
}
