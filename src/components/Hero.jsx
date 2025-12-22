import { useEffect, useRef } from 'react'
import VisitorCount from './VisitorCount'

const Hero = () => {
  const typedTextRef = useRef(null)

  useEffect(() => {
    if (window.Typed && typedTextRef.current) {
      const typed = new window.Typed(typedTextRef.current, {
        strings: [
          'Undergrad @ University of Utah',
          'Software Developer',
          'UI/UX Designer',
          'Problem Solver'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        showCursor: false
      })

      return () => {
        typed.destroy()
      }
    }
  }, [])

  const handleLinkClick = (e, href) => {
    e.preventDefault()
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

  return (
    <section id="hero" className="hero">
      <VisitorCount />
      <div className="hero-content" data-aos="fade-up" data-aos-duration="1000">
        <h1 className="hero-title">
          <span className="name-highlight">P. David Gauvreau</span>
        </h1>
        <p className="hero-subtitle" id="typed-text" ref={typedTextRef}></p>
        <div className="hero-buttons">
          <a href="#projects" className="btn btn-primary" onClick={(e) => handleLinkClick(e, '#projects')}>
            View My Work
          </a>
          <a href="#contact" className="btn btn-secondary" onClick={(e) => handleLinkClick(e, '#contact')}>
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
