import { useState, useEffect, useCallback, useRef } from 'react'
import LinkPreview from './LinkPreview'

const BASE_URL = import.meta.env.BASE_URL

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoRotating, setIsAutoRotating] = useState(true)
  const carouselRef = useRef(null)

  const projects = [
    {
      id: 1,
      title: 'Dishbook',
      role: 'Full-Stack Developer',
      description: `Dishbook is a recipe sharing website that provides a cozy place to save family recipes, discover new favorites, and swap variations that feel like home. Users can start with a trusted dish, record tweaks and modifications, and see what other cooks tried.

      As the full-stack developer, I built both the front-end and back-end infrastructure, implementing user authentication, recipe management, community features, and a search system. The platform allows users to keep private notes for weeknights or share their versions with the community, complete with photos, tags, and clear steps.

      The site features a clean, user-friendly interface that makes it easy to build a personal cookbook that grows with you, one small improvement at a time.`,
      tech: ['React', 'JavaScript', 'Python', 'SQL', 'Full-Stack Development', 'Authentication', 'Database Design', 'RESTful API'],
      links: {
        demo: 'https://lunchboxapp.food/',
        github: 'https://github.com/utah-cs3550-fa25/PAUL-GAUVREAU'
      }
    },
    {
      id: 2,
      title: 'Lunchbox',
      role: 'Founder & Front-End Developer | July 2024 - Present',
      description: `Lunchbox is an ongoing project focused on making meal planning more intuitive and enjoyable.  

      As the founder and front-end developer, I lead the design and development process, manage a small team, and guide the overall direction of the app. I'm responsible for building an engaging user interface, developing the front-end architecture, and ensuring that design and functionality work seamlessly together.  

      My goal with Lunchbox is to create a polished, user-friendly platform that simplifies how people plan and organize their meals.`,
      tech: ['React', 'JavaScript', 'Python', 'Firebase', 'Figma'],
      links: null
    },
    {
      id: 3,
      title: 'Salesforce Dashboards at Catholic Answers',
      role: 'IT Intern | May 2025 - July 2025 | El Cajon, CA',
      description: `At Catholic Answers, I worked within the IT and Development teams to improve how donor and sales data was visualized and utilized.  

      I developed Salesforce dashboards and reports that tracked monthly activity, revealed key performance trends, and helped identify under-engaged donor segments.  

      In addition, I collaborated with staff to refine data processes and streamline report generation for greater clarity and efficiency.`,
      tech: ['Salesforce', 'Python', 'SQL', 'Snowflake'],
      links: null
    },
    {
      id: 4,
      title: 'Intel Sustainability Website',
      description: `Developed a comprehensive web application highlighting Intel's sustainability initiatives. 

      The site features a fully responsive design with interactive elements that emphasize the company's 
      environmental commitments and green technology efforts.
      
      The project focused on creating a clean, 
      accessible interface that effectively communicates complex sustainability data in a user-friendly format.`,
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
      links: {
        demo: 'https://pdgauvreau.github.io/02-prj-intel-sustainability/',
        github: 'https://github.com/pdgauvreau/02-prj-intel-sustainability'
      }
    },
    {
      id: 5,
      title: 'charity: water Branded Web Game',
      role: 'Independent Project | October 2025',
      description: `I designed and developed an interactive web game to raise awareness for charity: water's mission to bring clean water to communities in need.

      The project centered on creating a cohesive brand experience that authentically represented charity: water's identity—implementing their exact brand colors (#FFC907, #2E9DF7), using Proxima Nova typography throughout, and extending their signature gradient aesthetic across the entire interface.

      The gameplay reinforces the organization's mission through a water drop-catching mechanic, while integrated donation links convert player engagement into direct support for clean water initiatives.`,
      tech: ['JavaScript', 'HTML5', 'CSS3', 'Canvas API', 'Game Development', 'Animation', 'Brand Design', 'UI/UX', 'Event Handling'],
      links: {
        demo: 'https://pdgauvreau.github.io/06-completed-cw-game/',
        github: 'https://github.com/pdgauvreau/06-completed-cw-game'
      },
      image: `${BASE_URL}Charity_Water_Game.png`
    }
  ]

  // Define navigation functions first
  const goToNext = useCallback(() => {
    setIsAutoRotating(false)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
  }, [projects.length])

  const goToPrevious = useCallback(() => {
    setIsAutoRotating(false)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length)
  }, [projects.length])

  const goToSlide = useCallback((index) => {
    setIsAutoRotating(false)
    setCurrentIndex(index)
  }, [])

  // Auto-rotate every 6 seconds
  useEffect(() => {
    if (!isAutoRotating) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isAutoRotating, projects.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious()
      } else if (e.key === 'ArrowRight') {
        goToNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToNext, goToPrevious])

  const getCardClass = (index) => {
    // Calculate the shortest distance (handling circular array)
    let diff = index - currentIndex
    if (diff > projects.length / 2) {
      diff = diff - projects.length
    } else if (diff < -projects.length / 2) {
      diff = diff + projects.length
    }
    
    const absDiff = Math.abs(diff)
    if (absDiff === 0) return 'active'
    if (absDiff === 1) return 'adjacent'
    return 'hidden'
  }

  const getCardStyle = (index) => {
    // Calculate the shortest distance (handling circular array)
    let diff = index - currentIndex
    if (diff > projects.length / 2) {
      diff = diff - projects.length
    } else if (diff < -projects.length / 2) {
      diff = diff + projects.length
    }
    
    const absDiff = Math.abs(diff)
    
    if (absDiff === 0) {
      return { transform: 'translateX(0) scale(1)', zIndex: 3 }
    } else if (absDiff === 1) {
      const translateX = diff > 0 ? '55%' : '-55%'
      return { transform: `translateX(${translateX}) scale(0.9)`, zIndex: 2 }
    } else {
      return { transform: 'translateX(0) scale(0.8)', zIndex: 1 }
    }
  }

  return (
    <section id="projects" className="fade-in">
      <h2 data-aos="fade-up">Projects</h2>
      <div className="projects-carousel-container" ref={carouselRef}>
        <div className="projects-carousel">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`project-card ${getCardClass(index)}`}
              style={getCardStyle(index)}
            >
              <>
                <h3>{project.title}</h3>
                {project.role && <p className="project-role">{project.role}</p>}
                {project.image && (
                  <div className="project-image-top">
                    <img src={project.image} alt={`${project.title} interface`} />
                  </div>
                )}
                {project.links?.demo && !project.image && (
                  <LinkPreview url={project.links.demo} />
                )}
                <p>{project.description}</p>
                <div className="tech-stack">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
                {project.links && (
                  <div className="project-links">
                    <a href={project.links.demo} className="project-link" target="_blank" rel="noopener noreferrer">
                      Live Demo
                    </a>
                    <a href={project.links.github} className="project-link" target="_blank" rel="noopener noreferrer">
                      GitHub
                    </a>
                  </div>
                )}
              </>
            </div>
          ))}
        </div>
        <button 
          className="carousel-arrow carousel-arrow-left" 
          onClick={goToPrevious}
          aria-label="Previous project"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button 
          className="carousel-arrow carousel-arrow-right" 
          onClick={goToNext}
          aria-label="Next project"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
        <div className="carousel-indicators">
          {projects.map((_, index) => (
            <button
              key={index}
              className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
