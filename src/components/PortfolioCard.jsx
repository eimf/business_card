import { useState, useEffect } from 'react'
import './PortfolioCard.scss'

const PortfolioCard = () => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleFlip = () => {
    setIsAnimating(true)
    setIsFlipped(!isFlipped)
  }

  const handleTransitionEnd = () => {
    setIsAnimating(false)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleFlip()
    }
  }

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const projects = [
    {
      name: 'Jot Rocks',
      url: 'https://jot.rocks/',
      description: 'Modern note-taking application',
      tech: ['React', 'Node.js', 'MongoDB']
    },
    {
      name: 'Tour Selkirk Mexico',
      url: 'https://tourselkirkmexico.com/',
      description: 'Tourism and travel booking platform',
      tech: ['Vue.js', 'Express', 'PostgreSQL']
    },
    {
      name: 'Tableau de Katia',
      url: 'https://tableaudekatia.com/',
      description: 'Art portfolio and gallery showcase',
      tech: ['React', 'Gatsby', 'Strapi']
    },
    {
      name: 'Sheets App',
      url: 'https://sheets-app.fly.dev/',
      description: 'Collaborative spreadsheet application',
      tech: ['TypeScript', 'WebSockets', 'Redis']
    }
  ]

  const handleProjectClick = (url, event) => {
    if (isAnimating) {
      event.preventDefault()
      return
    }
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleResumeDownload = (event) => {
    if (isAnimating) {
      event.preventDefault()
      return
    }
    
    // Create a temporary link element to trigger download
    const link = document.createElement('a')
    link.href = '/Ezequiel-Lopez-CV.pdf'
    link.download = 'Ezequiel-Lopez-Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="portfolio-card-container">
      <div 
        className={`portfolio-card ${isFlipped ? 'flipped' : ''} ${isAnimating ? 'animating' : ''}`}
        onClick={handleFlip}
        onKeyDown={handleKeyDown}
        onTransitionEnd={handleTransitionEnd}
        tabIndex="0"
        role="button"
        aria-label={isFlipped ? "View portfolio summary" : "View project links and resume"}
        aria-pressed={isFlipped}
      >
        {/* Front Side - Portfolio Summary */}
        <div className="card-face card-front">
          <div className="content">
            <div className="header">
              <h1>Ezequiel Lopez</h1>
              <p className="title">Full Stack Developer</p>
            </div>
            
            <div className="summary">
              <div className="highlight-item">
                <span className="number">13+</span>
                <span className="label">Years Experience</span>
              </div>
              <div className="highlight-item">
                <span className="number">15+</span>
                <span className="label">Projects Delivered</span>
              </div>
              <div className="highlight-item">
                <span className="number">10+</span>
                <span className="label">Technologies</span>
              </div>
            </div>

            <div className="skills-preview">
              <div className="skill-tag">React</div>
              <div className="skill-tag">Node.js</div>
              <div className="skill-tag">TypeScript</div>
              <div className="skill-tag">Python</div>
            </div>
          </div>
          <div className="shine"></div>
        </div>

        {/* Back Side - Projects and Resume */}
        <div className="card-face card-back">
          <div className="content">
            <h2>Featured Projects</h2>
            
            <div className="projects-grid">
              {projects.map((project, index) => (
                <div 
                  key={project.name}
                  className="project-item"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleProjectClick(project.url, e)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      e.stopPropagation()
                      handleProjectClick(project.url, e)
                    }
                  }}
                  tabIndex="0"
                  role="button"
                  aria-label={`Visit ${project.name} - ${project.description}`}
                  style={{ transitionDelay: `${0.1 + (index * 0.1)}s` }}
                >
                  <h3>{project.name}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="tech-stack">
                    {project.tech.map((tech) => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <div className="project-link">
                    <span>Visit Project</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M3.5 3.5L8.5 8.5M8.5 8.5V3.5M8.5 8.5H3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            <button 
              className="resume-button"
              onClick={(e) => {
                e.stopPropagation()
                handleResumeDownload(e)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  e.stopPropagation()
                  handleResumeDownload(e)
                }
              }}
              aria-label="Download resume as PDF"
              disabled={isAnimating}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1V11M8 11L11 8M8 11L5 8M2 13H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Download Resume
            </button>
          </div>
          <div className="shine"></div>
        </div>
      </div>

      <div className="flip-instruction" aria-hidden="true">
        Click to {isFlipped ? 'view summary' : 'explore projects'}
      </div>
    </div>
  )
}

export default PortfolioCard