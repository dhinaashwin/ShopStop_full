import React from 'react';
import { Link } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import ShirtsImage from '../../images/Shirts.png';
import TShirtsImage from '../../images/TShirts.png';
import BottomsImage from '../../images/Bottoms.png';
import ShoesImage from '../../images/Shoes.png';
import './Category.css';

const Type = () => {
  const categories = [
    { name: "Shirts", image: ShirtsImage, type: "Shirt" },
    { name: "Bottoms", image: BottomsImage, type: "Bottom" },
    { name: "TShirts", image: TShirtsImage, type: "TShirt" },
    { name: "Shoes", image: ShoesImage, type: "Shoe" },
    { name: "Shirts", image: ShirtsImage, type: "Shirt" },
    { name: "Bottoms", image: BottomsImage, type: "Bottom" },
    { name: "TShirts", image: TShirtsImage, type: "TShirt" },
    { name: "Shoes", image: ShoesImage, type: "Shoe" },
  ];

  const responsive = {
    0: { items: 4 },
    568: { items: 4 },
    1024: { items: 9 },
  };

  return (
    <div className='w-full mt-28 flex justify-center'>
      <AliceCarousel
        mouseTracking
        responsive={responsive}
        disableButtonsControls
        infinite
        controlsStrategy="none"

      >
        {categories.map((type, index) => (
          <div key={index} className='Category'>
            <Link to={`${type.type}`}>
              <img src={type.image} alt={type.name} className='xsm:w-[150px] md:w-[100px] h-fit' />
            </Link>
          </div>
        ))}
      </AliceCarousel>
    </div>
  );
};

export default Type;