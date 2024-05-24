import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import './Item.css';

const Item = (props) => {
  const { id, image, image2, title, old_price, new_price } = props;
  const [isHovered, setIsHovered] = useState(false);
  const [currentImage, setCurrentImage] = useState(image); // Track the current image

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Automatically switch images when viewport width is 480px or less
  useEffect(() => {
    const viewportWidth = window.innerWidth;
    if (viewportWidth <= 480) {
      const intervalId = setInterval(() => {
        setCurrentImage((prevImage) => (prevImage === image ? image2 : image));
      }, 400); // Change images every 100 milliseconds
  
      // Clear the interval after 1 second
      const timeoutId = setTimeout(() => {
        clearInterval(intervalId);
      }, 2000); // Disable automatic image change after 1 second
  
      // Clean up interval and timeout on component unmount
      return () => {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
      };
    }
  }, [image, image2]);

  return (
    <motion.div className='Parent-item flex flex-col bg-white'>
      <div className='img-parent w-full flex justify-center'>
        <Link to={`/product/${id}`}>
          <motion.img
            src={currentImage} // Use currentImage state
            className='item-image'
            alt=''
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </Link>
      </div>
      <div className='title-container mt-[4px]'>
        <Link to={`/product/${id}`}>
          <p className='title opacity-95 md:text-[20px] sm:text-[16px] xsm:text-[14px] px-[4px]'>{title}</p>
        </Link>
      </div>
      <div className='item-prices flex gap-4 mt-[4px] px-[4px] items-center'>
        <div className='item-newPrice xsm:text-[14px] sm:text-[18px] md:text-[22px] font-b cursor-pointer'>Rs.{new_price}</div>
        <div className='item-oldPrice xsm:text-[14px] opacity-60 sm:text-[18px] line-through md:text-[22px]'>Rs.{old_price}</div>
      </div>
    </motion.div>
  );
};

export default Item;
