import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Typewriter from './Typewriter';
import { useSound } from './SoundManager';
import { useTheme } from './ThemeProvider';

const PASSWORDS = {
  SECRET: 'panconglumer',
  HINTS: [
    'SALAAHHH, GIMANA SICH KOK GATAU?? 🤔',
    'Masih salah nih! Coba inget lagi makanan favorit kamu! 😅',
    'Hmmm... yang manis-manis gitu loh! 🍯',
    'Ayo dong, yang sering kita makan bareng! 😋',
    'Clue tambahan: Huruf pertama "P" dan berakhir dengan "r" 😉',
    'Oke, ini clue terakhir: P _ N _ O N G _ U M E R 🤭'
  ]
};

function LoginScreen({ onLoginSuccess }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isTypewriterComplete, setIsTypewriterComplete] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false);
  
  const { playSuccess, playError, playClick } = useSound();
  const theme = useTheme();

  const welcomeTexts = [
    "Halo Utiii 👋",
    "Selamat Ulang Tahun ya!! 🎉",
    "Karena kamu gabolehin aku untuk ngasih kado 😤",
    "Jadi aku bikin ini untuk kamu. 💖",
    "Sebelum masuk lebih dalam...",
    "aku kasih kamu tantangan dulu ya HAHAHA 😈"
  ];

  useEffect(() => {
    if (isTypewriterComplete) {
      const timer = setTimeout(() => {
        setShowPasswordField(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isTypewriterComplete]);

  const handleSubmit = (e) => {
    e.preventDefault();
    playClick();
    
    if (password.toLowerCase().trim() === PASSWORDS.SECRET) {
      playSuccess();
      onLoginSuccess();
    } else {
      playError();
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      const errorMessage = PASSWORDS.HINTS[Math.min(newAttempts - 1, PASSWORDS.HINTS.length - 1)];
      setError(errorMessage);
      setPassword('');
      
      // Shake animation
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  const handleInputChange = (e) => {
    setPassword(e.target.value);
    if (error) setError(''); // Clear error when user starts typing
  };

  const getHintLevel = () => {
    if (attempts === 0) return 0;
    if (attempts <= 2) return 1;
    if (attempts <= 4) return 2;
    return 3;
  };

  return (
    <div className="login-screen">
      {/* Floating background elements */}
      <div className="floating-elements">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-element"
            style={{
              position: 'absolute',
              fontSize: `${1 + Math.random() * 1.5}rem`,
              opacity: 0.1,
              color: theme.colors.accent
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
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {['🎈', '🎂', '🎁', '💖', '🌟', '✨', '🎉', '💕', '🎊', '🍰', '🎀', '💝', '🦄', '🌈', '⭐'][i]}
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
      >
        <AnimatePresence mode="wait">
          {!isTypewriterComplete ? (
            <motion.div
              key="typewriter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="welcome-section"
            >
              <Typewriter
                texts={welcomeTexts}
                typingSpeed={60}
                deletingSpeed={40}
                pauseDuration={1500}
                onComplete={() => setIsTypewriterComplete(true)}
                className="welcome-typewriter"
                style={{
                  fontSize: '1.8rem',
                  fontWeight: '600',
                  textAlign: 'center',
                  minHeight: '120px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: theme.colors.primary
                }}
              />
              
              <motion.div
                className="loading-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 20 }}
              >
                <div className="loading-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="login-form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              className="login-form-section"
            >
              <motion.h1
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="login-title"
              >
                🔐 Tantangan Dimulai! 🔐
              </motion.h1>
              
              <motion.div
                className="clue-container"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <div className="clue-content">
                  <p className="main-clue">
                    💡 <strong>Clue:</strong> Makanan kesukaan utiii huruf kecil semua tanpa spasi :P
                  </p>
                  
                  <AnimatePresence>
                    {attempts > 2 && (
                      <motion.p
                        className="extra-hint"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        🍯 Hint: Yang manis-manis dan lengket!
                      </motion.p>
                    )}
                    
                    {attempts > 4 && (
                      <motion.p
                        className="final-hint"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        🎯 Final Hint: Dimulai dengan "pan" dan diakhiri dengan "lumer"
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Hint Level Indicator */}
                <div className="hint-level">
                  <span>Hint Level: </span>
                  {[...Array(4)].map((_, i) => (
                    <span 
                      key={i} 
                      className={`hint-dot ${i <= getHintLevel() ? 'active' : ''}`}
                    >
                      ●
                    </span>
                  ))}
                </div>
              </motion.div>
              
              <AnimatePresence>
                {showPasswordField && (
                  <motion.form 
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="password-form"
                  >
                    <div className="input-container">
                      <motion.input 
                        type="password" 
                        placeholder="🔑 Masukkin jawabannya disini"
                        value={password}
                        onChange={handleInputChange}
                        whileFocus={{ 
                          scale: 1.02,
                          boxShadow: `0 0 20px ${theme.colors.primary}30`
                        }}
                        transition={{ duration: 0.2 }}
                        className="password-input"
                        autoComplete="off"
                      />
                      
                      <motion.div
                        className="input-underline"
                        animate={{
                          width: password.length > 0 ? '100%' : '0%'
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    
                    <motion.button 
                      type="submit"
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: `0 15px 35px ${theme.colors.primary}40`
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="submit-button"
                      disabled={!password.trim()}
                    >
                      <span className="button-text">
                        ✨ Buka Pesan Ajaib ✨
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
                  </motion.form>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="error-message"
                  >
                    <motion.div
                      className="error-pulse"
                      animate={{
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity
                      }}
                    />
                    
                    <p>{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Attempt Counter */}
              <AnimatePresence>
                {attempts > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="attempt-counter"
                  >
                    <span>Percobaan ke-{attempts}</span>
                    <div className="attempt-dots">
                      {[...Array(Math.min(attempts, 6))].map((_, i) => (
                        <motion.span
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="attempt-dot"
                        >
                          {attempts > 5 ? '💔' : '❌'}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Progress Bar */}
              <motion.div
                className="progress-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: isTypewriterComplete ? 1 : 0 }}
                transition={{ delay: 1 }}
              >
                <div className="progress-label">Progress menuju kejutan:</div>
                <div className="progress-bar">
                  <motion.div
                    className="progress-fill"
                    initial={{ width: '0%' }}
                    animate={{ width: showPasswordField ? '50%' : '25%' }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default LoginScreen;