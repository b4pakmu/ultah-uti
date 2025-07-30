import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginScreen from './components/LoginScreen';
import MainPage from './components/MainPage';
import ErrorBoundary from './components/ErrorBoundary';
import ThemeProvider from './components/ThemeProvider';
import SoundManager from './components/SoundManager';
import './styles/App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState('light');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Initialize app
  useEffect(() => {
    // Simulate app initialization
    const initTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Load theme preference
    const savedTheme = localStorage.getItem('birthday-theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }

    // Load sound preference
    const savedSound = localStorage.getItem('birthday-sound');
    if (savedSound !== null) {
      setSoundEnabled(JSON.parse(savedSound));
    }

    return () => clearTimeout(initTimer);
  }, []);

  // Save preferences
  useEffect(() => {
    localStorage.setItem('birthday-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('birthday-sound', JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <motion.div
          className="loading-content"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="loading-icon"
          >
            🎁
          </motion.div>
          <h2>Menyiapkan Kejutan...</h2>
          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <SoundManager enabled={soundEnabled}>
          <div className={`app ${theme}`}>
            {/* Settings Panel */}
            <motion.div 
              className="settings-panel"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
            >
              <button 
                onClick={toggleTheme}
                className="setting-btn"
                title="Toggle Theme"
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
              <button 
                onClick={toggleSound}
                className="setting-btn"
                title="Toggle Sound"
              >
                {soundEnabled ? '🔊' : '🔇'}
              </button>
            </motion.div>

            <AnimatePresence mode="wait">
              {!isAuthenticated ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <LoginScreen onLoginSuccess={handleLogin} />
                </motion.div>
              ) : (
                <motion.div
                  key="main"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <MainPage />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </SoundManager>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;