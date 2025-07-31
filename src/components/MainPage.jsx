import React, { useState } from 'react';
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

  const goToStep = (targetStep) => {
    if (targetStep !== step && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setStep(targetStep);
        setIsTransitioning(false);
      }, 500);
    }
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
            fontSize: 'clamp(2rem, 8vw, 3rem)',
            marginBottom: '1rem',
            color: 'white',
            animation: 'rotate 1s linear infinite'
          }}>
            ✨
          </div>
          <p style={{ 
            color: 'white', 
            fontSize: 'clamp(1rem, 3vw, 1.2rem)',
            textAlign: 'center',
            padding: '0 1rem',
            fontWeight: '500'
          }}>
            {step === 1 ? 'Menuju galeri kenangan...' : 'Kembali ke wishes...'}
          </p>
          <div style={{
            marginTop: '1rem',
            display: 'flex',
            gap: '4px'
          }}>
            {[0, 0.2, 0.4].map((delay, i) => (
              <span key={i} style={{
                width: 'clamp(6px, 2vw, 8px)',
                height: 'clamp(6px, 2vw, 8px)',
                borderRadius: '50%',
                background: 'white',
                animation: `loadingDots 1.4s infinite ease-in-out both ${delay}s`
              }} />
            ))}
          </div>
        </div>
      )}

      {/* Step content */}
      {step === 1 && !isTransitioning && <WishesPage onNextStep={goToNextStep} />}
      {step === 2 && !isTransitioning && <GalleryPage />}

      {/* Navigation Dots */}
      <div style={{
        position: 'fixed',
        bottom: 'clamp(25px, 5vw, 30px)',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 'clamp(8px, 2vw, 12px)',
        zIndex: 100,
        background: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        padding: 'clamp(0.5rem, 2vw, 0.75rem) clamp(0.75rem, 3vw, 1rem)',
        borderRadius: '20px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
      }}>
        {[1, 2].map((pageNum) => (
          <div
            key={pageNum}
            onClick={() => goToStep(pageNum)}
            style={{
              width: 'clamp(10px, 3vw, 12px)',
              height: 'clamp(10px, 3vw, 12px)',
              borderRadius: '50%',
              background: step === pageNum ? '#667eea' : 'rgba(255, 255, 255, 0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: step === pageNum ? '0 0 10px rgba(102, 126, 234, 0.5)' : 'none',
              transform: step === pageNum ? 'scale(1.2)' : 'scale(1)',
              border: step === pageNum ? '2px solid white' : '2px solid transparent'
            }}
            onMouseEnter={(e) => {
              if (step !== pageNum) {
                e.target.style.transform = 'scale(1.1)';
                e.target.style.background = 'rgba(255, 255, 255, 0.7)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = step === pageNum ? 'scale(1.2)' : 'scale(1)';
              e.target.style.background = step === pageNum ? '#667eea' : 'rgba(255, 255, 255, 0.5)';
            }}
          />
        ))}
      </div>

      {/* Step label */}
      <div style={{
        position: 'fixed',
        bottom: 'clamp(55px, 10vw, 70px)',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
        textAlign: 'center',
        zIndex: 100,
        padding: '0 1rem',
        background: 'rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(5px)',
        borderRadius: '10px',
        padding: 'clamp(0.3rem, 1vw, 0.5rem) clamp(0.75rem, 3vw, 1rem)',
        fontWeight: '500'
      }}>
        <div style={{ marginBottom: '0.2rem' }}>
          {step === 1 ? '🎂 Birthday Wishes' : '📸 Memory Gallery'}
        </div>
        <div style={{ 
          fontSize: 'clamp(0.7rem, 2vw, 0.8rem)', 
          opacity: 0.7,
          fontWeight: '400'
        }}>
          Step {step} of 2
        </div>
      </div>

      {/* Back to Top Button (only on gallery page) */}
      {step === 2 && !isTransitioning && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            position: 'fixed',
            bottom: 'clamp(100px, 15vw, 120px)',
            right: 'clamp(20px, 5vw, 30px)',
            background: 'rgba(255, 255, 255, 0.9)',
            color: '#764ba2',
            border: 'none',
            borderRadius: '50%',
            width: 'clamp(40px, 8vw, 50px)',
            height: 'clamp(40px, 8vw, 50px)',
            fontSize: 'clamp(1rem, 3vw, 1.2rem)',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease',
            zIndex: 99,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
          }}
        >
          ⬆️
        </button>
      )}
    </div>
  );
};

export default MainPage;