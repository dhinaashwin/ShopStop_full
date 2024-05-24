import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import "./App.css";
import ScrollToTop from "./Animations/ScrolltoTop";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import RoutesConfig from './RoutesConfig'; // Importing the Routes component
import { motion } from 'framer-motion'; // Import motion from framer-motion

function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // Set loading to true when API endpoint changes
    setLoading(true);

    // Simulate API call delay
    const delay = setTimeout(() => {
      setLoading(false);
    }, 1500);

    // Clean up the timeout to prevent memory leaks
    return () => clearTimeout(delay);
  }, []); // Watch for changes in the Datas array

  const handleSearch = (query) => {
    // Implement your search logic here
    console.log("Search query:", query);
    // You can perform search-related actions here, such as updating state, making API calls, etc.
  };

 return (
  loading ? ( // Display loader if loading state is true
    <div className="loader"></div>
  ) : (
    <BrowserRouter basename="/ShopStop">
      <motion.div  initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }} className="container-all">
        <div className="App flex flex-col xl:items-center">
          <Header onSearch={handleSearch} />
          <div className="container-1 xl:px-16 lg:px-20 md:px-6 xsm:px-0 sm:px-2 flex flex-col m-auto ">
            <ScrollToTop/>
            <RoutesConfig /> {/* Using the Routes component */}
          </div>
        </div>
        <div className="container-2">
          <Footer />
        </div>
      </motion.div>
    </BrowserRouter>
  )
);

}

export default App;
