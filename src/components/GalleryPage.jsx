import React, { useState, useEffect } from 'react';

const GalleryPage = () => {
  const photos = [
    { src: '/assets/foto1.jpg', caption: 'foto pertama kita berdua yang ga sengaja', date: '💕'},
    { src: '/assets/foto2.jpg', caption: 'foto selfie pertama kita??', date: '💕'},
    { src: '/assets/foto3.jpg', caption: 'PAKYU MEEENNNN', date: '💕'},
    { src: '/assets/foto4.jpg', caption: 'ini lucu jd ak masukin??', date: '💕'},
    { src: '/assets/foto5.jpg', caption: 'INI FOTO FAVORIT AKUUUU', date: '💕'},
    { src: '/assets/foto6.jpg', caption: 'ini foto pertama km yang ada di hp akuuu', date: '💕'}
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [containerStyle, setContainerStyle] = useState({});

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
    setIsImageLoading(true);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
    setIsImageLoading(true);
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
    setIsImageLoading(true);
  };

  const toggleAutoPlay = () => {
    setAutoPlay(!autoPlay);
  };

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  // Calculate optimal container size based on image dimensions and viewport
  const calculateContainerSize = (imgWidth, imgHeight) => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Maximum container dimensions (90% of viewport with some padding for UI)
    const maxWidth = Math.min(viewportWidth * 0.9, 800);
    const maxHeight = Math.min(viewportHeight * 0.6, 600);
    
    // Calculate aspect ratio
    const aspectRatio = imgWidth / imgHeight;
    
    let containerWidth, containerHeight;
    
    // Determine optimal size while maintaining aspect ratio
    if (aspectRatio > 1) {
      // Landscape image
      containerWidth = Math.min(maxWidth, imgWidth);
      containerHeight = containerWidth / aspectRatio;
      
      if (containerHeight > maxHeight) {
        containerHeight = maxHeight;
        containerWidth = containerHeight * aspectRatio;
      }
    } else {
      // Portrait image
      containerHeight = Math.min(maxHeight, imgHeight);
      containerWidth = containerHeight * aspectRatio;
      
      if (containerWidth > maxWidth) {
        containerWidth = maxWidth;
        containerHeight = containerWidth / aspectRatio;
      }
    }
    
    return {
      width: `${containerWidth}px`,
      height: `${containerHeight}px`,
      aspectRatio: aspectRatio
    };
  };

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(nextImage, 4000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  // Update container style when image changes
  useEffect(() => {
    setIsImageLoading(true);
    setContainerStyle({
      width: '90%',
      maxWidth: '800px',
      minHeight: '300px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    });
  }, [currentIndex]);

  const navButtonStyle = {
    background: '#ffffff',
    color: '#ff6b6b',
    border: 'none',
    padding: 'clamp(0.4rem, 2vw, 0.5rem) clamp(0.8rem, 3vw, 1rem)',
    borderRadius: '12px',
    fontSize: 'clamp(0.8rem, 2.5vw, 0.95rem)',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease'
  };

  const handleImageLoad = (e) => {
    const img = e.target;
    const { naturalWidth, naturalHeight } = img;
    
    setImageDimensions({ width: naturalWidth, height: naturalHeight });
    
    // Calculate optimal container size
    const optimalSize = calculateContainerSize(naturalWidth, naturalHeight);
    setContainerStyle(optimalSize);
    
    setIsImageLoading(false);
  };

  const handleImageError = (e) => {
    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI0NSUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPjxmb250IHNpemU9IjQwIj7wn5OoPC9mb250Pjx0ZXh0IHk9IjU1JSIgZm9udC1zaXplPSIxNiIgZHk9Ii4zZW0iPkZvdG8gS2VuYW5nYW48L3RleHQ+PC90ZXh0Pjwvc3ZnPg==';
    
    // Set default dimensions for error placeholder
    setImageDimensions({ width: 400, height: 600 });
    const optimalSize = calculateContainerSize(400, 600);
    setContainerStyle(optimalSize);
    
    setIsImageLoading(false);
  };

  return (
    <div style={{ textAlign: 'center', padding: 'clamp(1rem, 4vw, 2rem)', color: 'white' }}>
      <h1 style={{
        fontSize: 'clamp(1.5rem, 6vw, 2.5rem)',
        color: '#ff6b6b',
        marginBottom: '2rem',
        fontWeight: 'bold',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
        lineHeight: '1.2'
      }}>
        Momen-momen km yang ada di aku 💕
      </h1>

      {/* Main Image Container */}
      <div style={{
        margin: '0 auto 2rem auto',
        ...containerStyle,
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        position: 'relative',
        background: 'rgba(255, 255, 255, 0.1)',
        transition: 'all 0.5s ease'
      }}>
        {isImageLoading && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
            background: 'rgba(0, 0, 0, 0.7)',
            padding: '1rem',
            borderRadius: '10px',
            color: 'white'
          }}>
            <div style={{
              fontSize: '2rem',
              animation: 'rotate 1s linear infinite',
              marginBottom: '0.5rem',
              textAlign: 'center'
            }}>⏳</div>
            <div style={{
              fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
              textAlign: 'center'
            }}>
              Loading image...
            </div>
          </div>
        )}
        <img
          src={photos[currentIndex].src}
          alt={`Memory ${currentIndex + 1}`}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'contain', // Changed from 'cover' to 'contain'
            display: isImageLoading ? 'none' : 'block',
            transition: 'opacity 0.3s ease',
            backgroundColor: 'rgba(0, 0, 0, 0.1)'
          }}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        
      </div>

      {/* Thumbnail Navigation */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 'clamp(0.3rem, 1vw, 0.5rem)',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        padding: '0 1rem'
      }}>
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => goToImage(index)}
            style={{
              width: 'clamp(8px, 2vw, 12px)',
              height: 'clamp(8px, 2vw, 12px)',
              borderRadius: '50%',
              border: 'none',
              background: currentIndex === index ? '#fff' : 'rgba(255, 255, 255, 0.4)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              transform: currentIndex === index ? 'scale(1.2)' : 'scale(1)',
              boxShadow: currentIndex === index ? '0 0 10px rgba(255, 255, 255, 0.5)' : 'none'
            }}
          />
        ))}
      </div>

      {/* Image Info */}
      {showInfo && (
        <div style={{
          margin: '0 auto 2rem auto',
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(10px)',
          padding: 'clamp(0.75rem, 3vw, 1rem)',
          borderRadius: '15px',
          maxWidth: '90%',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
        }}>
          <div style={{ 
            fontSize: 'clamp(0.9rem, 3vw, 1rem)', 
            fontWeight: '600', 
            marginBottom: '0.5rem',
            color: '#ff6b6b'
          }}>
            📅 {photos[currentIndex].date}
          </div>
          <div style={{ 
            fontSize: 'clamp(0.8rem, 2.5vw, 0.95rem)', 
            lineHeight: '1.4',
            color: '#fff',
            marginBottom: '0.5rem'
          }}>
            💬 {photos[currentIndex].caption}
          </div>
          <div style={{ 
            fontSize: 'clamp(0.7rem, 2vw, 0.8rem)', 
            opacity: 0.7,
            color: '#ccc',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}>
            <span>📸 {currentIndex + 1} dari {photos.length} foto</span>
          </div>
        </div>
      )}

      {/* Control Buttons */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 'clamp(0.5rem, 2vw, 1rem)',
        flexWrap: 'wrap',
        background: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        padding: 'clamp(0.75rem, 3vw, 1rem) clamp(1rem, 4vw, 1.5rem)',
        borderRadius: '20px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        maxWidth: '90%',
        margin: '0 auto'
      }}>
        <button 
          style={navButtonStyle} 
          onClick={prevImage}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.1)';
          }}
        >
          ⬅️ Prev
        </button>
        
        <button 
          style={navButtonStyle} 
          onClick={nextImage}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.1)';
          }}
        >
          Next ➡️
        </button>
        
        <button 
          style={{
            ...navButtonStyle,
            background: autoPlay ? '#667eea' : '#ffffff',
            color: autoPlay ? 'white' : '#ff6b6b'
          }} 
          onClick={toggleAutoPlay}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.1)';
          }}
        >
          {autoPlay ? '⏸️ Stop' : '▶️ Auto'}
        </button>
        
        <button 
          style={navButtonStyle} 
          onClick={toggleInfo}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.1)';
          }}
        >
          {showInfo ? '🙈 Hide' : '👁️ Show'}
        </button>
      </div>

      {/* Gallery Stats */}
      <div style={{
        marginTop: '2rem',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        padding: 'clamp(0.75rem, 3vw, 1rem)',
        borderRadius: '15px',
        maxWidth: '500px',
        margin: '2rem auto 0 auto'
      }}>
        <div style={{
          fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
          color: 'rgba(255, 255, 255, 0.9)',
          textAlign: 'center',
          marginBottom: '0.5rem'
        }}>
          💝 {photos.length} foto yang ada kamunya?
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;