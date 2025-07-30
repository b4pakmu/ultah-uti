import React, { useState } from 'react';
import WishesPage from './WishesPage';
import GalleryPage from './GalleryPage';

function MainPage() {
  // State untuk melacak langkah saat ini
  const [step, setStep] = useState(1); // Mulai dari langkah 1

  // Fungsi untuk pindah ke langkah berikutnya, akan kita kirim ke WishesPage
  const goToNextStep = () => {
    setStep(step + 1);
  };

  return (
    <div className="main-container">
      {/* Tampilkan komponen berdasarkan nilai 'step' */}
      
      {step === 1 && <WishesPage onNextStep={goToNextStep} />}
      
      {step === 2 && <GalleryPage />}
      
    </div>
  );
}

export default MainPage;