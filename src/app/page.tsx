import astronautLogo from './assets/AstronautLogo.svg';
import rocketIcon from './assets/rocket.png';
import xyrasLogo from './assets/logo.png';'use client'

import { useState, useEffect } from "react";
import Link from 'next/link';
import IntroPage from './IntroPage';

// Get Early Access button component (inside the astronaut helmet)
const HelmetButton = () => {
  return (
    <div className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
      <Link href="/signup">
        <button className="helmet-cta-btn">
          Get Early Access
        </button>
      </Link>
    </div>
  );
};

// Rocket icon for the XYRAS logo with landing animation
const RocketIcon = ({ shouldAnimate = false }: { shouldAnimate?: boolean }) => (
  <img 
    src="/assets/rocket.png"
    alt="Rocket"
    width="32" 
    height="32" 
    className={`inline-block ${shouldAnimate ? 'rocket-landing' : ''}`}
  />
);

// Enhanced Astronaut component using imported SVG
const AstronautLogo = () => (
  <img 
    src="/assets/AstronautLogo.svg"
    alt="Astronaut Helmet"
    className="astronaut-image"
    width="600"
    height="600"
  />
);

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true);
  const [rocketLanded, setRocketLanded] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleIntroComplete = () => {
    setIsTransitioning(true);
    
    // Immediate transition without delay
    setTimeout(() => {
      setShowIntro(false);
      setPageLoaded(true);
      
      // Small delay for rocket landing animation
      setTimeout(() => {
        setRocketLanded(true);
        setIsTransitioning(false);
      }, 400);
    }, 50);
  };

  // Show intro page first
  if (showIntro) {
    return <IntroPage onComplete={handleIntroComplete} />;
  }

  return (
    <div className={`font-sans main-page ${pageLoaded ? 'page-loaded' : ''} ${isTransitioning ? 'transitioning' : ''}`}>
      {/* Hero section with space background */}
      <section className="hero-section">
        {/* Enhanced space background for smooth transition */}
        <div className="section-gradient-bg-enhanced">
          <div className="stars-small"></div>
          <div className="stars-medium"></div>
          <div className="deep-stars"></div>
          <div className="twinkling-stars"></div>
          
          {/* Shooting stars */}
          <div className="shooting-stars">
            <div className="shooting-star" style={{"--rotation": "15deg"} as React.CSSProperties}></div>
            <div className="shooting-star" style={{"--rotation": "-20deg"} as React.CSSProperties}></div>
            <div className="shooting-star" style={{"--rotation": "30deg"} as React.CSSProperties}></div>
            <div className="shooting-star" style={{"--rotation": "-35deg"} as React.CSSProperties}></div>
            <div className="shooting-star" style={{"--rotation": "45deg"} as React.CSSProperties}></div>
          </div>
        </div>
        
        {/* Navigation bar */}
        <nav className="hero-nav">
          <div className="nav-container">
            <div className="logo-container">
              <img src="/assets/logo.png" alt="XYRAS" className="logo-image" width="80" height="32" />
              <RocketIcon shouldAnimate={rocketLanded} />
            </div>
            <div className="nav-links">
              <a href="#mission" className="nav-link">Mission</a>
              <Link href="/signup">
                <button className="btn btn-cyan">Join BETA</button>
              </Link>
            </div>
          </div>
        </nav>

        {/* Main hero content */}
        <div className="hero-content">
          {/* Left side - text content */}
          <div className="hero-text">
            <h1 className="hero-title">
              Ditch the résumé.
            </h1>
            <p className="hero-subtitle">
              Build professional credibility that <br />
              <strong>breathes with <span className="hero-emphasis">YOU.</span></strong>
            </p>
            <Link href="/signup">
              <button className="hero-cta-btn">
                Get Early Access
              </button>
            </Link>
          </div>

          {/* Right side - Large astronaut helmet */}
          <div className="astronaut-container">
            <AstronautLogo />
            <div className="astronaut-button-overlay">
              <HelmetButton />
            </div>
          </div>
        </div>
      </section>
      
      {/* Mission section */}
      <section id="mission" className="mission-section">
        <div className="section-gradient-bg-3">
          <div className="stars-small"></div>
          <div className="stars-medium"></div>
        </div>
        
        <div className="mission-container">
          <div className="mission-content">
            <h2 className="mission-title">
              We believe your career should be measured by your contributions — not by your connections.
            </h2>
            
            <div className="mission-grid">
              <div className="mission-card">
                <h3 className="mission-card-title">Our Vision</h3>
                <p className="mission-card-text">
                  XYRAS is redefining how professional credibility is earned, tracked, and shared in the digital age.
                </p>
              </div>
              
              <div className="mission-card">
                <h3 className="mission-card-title">Our Focus</h3>
                <p className="mission-card-text">
                  We focus on what you've built, how you've grown, and the value you bring — not just where you've worked.
                </p>
              </div>
            </div>
            
            <div className="mission-cta">
              <Link href="/signup">
                <button className="mission-cta-btn">
                  Start Your Journey
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
