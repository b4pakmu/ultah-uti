import React, { useState } from 'react';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';

// Terima prop onNextStep dari MainPage.jsx
function WishesPage({ onNextStep }) {
  const [isGiftOpen, setIsGiftOpen] = useState(false);

  return (
    <div className="wishes-page">
      {isGiftOpen && <Confetti />}

      <h1>Klik Kado di Bawah Ini!</h1>
      
      {!isGiftOpen && (
        <motion.button 
          className="gift-box" 
          onClick={() => setIsGiftOpen(true)}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          🎁
        </motion.button>
      )}

      {isGiftOpen && (
        <motion.div 
          className="message-box"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Selamat Ulang Tahun, Sayang!</h2>
          <p>Ini adalah wish-ku untukmu: Semoga kamu selalu bahagia, sehat, dan semua impianmu tercapai. Kamu adalah orang terbaik yang pernah aku kenal. Aku sangat beruntung memilikimu.</p>
          
          {/* Tombol untuk lanjut ke galeri foto */}
          <button onClick={onNextStep} style={{ marginTop: '20px' }}>
            Lanjut ke Kenangan Kita →
          </button>
        </motion.div>
      )}
    </div>
  );
}

export default WishesPage;