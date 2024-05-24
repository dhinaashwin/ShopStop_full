import React, { useContext, useState } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import Item from '../Item/Item';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './ProductType.css'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
const ProductType = ({x}) => {
  const responsive = {
    0: { items: 3 },
    568: { items: 3 },
    1024: { items: 3 },
  };
  const { Datas } = useContext(ShopContext);
  const [selectedType, setSelectedType] = useState('TShirt');
  const handleTypeChange = (type) => {
    setSelectedType(type);
  };
  // Filter data based on selected type
  const filteredData = Datas.filter(item => item.type === selectedType && item.category === 'Men');
  return (
    <section className="flex flex-col items-center mt-20">
      <div className="flex justify-center md:gap-10 xsm:gap-2">
        <div>
        <button
          className={`radio-button ${selectedType === 'TShirt' && 'selected'}`}
          onClick={() => handleTypeChange('TShirt')}
        >
          TShirt
        </button>
      </div>
      <div>
        <button
          className={`radio-button ${selectedType === 'Shirt' && 'selected'}`}
          onClick={() => handleTypeChange('Shirt')}
        >
          Shirt
        </button>
      </div>
      <div>
        <button
          className={`radio-button ${selectedType === 'Jeans' && 'selected'}`}
          onClick={() => handleTypeChange('Jeans')}
        >
          Jeans
        </button>
      </div>
      <div>
        <button
          className={`radio-button ${selectedType === 'Trousers' && 'selected'}`}
          onClick={() => handleTypeChange('Trousers')}
        >
          Trousers
        </button>
      </div>
      </div>
      <div>
      {/* Display filtered items */}
      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="grid items-center Parent-filter py-10 lg:grid-cols-4 md:grid-cols-3 xsm:grid-cols-2 "
          key={filteredData.length} // Use a unique key to force remount when data changes
        >
          {/* Map through a slice of the filteredData array containing only the first 4 items */}
          {filteredData.slice(0, 4).map((data, i) => (
            <Item
              key={i}
              id={data.id}
              title={data.title}
              old_price={data.old_price}
              new_price={data.new_price}
              image={data.image}
              image2={data.image2}
            />
          ))}
        </motion.div>
      </div>
      <div >
  {/* Link to the '/type' route */}
 
  <div>
  <Link className={`radio-button xsm:hidden md:block`} to={`/${selectedType}`} onClick={() => handleTypeChange('Trousers')}>View All</Link>
      </div>
      {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="xsm:flex md:hidden items-center Parent-filter py-10 "
          key={filteredData.length} // Use a unique key to force remount when data changes
        >
        <AliceCarousel
  mouseTracking
  responsive={responsive}
  disableButtonsControls
>
  {filteredData.slice(0, 4).map((data, i) => (
    <Item
      key={i}
      id={data.id}
      title={data.title}
      old_price={data.old_price}
      new_price={data.new_price}
      image={data.image}
      image2={data.image2}
    />
  ))}
</AliceCarousel>
        </motion.div> */}
</div>
{/* <div>
<Link className={`radio-button xsm:hidden md:block`} to={`/${selectedType}`} onClick={() => handleTypeChange('Trousers')}>View All</Link>
</div> */}

    </section>
  );
};

export default ProductType;
