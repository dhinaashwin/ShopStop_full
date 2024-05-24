import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedComponent = ({ children, initial, animate, exit, transition }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = (entries, observer) => {
      entries.forEach(entry => {
        console.log('entry', entry);
        if (entry.isIntersecting) {
          console.log('isVisible', true);
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleScroll, { threshold: 0.5 });

    const target = document.getElementById('animated-component');
    if (target) {
      observer.observe(target);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      initial={initial}
      animate={isVisible ? animate : initial}
      exit={exit}
      transition={transition}
      id="animated-component"
    >
      {children}
    </motion.div>
  );
};

export default AnimatedComponent;
