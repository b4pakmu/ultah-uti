import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Impor gaya carousel
import { Carousel } from 'react-responsive-carousel';

// Impor fotomu dari folder assets
import fotoKita1 from 'C:/Users/Ghalbi/ultah-uti/src/assets/foto1.jpg';
import fotoKita2 from 'C:/Users/Ghalbi/ultah-uti/src/assets/foto2.jpg';
import fotoKita3 from 'C:/Users/Ghalbi/ultah-uti/src/assets/foto3.jpg';
import fotoKita4 from 'C:/Users/Ghalbi/ultah-uti/src/assets/foto4.jpg';
import fotoKita5 from 'C:/Users/Ghalbi/ultah-uti/src/assets/foto5.jpg';
import fotoKita6 from 'C:/Users/Ghalbi/ultah-uti/src/assets/foto6.jpg';


function GalleryPage() {
  return (
    <div className="gallery-page">
      <h2>Momen-Momen Terbaik Kita</h2>
      <Carousel>
          <div>
              <img src={fotoKita1} alt="Kenangan 1" />
              <p className="legend">Caption untuk foto 1: Waktu di pantai</p>
          </div>
          <div>
              <img src={fotoKita2} alt="Kenangan 2" />
              <p className="legend">Caption untuk foto 2: Nonton konser bareng</p>
          </div>
          {/* Tambahkan div lain untuk foto selanjutnya */}
      </Carousel>

      {/* Ini untuk Babak IV: Pesan Terakhir */}
      <div className="final-surprise">
        <h3>Satu Pesan Terakhir...</h3>
        <p>Perjalanan digital ini mungkin berakhir di sini, tapi petualangan kita di dunia nyata akan terus berlanjut. I love you!</p>
      </div>
    </div>
  );
}

export default GalleryPage;