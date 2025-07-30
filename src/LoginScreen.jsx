import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import TextType from './TextType';
import './App.css'; 

const RAHASIA = 'panconglumer'; 

function LoginScreen({ onLoginSuccess }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isTextAnimationComplete, setIsTextAnimationComplete] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isShaking, setIsShaking] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password.toLowerCase() === RAHASIA) {
      onLoginSuccess();
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      // Different error messages based on attempts
      const errorMessages = [
        'SALAAHHH, GIMANA SICH KOK GATAU?? 🤔',
        'Masih salah nih! Coba inget lagi makanan favorit kamu! 😅',
        'Hmmm... yang manis-manis gitu loh! 🍯',
        'Ayo dong, yang sering kita makan bareng! 😋',
        'Clue tambahan: Huruf pertama "P" 😉'
      ];
      
      setError(errorMessages[Math.min(newAttempts - 1, errorMessages.length - 1)]);
      setPassword('');
      
      // Shake animation
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  const welcomeTexts = [
    "Halo Utiii 👋",
    "Selamat Ulang Tahun ya!! 🎉",
    "Karena kamu gabolehin aku untuk ngasih kado 😤",
    "Jadi aku bikin ini untuk kamu. 💖",
    "Sebelum masuk lebih dalam...",
    "aku kasih kamu tantangan dulu ya HAHAHA 😈"
  ];

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Background floating elements */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'hidden' }}>
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              fontSize: '1.5rem',
              opacity: 0.1
            }}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: 0
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
              rotate: 360
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {['🎈', '🎂', '🎁', '💖', '🌟', '✨', '🎉', '💕', '🎊', '🍰', '🎀', '💝'][i]}
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="login-container"
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ 
          opacity: 1, 
          scale: 1, 
          y: 0,
          x: isShaking ? [-10, 10, -10, 10, 0] : 0
        }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        style={{
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Welcome animation sequence */}
        <AnimatePresence>
          {!isTextAnimationComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              <TextType 
                as="h1"
                text={welcomeTexts}
                typingSpeed={80}
                deletingSpeed={70}
                pauseDuration={1500}
                textColors={['#667eea', '#764ba2', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4']}
                loop={false}
                onSequenceComplete={() => {
                  setTimeout(() => {
                    setIsTextAnimationComplete(true);
                  }, 500);
                }}
                style={{
                  fontSize: '1.8rem',
                  fontWeight: '600',
                  textAlign: 'center',
                  minHeight: '100px'
                }}
              />
              
              {/* Loading indicator */}
              <motion.div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '2rem'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 15 }} // Delay yang lebih realistis
              >
                <div className="loading-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Login form */}
        <AnimatePresence>
          {isTextAnimationComplete && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            >
              <motion.h1
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: '2.2rem',
                  fontWeight: '700',
                  marginBottom: '1.5rem'
                }}
              >
                🔐 Tantangan Dimulai! 🔐
              </motion.h1>
              
              <motion.div
                className="clue"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                style={{
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                  padding: '1.5rem',
                  borderRadius: '15px',
                  border: '2px solid rgba(102, 126, 234, 0.2)',
                  marginBottom: '2rem',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <motion.div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)'
                  }}
                  animate={{
                    left: ['100%', '-100%']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                />
                
                <p style={{ 
                  fontSize: '1.1rem', 
                  margin: 0, 
                  position: 'relative', 
                  zIndex: 1,
                  color: '#667eea',
                  fontWeight: '500'
                }}>
                  💡 <strong>Clue:</strong> Makanan kesukaan utiii huruf kecil semua tanpa spasi :P
                </p>
                
                {attempts > 2 && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ 
                      marginTop: '10px', 
                      fontSize: '0.9rem', 
                      color: '#4ecdc4',
                      fontStyle: 'italic'
                    }}
                  >
                    🍯 Hint: Yang manis-manis dan lengket!
                  </motion.p>
                )}
              </motion.div>
              
              <motion.form 
                onSubmit={handleLogin}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <motion.div style={{ position: 'relative', marginBottom: '1rem' }}>
                  <motion.input 
                    type="password" 
                    placeholder="🔑 Masukkin jawabannya disini"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    whileFocus={{ 
                      scale: 1.02,
                      boxShadow: '0 0 20px rgba(102, 126, 234, 0.3)'
                    }}
                    transition={{ duration: 0.2 }}
                    style={{
                      fontSize: '1.1rem',
                      padding: '1.2rem',
                      textAlign: 'center',
                      background: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(10px)',
                      width: '80%',
                      border: '2px solid #e1e8ed',
                      borderRadius: '12px',
                      outline: 'none'
                    }}
                  />
                  
                  {/* Input decoration */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      width: '0%',
                      height: '3px',
                      background: 'linear-gradient(90deg, #667eea, #764ba2)',
                      transformOrigin: 'center'
                    }}
                    animate={{
                      width: password.length > 0 ? '100%' : '0%',
                      x: '-50%'
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
                
                <motion.button 
                  type="submit"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 15px 35px rgba(102, 126, 234, 0.4)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    padding: '1.2rem 2.5rem',
                    borderRadius: '50px',
                    position: 'relative',
                    overflow: 'hidden',
                    marginTop: '1rem'
                  }}
                >
                  <span style={{ position: 'relative', zIndex: 1 }}>
                    ✨ Buka Pesan Ajaib ✨
                  </span>
                  
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)'
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
              </motion.form>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="error-message"
                    style={{
                      background: 'linear-gradient(135deg, rgba(231, 76, 60, 0.1), rgba(255, 107, 107, 0.1))',
                      border: '2px solid rgba(231, 76, 60, 0.3)',
                      borderRadius: '15px',
                      padding: '1rem',
                      marginTop: '1.5rem',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <motion.div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '3px',
                        background: 'linear-gradient(90deg, #e74c3c, #ff6b6b)',
                        borderRadius: '15px 15px 0 0'
                      }}
                      animate={{
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity
                      }}
                    />
                    
                    <p style={{ margin: 0, fontSize: '1rem', fontWeight: '500' }}>
                      {error}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Attempt counter */}
              {attempts > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    marginTop: '1rem',
                    fontSize: '0.9rem',
                    color: '#666',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  <span>Percobaan ke-{attempts}</span>
                  {[...Array(Math.min(attempts, 5))].map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      ❌
                    </motion.span>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default LoginScreen;