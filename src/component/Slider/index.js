import React, { useState } from 'react';
import styles from './Slider.module.css';

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
      { src: 'https://image.tmdb.org/t/p/w1280/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg',
       title: 'The Dark Knight', description: 'Content 1' },
      { src: 'https://image.tmdb.org/t/p/w1280/zb6fM1CX41D9rF9hdgclu0peUmy.jpg',
       title: 'The Green Mile', description: 'A supernatural tale set on death row in a Southern prison, where gentle giant John Coffey possesses the mysterious power to heal people' },
      { src: 'https://image.tmdb.org/t/p/w1280/l6hQWH9eDksNJNiXWYRkWqikOdu.jpg', 
      title: 'Pulp Fiction', description: 'A burger-loving hit man, his philosophical partner, a drug-addled gangster' }
    ];
  

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % slides.length);
  };

  return (
    <div className={styles.carousel}>
      
      <div className={styles.slide}>
        <img src={slides[currentSlide].src} alt={`Slide ${currentSlide + 1}`} />
        <div className={styles.slideContent}>
          <h2>{slides[currentSlide].title}</h2>
          <p>{slides[currentSlide].description}</p>
        </div>
      </div>
      <button className={styles.prevBtn} onClick={prevSlide}>&#10094;</button>
      <button className={styles.nextBtn} onClick={nextSlide}>&#10095;</button>
    </div>
  );
};

export default Slider;

