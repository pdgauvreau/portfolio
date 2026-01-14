import LinkPreview from './LinkPreview'

const BASE_URL = import.meta.env.BASE_URL

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'TATE AI',
      role: 'Current Project | In Development',
      description: `TATE AI is a modern, beautiful website showcasing an AI platform - built with React, Vite, and Framer Motion. This project represents my latest work in creating cutting-edge, interactive web experiences.

      The website features a minimalist design inspired by leading AI companies, with smooth animations, interactive UI components, and beautiful gradient effects. I'm currently developing this project, focusing on creating a fast, responsive, and visually stunning platform that effectively communicates the power and potential of AI technology.

      The project emphasizes modern web development practices, including component-based architecture, performance optimization, and responsive design principles that work seamlessly across all devices.`,
      tech: ['React', 'Vite', 'Framer Motion', 'JavaScript', 'CSS3', 'Modern Web Design', 'Animation', 'UI/UX'],
      links: {
        demo: 'https://pdgauvreau.github.io/TateAI/'
      },
      isCurrent: true,
      isNew: true
    },
    {
      id: 2,
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
      id: 3,
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

  const currentProject = projects.find((p) => p.isCurrent) || projects[0]
  const pastProjects = projects.filter((p) => p.id !== currentProject.id)

  const renderProjectLinks = (project, primaryLabel) => {
    if (!project.links) return null

    return (
      <div className="project-links">
        {project.links.demo && (
          <a href={project.links.demo} className="project-link" target="_blank" rel="noopener noreferrer">
            {primaryLabel || 'Live Demo'}
          </a>
        )}
        {project.links.github && (
          <a href={project.links.github} className="project-link" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        )}
      </div>
    )
  }

  return (
    <section id="projects" className="fade-in">
      <h2 data-aos="fade-up">Projects</h2>

      <div className="projects-sections">
        <div className="projects-subsection">
          <h3 className="projects-subtitle">Current Project</h3>

          <div className="project-card project-card-featured" data-current-project="true">
            <div className="project-featured-grid">
              <div className="project-featured-text">
                <div className="project-header">
                  <h3>{currentProject.title}</h3>
                  <span className="project-badge current">Current Project</span>
                </div>
                {currentProject.role && <p className="project-role">{currentProject.role}</p>}

                <p>{currentProject.description}</p>

                <div className="tech-stack">
                  {currentProject.tech.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>

                {renderProjectLinks(currentProject, 'Visit TATE AI')}
              </div>

              <div className="project-featured-media">
                {currentProject.links?.demo && (
                  <div className="project-preview-featured">
                    <LinkPreview url={currentProject.links.demo} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="projects-subsection">
          <h3 className="projects-subtitle">Past Projects</h3>

          <div className="projects-grid">
            {pastProjects.map((project) => (
              <div key={project.id} className="project-card project-card-static">
                <div className="project-header">
                  <h3>{project.title}</h3>
                  {project.isNew && <span className="project-badge new">New</span>}
                </div>
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
                {renderProjectLinks(project)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
