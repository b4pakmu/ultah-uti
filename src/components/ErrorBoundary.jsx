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
          padding: '2rem'
        }}>
          <div style={{
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '3rem',
            borderRadius: '20px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
            maxWidth: '500px'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>😢</div>
            <h2>Oops! Ada yang tidak beres...</h2>
            <p>Maaf, sepertinya ada masalah teknis dengan aplikasi ini.</p>
            <p>Tapi jangan khawatir, cinta kita tetap sempurna! 💕</p>

            <button
              onClick={() => window.location.reload()}
              style={{
                background: '#667eea',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '12px',
                fontSize: '1rem',
                cursor: 'pointer',
                marginTop: '2rem',
                transition: 'all 0.3s ease'
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
