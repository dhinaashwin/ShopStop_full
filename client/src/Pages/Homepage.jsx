import React from 'react'
import Header from '../Components/Header/Header';
import Hero  from '../Components/Hero/Hero';
import Shop from '../Components/Shop/Shop';
import MensImg from '../images/Mens.jpeg';
import WomensImg from '../images/Womens.jpeg';
import NewArrivalsImg from '../images/NewArrivals.jpg'
import Category from '../Components/Type/Category';
import SaleImg from "../images/Sale2.jpg";
import ProductType from '../Components/ProductType/ProductType';
const Homepage = () => {
  return (
    <>
    <Category/>
    <Hero />
   <ProductType/> 
      <Shop title='Mens Wear' button='Shop Men' image={MensImg} side='left' category='men'/>
       <Shop title='Womens Wear' button='Shop Women' image={WomensImg} pos='flex-row-reverse'category='women' />
       <Shop title='New Arrivals' button='Explore Now' image={NewArrivalsImg} side='left' newProduct='Yes' />
       <div className='pt-24'>
     <img src={SaleImg} className="w-full m-auto object-contain" alt="" srcset="" />
   </div> 
    </>
  )
}

export default Homepage
