import { useState, useEffect } from 'react'

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const updateActiveNavLink = () => {
      const sections = document.querySelectorAll('section[id]')
      let current = 'hero'
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop
        if (window.pageYOffset >= sectionTop - 200) {
          current = section.getAttribute('id')
        }
      })
      
      setActiveSection(current)
    }

    const handleScroll = () => {
      updateActiveNavLink()
    }

    window.addEventListener('scroll', handleScroll)
    updateActiveNavLink()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = (e, href) => {
    e.preventDefault()
    if (href.startsWith('#')) {
      const target = document.querySelector(href)
      if (target) {
        const offsetTop = target.offsetTop - 80
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
          block: 'start'
        })
      }
    }
    if (window.innerWidth <= 768) {
      setIsMenuOpen(false)
      document.body.classList.remove('menu-open')
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    document.body.classList.toggle('menu-open')
  }

  const navLinks = [
    { href: '#hero', label: 'Home' },
    { href: '#projects', label: 'Projects' },
    { href: '#bio', label: 'Bio' },
    { href: '#about', label: 'About' },
    { href: '#fun', label: 'The Fun Stuff' },
    { href: '#contact', label: 'Contact' },
    { href: 'https://www.linkedin.com/in/paul-gauvreau/', label: 'LinkedIn', external: true },
    { href: 'https://github.com/pdgauvreau', label: 'GitHub', external: true },
    { href: 'https://app.joinhandshake.com/profiles/wv89gy', label: 'Handshake', external: true }
  ]

  return (
    <>
      <nav id="navbar" className={isMenuOpen ? 'active' : ''}>
        <div className="nav-container">
          <div className="nav-logo">
            <a href="#hero" onClick={(e) => handleLinkClick(e, '#hero')}>PDG</a>
          </div>
          <ul className="nav-menu" id="nav-menu">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`nav-link ${link.external ? 'external' : ''} ${activeSection === link.href.substring(1) ? 'active' : ''}`}
                  onClick={link.external ? undefined : (e) => handleLinkClick(e, link.href)}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} id="hamburger" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navigation
