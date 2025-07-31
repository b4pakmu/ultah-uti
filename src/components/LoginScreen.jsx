import React, { useState } from 'react';
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
    "Halo Utiii",
    "Selamat ulang tahun ya!!",
    "Karena kamu gabolehin aku untuk ngasih kado",
    "Jadi aku bikin ini untuk kamu💖",
    "Nah, pertama aku mau ngasih km tantangan dulu :P",
    "ENJOOOYY"
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
        {[...Array(12)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            fontSize: `${0.8 + Math.random() * 1}rem`,
            opacity: 0.15,
            color: '#fff',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 20 + 20}s linear infinite`
          }}>
            {['🎈','🎂','🎁','💖','🌟','✨','🎉','💕','🎊','🍰','🎀','💝'][i]}
          </div>
        ))}
      </div>

      {/* Panel Login */}
      <div style={{
        zIndex: 1,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: 'clamp(1.5rem, 5vw, 3rem)',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
        width: '100%',
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
              marginBottom: '2rem',
              minHeight: 'clamp(80px, 15vw, 120px)'
            }}
          />
        ) : (
          <>
            <h1 style={{
              fontSize: 'clamp(1.3rem, 5vw, 2rem)',
              color: '#ff6b6b',
              marginBottom: '1rem',
              fontWeight: 'bold',
              lineHeight: '1.2'
            }}>GASKEENNN</h1>

            <p style={{
              color: '#555',
              marginBottom: '1.5rem',
              fontSize: 'clamp(0.9rem, 3vw, 1rem)',
              lineHeight: '1.4'
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
                  padding: 'clamp(0.75rem, 3vw, 1rem)',
                  fontSize: 'clamp(0.9rem, 3vw, 1.1rem)',
                  borderRadius: '10px',
                  border: '2px solid #ccc',
                  textAlign: 'center',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#ff6b6b';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#ccc';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <button
                type="submit"
                disabled={!password.trim()}
                style={{
                  marginTop: '1.5rem',
                  padding: 'clamp(0.75rem, 3vw, 1rem) clamp(1.5rem, 4vw, 2rem)',
                  background: password.trim() ? '#764ba2' : '#ccc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50px',
                  fontSize: 'clamp(0.9rem, 3vw, 1.1rem)',
                  fontWeight: 'bold',
                  cursor: password.trim() ? 'pointer' : 'not-allowed',
                  width: '100%',
                  maxWidth: '300px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (password.trim()) {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                ✨ Buka Pesan ✨
              </button>
            </form>

            {error && (
              <div style={{
                marginTop: '1.5rem',
                padding: '1rem',
                background: 'rgba(231, 76, 60, 0.1)',
                borderRadius: '10px',
                border: '1px solid rgba(231, 76, 60, 0.2)'
              }}>
                <p style={{ 
                  color: '#ff6b6b', 
                  margin: 0,
                  fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
                  lineHeight: '1.3',
                  fontWeight: '500'
                }}>
                  💡 {error}
                </p>
              </div>
            )}

            {attempts > 0 && (
              <div style={{
                marginTop: '1rem',
                fontSize: 'clamp(0.7rem, 2vw, 0.8rem)',
                color: '#666',
                fontStyle: 'italic'
              }}>
                Percobaan ke-{attempts} dari {PASSWORDS.HINTS.length}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;