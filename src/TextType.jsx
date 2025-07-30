import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { motion, AnimatePresence } from 'framer-motion';

function WishesPage({ onNextStep }) {
  const [isGiftOpen, setIsGiftOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowDimension, setWindowDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    "Selamat Ulang Tahun, Sayang! 🎉",
    "Ini adalah wish-ku untukmu:",
    "Semoga kamu selalu bahagia, sehat, dan semua impianmu tercapai.",
    "Kamu adalah orang terbaik yang pernah aku kenal.",
    "Aku sangat beruntung memilikimu. ❤️"
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
    if (isGiftOpen && messageIndex < messages.length - 1) {
      const timer = setTimeout(() => {
        setMessageIndex(messageIndex + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isGiftOpen, messageIndex, messages.length]);

  const handleGiftOpen = () => {
    setIsGiftOpen(true);
    setShowConfetti(true);
    
    // Stop confetti after 5 seconds
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  };

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
          numberOfPieces={200}
          colors={['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffecd2', '#667eea']}
        />
      )}

      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: '2.5rem',
          marginBottom: '2rem'
        }}
      >
        🎁 Klik Kado di Bawah Ini! 🎁
      </motion.h1>
      
      <AnimatePresence>
        {!isGiftOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0, rotate: 360 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.5,
              exit: { duration: 0.8 }
            }}
            style={{ margin: '3rem 0' }}
          >
            <motion.button 
              className="gift-box" 
              onClick={handleGiftOpen}
              whileHover={{ 
                scale: 1.2, 
                rotate: [0, -10, 10, -10, 0],
                filter: 'brightness(1.2)'
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ 
                type: "spring", 
                stiffness: 300,
                damping: 10
              }}
              style={{
                background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
                borderRadius: '20px',
                padding: '20px',
                border: '3px solid #fff',
                boxShadow: '0 10px 30px rgba(255, 154, 158, 0.4)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity }
                }}
              >
                🎁
              </motion.div>
              
              {/* Sparkle effect */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  fontSize: '1rem'
                }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  delay: 0.5
                }}
              >
                ✨
              </motion.div>
              
              <motion.div
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '10px',
                  fontSize: '1rem'
                }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  delay: 1
                }}
              >
                💫
              </motion.div>
            </motion.button>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              style={{
                marginTop: '1rem',
                color: '#667eea',
                fontStyle: 'italic',
                fontSize: '1.1rem'
              }}
            >
              Ada sesuatu yang spesial untukmu di dalam! 💖
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isGiftOpen && (
          <motion.div 
            className="message-box"
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            style={{
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Animated background */}
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(45deg, #ff9a9e, #fecfef, #fecfef, #ff9a9e)',
                backgroundSize: '400% 400%'
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <AnimatePresence mode="wait">
                <motion.h2
                  key={messageIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    color: '#fff',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                    marginBottom: '1.5rem',
                    fontSize: '1.8rem'
                  }}
                >
                  {messages[messageIndex]}
                </motion.h2>
              </AnimatePresence>

              {messageIndex >= messages.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                >
                  <motion.div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: '15px',
                      margin: '2rem 0',
                      fontSize: '2rem'
                    }}
                  >
                    {['🎂', '🎈', '🎉', '💖', '🌟'].map((emoji, index) => (
                      <motion.span
                        key={index}
                        animate={{ 
                          y: [0, -15, 0],
                          rotate: [0, 15, -15, 0]
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
                  </motion.div>
                  
                  <motion.button 
                    onClick={onNextStep}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: 2,
                      type: "spring",
                      stiffness: 200,
                      damping: 10
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 15px 35px rgba(102, 126, 234, 0.4)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    style={{ 
                      marginTop: '2rem',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '1rem 2rem',
                      borderRadius: '50px',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <span style={{ position: 'relative', zIndex: 1 }}>
                      💕 Lanjut ke Kenangan Kita →
                    </span>
                    
                    <motion.div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)'
                      }}
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
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating elements */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'hidden' }}>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              fontSize: '1.2rem',
              opacity: 0.6
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
              duration: Math.random() * 3 + 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          >
            {['🎈', '🎂', '🎁', '💖', '🌟', '✨', '🎉', '💕'][i]}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default WishesPage;