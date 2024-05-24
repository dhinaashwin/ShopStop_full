import React, { useState, useContext, useEffect } from "react";
import "./ProductDisplay.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ShopContext } from "../../Context/ShopContext";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Item from "../Item/Item";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import {motion} from 'framer-motion'


const ProductImage = ({ src, onMouseEnter }) => {
  return (
    <img
      src={src}
      className="product-image"
      onMouseEnter={onMouseEnter}
      alt=""
    />
  );
};

const ProductDisplay = ({ product }) => {
  const { addToCart , updateClickedImage } = useContext(ShopContext);
  const { Datas } = useContext(ShopContext);
  const {
    id,
    image,
    image2,
    image3,
    image4,
    title,
    category,
    type,
    new_price,
    old_price,
    quantity,
    specification,
    addedCartSize,
  } = product;
  const [displayedImage, setDisplayedImage] = useState(image);
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const [selectedSize, setSelectedSize] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
 const images = [image,image2,image3,image4];
  const handleSizeSelection = (size) => {
    setSelectedSize(size);
  };
  const handleButtonClick = () => {
    if (selectedSize) {
      addToCart(id, selectedSize);
      toast.success("Product added to cart successfully!", {
        // Custom options for the toast notification
        position: "bottom-right", // Position of the toast
        autoClose: 3000, // Duration to close the toast (in milliseconds)
        hideProgressBar: false, // Whether to show progress bar
        closeOnClick: true, // Close the toast when clicked
        pauseOnHover: true, // Pause the toast timeout when hovered
        draggable: true, // Whether the toast can be dragged
        progress: undefined, // Progress bar color
        className: "custom-toast", // Custom class for styling
      });
    } else {
      toast.error("Please select a size before adding to cart.");
    }
  };

  const datasize = product.sizes;
  const responsive = {
    0: { items: 1 },
    568: { items: 1 },
    1024: { items: 1 },
  };
  useEffect(() => {
    const handleScroll = () => {
      const scrollButtons = document.getElementById('scrollButtons');
      if (scrollButtons) {
        if (window.innerWidth <= 768) { // Check if viewport width is less than or equal to 768px
          if (window.scrollY <= 450) { // Check if the scroll position is less than or equal to 100px
            scrollButtons.style.display = 'flex'; // Show the buttons
          } else {
            scrollButtons.style.display = 'none'; // Hide the buttons
          }
        } else {
          // Hide the buttons if viewport width is greater than 768px
          scrollButtons.style.display = 'none';
        }
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Select four random products from Datas
    const randomProducts = [];
    const randomIndices = new Set();
    while (randomIndices.size < 3) {
      const index = Math.floor(Math.random() * Datas.length);
      randomIndices.add(index);
    }
    randomIndices.forEach((index) => randomProducts.push(Datas[index]));
    setRelatedProducts(randomProducts);
  }, [Datas]);

  const commonSizes = sizes.filter((size) => datasize.includes(size));
  const specificationKeys = Object.keys(specification);

  const handleImageHover = (imageUrl) => {
    setDisplayedImage(imageUrl);
  };
  console.log()
  useEffect(() => {
    setDisplayedImage(product.image);
  }, [product]);

  const handleImageClick = (imageUrl) => {
    console.log("Clicked image URL:", imageUrl);
    updateClickedImage(imageUrl);
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (

    <div className="Parent-PD ">
      <div className="div-1 relative flex xsm:items-center xsm:flex-col md:flex-row lg:gap-10 md:gap-6 w-full md:pt-24 xsm:pt-16 xsm:px-2 md:px-0">
        <div className="sticky top-[100px] h-full flex flex-col xsm:hidden md:flex gap-6 mt-5 md:w-[8%]">
          {[image, image2, image3, image4].map((img, index) => (
            <ProductImage
              key={index}
              src={img}
              onMouseEnter={() => handleImageHover(img)}
            />
          ))}
        </div>
        <ToastContainer />
        <div className="md:hidden xsm:relative flex">
      {/* <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index} className="flex justify-center">
            <Link to='/Modal'>
            <motion.img 
              src={img} 
              className="w-[400px] h-[450px] object-cover" 
              alt=""
              onClick={() => handleImageClick(img)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
            </Link>
          </div>
        ))}
      </Slider> */}
      <AliceCarousel
        mouseTracking
        responsive={responsive}
        disableButtonsControls
        infinite
      >
        {images.map((img, index) => (
          <div key={index} className="flex justify-center">
            <Link to='/Modal'>
            <motion.img 
              src={img} 
              className="w-[100vw] h-[480px] object-cover" 
              alt=""
              onClick={() => handleImageClick(img)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
            </Link>
          </div>
        ))}
      </AliceCarousel>
    </div>
  <div className="xsm:hidden md:block h-full sticky top-[100px] md:w-[40%] ">
         <Link to='/Modal'>
         <img src={displayedImage} className="w-[650px]" onClick={() => handleImageClick(displayedImage)} alt="" />
         </Link>
        </div>
        <div className="flex flex-col gap-[5px] box-3 xsm:mt-2 md:w-[50%] xsm:self-start">
          <h1 className="md:text-[32px] heading xsm:text-[18px]">{title}</h1>
          <h3 className="md:text-[18px] xsm:text-[16px] opacity-75">
            {category}'s {type}
          </h3>
          <div className="flex gap-8">
            <h1 className="md:text-[26px] xsm:text-[22px]">Rs {new_price}</h1>
            <h1 className="md:text-[26px] xsm:text-[22px] opacity-50 line-through">Rs {old_price}</h1>
          </div>
          <div className="flex gap-4 mt-3 xsm:hidden md:flex h-full">
            <button className="btn-product-red">Add to Favorites </button>
            <button
              onClick={handleButtonClick}
              className="btn-product-black"
            >
              Add to Cart
            </button>
          </div>
          {quantity <= 5 && <p>Only {quantity} left</p>}
          <div className="flex md:gap-6 xsm:gap-3 mt-4">
            {sizes.map((size, i) => (
              <button
                key={i}
                className={`md:text-[18px] xsm:text-[15px] small-btn ${
                  commonSizes.includes(size)
                    ? ""
                    : "opacity-50 cursor-not-allowed"
                } ${selectedSize === size ? "selected" : ""}`}
                disabled={!commonSizes.includes(size)}
                onClick={() => setSelectedSize(size)} // Update selected size
              >
                {size}
              </button>
            ))}
          </div>
          <div className="mt-5">
            <h2>Specification</h2>
            <div className="flex gap-20 mt-8 opacity-85">
              <div className="flex flex-col gap-4">
                <h4 className="underline">{specificationKeys[0]}</h4>
                <h4 className="opacity-75">{specification.Fit}</h4>
              </div>
              <div className="flex gap-4 flex-col">
                <h4 className="underline">{specificationKeys[1]}</h4>
                <h4 className="opacity-75">{specification.Sleeves}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="div-2 md:mt-0 xsm:mt-3 xsm:px-2 md:px-0">
        <h2 className="underline ">Description</h2>
        <h3 className="mt-3  text-[16px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error eaque
          ratione pariatur consectetur dolor, neque provident quo beatae soluta
          alias perspiciatis natus, iure doloribus deserunt quasi blanditiis
          dolore! Eos, non.
        </h3>
      </div>
  
      <div id="scrollButtons" className="flex md:gap-4 xsm:gap-2 mt-3 xsm:sticky justify-evenly h-full z-2 -bottom-[2px] bg-white w-full scrollButtons box-shadow-filter">
      <button className="btn-product-black-mobile py-2 box-shadow-filter2">Add to Favorites</button>
      <div className="bg-black w-[2px] opacity-15 "></div>
      <button onClick={handleButtonClick} className="btn-product-black-mobile py-2 ">Add to Cart</button>
    </div>
        {/* {relatedProducts.map((data, index) => (
          <Link
            to={`/product/${data.id}`}
            key={index}
            id={data.id}
            className="flex flex-col"
          >
          <RelatedProducts  key={index}
            id={data.id}
            title={data.title}
            old_price={data.old_price}
            new_price={data.new_price}
            image={data.image}
            image2={data.image2} />
        </Link>
        ))} */}
    </div>
  );
};

export default ProductDisplay; 