import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedComponent = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const component = document.getElementById('animated-component');
      const rect = component.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      setIsVisible(
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= windowHeight &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    };

    // Initial check on mount
    handleScroll();

    // Listen to scroll events
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }} 
      id="animated-component" 
    >
      {children}
    </motion.div>
  );
};

export default AnimatedComponent;
