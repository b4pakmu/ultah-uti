import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { useSound } from './SoundManager';
import { useTheme } from './ThemeProvider';

function WishesPage({ onNextStep }) {
  const [isGiftOpen, setIsGiftOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowDimension, setWindowDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [messageIndex, setMessageIndex] = useState(0);
  const [isSequenceFinished, setIsSequenceFinished] = useState(false);
  const [showSkipButton, setShowSkipButton] = useState(false);
  const [giftShake, setGiftShake] = useState(false);

  const { playGiftOpen, playSuccess } = useSound();
  const theme = useTheme();

  const messages = [
    {
      text: "Selamat Ulang Tahun, Sayang! 🎉",
      emoji: "🎂",
      color: "#ff6b6b"
    },
    {
      text: "Ini adalah wish-ku untukmu:",
      emoji: "💌",
      color: "#4ecdc4"
    },
    {
      text: "Semoga kamu selalu bahagia, sehat, dan semua impianmu tercapai.",
      emoji: "🌟",
      color: "#45b7d1"
    },
    {
      text: "Kamu adalah orang terbaik yang pernah aku kenal.",
      emoji: "💖",
      color: "#ff9a9e"
    },
    {
      text: "Aku sangat beruntung memilikimu. ❤️",
      emoji: "🍀",
      color: "#96ceb4"
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      setWindowDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        playSuccess();
      }, 3000);
      return () => clearTimeout(finalTimer);
    }
  }, [isGiftOpen, messageIndex, isSequenceFinished, messages.length, playSuccess]);

  useEffect(() => {
    // Show skip button after 5 seconds
    if (isGiftOpen && !isSequenceFinished) {
      const timer = setTimeout(() => {
        setShowSkipButton(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isGiftOpen, isSequenceFinished]);

  useEffect(() => {
    // Gentle gift shake animation
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
    setShowConfetti(true);
    playGiftOpen();
    
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  };

  const handleSkip = () => {
    setMessageIndex(messages.length - 1);
    setIsSequenceFinished(true);
    playSuccess();
  };

  const currentMessage = messages[messageIndex];

  return (
    <motion.div 
      className="wishes-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {showConfetti && (
        <Confetti
          width={windowDimension.width}
          height={windowDimension.height}
          recycle={false}
          numberOfPieces={300}
          colors={['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffecd2', '#667eea', '#ff9a9e']}
          gravity={0.1}
        />
      )}

      {/* Progress Indicator */}
      <motion.div
        className="progress-container"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="progress-label">Birthday Experience</div>
        <div className="progress-bar">
          <motion.div
            className="progress-fill"
            initial={{ width: '50%' }}
            animate={{ width: isSequenceFinished ? '100%' : '75%' }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </div>
        <div className="progress-text">
          {isSequenceFinished ? 'Ready for memories!' : 'Enjoying wishes...'}
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="wishes-title"
      >
        🎁 Klik Kado di Bawah Ini! 🎁
      </motion.h1>
      
      <AnimatePresence mode="wait">
        {!isGiftOpen ? (
          <motion.div
            key="gift-section"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0, rotate: 360 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.5,
              exit: { duration: 0.8 }
            }}
            className="gift-section"
          >
            <motion.button 
              className="gift-box" 
              onClick={handleGiftOpen}
              animate={{ 
                scale: giftShake ? [1, 1.05, 0.95, 1] : 1,
                rotate: giftShake ? [0, -2, 2, -1, 1, 0] : 0
              }}
              whileHover={{ 
                scale: 1.15, 
                rotate: [0, -5, 5, -5, 0],
                filter: 'brightness(1.2) drop-shadow(0 0 20px rgba(255, 107, 107, 0.5))'
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ 
                type: "spring", 
                stiffness: 300,
                damping: 10
              }}
            >
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity }
                }}
                className="gift-emoji"
              >
                🎁
              </motion.div>
              
              {/* Floating sparkles around gift */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="gift-sparkle"
                  style={{
                    position: 'absolute',
                    fontSize: '1rem',
                    color: theme.colors.accent
                  }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5],
                    rotate: 360,
                    x: [0, Math.cos(i * 60 * Math.PI / 180) * 60],
                    y: [0, Math.sin(i * 60 * Math.PI / 180) * 60]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut"
                  }}
                >
                  ✨
                </motion.div>
              ))}
            </motion.button>
            
            <motion.div
              className="gift-instructions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <p className="gift-hint">Ada sesuatu yang spesial untukmu di dalam! 💖</p>
              <motion.div
                className="tap-indicator"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity 
                }}
              >
                👆 Tap me!
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="message-section" 
            className="message-section"
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
          >
            <div className="message-box">
              <motion.div
                className="message-background"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <div className="message-content">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={messageIndex}
                    initial={{ opacity: 0, y: 30, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -30, scale: 0.8 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                    className="message-item"
                  >
                    <motion.div
                      className="message-emoji"
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                      style={{ color: currentMessage.color }}
                    >
                      {currentMessage.emoji}
                    </motion.div>
                    
                    <h2 className="message-text" style={{ color: currentMessage.color }}>
                      {currentMessage.text}
                    </h2>
                  </motion.div>
                </AnimatePresence>

                {/* Message Counter */}
                <div className="message-counter">
                  {messages.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`counter-dot ${index <= messageIndex ? 'active' : ''}`}
                      animate={{
                        scale: index === messageIndex ? 1.2 : 1,
                        opacity: index <= messageIndex ? 1 : 0.3
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  ))}
                </div>

                {/* Skip Button */}
                <AnimatePresence>
                  {showSkipButton && !isSequenceFinished && (
                    <motion.button
                      className="skip-button"
                      onClick={handleSkip}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      ⏭️ Skip to end
                    </motion.button>
                  )}
                </AnimatePresence>

                {/* Celebration Elements */}
                {messageIndex >= messages.length - 1 && (
                  <motion.div
                    className="celebration-elements"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.6 }}
                  >
                    <div className="celebration-emojis">
                      {['🎂', '🎈', '🎉', '💖', '🌟'].map((emoji, index) => (
                        <motion.span
                          key={index}
                          className="celebration-emoji"
                          animate={{ 
                            y: [0, -15, 0],
                            rotate: [0, 15, -15, 0],
                            scale: [1, 1.2, 1]
                          }}
                          transition={{ 
                            duration: 2,
                            delay: index * 0.3,
                            repeat: Infinity,
                            repeatDelay: 2
                          }}
                        >
                          {emoji}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Next Button */}
                <AnimatePresence>
                  {isSequenceFinished && (
                    <motion.button 
                      onClick={onNextStep}
                      className="next-button"
                      initial={{ opacity: 0, scale: 0, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ 
                        delay: 1,
                        type: "spring",
                        stiffness: 200,
                        damping: 10
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: `0 15px 35px ${theme.colors.primary}40`
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="button-text">
                        💕 Lanjut ke Kenangan Kita →
                      </span>
                      
                      <motion.div
                        className="button-shimmer"
                        animate={{
                          left: ['100%', '-100%']
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3
                        }}
                      />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Birthday Elements */}
      <div className="floating-birthday-elements">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-birthday-element"
            style={{
              position: 'absolute',
              fontSize: '1.5rem',
              opacity: 0.6,
              color: theme.colors.accent
            }}
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 50,
              rotate: 0
            }}
            animate={{
              y: -50,
              rotate: 360,
              x: Math.random() * window.innerWidth
            }}
            transition={{
              duration: Math.random() * 4 + 6,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: "linear"
            }}
          >
            {['🎈', '🎂', '🎁', '💖', '🌟', '✨', '🎉', '💕', '🎊', '🍰', '🎀', '💝'][i]}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default WishesPage;