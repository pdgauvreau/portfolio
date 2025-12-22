import { useEffect, useState } from 'react'

const ScrollProgress = () => {
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

    let timeout
    const handleScroll = () => {
      clearTimeout(timeout)
      timeout = setTimeout(updateScrollProgress, 10)
    }

    window.addEventListener('scroll', handleScroll)
    updateScrollProgress()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', checkMobile)
      clearTimeout(timeout)
    }
  }, [])

  const style = isMobile
    ? { width: `${progress}%`, height: '3px' }
    : { height: `${progress}%`, width: '3px' }

  return <div className="scroll-progress" style={style} />
}

export default ScrollProgress
