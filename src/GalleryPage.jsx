import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useSound } from './SoundManager';
import { useTheme } from './ThemeProvider';

// Import foto langsung dari src/assets
import foto1 from '../assets/foto1.jpg';
import foto2 from '../assets/foto2.jpg';
import foto3 from '../assets/foto3.jpg';
import foto4 from '../assets/foto4.jpg';
import foto5 from '../assets/foto5.jpg';
import foto6 from '../assets/foto6.jpg';

const photos = [
  {
    src: foto1,
    caption: 'foto pertama kita berdua yang ga sengaja💕',
    date: 'Awal pertemuan kita',
    filter: 'vintage'
  },
  {
    src: foto2,
    caption: 'foto selfie pertama kita??🌊',
    date: 'Momen sweet pertama',
    filter: 'warm'
  },
  {
    src: foto3,
    caption: 'PAKYU MEEENNNN🎵',
    date: 'Saat kita konyol',
    filter: 'bright'
  },
  {
    src: foto4,
    caption: 'ini lucu jd ak masukin??',
    date: 'Random but cute',
    filter: 'soft'
  },
  {
    src: foto5,
    caption: 'INI FOTO FAVORIT AKUUUU',
    date: 'Perfect moment',
    filter: 'dreamy'
  },
  {
    src: foto6,
    caption: 'ini foto pertama km yang ada di hp akuuu',
    date: 'First saved photo',
    filter: 'classic'
  }
];

function GalleryPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showHearts, setShowHearts] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('none');
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [fullscreenMode, setFullscreenMode] = useState(false);

  const { playClick, playSuccess } = useSound();
  const theme = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      playSuccess();
    }, 1500);

    return () => clearTimeout(timer);
  }, [playSuccess]);

  useEffect(() => {
    if (!isLoading) {
      const heartsTimer = setTimeout(() => {
        setShowHearts(true);
      }, 2000);

      return () => clearTimeout(heartsTimer);
    }
  }, [isLoading]);

  const handleSlideChange = useCallback((index) => {
    setCurrentSlide(index);
    playClick();
  }, [playClick]);

  const downloadPhoto = (photoSrc, filename) => {
    try {
      const link = document.createElement('a');
      link.href = photoSrc;
      link.download = filename || `memory-${currentSlide + 1}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      playSuccess();
    } catch (error) {
      console.log('Download not supported');
    }
  };

  const downloadAllPhotos = () => {
    photos.forEach((photo, index) => {
      setTimeout(() => {
        downloadPhoto(photo.src, `memory-${index + 1}.jpg`);
      }, index * 500);
    });
  };

  const sharePhoto = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Our Beautiful Memory',
          text: photos[currentSlide].caption,
          url: window.location.href
        });
      } catch (error) {
        console.log('Sharing failed');
      }
    }
  };

  const toggleFullscreen = () => {
    setFullscreenMode(!fullscreenMode);
    playClick();
  };

  const filters = {
    none: 'none',
    vintage: 'sepia(50%) contrast(120%) brightness(110%)',
    warm: 'saturate(120%) brightness(110%) contrast(110%)',
    bright: 'brightness(120%) contrast(110%) saturate(130%)',
    soft: 'blur(0.5px) brightness(105%) saturate(90%)',
    dreamy: 'blur(0.3px) saturate(110%) brightness(115%) contrast(95%)',
    classic: 'grayscale(30%) contrast(110%) brightness(105%)'
  };

  if (isLoading) {
    return (
      <motion.div 
        className="gallery-loading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="loading-heart"
        >
          💖
        </motion.div>
        <h3>Menyiapkan kenangan indah kita...</h3>
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        {/* Loading progress */}
        <motion.div
          className="loading-progress"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </motion.div>
    );
  }

  return (
    <motion.div 
      className={`gallery-page ${fullscreenMode ? 'fullscreen' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Floating Hearts Animation */}
      <AnimatePresence>
        {showHearts && (
          <div className="floating-hearts">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="floating-heart"
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
                  duration: 4,
                  delay: Math.random() * 3,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 8
                }}
              >
                {['❤️', '💕', '💖', '💗', '💝'][Math.floor(Math.random() * 5)]}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Progress Indicator */}
      <motion.div
        className="progress-container"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="progress-label">Birthday Experience</div>
        <div className="progress-bar">
          <motion.div
            className="progress-fill"
            initial={{ width: '75%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </div>
        <div className="progress-text">Exploring our memories!</div>
      </motion.div>

      {/* Gallery Controls */}
      <motion.div
        className="gallery-controls"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <button 
          className={`control-btn ${isAutoplay ? 'active' : ''}`}
          onClick={() => {
            setIsAutoplay(!isAutoplay);
            playClick();
          }}
          title="Toggle Autoplay"
        >
          {isAutoplay ? '⏸️' : '▶️'}
        </button>
        
        <button 
          className={`control-btn ${showInfo ? 'active' : ''}`}
          onClick={() => {
            setShowInfo(!showInfo);
            playClick();
          }}
          title="Toggle Info"
        >
          ℹ️
        </button>
        
        <button 
          className="control-btn"
          onClick={toggleFullscreen}
          title="Toggle Fullscreen"
        >
          {fullscreenMode ? '🔲' : '⛶'}
        </button>
        
        <button 
          className="control-btn"
          onClick={() => {
            setShowDownloadOptions(!showDownloadOptions);
            playClick();
          }}
          title="Download Options"
        >
          📥
        </button>
        
        {navigator.share && (
          <button 
            className="control-btn"
            onClick={sharePhoto}
            title="Share Current Photo"
          >
            📤
          </button>
        )}
      </motion.div>

      {/* Download Options Panel */}
      <AnimatePresence>
        {showDownloadOptions && (
          <motion.div
            className="download-panel"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <button 
              onClick={() => downloadPhoto(photos[currentSlide].src)}
              className="download-btn"
            >
              📸 Download Current Photo
            </button>
            <button 
              onClick={downloadAllPhotos}
              className="download-btn"
            >
              📁 Download All Photos
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="gallery-title"
      >
        💕 Momen-Momen Terbaik Kita 💕
      </motion.h2>

      {/* Filter Options */}
      <motion.div
        className="filter-options"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <span className="filter-label">Photo Filter:</span>
        {Object.keys(filters).map((filter) => (
          <button
            key={filter}
            className={`filter-btn ${selectedFilter === filter ? 'active' : ''}`}
            onClick={() => {
              setSelectedFilter(filter);
              playClick();
            }}
          >
            {filter === 'none' ? '🚫' : filter}
          </button>
        ))}
      </motion.div>

      <motion.div
        className="gallery-carousel"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Carousel
          showArrows={true}
          showStatus={false}
          showThumbs={false}
          infiniteLoop={true}
          autoPlay={isAutoplay}
          interval={4000}
          onChange={handleSlideChange}
          swipeable={true}
          emulateTouch={true}
          renderIndicator={(onClickHandler, isSelected, index) => (
            <motion.span
              className={`custom-indicator ${isSelected ? 'selected' : ''}`}
              onClick={onClickHandler}
              onKeyDown={onClickHandler}
              value={index}
              key={index}
              role="button"
              tabIndex={0}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          )}
          renderArrowPrev={(onClickHandler, hasPrev) => (
            hasPrev && (
              <motion.button
                type="button"
                onClick={onClickHandler}
                className="custom-arrow prev-arrow"
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                ◀
              </motion.button>
            )
          )}
          renderArrowNext={(onClickHandler, hasNext) => (
            hasNext && (
              <motion.button
                type="button"
                onClick={onClickHandler}
                className="custom-arrow next-arrow"
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                ▶
              </motion.button>
            )
          )}
        >
          {photos.map((photo, index) => (
            <div key={index} className="carousel-slide">
              <motion.div
                className="image-container"
                whileHover={{ scale: fullscreenMode ? 1 : 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={photo.src} 
                  alt={`Kenangan ${index + 1}`}
                  style={{
                    filter: selectedFilter === 'none' ? filters.none : 
                           selectedFilter === photo.filter ? filters[photo.filter] : 
                           filters[selectedFilter] || filters.none,
                    maxHeight: fullscreenMode ? '80vh' : '400px',
                    objectFit: 'cover',
                    borderRadius: fullscreenMode ? '10px' : '15px',
                    transition: 'filter 0.3s ease, transform 0.3s ease'
                  }}
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/600x400/${theme.colors.primary.replace('#', '')}/ffffff?text=Memory+${index + 1}`;
                  }}
                  loading="lazy"
                />
                
                {/* Photo overlay effects */}
                <motion.div
                  className="photo-overlay"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <button 
                    className="overlay-btn"
                    onClick={() => downloadPhoto(photo.src, `memory-${index + 1}.jpg`)}
                    title="Download this photo"
                  >
                    📥
                  </button>
                  <button 
                    className="overlay-btn"
                    onClick={toggleFullscreen}
                    title="Toggle fullscreen"
                  >
                    ⛶
                  </button>
                </motion.div>
              </motion.div>
              
              {/* Photo Info */}
              <AnimatePresence>
                {showInfo && (
                  <motion.div
                    className="photo-info"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="photo-date">{photo.date}</div>
                    <div className="photo-caption">{photo.caption}</div>
                    <div className="photo-meta">
                      Photo {index + 1} of {photos.length} • Filter: {photo.filter}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </Carousel>

        {/* Photo Counter */}
        <motion.div
          className="photo-counter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className="counter-text">
            {currentSlide + 1} / {photos.length}
          </span>
          <div className="counter-progress">
            <motion.div
              className="counter-fill"
              animate={{
                width: `${((currentSlide + 1) / photos.length) * 100}%`
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Photo Navigation Dots */}
      <motion.div
        className="photo-nav-dots"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        {photos.map((_, index) => (
          <motion.button
            key={index}
            className={`nav-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => handleSlideChange(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              scale: index === currentSlide ? 1.2 : 1,
              opacity: index === currentSlide ? 1 : 0.5
            }}
          />
        ))}
      </motion.div>

      {/* Keyboard Navigation Hint */}
      <motion.div
        className="keyboard-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span>💡 Use ← → arrow keys to navigate</span>
      </motion.div>

      {/* Final Surprise Section */}
      <motion.div 
        className="final-surprise"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          className="surprise-background"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <div className="surprise-content">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            💝 Satu Pesan Terakhir... 💝
          </motion.h3>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.1 }}
            className="final-message"
          >
            Perjalanan digital ini mungkin berakhir di sini, tapi petualangan kita di dunia nyata 
            akan terus berlanjut. Setiap foto di atas menceritakan kisah indah kita bersama. 
            Kamu adalah cahaya dalam hidupku, dan aku bersyukur bisa berbagi setiap momen 
            berharga ini denganmu. 
          </motion.p>
          
          <motion.div
            className="love-declaration"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.4, type: "spring", stiffness: 200 }}
          >
            I Love You So Much! 💖✨
          </motion.div>

          <motion.div
            className="celebration-emojis-final"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8 }}
          >
            {['💕', '🌟', '💖', '✨', '🎈', '🎂', '🎁', '💝'].map((emoji, index) => (
              <motion.span
                key={index}
                className="final-emoji"
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 360],
                  scale: [1, 1.3, 1]
                }}
                transition={{ 
                  duration: 3,
                  delay: index * 0.2,
                  repeat: Infinity,
                  repeatDelay: 4
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </motion.div>

          {/* Memory Stats */}
          <motion.div
            className="memory-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3 }}
          >
            <div className="stat-item">
              <span className="stat-number">{photos.length}</span>
              <span className="stat-label">Beautiful Memories</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">∞</span>
              <span className="stat-label">Love for You</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">1</span>
              <span className="stat-label">Special Birthday</span>
            </div>
          </motion.div>

          {/* Thank You Message */}
          <motion.div
            className="thank-you-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5 }}
          >
            <p>Terima kasih sudah menjadi bagian terbaik dalam hidupku ❤️</p>
            <p className="signature">- From your loving partner 💕</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default GalleryPage;