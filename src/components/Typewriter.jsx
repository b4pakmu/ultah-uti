import React, { useState, useEffect } from 'react';

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

  useEffect(() => {
    let timer;

    const handleTyping = () => {
      const fullText = texts[currentTextIndex] || '';

      if (isDeleting) {
        if (currentText.length > 0) {
          setCurrentText(prev => prev.slice(0, -1));
          timer = setTimeout(handleTyping, deletingSpeed);
        } else {
          setIsDeleting(false);
          setCurrentTextIndex(prev => (prev + 1) % texts.length);
        }
      } else {
        if (currentText.length < fullText.length) {
          setCurrentText(prev => prev + fullText[prev.length]);
          timer = setTimeout(handleTyping, typingSpeed + Math.random() * 50);
        } else {
          timer = setTimeout(() => {
            if (currentTextIndex === texts.length - 1 && !loop) {
              onComplete?.();
            } else {
              setIsDeleting(true);
            }
          }, pauseDuration);
        }
      }
    };

    if (texts.length > 0) {
      timer = setTimeout(handleTyping, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [
    currentText,
    currentTextIndex,
    isDeleting,
    texts,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    loop,
    onComplete
  ]);

  return (
    <div className={`typewriter ${className}`} style={style}>
      <span
        className="typewriter-text"
        style={{
          fontSize: '2.2rem',
          fontWeight: '700',
          color: '#7b3fa1',
          fontFamily: `'Segoe UI', Roboto, sans-serif`,
          letterSpacing: '1px',
          textAlign: 'center'
        }}
      >
        {currentText}
      </span>
      {showCursor && (
        <span
          className="typewriter-cursor"
          style={{
            animation: 'blink 0.8s infinite alternate',
            fontWeight: 100,
            fontSize: '1.5rem',
            color: '#7b3fa1'
          }}
        >
          |
        </span>
      )}
    </div>
  );
};

export default Typewriter;
