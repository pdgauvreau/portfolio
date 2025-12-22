import { useEffect, useState } from 'react'

export const useActiveNavLink = () => {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const updateActiveNavLink = () => {
      const sections = document.querySelectorAll('section[id]')
      let current = 'hero'
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight
        if (window.pageYOffset >= sectionTop - 200) {
          current = section.getAttribute('id')
        }
      })
      
      setActiveSection(current)
    }

    const throttledUpdate = () => {
      let timeout
      return () => {
        clearTimeout(timeout)
        timeout = setTimeout(updateActiveNavLink, 10)
      }
    }

    const handleScroll = throttledUpdate()
    window.addEventListener('scroll', handleScroll)
    updateActiveNavLink()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return activeSection
}
