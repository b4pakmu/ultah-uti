import React, { createContext, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const ThemeProvider = ({ children, theme }) => {
  const themeConfig = {
    light: {
      name: 'light',
      colors: {
        primary: '#667eea',
        secondary: '#764ba2',
        accent: '#ff6b6b',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        surface: 'rgba(255, 255, 255, 0.95)',
        text: '#333',
        textSecondary: '#666'
      }
    },
    dark: {
      name: 'dark',
      colors: {
        primary: '#8b9aff',
        secondary: '#9575cd',
        accent: '#ff8a80',
        background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
        surface: 'rgba(45, 55, 72, 0.95)',
        text: '#f7fafc',
        textSecondary: '#e2e8f0'
      }
    }
  };

  const currentTheme = themeConfig[theme] || themeConfig.light;

  return (
    <ThemeContext.Provider value={currentTheme}>
      <div 
        className={`theme-${theme}`}
        style={{
          '--color-primary': currentTheme.colors.primary,
          '--color-secondary': currentTheme.colors.secondary,
          '--color-accent': currentTheme.colors.accent,
          '--color-background': currentTheme.colors.background,
          '--color-surface': currentTheme.colors.surface,
          '--color-text': currentTheme.colors.text,
          '--color-text-secondary': currentTheme.colors.textSecondary,
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;