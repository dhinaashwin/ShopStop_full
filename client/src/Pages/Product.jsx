import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom';
import BreadCrum from '../BreadCrums/BreadCrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';

const Product = () => {
  const {Datas} =useContext(ShopContext);
   const {productId} = useParams();
   const product =Datas.find((e)=>e.id ===Number(productId));
  return (
    <div className='flex flex-col'>
     <ProductDisplay product={product}/>
    </div>
  )
}

export default Product
