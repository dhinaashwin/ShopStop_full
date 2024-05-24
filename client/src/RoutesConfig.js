
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FilteredItems from './Pages/FilterItems/FilterItems';
import Homepage from './Pages/Homepage';
import Product from './Pages/Product';
import Cart from './Pages/Cart/Cart';
import SearchPage from './Pages/SearchPage/SearchPage';
import ImageModal from './Pages/ImageModal';
import AllProducts from './Pages/AllProducts';

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/allProducts" element={<AllProducts />} />
      <Route
        path="/Men"
        element={<FilteredItems filterType="category" filterValue="Men" title='Men' />}
      />
      <Route
        path="/Women"
        element={<FilteredItems filterType="category" filterValue="Women" title='Women' />}
      />
      <Route
        path="/discount"
        element={<FilteredItems filterType="discount" filterValue="true" title='Discount' />}
      />
      <Route
        path="/NewCollections"
        element={<FilteredItems filterType="newProduct" filterValue={true} title='New' />}
      />
      <Route
        path="/TShirt"
        element={<FilteredItems filterType="type" filterValue="TShirt" title="TShirt" />}
      />
      <Route
        path="/Denim"
        element={<FilteredItems filterType="materialType" filterValue="Denim"  />}
      />
      <Route
        path="/Shirt"
        element={<FilteredItems filterType="type" filterValue="Shirt" title="Shirt" />}
      />
      <Route
        path="/Bottom"
        element={<FilteredItems filterType="type" filterValue="Bottom" title="Bottom" />}
      />
      <Route
        path="/Shoe"
        element={<FilteredItems filterType="type" filterValue="Shoe" title="Shoe" />}
      />
      <Route
        path="/Hoodie"
        element={<FilteredItems filterType="type" filterValue="Hoodie" />}
      />
    
      <Route path="/product" element={<Product />}>
        <Route path=":productId" element={<Product />} />
      </Route>
      <Route path="/cart" element={<Cart />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/Modal" element={<ImageModal />} />
    </Routes>
  );
};

export default RoutesConfig;