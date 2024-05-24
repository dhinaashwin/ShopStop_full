import React, { createContext, useState, useEffect } from 'react';
import Datas from "../Components/Data/AllDatas";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    Datas.forEach(item => {
        cart[item.id] = {};
    });
    return cart;
};

const ShopContextProvider = (props) => {
    // Retrieve state from local storage on component mount
    const [cartItems, setCartItems] = useState(() => {
        const storedCartItems = localStorage.getItem('cartItems');
        return storedCartItems ? JSON.parse(storedCartItems) : getDefaultCart();
    });

    const [searchQuery, setSearchQuery] = useState(() => {
        return localStorage.getItem('searchQuery') || '';
    });

    const [clickedImage, setClickedImage] = useState(() => {
        return localStorage.getItem('clickedImage') || null;
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem('searchQuery', searchQuery);
    }, [searchQuery]);

    useEffect(() => {
        localStorage.setItem('clickedImage', clickedImage);
    }, [clickedImage]);

    const addToCart = (itemId, size) => {
        setCartItems(prev => {
            const updatedCart = { ...prev };
            const item = updatedCart[itemId];
            const quantity = item[size] ? item[size] + 1 : 1;
            return { ...prev, [itemId]: { ...item, [size]: quantity } };
        });
    };

    const removeFromCart = (itemId, size) => {
        setCartItems(prev => {
            const updatedCart = { ...prev };
            const item = updatedCart[itemId];
            if (item && item[size]) {
                const quantity = item[size] - 1;
                if (quantity === 0) {
                    delete item[size];
                } else {
                    item[size] = quantity;
                }
            }
            return { ...prev, [itemId]: { ...item } };
        });
    };
    const removeFromCartAll = (itemId, size) => {
        setCartItems(prev => {
            const updatedCart = { ...prev };
            const item = updatedCart[itemId];
            if (item && item[size]) {
                delete item[size];
            }
            return { ...prev, [itemId]: { ...item } };
        });
    };


    const getTotalItemCount = () => {
        let totalCount = 0;
        Object.values(cartItems).forEach(item => {
            Object.values(item).forEach(quantity => {
                totalCount += quantity;
            });
        });
        return totalCount;
    };

    const updateSearchQuery = (query) => {
        setSearchQuery(query);
    };

    const updateClickedImage = (imageUrl) => {
        setClickedImage(imageUrl);
    };

    const contextValue = { 
        Datas, 
        cartItems, 
        addToCart, 
        removeFromCart,
        removeFromCartAll, 
        getTotalItemCount, 
        searchQuery,
        updateSearchQuery ,
        clickedImage, 
        updateClickedImage 
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
