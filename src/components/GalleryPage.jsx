import React, { useState, useEffect } from 'react';

const GalleryPage = () => {
  const photos = [
    { src: '/assets/foto1.jpg', caption: 'foto pertama kita berdua yang ga sengaja💕', date: 'Awal pertemuan kita'},
    { src: '/assets/foto2.jpg', caption: 'foto selfie pertama kita??🌊', date: 'Momen sweet pertama'},
    { src: '/assets/foto3.jpg', caption: 'PAKYU MEEENNNN🎵', date: 'Saat kita konyol'},
    { src: '/assets/foto4.jpg', caption: 'ini lucu jd ak masukin??', date: 'Random but cute'},
    { src: '/assets/foto5.jpg', caption: 'INI FOTO FAVORIT AKUUUU', date: 'Perfect moment'},
    { src: '/assets/foto6.jpg', caption: 'ini foto pertama km yang ada di hp akuuu', date: 'First saved photo'}
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [showInfo, setShowInfo] = useState(true);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const toggleAutoPlay = () => {
    setAutoPlay(!autoPlay);
  };

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(nextImage, 4000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  const navButtonStyle = {
    background: '#ffffff',
    color: '#764ba2',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '12px',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem', color: 'white' }}>
      <h1
        style={{
          fontSize: '2.5rem',
          color: 'white',
          marginBottom: '2rem',
          fontWeight: 'bold',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
        }}
      >
        💕 Momen-Momen Terbaik Kita 💕
      </h1>

      <div
        style={{
          margin: '0 auto',
          maxWidth: '500px',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
        }}
      >
        <img
          src={photos[currentIndex].src}
          alt="moment"
          style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
        />
      </div>

      {showInfo && (
        <div
          style={{
            marginTop: '1rem',
            background: 'rgba(0, 0, 0, 0.7)',
            padding: '1rem',
            borderRadius: '10px',
            maxWidth: '80%',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
        >
          <div style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
            {photos[currentIndex].date}
          </div>
          <div style={{ fontSize: '0.95rem' }}>
            {photos[currentIndex].caption}
          </div>
          <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>
            Filter: {photos[currentIndex].filter} • {currentIndex + 1} / {photos.length}
          </div>
        </div>
      )}

      <div
        style={{
          marginTop: '2rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
          background: 'rgba(0, 0, 0, 0.2)',
          padding: '0.75rem 1.5rem',
          borderRadius: '20px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
        }}
      >
        <button style={navButtonStyle} onClick={prevImage}>Sebelumnya</button>
        <button style={navButtonStyle} onClick={nextImage}>Selanjutnya</button>
        <button style={navButtonStyle} onClick={toggleAutoPlay}>Auto</button>
      </div>
    </div>
  );
};

export default GalleryPage;
