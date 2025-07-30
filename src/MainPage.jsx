import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WishesPage from './WishesPage';
import GalleryPage from './GalleryPage';
import { useSound } from './SoundManager';

function MainPage() {
  const [step, setStep] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showSkipOption, setShowSkipOption] = useState(false);
  
  const { playClick, playSuccess } = useSound();

  useEffect(() => {
    // Show skip option after user spends some time
    const timer = setTimeout(() => {
      setShowSkipOption(true);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, [step]);

  const goToNextStep = () => {
    setIsTransitioning(true);
    playSuccess();
    
    setTimeout(() => {
      setStep(prev => prev + 1);
      setIsTransitioning(false);
      setShowSkipOption(false); // Reset skip option for new step
    }, 500);
  };

  const handleSkipToGallery = () => {
    playClick();
    setIsTransitioning(true);
    
    setTimeout(() => {
      setStep(2);
      setIsTransitioning(false);
    }, 500);
  };

  const pageVariants = {
    initial: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    in: { 
      opacity: 1, 
      y: 0,
      scale: 1
    },
    out: { 
      opacity: 0, 
      y: -50,
      scale: 1.05
    }
  };

  const pageTransition = {
    type: "spring",
    stiffness: 300,
    damping: 30,
    duration: 0.5
  };

  return (
    <div className="main-container">
      {/* Skip Navigation */}
      <AnimatePresence>
        {showSkipOption && step === 1 && (
          <motion.div
            className="skip-navigation"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            style={{
              position: 'fixed',
              top: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1000,
              background: 'rgba(255, 255, 255, 0.9)',
              padding: '0.8rem 1.5rem',
              borderRadius: '25px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <button
              onClick={handleSkipToGallery}
              style={{
                background: 'none',
                border: 'none',
                color: '#667eea',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}
            >
              ⏭️ Skip to Gallery
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="transition-overlay"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              style={{
                fontSize: '3rem',
                marginBottom: '1rem',
                color: 'white'
              }}
            >
              ✨
            </motion.div>
            <p style={{ color: 'white', fontSize: '1.2rem' }}>
              {step === 1 ? 'Menuju galeri kenangan...' : 'Loading...'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content */}
      <AnimatePresence mode="wait">
        {step === 1 && !isTransitioning && (
          <motion.div
            key="wishes"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            style={{ width: '100%' }}
          >
            <WishesPage onNextStep={goToNextStep} />
          </motion.div>
        )}
        
        {step === 2 && !isTransitioning && (
          <motion.div
            key="gallery"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            style={{ width: '100%' }}
          >
            <GalleryPage />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Dots */}
      <motion.div
        className="navigation-dots"
        style={{
          position: 'fixed',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '12px',
          zIndex: 100
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        {[1, 2].map((pageNum) => (
          <motion.div
            key={pageNum}
            className={`nav-dot ${step === pageNum ? 'active' : ''}`}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: step === pageNum ? '#667eea' : 'rgba(255, 255, 255, 0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: step === pageNum ? '0 0 10px rgba(102, 126, 234, 0.5)' : 'none'
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              if (pageNum !== step && !isTransitioning) {
                playClick();
                setIsTransitioning(true);
                setTimeout(() => {
                  setStep(pageNum);
                  setIsTransitioning(false);
                }, 500);
              }
            }}
          />
        ))}
      </motion.div>

      {/* Step Indicator */}
      <motion.div
        className="step-indicator"
        style={{
          position: 'fixed',
          bottom: '70px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: '0.9rem',
          textAlign: 'center',
          zIndex: 100
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        {step === 1 ? 'Birthday Wishes' : 'Memory Gallery'}
        <br />
        <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>
          Step {step} of 2
        </span>
      </motion.div>
    </div>
  );
}

export default MainPage;