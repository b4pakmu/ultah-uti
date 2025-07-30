import React from 'react';
import { motion } from 'framer-motion';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <motion.div
            className="error-content"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="error-icon">😢</div>
            <h2>Oops! Ada yang tidak beres...</h2>
            <p>Maaf, sepertinya ada masalah teknis dengan aplikasi ini.</p>
            <p>Tapi jangan khawatir, cinta kita tetap sempurna! 💕</p>
            
            <motion.button
              onClick={() => window.location.reload()}
              className="retry-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🔄 Coba Lagi
            </motion.button>

            {process.env.NODE_ENV === 'development' && (
              <details className="error-details">
                <summary>Technical Details (Dev Mode)</summary>
                <pre>{this.state.error && this.state.error.toString()}</pre>
                <pre>{this.state.errorInfo.componentStack}</pre>
              </details>
            )}
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;