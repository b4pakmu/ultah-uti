import React, { useState, useEffect } from 'react';
import ResponsiveTable from './ResponsiveTable';

const WishesPage = ({ onNextStep }) => {
  const [isGiftOpen, setIsGiftOpen] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isSequenceFinished, setIsSequenceFinished] = useState(false);
  const [giftShake, setGiftShake] = useState(false);

  const messages = [
    { text: "Selamat Ulang Tahun, Sayang! 🎉", emoji: "🎂", color: "#ff6b6b" },
    { text: "Ini adalah wish-ku untukmu:", emoji: "💌", color: "#4ecdc4" },
    { text: "Semoga kamu selalu bahagia, sehat, dan semua impianmu tercapai.", emoji: "🌟", color: "#45b7d1" },
    { text: "Kamu adalah orang terbaik yang pernah aku kenal.", emoji: "💖", color: "#ff9a9e" },
    { text: "Aku sangat beruntung memilikimu. ❤️", emoji: "🍀", color: "#96ceb4" }
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
      padding: '2rem'
    }}>
      {/* Progress Header */}
      <div style={{
        position: 'fixed',
        top: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '0.9rem',
          fontWeight: '500',
          background: 'linear-gradient(90deg, #ff9a9e, #fad0c4, #fbc2eb)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Birthday Experience
        </div>
        <div style={{
          width: '200px',
          height: '4px',
          background: 'rgba(255, 255, 255, 0.3)',
          borderRadius: '2px',
          overflow: 'hidden',
          marginBottom: '5px',
          marginTop: '5px'
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
          fontSize: '0.8rem',
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
        fontSize: '2.5rem',
        marginBottom: '2rem',
        textAlign: 'center',
        background: 'linear-gradient(90deg, rgba(255,0,150,0.8), rgba(255,255,0,0.8), rgba(0,255,255,0.8), rgba(0,128,255,0.8))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        fontWeight: 'bold',
        textShadow: '0 0 10px rgba(255, 255, 255, 0.2)'
      }}>
        🎁 Klik Kado di Bawah Ini! 🎁
      </h1>

      {/* Gift Box */}
      {!isGiftOpen ? (
        <div style={{ margin: '3rem 0', textAlign: 'center' }}>
          <button
            onClick={handleGiftOpen}
            style={{
              background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
              borderRadius: '20px',
              padding: '20px',
              border: '3px solid #fff',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
              fontSize: '5rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              transform: giftShake ? 'scale(1.05) rotate(-2deg)' : 'scale(1)',
              animation: giftShake ? 'shake 0.5s' : 'none'
            }}
          >
            <div style={{
              animation: 'rotate 8s linear infinite, bounce 2s infinite'
            }}>
              🎁
            </div>
          </button>
        </div>
      ) : (
        <>
          <div style={{ textAlign: 'center', marginTop: '2rem', maxWidth: '600px' }}>
            <p style={{
              fontSize: '1.5rem',
              fontWeight: '500',
              color: currentMessage.color,
              transition: 'color 0.5s ease'
            }}>
              {currentMessage.emoji} {currentMessage.text}
            </p>
          </div>

          {/* 🎉 Responsive Table */}
          <div style={{ marginTop: '3rem', width: '100%', maxWidth: '800px' }}>
            <ResponsiveTable
              headers={['Pesan', 'Emoji', 'Warna']}
              data={messages.map(m => [m.text, m.emoji, m.color])}
            />
          </div>
        </>
      )}

      {/* Lanjut */}
      {isSequenceFinished && (
        <button onClick={onNextStep} style={{
          marginTop: '2rem',
          padding: '1rem 2rem',
          fontSize: '1.2rem',
          background: '#667eea',
          color: 'white',
          border: 'none',
          borderRadius: '30px',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease'
        }}>
          ➡️ Lanjut ke Galeri
        </button>
      )}
    </div>
  );
};

export default WishesPage;
