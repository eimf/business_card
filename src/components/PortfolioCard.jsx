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
      description: 'Sleek note-taking platform with fluid animations and intuitive design',
      tech: ['Dynamic UI', 'Real-time Sync', 'Cloud Storage']
    },
    {
      name: 'Tour Selkirk Mexico',
      url: 'https://tourselkirkmexico.com/',
      description: 'Immersive travel experience with stunning visuals and smooth interactions',
      tech: ['Interactive Maps', 'Booking System', 'Media Gallery']
    },
    {
      name: 'Tableau de Katia',
      url: 'https://tableaudekatia.com/',
      description: 'Elegant art gallery with captivating transitions and visual storytelling',
      tech: ['Image Gallery', 'Portfolio Display', 'Artist Showcase']
    },
    {
      name: 'Sheets App',
      url: 'https://sheets-app.fly.dev/',
      description: 'Dynamic spreadsheet tool with seamless collaboration and live updates',
      tech: ['Live Collaboration', 'Data Visualization', 'Real-time Updates']
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
              <p className="title">Engineer</p>
              
              <div className="contact-info">
                <div className="contact-item phone">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>+1 (410) 375-5262</span>
                </div>
                
                <div className="social-links-header">
                  <a 
                    href="https://github.com/eimf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link-header"
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        e.stopPropagation()
                        window.open('https://github.com/eimf', '_blank', 'noopener,noreferrer')
                      }
                    }}
                    aria-label="Visit GitHub profile"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  
                  <a 
                    href="https://www.linkedin.com/in/ezzykeeel/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link-header"
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        e.stopPropagation()
                        window.open('https://www.linkedin.com/in/ezzykeeel/', '_blank', 'noopener,noreferrer')
                      }
                    }}
                    aria-label="Visit LinkedIn profile"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
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