import { useState, useEffect } from "react";
import "./BusinessCard.scss";

const BusinessCard = () => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleFlip = () => {
        if (isAnimating) return;

        setIsAnimating(true);
        setIsFlipped(!isFlipped);

        if (!isFlipped) {
            // Start expansion when flipping to back
            setTimeout(() => {
                setIsExpanded(true);
                setIsAnimating(false);
            }, 600);
        } else {
            // Reset when flipping to front
            setIsExpanded(false);
            setTimeout(() => setIsAnimating(false), 600);
        }
    };

    const handleTransitionEnd = () => {
        setIsAnimating(false);
    };

    const handleResumeDownload = (e) => {
        e.stopPropagation(); // Prevent card flip
        const link = document.createElement("a");
        link.href = "/Ezequiel-Lopez-CV.pdf";
        link.download = "Ezequiel-Lopez-CV.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleLinkClick = (e) => {
        e.stopPropagation(); // Prevent card flip
    };

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => {
            window.removeEventListener("resize", checkMobile);
        };
    }, []);

    const transformStyle = isMobile
        ? `perspective(1000px) ${isFlipped ? "rotateY(180deg)" : ""}`
        : `perspective(1000px) ${isFlipped ? "rotateY(180deg)" : ""}`;

    const socialLinks = [
        { name: "GitHub", url: "https://github.com/eimf", icon: "🐙" },
        {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/ezzykeeel/",
            icon: "💼",
        },
        { name: "Boot.dev", url: "https://www.boot.dev/u/zeke223", icon: "👨‍💻" },
        {
            name: "LeetCode",
            url: "https://leetcode.com/u/ezequiel223/",
            icon: "🧮",
        },
    ];

    const projects = [
        {
            name: "Jot.rocks",
            url: "https://jot.rocks/",
            description: "Note-taking app",
        },
        {
            name: "Tours Selkirk Mexico",
            url: "https://tourselkirkmexico.com",
            description: "Tour booking platform",
        },
        {
            name: "Tableau de Katia",
            url: "https://tableaudekatia.com/",
            description: "Art portfolio",
        },
        {
            name: "Sheets App",
            url: "https://sheets-app.fly.dev/",
            description: "Spreadsheet application",
        },
    ];

    return (
        <div className="business-card-container">
            <div
                className={`business-card ${isFlipped ? "flipped" : ""} ${
                    isAnimating ? "animating" : ""
                } ${isExpanded ? "expanded" : ""}`}
                onClick={handleFlip}
                onTransitionEnd={handleTransitionEnd}
                style={{ transform: transformStyle }}
            >
                <div className="card-face card-front">
                    <div className="content">
                        <h1>Ezequiel Lopez</h1>
                        <h2 className="engineer-title">Engineer</h2>
                        <p>+1 (410) 375-5262</p>
                    </div>
                    <div className="shine"></div>
                </div>

                <div className="card-face card-back">
                    <div className="back-content">
                        {/* Social Links Section */}
                        <div className="section social-section">
                            <h3>Connect</h3>
                            <div className="social-links">
                                {socialLinks.map((link, index) => (
                                    <a
                                        key={link.name}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-link"
                                        onClick={handleLinkClick}
                                    >
                                        <span className="icon">
                                            {link.icon}
                                        </span>
                                        <span className="name">
                                            {link.name}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Resume Download Section */}
                        <div className="section resume-section">
                            <button
                                className="resume-btn"
                                onClick={handleResumeDownload}
                            >
                                📄 Download Resume
                            </button>
                        </div>

                        {/* Projects Section */}
                        <div className="section projects-section">
                            <h3>Recent Projects</h3>
                            <div className="projects-grid">
                                {projects.map((project, index) => (
                                    <a
                                        key={project.name}
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="project-link"
                                        onClick={handleLinkClick}
                                    >
                                        <span className="project-name">
                                            {project.name}
                                        </span>
                                        <span className="project-desc">
                                            {project.description}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="shine"></div>
                </div>
            </div>
        </div>
    );
};

export default BusinessCard;
