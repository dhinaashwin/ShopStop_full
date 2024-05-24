import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Item from "../Components/Item/Item";
import './AllProducts.css';


const AllProducts = () => {
  const { Datas } = useContext(ShopContext);
  const [shuffledData, setShuffledData] = useState([]);
  const [sorting, setSorting] = useState('');
  const [filters, setFilters] = useState({
    gender: 'All',
    type: 'All'
  });

  useEffect(() => {
    // Function to shuffle the array
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    // Shuffle the Datas array when component mounts
    setShuffledData(shuffleArray([...Datas]));
  }, [Datas]);

  // Apply filters when filters change
  
  useEffect(() => {
    let filteredData = [...Datas];
    if (filters.gender !== 'All') {
      filteredData = filteredData.filter(item => item.category === filters.gender);
    }
    if (filters.type !== 'All') {
      filteredData = filteredData.filter(item => item.type === filters.type);
    }
    if (sorting === 'LowToHigh') {
      filteredData.sort((a, b) => parseFloat(a.new_price) - parseFloat(b.new_price));
    } else if (sorting === 'HighToLow') {
      filteredData.sort((a, b) => parseFloat(b.new_price) - parseFloat(a.new_price));
    } else if (sorting === 'New') {
      filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    setShuffledData(filteredData);
  }, [filters, sorting]);

  // Handle radio button change
  const handleRadioChange = (event) => {
    const { name, value } = event.target;
    if (name === 'sorting') {
      setSorting(value);
    } else {
      setFilters({ ...filters, [name]: value });
    }
  };


  return (
    <div className="w-full flex md:flex-row xsm:flex-col pt-32 relative h-full Parent-AllProducts">
      <div className="sticky h-full top-[30%] flex flex-col w-[30%] md:gap-16 box-radio">
    
        <div className="List-1 flex flex-col gap-2">
          <div className="">
            <input type="radio" value="All" name="gender" id="all" checked={filters.gender === 'All'} onChange={handleRadioChange} />
            <label htmlFor="all" className="px-2">
              All
            </label>
          </div>
          <div>
            <input type="radio" value="Men" name="gender" id="men" checked={filters.gender === 'Men'} onChange={handleRadioChange} />
            <label htmlFor="men" className="px-2">
              Men
            </label>
          </div>
          <div>
            <input type="radio" value="Women" name="gender" id="women" checked={filters.gender === 'Women'} onChange={handleRadioChange} />
            <label htmlFor="women" className="px-2">
              Women
            </label>
          </div>
        </div>
        <div>
          <div className="List-2 flex flex-col gap-2">
            <div>
              <input type="radio" value="All" name="type" id="allTypes" checked={filters.type === 'All'} onChange={handleRadioChange} />
              <label htmlFor="allTypes" className="px-2">
                All
              </label>
            </div>
            <div>
              <input type="radio" value="TShirt" name="type" id="TShirt" checked={filters.type === 'TShirt'} onChange={handleRadioChange} />
              <label htmlFor="TShirt" className="px-2">
                TShirt
              </label>
            </div>
            <div>
              <input type="radio" value="Shirt" name="type" id="Shirt" checked={filters.type === 'Shirt'} onChange={handleRadioChange} />
              <label htmlFor="Shirt" className="px-2">
                Shirt
              </label>
            </div>
            <div>
              <input type="radio" value="Bottom" name="type" id="Bottom" checked={filters.type === 'Bottom'} onChange={handleRadioChange} />
              <label htmlFor="Bottom" className="px-2">
                Bottom
              </label>
            </div>
            <div>
              <input type="radio" value="Hoodie" name="type" id="Hoodie" checked={filters.type === 'Hoodie'} onChange={handleRadioChange} />
              <label htmlFor="Hoodie" className="px-2">
                Hoodie
              </label>
            </div>
          </div>
        </div>
        <div className="List-3 flex flex-col gap-2">
          <div>
            <input type="radio" value="LowToHigh" name="sorting" id="lowToHigh" onChange={handleRadioChange} />
            <label htmlFor="lowToHigh" className="px-2">Low To High</label>
          </div>
          <div>
            <input type="radio" value="HighToLow" name="sorting" id="highToLow" onChange={handleRadioChange} />
            <label htmlFor="highToLow" className="px-2">High To Low</label>
          </div>
          <div>
            <input type="radio" value="New" name="sorting" id="newProducts" onChange={handleRadioChange} />
            <label htmlFor="newProducts" className="px-2">New Products</label>
          </div>
        </div>
      </div>
      
      <div className="md:gap-4 xsm:gap-1 grid md:grid-cols-3 xsm:grid-cols-2 md:w-[70%] xsm:w-[100%] items">
        {shuffledData.map((data, i) => (
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
      </div>
      <div className="box-radio-2 flex justify-evenly left-0 bottom-[0px] text-[32px] sticky bg-white w-full mt-10"> 
       <div className="sort">Sort</div>
       <div className="sort">Filters</div>
      </div>
    </div>
  );
};

export default AllProducts;
