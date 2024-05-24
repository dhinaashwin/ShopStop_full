import React from 'react';
import './Shop.css';
import { Link } from 'react-router-dom';


const Shop = ({ title, image, pos, button, side, category ,newProduct}) => {
  return (
    <>
    <section className="Section-shop pt-10">
      <div className={`Parent-shop flex md:items-center ${pos}`}>
        <div className="shop-left flex items-center justify-center">
          <img src={image} className='w-[650px] h-auto' alt="" srcSet="" />
        </div>
        <div className={`shop-right flex flex-col items-center gap-10 ${side === "left" ? 'side-left' : 'side-right'}`}>
          <h1>{title}</h1>
          {newProduct==='Yes' ? <Link to={`/newProduct`}><button className="btn-product-black">{button}</button></Link> : <Link to={`${category}`}><button className="btn-product-black">{button}</button></Link>}      
        </div>
      </div>
    </section>
     
   </>
  );
};

export default Shop;
