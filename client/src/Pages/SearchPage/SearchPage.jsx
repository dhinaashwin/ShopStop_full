// SearchPage.js
import React, { useContext } from 'react';
import { ShopContext } from "../../Context/ShopContext";
import Item from "../../Components/Item/Item";
const SearchPage = () => {
    const { Datas, searchQuery } = useContext(ShopContext);

    const filteredProducts = Datas.filter(product =>
        searchQuery.toLowerCase().split(/\s+/).every(word =>
            product.allDetails.toLowerCase().includes(word)
        )
    );
    return (    
        <div className='pt-32 flex flex-col items-center Parent-filter'>
            <div>
            <h1>Search Results:</h1>
            </div>
            <div className='grid items-center Parent-filter py-10 lg:grid-cols-4 md:grid-cols-3 xsm:grid-cols-2'>
            {filteredProducts.map((product, index) => (
                <Item
                    key={index}
                    id={product.id}
                    title={product.title}
                    old_price={product.old_price}
                    new_price={product.new_price}
                    image={product.image}
                    image2={product.image2}
                />
               
            ))}
             </div>
        </div>
    );
};

export default SearchPage;
