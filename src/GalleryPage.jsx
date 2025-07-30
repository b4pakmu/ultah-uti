import React, { useState, useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { motion, AnimatePresence } from 'framer-motion';

// Import foto langsung dari src/assets
import foto1 from './assets/foto1.jpg';
import foto2 from './assets/foto2.jpg';
import foto3 from './assets/foto3.jpg';
import foto4 from './assets/foto4.jpg';
import foto5 from './assets/foto5.jpg';
import foto6 from './assets/foto6.jpg';

// Array foto dengan import
const photos = [
  {
    src: foto1,
    caption: 'foto pertama kita berdua yang ga sengaja💕'
  },
  {
    src: foto2,
    caption: 'foto selfie pertama kita??🌊'
  },
  {
    src: foto3,
    caption: 'PAKYU MEEENNNN🎵'
  },
  {
    src: foto4,
    caption: 'ini lucu jd ak masukin??'  
  },
  {
    src: foto5,
    caption: 'INI FOTO FAVORIT AKUUUU'
  },
  {
    src: foto6,
    caption: 'ini foto pertama km yang ada di hp akuuu'
  }
];

function GalleryPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showHearts, setShowHearts] = useState(false);

  useEffect(() => {
    // Simulasi loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Show hearts animation setelah beberapa detik
    const heartsTimer = setTimeout(() => {
      setShowHearts(true);
    }, 3000);

    return () => clearTimeout(heartsTimer);
  }, []);

  const customRenderIndicator = (onClickHandler, isSelected, index) => {
    const defStyle = {
      marginLeft: 20,
      color: "white",
      cursor: "pointer",
      background: isSelected ? '#667eea' : 'rgba(255, 255, 255, 0.3)',
      border: 'none',
      borderRadius: '50%',
      width: '15px',
      height: '15px',
      display: 'inline-block',
      margin: '0 8px',
      transition: 'all 0.3s ease'
    };

    return (
      <span
        style={defStyle}
        onClick={onClickHandler}
        onKeyDown={onClickHandler}
        value={index}
        key={index}
        role="button"
        tabIndex={0}
      />
    );
  };

  if (isLoading) {
    return (
      <motion.div 
        className="gallery-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          minHeight: '300px'
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{ fontSize: '3rem', marginBottom: '1rem' }}
        >
          💖
        </motion.div>
        <h3>Menyiapkan kenangan indah kita...</h3>
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="gallery-page"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Floating Hearts Animation */}
      <AnimatePresence>
        {showHearts && (
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'hidden' }}>
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  opacity: 0, 
                  y: 100, 
                  x: Math.random() * window.innerWidth,
                  scale: 0
                }}
                animate={{ 
                  opacity: [0, 1, 0], 
                  y: -100, 
                  scale: [0, 1, 0.5]
                }}
                transition={{ 
                  duration: 3,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 5
                }}
                style={{
                  position: 'absolute',
                  fontSize: '1.5rem',
                  color: '#ff6b6b',
                  zIndex: 10
                }}
              >
                ❤️
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        💕 Momen-Momen Terbaik Kita 💕
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        style={{ position: 'relative' }}
      >
        <Carousel
          showArrows={true}
          showStatus={false}
          showThumbs={false}
          infiniteLoop={true}
          autoPlay={false}
          interval={4000}
          onChange={(index) => setCurrentSlide(index)}
          renderIndicator={customRenderIndicator}
          swipeable={true}
          emulateTouch={true}
          renderArrowPrev={(onClickHandler, hasPrev) => (
            hasPrev && (
              <button
                type="button"
                onClick={onClickHandler}
                style={{
                  position: 'absolute',
                  zIndex: 2,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  left: '15px',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: 'none',
                  background: 'rgba(255, 255, 255, 0.8)',
                  cursor: 'pointer',
                  fontSize: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.95)';
                  e.target.style.transform = 'translateY(-50%) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.8)';
                  e.target.style.transform = 'translateY(-50%) scale(1)';
                }}
              >
                ◀
              </button>
            )
          )}
          renderArrowNext={(onClickHandler, hasNext) => (
            hasNext && (
              <button
                type="button"
                onClick={onClickHandler}
                style={{
                  position: 'absolute',
                  zIndex: 2,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  right: '15px',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: 'none',
                  background: 'rgba(255, 255, 255, 0.8)',
                  cursor: 'pointer',
                  fontSize: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.95)';
                  e.target.style.transform = 'translateY(-50%) scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.8)';
                  e.target.style.transform = 'translateY(-50%) scale(1)';
                }}
              >
                ▶
              </button>
            )
          )}
        >
          {photos.map((photo, index) => (
            <div key={index} style={{ position: 'relative' }}>
              <img 
                src={photo.src} 
                alt={`Kenangan ${index + 1}`}
                style={{
                  maxHeight: '400px',
                  objectFit: 'cover',
                  borderRadius: '15px'
                }}
                onError={(e) => {
                  // Fallback jika foto tidak ditemukan
                  e.target.src = `https://via.placeholder.com/600x400/667eea/ffffff?text=Foto+${index + 1}`;
                }}
              />
              
              {/* Photo Info Overlay */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  right: '20px',
                  background: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  padding: '15px',
                  borderRadius: '10px',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '5px' }}>
                  {photo.date}
                </div>
                <div style={{ fontSize: '1rem', lineHeight: '1.4' }}>
                  {photo.caption}
                </div>
              </motion.div>
            </div>
          ))}
        </Carousel>

        {/* Photo Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '20px',
            fontSize: '0.9rem',
            zIndex: 10
          }}
        >
          {currentSlide + 1} / {photos.length}
        </motion.div>
      </motion.div>

      {/* Final Surprise */}
      <motion.div 
        className="final-surprise"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          💝 Satu Pesan Terakhir... 💝
        </motion.h3>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          Perjalanan digital ini mungkin berakhir di sini, tapi petualangan kita di dunia nyata akan terus berlanjut. 
          Setiap foto di atas menceritakan kisah indah kita bersama. Kamu adalah cahaya dalam hidupku, dan aku bersyukur 
          bisa berbagi setiap momen berharga ini denganmu. 
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.1, type: "spring", stiffness: 200 }}
          style={{
            fontSize: '2rem',
            margin: '20px 0',
            background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}
        >
          I Love You So Much! 💖✨
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            fontSize: '1.5rem',
            margin: '20px 0'
          }}
        >
          {['💕', '🌟', '💖', '✨', '🎈'].map((emoji, index) => (
            <motion.span
              key={index}
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 2,
                delay: index * 0.2,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default GalleryPage;