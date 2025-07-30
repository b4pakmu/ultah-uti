import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from './SoundManager';

const Typewriter = ({ 
  texts = [], 
  typingSpeed = 80,
  deletingSpeed = 50,
  pauseDuration = 2000,
  onComplete,
  loop = false,
  showCursor = true,
  className = '',
  style = {}
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  const { playTypewriter } = useSound();

  const typeText = useCallback(() => {
    if (isComplete && !loop) return;

    const fullText = texts[currentTextIndex] || '';
    
    if (isWaiting) {
      setTimeout(() => {
        setIsWaiting(false);
        if (loop || currentTextIndex < texts.length - 1) {
          setIsDeleting(true);
        } else {
          setIsComplete(true);
          onComplete?.();
        }
      }, pauseDuration);
      return;
    }

    if (isDeleting) {
      if (currentText.length > 0) {
        setCurrentText(prev => prev.slice(0, -1));
        setTimeout(typeText, deletingSpeed);
      } else {
        setIsDeleting(false);
        setCurrentTextIndex(prev => {
          const nextIndex = prev + 1;
          if (nextIndex >= texts.length) {
            if (loop) {
              return 0;
            } else {
              setIsComplete(true);
              onComplete?.();
              return prev;
            }
          }
          return nextIndex;
        });
        setTimeout(typeText, typingSpeed);
      }
    } else {
      if (currentText.length < fullText.length) {
        playTypewriter();
        setCurrentText(prev => prev + fullText[prev.length]);
        setTimeout(typeText, typingSpeed + Math.random() * 50); // Add some randomness
      } else {
        setIsWaiting(true);
        setTimeout(typeText, 100);
      }
    }
  }, [
    texts, 
    currentTextIndex, 
    currentText, 
    isDeleting, 
    isWaiting, 
    isComplete,
    typingSpeed, 
    deletingSpeed, 
    pauseDuration,
    loop,
    onComplete,
    playTypewriter
  ]);

  useEffect(() => {
    if (texts.length > 0) {
      const timer = setTimeout(typeText, typingSpeed);
      return () => clearTimeout(timer);
    }
  }, [typeText, texts.length, typingSpeed]);

  return (
    <div className={`typewriter ${className}`} style={style}>
      <span className="typewriter-text">
        {currentText}
      </span>
      {showCursor && (
        <motion.span
          className="typewriter-cursor"
          animate={{ opacity: [1, 0] }}
          transition={{ 
            duration: 0.8, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
        >
          |
        </motion.span>
      )}
    </div>
  );
};

export default Typewriter;