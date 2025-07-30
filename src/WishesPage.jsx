import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import './WishesPage.css'; // Mengimpor CSS sendiri

function WishesPage({ onNextStep }) {
  const [isGiftOpen, setIsGiftOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowDimension, setWindowDimension] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [messageIndex, setMessageIndex] = useState(0);
  const [isSequenceFinished, setIsSequenceFinished] = useState(false);

  const messages = [
    "Selamat Ulang Tahun, Sayang! 🎉", "Ini adalah wish-ku untukmu:",
    "Semoga kamu selalu bahagia, sehat, dan semua impianmu tercapai.",
    "Kamu adalah orang terbaik yang pernah aku kenal.", "Aku sangat beruntung memilikimu. ❤️"
  ];

  useEffect(() => {
    const handleResize = () => setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isGiftOpen || isSequenceFinished) return;
    if (messageIndex < messages.length - 1) {
      const timer = setTimeout(() => setMessageIndex(prev => prev + 1), 2500);
      return () => clearTimeout(timer);
    } else {
      const finalTimer = setTimeout(() => setIsSequenceFinished(true), 2500);
      return () => clearTimeout(finalTimer);
    }
  }, [isGiftOpen, messageIndex, isSequenceFinished, messages.length]);

  const handleGiftOpen = () => {
    setIsGiftOpen(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  return (
    <motion.div className="wishes-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
      {showConfetti && <Confetti width={windowDimension.width} height={windowDimension.height} recycle={false} numberOfPieces={200} />}
      {!isGiftOpen && (
        <>
          <h1>🎁 Klik Kado di Bawah Ini! 🎁</h1>
          <motion.button className="gift-box" onClick={handleGiftOpen}>🎁</motion.button>
        </>
      )}
      {isGiftOpen && (
        <motion.div className="message-box" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, type: "spring" }}>
          <AnimatePresence mode="wait">
            <motion.p key={messageIndex} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="message-text">
              {messages[messageIndex]}
            </motion.p>
          </AnimatePresence>
          <AnimatePresence>
            {isSequenceFinished && (
              <motion.button onClick={onNextStep} className="next-button" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}>
                Lanjut ke Kenangan Kita →
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
}

export default WishesPage;
