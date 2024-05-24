import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Link } from 'react-router-dom';
import HeroImg from "../../images/Hero2.jpg";
import DiscountImg from "../../images/Discount2.jpg";
import TC from "../../images/TC.jpg";
import "./Hero.css";
import Hero2 from '../../images/Hero.jpg'
import Hero3 from '../../images/Hero-mobile.jpg'
import Denim1 from "../../images/DenimBig.jpg"
import Denim2 from "../../images/DenimMobile.jpg"
const Hero = () => {
  
  const handleDragStart = (e) => e.preventDefault();

  return (
    <section className="hero-section">
 
        <AliceCarousel
          mouseTracking
          responsive={{ 0: { items: 1 } }}
          disableButtonsControls
          infinite
          controlsStrategy="none"
          className="custom-carousel"
          autoPlay 
         
        >
          <Link to='/NewCollections'>
          <img src={Hero2} className="xsm:hidden md:block" loading="lazy" />
          <img src={Hero3} className="md:hidden xsm:block" loading="lazy" />
        </Link>
        <Link to='/Denim'>
        <img src={Denim1} className="xsm:hidden md:block" />
        <img src={Denim2} className="md:hidden xsm:block" />
        </Link>
        </AliceCarousel>   
    </section>
  );
};

export default Hero;
