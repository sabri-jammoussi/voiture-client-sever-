import React from 'react';
import styles from './about.module.css';
const AboutPage = () => {
  return (
    <div className='container'>
       <div className="banner-item-01">
    <div className={styles.container}>
      <h1 className='h1'>About Us</h1>
      <p className='p'>
        Welcome to our car website! We are a dedicated team of car enthusiasts passionate about providing you with
        information and resources related to cars. Whether you're looking for the latest car models, car reviews, or
        maintenance tips, we've got you covered.
      </p>
      <p className='p'>
        Our mission is to help you make informed decisions when it comes to buying, selling, or maintaining your
        vehicles. We strive to provide accurate and up-to-date information, along with helpful guides and resources to
        enhance your car ownership experience.
      </p>
      <p className='p'>
        Feel free to explore our website and check out our extensive collection of cars, categorized by brand, model,
        and features. If you have any questions or feedback, please don't hesitate to contact us. We're here to assist
        you!
      </p>
    </div>
    </div>
    </div>
  );
};

export default AboutPage;
