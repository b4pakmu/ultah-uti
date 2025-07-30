import React, { createContext, useContext, useCallback } from 'react';

const SoundContext = createContext();

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundManager');
  }
  return context;
};

// Web Audio API untuk generate simple tones
const createAudioContext = () => {
  return new (window.AudioContext || window.webkitAudioContext)();
};

const SoundManager = ({ children, enabled }) => {
  const playTone = useCallback((frequency, duration, type = 'sine') => {
    if (!enabled) return;
    
    try {
      const audioContext = createAudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = type;
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
      console.log('Audio not supported');
    }
  }, [enabled]);

  const playSuccess = useCallback(() => {
    if (!enabled) return;
    // Play ascending notes for success
    playTone(523.25, 0.2); // C5
    setTimeout(() => playTone(659.25, 0.2), 100); // E5
    setTimeout(() => playTone(783.99, 0.3), 200); // G5
  }, [enabled, playTone]);

  const playError = useCallback(() => {
    if (!enabled) return;
    // Play descending notes for error
    playTone(400, 0.3, 'sawtooth');
    setTimeout(() => playTone(300, 0.3, 'sawtooth'), 150);
  }, [enabled, playTone]);

  const playClick = useCallback(() => {
    if (!enabled) return;
    playTone(800, 0.1, 'square');
  }, [enabled, playTone]);

  const playGiftOpen = useCallback(() => {
    if (!enabled) return;
    // Magical sound for gift opening
    playTone(659.25, 0.2); // E5
    setTimeout(() => playTone(783.99, 0.2), 100); // G5
    setTimeout(() => playTone(987.77, 0.2), 200); // B5
    setTimeout(() => playTone(1174.66, 0.3), 300); // D6
  }, [enabled, playTone]);

  const playTypewriter = useCallback(() => {
    if (!enabled) return;
    playTone(1200 + Math.random() * 200, 0.05, 'square');
  }, [enabled, playTone]);

  const sounds = {
    playSuccess,
    playError,
    playClick,
    playGiftOpen,
    playTypewriter,
    playTone,
    enabled
  };

  return (
    <SoundContext.Provider value={sounds}>
      {children}
    </SoundContext.Provider>
  );
};

export default SoundManager;