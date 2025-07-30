import React, { useState } from 'react';
import { motion } from 'framer-motion'; 
import TextType from './TextType';
// Pastikan kamu juga mengimpor file CSS utama
import './App.css'; 

const RAHASIA = 'panconglumer'; 

function LoginScreen({ onLoginSuccess }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isTextAnimationComplete, setIsTextAnimationComplete] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password.toLowerCase() === RAHASIA) {
      onLoginSuccess();
    } else {
      setError('SALAAHHH, GIMANA SICH KOK GATAU??');
      setPassword('');
    }
  };

  const welcomeTexts = [
    "Halo Utiii",
    "Selamat Ulang Tahun ya!!",
    "Karena kamu gabolehin aku untuk ngasih kado",
    "Jadi aku bikin ini untuk kamu.",
    "Sebelum masuk lebih dalam",
    "aku kasih kamu tantangan dulu ya HAHAHA"
  ];

  return (
    <motion.div 
      className="login-container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* PERUBAHAN DI SINI */}
      <div className={isTextAnimationComplete ? 'hidden' : ''}>
        <TextType 
          as="h1"
          text={welcomeTexts}
          typingSpeed={80}
          deletingSpeed={70}
          pauseDuration={1500}
          textColors={['#333']}
          loop={false}
          onSequenceComplete={() => {
            // Kasih jeda sedikit sebelum form muncul
            setTimeout(() => {
              setIsTextAnimationComplete(true);
            }, 500); // Jeda 0.5 detik
          }}
        />
      </div>
      
      {/* DAN DI SINI */}
      <div className={!isTextAnimationComplete ? 'hidden' : ''}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Tantangan Dimulai!</h1>
          <p className="clue">
            Clue: Makanan kesukaan utiii huruf kecil semua tanpa spasi :P.
          </p>
          
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              placeholder="Masukkin disini"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">
              Buka Pesan
            </button>
          </form>

          {error && <p className="error-message">{error}</p>}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default LoginScreen;