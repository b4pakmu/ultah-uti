import React, { useState, useEffect } from 'react';
import WishesPage from './WishesPage';
import GalleryPage from './GalleryPage';

const MainPage = () => {
  const [step, setStep] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToNextStep = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStep(prev => prev + 1);
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', position: 'relative' }}>
      {/* Transition overlay */}
      {isTransitioning && (
        <div style={{
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
        }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: '1rem',
            color: 'white',
            animation: 'rotate 1s linear infinite'
          }}>
            ✨
          </div>
          <p style={{ color: 'white', fontSize: '1.2rem' }}>
            {step === 1 ? 'Menuju galeri kenangan...' : 'Loading...'}
          </p>
        </div>
      )}

      {/* Step content */}
      {step === 1 && !isTransitioning && <WishesPage onNextStep={goToNextStep} />}
      {step === 2 && !isTransitioning && <GalleryPage />}

      {/* Navigation Dots */}
      <div style={{
        position: 'fixed',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '12px',
        zIndex: 100
      }}>
        {[1, 2].map((pageNum) => (
          <div
            key={pageNum}
            onClick={() => {
              if (pageNum !== step && !isTransitioning) {
                setIsTransitioning(true);
                setTimeout(() => {
                  setStep(pageNum);
                  setIsTransitioning(false);
                }, 500);
              }
            }}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: step === pageNum ? '#667eea' : 'rgba(255, 255, 255, 0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: step === pageNum ? '0 0 10px rgba(102, 126, 234, 0.5)' : 'none',
              transform: step === pageNum ? 'scale(1.2)' : 'scale(1)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = step === pageNum ? 'scale(1.2)' : 'scale(1)';
            }}
          />
        ))}
      </div>

      {/* Step label */}
      <div style={{
        position: 'fixed',
        bottom: '70px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: '0.9rem',
        textAlign: 'center',
        zIndex: 100
      }}>
        {step === 1 ? 'Birthday Wishes' : 'Memory Gallery'}
        <br />
        <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>
          Step {step} of 2
        </span>
      </div>
    </div>
  );
};

export default MainPage;
