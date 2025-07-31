import React, { useState, useEffect } from 'react';
import ResponsiveTable from './ResponsiveTable';

const WishesPage = ({ onNextStep }) => {
  const [isGiftOpen, setIsGiftOpen] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isSequenceFinished, setIsSequenceFinished] = useState(false);
  const [giftShake, setGiftShake] = useState(false);

  const messages = [
    { text: "Selamat ulang tahun ya", emoji: "🎂", color: "#ff6b6b" },
    { text: "Ini adalah wish aku buat uti", emoji: "💖", color: "#ff6b6b" },
    { text: "Semoga kamu selalu bahagia, sehat, dan semua impianmu tercapai", emoji: "💖", color: "#ff6b6b" },
    { text: "Kamu mungkin orang paling kucing yang pernah ak kenal", emoji: "💖", color: "#ff6b6b" },
    { text: "I love you more than yesterday, but less than tomorrow", emoji: "💖", color: "#ff6b6b" }
  ];

  useEffect(() => {
    if (!isGiftOpen || isSequenceFinished) return;

    if (messageIndex < messages.length - 1) {
      const timer = setTimeout(() => {
        setMessageIndex(prev => prev + 1);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      const finalTimer = setTimeout(() => {
        setIsSequenceFinished(true);
      }, 3000);
      return () => clearTimeout(finalTimer);
    }
  }, [isGiftOpen, messageIndex, isSequenceFinished]);

  useEffect(() => {
    const shakeInterval = setInterval(() => {
      if (!isGiftOpen) {
        setGiftShake(true);
        setTimeout(() => setGiftShake(false), 500);
      }
    }, 4000);
    return () => clearInterval(shakeInterval);
  }, [isGiftOpen]);

  const handleGiftOpen = () => {
    setIsGiftOpen(true);
  };

  const currentMessage = messages[messageIndex];

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      padding: 'clamp(1rem, 4vw, 2rem)'
    }}>
      {/* Progress Header */}
      <div style={{
        position: 'fixed',
        top: 'clamp(60px, 10vw, 80px)',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        textAlign: 'center',
        width: '90%',
        maxWidth: '300px'
      }}>
        <div style={{
          fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
          fontWeight: '500',
          background: 'linear-gradient(90deg, #ff9a9e, #fad0c4, #fbc2eb)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Birthday Experience
        </div>
        <div style={{
          width: '100%',
          maxWidth: '200px',
          height: '4px',
          background: 'rgba(255, 255, 255, 0.3)',
          borderRadius: '2px',
          overflow: 'hidden',
          margin: '5px auto',
        }}>
          <div style={{
            height: '100%',
            background: 'linear-gradient(90deg, #ff6b6b, #fcb045, #ffd452)',
            borderRadius: '2px',
            width: isSequenceFinished ? '100%' : `${(messageIndex + 1) / messages.length * 100}%`,
            transition: 'width 0.8s ease'
          }} />
        </div>
        <div style={{
          fontSize: 'clamp(0.7rem, 2vw, 0.8rem)',
          fontStyle: 'italic',
          background: 'linear-gradient(90deg, #4facfe, #00f2fe)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          {isSequenceFinished ? 'Ready for memories!' : 'Enjoying wishes...'}
        </div>
      </div>

      {/* Heading */}
      <h1 style={{
        fontSize: 'clamp(1.5rem, 6vw, 2.5rem)',
        marginBottom: '2rem',
        textAlign: 'center',
        background: 'linear-gradient(90deg, rgba(255,0,150,0.8), rgba(255,255,0,0.8), rgba(0,255,255,0.8), rgba(0,128,255,0.8))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        fontWeight: 'bold',
        textShadow: '0 0 10px rgba(255, 255, 255, 0.2)',
        lineHeight: '1.2'
      }}>
         Klik Kadonya deh coba
      </h1>

      {/* Gift Box */}
      {!isGiftOpen ? (
        <div style={{ margin: '2rem 0', textAlign: 'center' }}>
          <button
            onClick={handleGiftOpen}
            style={{
              background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
              borderRadius: '20px',
              padding: 'clamp(15px, 4vw, 20px)',
              border: '3px solid #fff',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
              fontSize: 'clamp(3rem, 12vw, 5rem)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              transform: giftShake ? 'scale(1.05) rotate(-2deg)' : 'scale(1)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              if (!giftShake) {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.15)';
              }
            }}
          >
            <div style={{
              animation: 'rotate 8s linear infinite, bounce 2s infinite'
            }}>
              🎁
            </div>
          </button>
          <p style={{
            marginTop: '1rem',
            color: 'white',
            fontSize: 'clamp(0.9rem, 3vw, 1.1rem)',
            fontWeight: '500',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
          }}>
            SLEBEW ✨
          </p>
        </div>
      ) : (
        <>
          <div style={{ textAlign: 'center', marginTop: '2rem', maxWidth: '90%' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              padding: 'clamp(1rem, 4vw, 1.5rem)',
              borderRadius: '15px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
              marginBottom: '2rem'
            }}>
              <p style={{
                fontSize: 'clamp(1rem, 4vw, 1.5rem)',
                fontWeight: '600',
                color: currentMessage.color,
                transition: 'color 0.5s ease',
                lineHeight: '1.4',
                margin: 0
              }}>
                {currentMessage.emoji} {currentMessage.text}
              </p>
            </div>
          </div>
        </>
      )}

      {/* Lanjut Button */}
      {isSequenceFinished && (
        <button onClick={onNextStep} style={{
          marginTop: '2rem',
          padding: 'clamp(0.75rem, 3vw, 1rem) clamp(1.5rem, 4vw, 2rem)',
          fontSize: 'clamp(1rem, 3vw, 1.2rem)',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          color: 'white',
          border: 'none',
          borderRadius: '30px',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
          fontWeight: '600'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        }}
        >
          ➡️ Lanjut ke Galeri
        </button>
      )}
    </div>
  );
};

export default WishesPage;