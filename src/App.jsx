import { useEffect } from 'react'
import Navigation from './components/Navigation'
import ScrollProgress from './components/ScrollProgress'
import HeroBackground from './components/HeroBackground'
import VisitorCount from './components/VisitorCount'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Bio from './components/Bio'
import About from './components/About'
import Fun from './components/Fun'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      // Initialize particles animation
      if (window.gsap) {
        const particles = document.querySelectorAll('.particle')
        particles.forEach((particle, index) => {
          const delay = index * 0.5
          const duration = 3 + Math.random() * 2
          const x = (Math.random() - 0.5) * 200
          const y = (Math.random() - 0.5) * 200
          
          window.gsap.to(particle, {
            x: x,
            y: y,
            duration: duration,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: delay
          })
        })
      }

      // Add ripple effect to buttons
      const buttons = document.querySelectorAll('.btn')
      buttons.forEach(button => {
        button.addEventListener('click', function(e) {
          const ripple = document.createElement('span')
          const rect = this.getBoundingClientRect()
          const size = Math.max(rect.width, rect.height)
          const x = e.clientX - rect.left - size / 2
          const y = e.clientY - rect.top - size / 2
          
          ripple.style.width = ripple.style.height = size + 'px'
          ripple.style.left = x + 'px'
          ripple.style.top = y + 'px'
          ripple.classList.add('ripple')
          
          this.appendChild(ripple)
          
          setTimeout(() => {
            ripple.remove()
          }, 600)
        })
      })

      // Tech tag hover effect
      const techTags = document.querySelectorAll('.tech-tag')
      techTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
          this.style.transform = 'scale(1.1) rotate(2deg)'
        })
        
        tag.addEventListener('mouseleave', function() {
          this.style.transform = 'scale(1) rotate(0)'
        })
      })

      // GSAP Animations for Skills
      if (window.gsap && window.ScrollTrigger) {
        const skills = document.querySelectorAll('.skill-item')
        skills.forEach((skill, index) => {
          window.gsap.from(skill, {
            scrollTrigger: {
              trigger: skill,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            duration: 0.6,
            delay: index * 0.1
          })
        })
      }

      // Intersection Observer for Fade-in Animations
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      }, observerOptions)

      document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el)
      })
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <ScrollProgress />
      <HeroBackground />
      <VisitorCount />
      <Navigation />
      <Hero />
      <Projects />
      <Bio />
      <About />
      <Fun />
      <Contact />
      <Footer />
    </>
  )
}

export default App
