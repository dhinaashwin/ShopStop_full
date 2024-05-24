import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../Context/ShopContext";
import Item from "../../Components/Item/Item";
import "./FilterItems.css";
import { motion } from "framer-motion";

const FilteredItems = ({ filterType, filterValue, title }) => {
  const { Datas } = useContext(ShopContext);
  const [filteredData, setFilteredData] = useState([]);
  const [genderFilter, setGenderFilter] = useState(""); 
  const [TypeFilter, setTypeFilter] = useState("");// State to manage gender filter

  useEffect(() => {
    let tempFilteredData = Datas;

    // Apply filter based on filterType and filterValue
    if (filterType && filterValue) {
      tempFilteredData = Datas.filter(data => data[filterType] === filterValue);
    }

    // Apply gender filter if selected
    if (genderFilter !== "") {
      tempFilteredData = tempFilteredData.filter(data => data.category === genderFilter);
    }
     if (TypeFilter !== ""){
      tempFilteredData = tempFilteredData.filter(data => data.type ===TypeFilter);
     }
    setFilteredData(tempFilteredData);
  }, [Datas, filterType, filterValue, genderFilter,TypeFilter]);

  const handleGenderChange = (event) => {
    setGenderFilter(event.target.value);
  };
  const handleTypeChange = (event) => {
    setTypeFilter(event.target.value);
  };

  return (
    <div className="flex flex-col pt-24 items-center relative">
      <div>
        <h1 className="font-sb underline sticky top-[400px] h-full">
          {title} Products
        </h1>
      </div>
      {filterType === 'category' && (
  <div>
    <div>
      <input
        type="radio"
        value="TShirt"
        name="TShirt"
        id="TShirt"
        checked={TypeFilter === 'TShirt'}
        onChange={handleTypeChange}
      />
      <label htmlFor="TShirt" className="px-2">
        TShirt
      </label>
    </div>
    <div>
      <input
        type="radio"
        value="Shirt"
        name="Shirt"
        id="Shirt"
        checked={TypeFilter === 'Shirt'} // Corrected checked attribute
        onChange={handleTypeChange} // Corrected event handler
      />
      <label htmlFor="Shirt" className="px-2">
        Shirt
      </label>
    </div>
  </div>
)}
{ filterType ==='type' &&
<div>
<div>
<input
  type="radio"
  value="Men"
  name="gender"
  id="Men"
  checked={genderFilter === "Men"}
  onChange={handleGenderChange}
/>
<label htmlFor="Men" className="px-2">
  Men
</label>
</div>
<div>
<input
  type="radio"
  value="Women"
  name="gender"
  id="Women"
  checked={genderFilter === "Women"}
  onChange={handleGenderChange}
/>
<label htmlFor="Women" className="px-2">
  Women
</label>
</div>
</div>
}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="grid items-center Parent-filter py-10 lg:grid-cols-4 md:grid-cols-3 xsm:grid-cols-2"
        key={filteredData.length} // Use a unique key to force remount when data changes
      >
        {filteredData.map((data, i) => (
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
  );
};

export default FilteredItems;
