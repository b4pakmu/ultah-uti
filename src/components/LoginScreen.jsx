import React, { useState, useEffect } from 'react';
import Typewriter from './Typewriter';

const PASSWORDS = {
  SECRET: 'panconglumer',
  HINTS: [
    'BUKAN IKAANNNNN *ga teriak',
    'gimana sich katanya anak tigaraksa??',
    'KO MSH SALAH JUGAAA',
    'clue tambahan: Huruf pertama "P" dan berakhir dengan "r"',
    'ok, ini clue terakhir: P _ N _ O N G _ U M E R'
  ]
};

const LoginScreen = ({ onLoginSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isTypewriterComplete, setIsTypewriterComplete] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const welcomeTexts = [
    "Halo Utiii 👋",
    "Selamat ulang tahun ya!!",
    "Karena kamu gabolehin aku untuk ngasih kado",
    "Jadi aku bikin ini untuk kamu💖",
    "Nah, pertama aku mau ngasih km tantangan dulu",
    "Silahkan menikmati."
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.toLowerCase().trim() === PASSWORDS.SECRET) {
      onLoginSuccess();
    } else {
      const nextAttempt = attempts + 1;
      setAttempts(nextAttempt);
      setError(PASSWORDS.HINTS[Math.min(nextAttempt - 1, PASSWORDS.HINTS.length - 1)]);
      setPassword('');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      padding: '1rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Floating Emojis */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0
      }}>
        {[...Array(15)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            fontSize: `${1 + Math.random() * 1.5}rem`,
            opacity: 0.15,
            color: '#fff',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 20 + 20}s linear infinite`
          }}>
            {['🎈','🎂','🎁','💖','🌟','✨','🎉','💕','🎊','🍰','🎀','💝','🦄','🌈','⭐'][i]}
          </div>
        ))}
      </div>

      {/* Panel Login */}
      <div style={{
        zIndex: 1,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '2.5rem 3rem',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
        width: '90%',
        maxWidth: '500px',
        textAlign: 'center',
        transform: isShaking ? 'translateX(-10px)' : 'translateX(0)',
        transition: 'transform 0.1s ease'
      }}>
        {!isTypewriterComplete ? (
          <Typewriter
            texts={welcomeTexts}
            typingSpeed={60}
            deletingSpeed={40}
            pauseDuration={1500}
            onComplete={() => setIsTypewriterComplete(true)}
            style={{
              fontSize: '1.8rem',
              fontWeight: '700',
              textAlign: 'center',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1.5rem',
              minHeight: '100px'
            }}
          />
        ) : (
          <>
            <h1 style={{
              fontSize: '2rem',
              color: '#764ba2',
              marginBottom: '1rem',
              fontWeight: 'bold'
            }}>🔐 Tantangan Dimulai! 🔐</h1>

            <p style={{
              color: '#555',
              marginBottom: '1.5rem',
              fontSize: '1rem'
            }}>
              Cluenya makanan favorit kamuu... 🍯
            </p>

            <form onSubmit={handleSubmit}>
              <input
                type="password"
                value={password}
                placeholder="Masukkan jawabannya di sini"
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '1.1rem',
                  borderRadius: '10px',
                  border: '2px solid #ccc',
                  textAlign: 'center'
                }}
              />
              <button
                type="submit"
                disabled={!password.trim()}
                style={{
                  marginTop: '1.5rem',
                  padding: '1rem 2rem',
                  background: '#764ba2',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: password.trim() ? 'pointer' : 'not-allowed'
                }}
              >
                ✨ Buka Pesan ✨
              </button>
            </form>

            {error && (
              <p style={{ color: '#e74c3c', marginTop: '1rem' }}>{error}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;
