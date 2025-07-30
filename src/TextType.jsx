"use client";

import { useEffect, useRef, useState, createElement } from "react";
import { gsap } from "gsap";
import "./TextType.css";

// Kode ini sudah dimodifikasi agar logikanya lebih robust
const TextType = ({
  text,
  as: Component = "div",
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = "",
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = "|",
  cursorClassName = "",
  cursorBlinkDuration = 0.5,
  textColors = [],
  onSentenceComplete,
  onSequenceComplete,
  ...props
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const textArray = Array.isArray(text) ? text : [text];

  // Efek untuk kursor tetap sama
  const cursorRef = useRef(null);
  useEffect(() => {
    if (showCursor && cursorRef.current) {
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: cursorBlinkDuration,
        repeat: -1,
        yoyo: true,
      });
    }
  }, [showCursor, cursorBlinkDuration]);

  // Efek utama untuk mengetik dan menghapus
  useEffect(() => {
    // Jika animasi sudah selesai (tidak loop dan di kalimat terakhir), hentikan semua
    if (!loop && currentTextIndex === textArray.length) {
      return;
    }

    // Fungsi untuk memulai proses menghapus
    const startDeleting = () => {
      setIsDeleting(true);
    };

    // Fungsi untuk mengetik
    const handleTyping = () => {
      const currentSentence = textArray[currentTextIndex];
      
      if (!isDeleting) {
        // Proses mengetik
        if (displayedText.length < currentSentence.length) {
          setDisplayedText(
            (prev) => prev + currentSentence[displayedText.length]
          );
        } else {
          // Selesai mengetik, jeda lalu mulai hapus (jika perlu)
          if (loop || currentTextIndex < textArray.length - 1) {
            setTimeout(startDeleting, pauseDuration);
          } else {
            // Selesai semua sequence
            if (onSequenceComplete) onSequenceComplete();
          }
        }
      } else {
        // Proses menghapus
        if (displayedText.length > 0) {
          setDisplayedText((prev) => prev.slice(0, -1));
        } else {
          // Selesai menghapus, lanjut ke kalimat berikutnya
          setIsDeleting(false);
          if (onSentenceComplete) onSentenceComplete(currentSentence, currentTextIndex);
          setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
        }
      }
    };

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timeout = setTimeout(handleTyping, speed);

    return () => clearTimeout(timeout);
  }, [
    displayedText,
    isDeleting,
    currentTextIndex,
    textArray,
    loop,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    onSentenceComplete,
    onSequenceComplete,
  ]);

  const getCurrentTextColor = () => {
    if (textColors.length === 0) return "#ffffff";
    return textColors[currentTextIndex % textColors.length];
  };

  return createElement(
    // ... sisa kode JSX tidak berubah
    Component,
    { className: `text-type ${className}`, ...props },
    <span style={{ color: getCurrentTextColor() }}>{displayedText}</span>,
    showCursor && (
      <span ref={cursorRef} className={`text-type__cursor ${cursorClassName}`}>
        {cursorCharacter}
      </span>
    )
  );
};

export default TextType;