import { useState, useEffect } from 'react'
import './BusinessCard.scss'

const BusinessCard = () => {
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

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const calculateRotation = () => {
    return { x: 0, y: 0 }
  }

  const rotation = calculateRotation()
  const transformStyle = isMobile
    ? `perspective(1000px) ${isFlipped ? 'rotateY(180deg)' : ''}`
    : `perspective(1000px) ${isFlipped ? 'rotateY(180deg)' : ''}`

  return (
    <div className="business-card-container">
      <div 
        className={`business-card ${isFlipped ? 'flipped' : ''} ${isAnimating ? 'animating' : ''}`}
        onClick={handleFlip}
        onTransitionEnd={handleTransitionEnd}
        style={{ transform: transformStyle }}
      >
        <div className="card-face card-front">
          <div className="content">
            <h1>Ezequiel Lopez</h1>
            <p>+1 (410) 375-5262</p>
          </div>
          <div className="shine"></div>
        </div>
        <div className="card-face card-back">
          <nav className="links">
            <a 
              href="https://www.linkedin.com/in/ezzykeeel/" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => isAnimating && e.preventDefault()}
            >
              LinkedIn
            </a>
            <a 
              href="https://github.com/eimf" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => isAnimating && e.preventDefault()}
            >
              GitHub
            </a>
            <a 
              href="mailto:lzdzel@gmail.com"
              onClick={(e) => isAnimating && e.preventDefault()}
            >
              Email
            </a>
          </nav>
          <div className="shine"></div>
        </div>
      </div>
    </div>
  )
}

export default BusinessCard