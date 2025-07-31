import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error: error });
    // Kamu bisa juga kirim error ke server/logging service di sini
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          padding: '1rem'
        }}>
          <div style={{
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.95)',
            padding: 'clamp(2rem, 6vw, 3rem)',
            borderRadius: '20px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
            maxWidth: '90%'
          }}>
            <div style={{ fontSize: 'clamp(3rem, 8vw, 4rem)', marginBottom: '1rem' }}>😢</div>
            <h2 style={{ 
              fontSize: 'clamp(1.3rem, 4vw, 1.8rem)', 
              marginBottom: '1rem',
              color: '#333',
              lineHeight: '1.2'
            }}>
              Oops! Ada yang tidak beres...
            </h2>
            <p style={{ 
              marginBottom: '0.5rem',
              fontSize: 'clamp(0.9rem, 3vw, 1rem)',
              color: '#666'
            }}>
              Maaf, sepertinya ada masalah teknis dengan aplikasi ini.
            </p>
            <p style={{ 
              marginBottom: '2rem',
              fontSize: 'clamp(0.9rem, 3vw, 1rem)',
              color: '#666'
            }}>
              Tapi jangan khawatir, cinta kita tetap sempurna! 💕
            </p>

            <button
              onClick={() => window.location.reload()}
              style={{
                background: '#667eea',
                color: 'white',
                border: 'none',
                padding: 'clamp(0.75rem, 3vw, 1rem) clamp(1.5rem, 4vw, 2rem)',
                borderRadius: '12px',
                fontSize: 'clamp(0.9rem, 3vw, 1rem)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontWeight: '600'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#764ba2';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#667eea';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              🔄 Coba Lagi
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;