import React, { useState, useEffect } from 'react';
import LoginScreen from './components/LoginScreen';
import MainPage from './components/MainPage';
import ErrorBoundary from './components/ErrorBoundary';
import './styles/animations.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(initTimer);
  }, []);

  const handleLogin = () => setIsAuthenticated(true);

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100%',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '1rem'
      }}>
        <div style={{
          textAlign: 'center',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          padding: 'clamp(2rem, 6vw, 3rem)',
          borderRadius: '20px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
          maxWidth: '90%'
        }}>
          <div style={{
            fontSize: 'clamp(3rem, 10vw, 4rem)',
            marginBottom: '1rem',
            animation: 'rotate 2s linear infinite'
          }}>
            🎁
          </div>
          <h2 style={{ 
            color: '#667eea', 
            marginBottom: '2rem', 
            fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
            lineHeight: '1.3'
          }}>
            Menyiapkan Kejutan...
          </h2>
          <div style={{ display: 'inline-flex', gap: '4px' }}>
            {[0, 0.2, 0.4].map((delay, i) => (
              <span key={i} style={{
                width: 'clamp(6px, 2vw, 8px)',
                height: 'clamp(6px, 2vw, 8px)',
                borderRadius: '50%',
                background: '#667eea',
                animation: `loadingDots 1.4s infinite ease-in-out both ${delay}s`
              }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh',
        position: 'relative',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
        color: '#333'
      }}>
        {/* Background Particles */} 
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 2px, transparent 2px),
            radial-gradient(circle at 40% 20%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            radial-gradient(circle at 90% 40%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            radial-gradient(circle at 60% 80%, rgba(255, 255, 255, 0.1) 2px, transparent 2px)
          `,
          backgroundSize: '100px 100px, 80px 80px, 120px 120px, 90px 90px',
          animation: 'floatingParticles 20s linear infinite',
          pointerEvents: 'none',
          zIndex: -1
        }} />

        {/* Main Content */}
        {!isAuthenticated ? (
          <LoginScreen onLoginSuccess={handleLogin} />
        ) : (
          <MainPage />
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;