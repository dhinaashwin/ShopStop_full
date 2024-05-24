import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ShopContext } from '../Context/ShopContext';
import { useNavigate } from "react-router-dom";
import Close from '../images/close.png'
import { motion, AnimatePresence } from "framer-motion";

const ImageModal = () => {
  const { clickedImage, updateClickedImage } = useContext(ShopContext);
  const navigate = useNavigate(); // Hook for navigation
  const [isVisible, setIsVisible] = useState(true);

  const handleCloseModal = () => {
    setIsVisible(false); // Hide the modal slowly
    setTimeout(() => {
      updateClickedImage(null); // Clear clicked image URL when modal is closed
      navigate(-1); // Go back to the previous page
    }, 500); // Adjust the timeout duration to match the transition duration
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div  
          className={`md:mt-20 w-full h-full flex items-center justify-center `} // Adjust the duration for slow transition
        >
          <div className="relative">
            {/* X icon to close the modal */}
            <motion.img 
              src={Close} 
              className="absolute z-10 w-6 right-2 md:top-2 xsm:top-16" 
              onClick={handleCloseModal}
              whileHover={{ scale: 1.1 }} // Optional hover effect
              whileTap={{ scale: 0.9 }} // Optional tap effect
            />
            <TransformWrapper>
              <TransformComponent>
                {/* Display the clicked image */}
                <motion.img 
  src={clickedImage} 
  className="w-[100vw] h-[100vh] object-contain" 
  initial={{ scale: 0.7, opacity: 0.8, x: "0%", y: "-10%" }} // Initial position centered
  animate={{ scale: 1, opacity: 1, x: 0, y: 0 }} // Animate to center of the screen
  exit={{ opacity: 0, scale: 0.8, x: "0%", y: "-10%",}} // Exit position centered
  transition={{ duration: 0.8 }}  
  alt="Clicked Image" 
/>
              </TransformComponent>
            </TransformWrapper>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageModal;
