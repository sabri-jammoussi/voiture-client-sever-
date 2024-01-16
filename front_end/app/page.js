"use client"
import React, { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';
import styles from './page.module.css';

export default function Home() {
  const [voitures, setVoitures] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchVoitures();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % voitures.length;
      setCurrentIndex(nextIndex);
    }, 10000);

    return () => {
      clearInterval(timer);
    };
  }, [currentIndex, voitures.length]);

  const fetchVoitures = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/voiture');
      setVoitures(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Carousel 
      className={styles.carousel}
      selectedItem={currentIndex}
      onChange={setCurrentIndex}
      interval={2500}
      infiniteLoop
      showStatus={false}
      showThumbs={false}
      autoPlay
      stopOnHover
    >
      {voitures.map((voiture) => (
        <div key={voiture._id} className={styles.slide}>
          <img src={voiture.imagevoit} className={styles.voitureImage} alt={voiture.nomvoit} />
          {/* <div className={styles.voitureDetails}>
            <p className={styles.voitureName}>Nom: {voiture.nomvoit}</p>
            <p className={styles.voitureName}>Prix: {voiture.prix} DT</p>
            <p className={styles.voitureName}>Garantie: {voiture.GARANTIE}</p>
            <p className={styles.voitureName}>Année: {voiture.annee}</p>
            <p className={styles.voitureName}>Motorisation: {voiture.motorisation}</p>
          </div> */}
        </div>
      ))}
    </Carousel>
  );
}
