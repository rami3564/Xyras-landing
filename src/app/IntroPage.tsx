'use client'

import { useState, useEffect } from 'react';
import styles from './IntroPage.module.css';

interface IntroPageProps {
  onComplete: () => void;
}

const IntroPage = ({ onComplete }: IntroPageProps) => {
  const [fadeIn, setFadeIn] = useState(false);
  const [showRocket, setShowRocket] = useState(false);
  const [canLaunch, setCanLaunch] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const [morphProgress, setMorphProgress] = useState(0);

  useEffect(() => {
    // Initial fade in
    setFadeIn(true);
    
    // Show rocket after text appears
    const rocketTimer = setTimeout(() => {
      setShowRocket(true);
      // Enable launching after rocket appears
      setTimeout(() => {
        setCanLaunch(true);
      }, 1000);
    }, 2000);

    // Auto-launch timeout if user doesn't interact
    const autoLaunchTimer = setTimeout(() => {
      if (!isLaunching) {
        startMorphTransition();
      }
    }, 8000); // 8 seconds timeout

    return () => {
      clearTimeout(rocketTimer);
      clearTimeout(autoLaunchTimer);
    };
  }, [isLaunching]);

  const startMorphTransition = () => {
    if (isLaunching) return;
    
    setIsLaunching(true);
    
    // Faster, smoother transition over 2 seconds
    let progress = 0;
    const duration = 2000;
    const interval = 16; // ~60fps
    const increment = interval / duration;

    const morphAnimation = setInterval(() => {
      progress += increment;
      // Smooth easing function (ease-in-out)
      const easedProgress = progress < 0.5 
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      
      if (progress >= 1) {
        progress = 1;
        clearInterval(morphAnimation);
        // Complete transition immediately - no delay
        setTimeout(() => {
          onComplete();
        }, 100);
      }
      
      setMorphProgress(easedProgress);
    }, interval);
  };

  useEffect(() => {
    if (!canLaunch || isLaunching) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        startMorphTransition();
      }
    };

    const handleClick = () => {
      startMorphTransition();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleClick);
    };
  }, [canLaunch, isLaunching]);

  // Calculate dynamic styles based on morph progress
  const introOpacity = Math.max(0, 1 - morphProgress * 1.5);
  const landingOpacity = Math.min(1, morphProgress * 1.2);
  
  // Enhanced background transition that matches your main page
  const getBackgroundStyle = () => {
    if (morphProgress === 0) {
      // Initial intro background - dark space
      return {
        background: 'linear-gradient(180deg, #0b0926 0%, #1a1525 30%, #251936 70%, #392780 100%)'
      };
    } else if (morphProgress < 1) {
      // Transitioning to main page background
      const t = morphProgress;
      return {
        background: `linear-gradient(180deg, 
          rgb(${Math.floor(11 + t * 46)}, ${Math.floor(9 + t * 30)}, ${Math.floor(38 + t * 90)}) 0%, 
          rgb(${Math.floor(26 + t * 48)}, ${Math.floor(21 + t * 36)}, ${Math.floor(54 + t * 99)}) 20%, 
          rgb(${Math.floor(11 + t * 0)}, ${Math.floor(9 + t * 0)}, ${Math.floor(38 + t * -12)}) 60%, 
          rgb(${Math.floor(7 + t * 0)}, ${Math.floor(6 + t * 0)}, ${Math.floor(24 + t * -6)}) 100%)`
      };
    } else {
      // Final background matching main page exactly
      return {
        background: 'linear-gradient(180deg, #392780 0%, #4a3899 20%, #0b0926 60%, #070618 100%)'
      };
    }
  };

  // Rocket movement: flies up and slightly forward during launch
  const rocketTransform = isLaunching 
    ? `translateY(${-morphProgress * 200}px) translateX(${morphProgress * 50}px) scale(${1 - morphProgress * 0.4}) rotate(${morphProgress * 15}deg)`
    : 'translateY(0px) scale(1)';

  return (
    <div 
      className={`${styles.introContainer} ${fadeIn ? styles.fadeIn : ''}`}
      style={getBackgroundStyle()}
    >
      {/* Enhanced Star Field */}
      <div className={styles.starField}>
        {/* Intro Stars - fade out */}
        <div className={styles.introStars} style={{ opacity: introOpacity }}>
          <div className={styles.starsLayer1}></div>
          <div className={styles.starsLayer2}></div>
          <div className={styles.twinklingLayer}></div>
        </div>
        
        {/* Landing Stars - fade in to match main page */}
        <div className={styles.landingStars} style={{ opacity: landingOpacity }}>
          <div className={styles.mainStarsSmall}></div>
          <div className={styles.mainStarsMedium}></div>
          <div className={styles.mainDeepStars}></div>
          <div className={styles.mainTwinklingStars}></div>
        </div>
        
        {/* Shooting stars throughout */}
        <div className={styles.shootingStars}>
          {[...Array(6)].map((_, i) => (
            <div 
              key={i}
              className={styles.shootingStar} 
              style={{ 
                '--delay': `${i * 2}s`,
                '--rotation': `${15 + i * 10 - (i % 2) * 30}deg`,
                '--duration': `${6 + i}s`
              } as React.CSSProperties}
            />
          ))}
        </div>
      </div>

      {/* Intro Content */}
      <div className={styles.introContent} style={{ opacity: introOpacity }}>
        <div className={`${styles.introText} ${fadeIn ? styles.textVisible : ''}`}>
          XYRAS
        </div>

        {showRocket && (
          <div 
            className={styles.introRocket}
            style={{ transform: rocketTransform }}
          >
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C12 2 7 4 7 12C7 15.1 7.5 17.7 8 19.5C8.2 20.3 9 20.8 9.8 20.6L12 20L14.2 20.6C15 20.8 15.8 20.3 16 19.5C16.5 17.7 17 15.1 17 12C17 4 12 2 12 2Z" fill="#04F5F3" stroke="#04F5F3" strokeWidth="1.5"/>
              <path d="M12 2V8" stroke="#392780" strokeWidth="1.5"/>
              <path d="M7.7 14.7C6.8 14.2 6 14 6 14C6 14 4 15.1 4 18C4 20.9 7 22 7 22C7 22 7 21.1 7 20C7 18.5 7.2 16.4 7.7 14.7Z" fill="#04F5F3"/>
              <path d="M16.3 14.7C17.2 14.2 18 14 18 14C18 14 20 15.1 20 18C20 20.9 17 22 17 22C17 22 17 21.1 17 20C17 18.5 16.8 16.4 16.3 14.7Z" fill="#04F5F3"/>
            </svg>
            
            {/* Enhanced rocket flames during liftoff */}
            {isLaunching && (
              <div className={`${styles.rocketFlames} ${styles.active}`}>
                <div className={`${styles.flame} ${styles.flame1}`}></div>
                <div className={`${styles.flame} ${styles.flame2}`}></div>
                <div className={`${styles.flame} ${styles.flame3}`}></div>
              </div>
            )}
          </div>
        )}

        {/* Improved scroll hint positioning */}
        {canLaunch && !isLaunching && (
          <div className={styles.scrollHint}>
            <p>Press SPACE to launch</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntroPage;