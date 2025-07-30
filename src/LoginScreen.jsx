import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion'; 
import TextType from './TextType';
import './App.css'; 

const RAHASIA = 'panconglumer'; 

function LoginScreen({ onLoginSuccess }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isTextAnimationComplete, setIsTextAnimationComplete] = useState(false);
  const [attempts, setAttempts] = useState(0);
  
  const containerControls = useAnimationControls();

  useEffect(() => {
    // Memulai animasi masuk saat komponen pertama kali muncul
    containerControls.start("visible");
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password.toLowerCase() === RAHASIA) {
      onLoginSuccess();
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      const errorMessages = [
        'SALAAHHH, GIMANA SICH KOK GATAU?? 🤔',
        'Masih salah nih! Coba inget lagi makanan favorit kamu! 😅',
        'Hmmm... yang manis-manis gitu loh! 🍯',
        'Ayo dong, yang sering kita makan bareng! 😋',
        'Clue tambahan: Huruf pertama "P" 😉'
      ];
      
      setError(errorMessages[Math.min(newAttempts - 1, errorMessages.length - 1)]);
      setPassword('');
      
      // Memicu animasi shake
      containerControls.start("shaking");
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

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      x: 0,
      transition: { duration: 0.8, type: "spring", stiffness: 100 }
    },
    shaking: {
      x: [-8, 8, -6, 6, -4, 4, 0],
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="login-background">
      <motion.div 
        className="login-container"
        variants={containerVariants}
        initial="hidden"
        animate={containerControls}
      >
        <AnimatePresence>
          {!isTextAnimationComplete && (
            <motion.div
              key="welcome-text"
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              <TextType 
                as="h1"
                text={welcomeTexts}
                typingSpeed={80}
                deletingSpeed={70}
                pauseDuration={1500}
                textColors={['#333']}
                loop={false}
                onSequenceComplete={() => {
                  setTimeout(() => {
                    setIsTextAnimationComplete(true);
                  }, 500);
                }}
                className="welcome-text"
              />
              {/* Bagian loading dots sudah dihapus dari sini */}
            </motion.div>
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {isTextAnimationComplete && (
            <motion.div
              key="login-form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            >
              <h1 className="challenge-title">🔐 Tantangan Dimulai! 🔐</h1>
              
              <div className="clue-box">
                <p>💡 <strong>Clue:</strong> Makanan kesukaan utiii huruf kecil semua tanpa spasi :P</p>
                {attempts > 2 && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="hint-text"
                  >
                    🍯 Hint: Yang manis-manis dan lengket!
                  </motion.p>
                )}
              </div>
              
              <form onSubmit={handleLogin}>
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
                />
                <motion.button 
                  type="submit"
                  className="submit-button"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 15px 35px rgba(102, 126, 234, 0.4)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  ✨ Buka Pesan Ajaib ✨
                </motion.button>
              </form>

              <AnimatePresence>
                {error && (
                  <motion.div
                    key={error}
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="error-message"
                  >
                    <p>{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {attempts > 0 && (
                <motion.div
                  className="attempt-counter"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
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