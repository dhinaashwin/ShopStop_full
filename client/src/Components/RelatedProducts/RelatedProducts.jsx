import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; 
import './RelatedProducts.css'
const RelatedProducts = (props) => {
    const { id, image, image2, title, old_price, new_price } = props;
    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => {
      setIsHovered(true);
    };
    const handleMouseLeave = () => {
        setIsHovered(false);
      };
      document.addEventListener('DOMContentLoaded', function() {
        const titleElement = document.querySelector('.title');
        if (titleElement) {
            const lineHeight = parseInt(window.getComputedStyle(titleElement).lineHeight);
            const maxHeight = lineHeight * 2; // Assuming 2 lines of text
            const currentHeight = titleElement.clientHeight;
    
            if (currentHeight > maxHeight) {
                titleElement.style.whiteSpace = 'initial'; // Allow text to wrap
                titleElement.style.overflow = 'initial'; // Allow overflow text
            }
        }
    });
    
  return (
    <motion.div 
    className='Parent-item flex flex-col items-center bg-white ' // Removed fixed width, use flex for responsiveness
  >
    <div className='img-parent'>
      <Link to={`/product/${id}`}>
        <motion.img
          src={isHovered ? image2 : image}
          className='item-image'
          alt=""
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </Link>
    </div>
    <div className='title-container mt-[4px]'>
      <Link to={`/product/${id}`}>
        <p className='title font-sb opacity-95 md:text-[18px] xsm:text-[14px]'>{title}</p>
      </Link>
    </div>
    <div className="item-prices flex gap-4 mt-[4px] px-[1px] items-center">
    <div className="item-newPrice xsm:text-[14px] font-b">Rs {new_price}</div>
      <div className="item-oldPrice xsm:text-[14px] ">Rs {old_price}</div>
    </div>
  </motion.div>
  )
}

export default RelatedProducts
