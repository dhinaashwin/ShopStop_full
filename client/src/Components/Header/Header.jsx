import React, { useState, useContext, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import NavBar from "../../images/menu.png";
import Search from "../../images/search.png";
import Close from "../../images/close.png";
import Bag from "../../images/shopping-cart.png";
import Avatar from "../../images/AvatarImg.png";
import { ShopContext } from "../../Context/ShopContext";
import Logo from '../../images/STICH.png'
import "./Header.css";

const Header = ({ onSearch }) => {
  const searchLinkRef = useRef(null);
  const [isToggle, setIsToggle] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartVisible, setCartVisibility] = useState(false);
  const { getTotalItemCount, updateSearchQuery } = useContext(ShopContext);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchButtonClick();
    }
  };
  const handleToggle = () => setIsToggle(!isToggle);

  const handleBagHover = () => setCartVisibility(true);

  const handleBagLeave = () => {
    setTimeout(() => {
      setCartVisibility(false);
    }, 700);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  console.log(searchQuery);

  const handleSearchClick = () => {
    setIsSearchVisible(!isSearchVisible);
    onSearch(searchInput);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchButtonClick = () => {
    updateSearchQuery(searchInput);
    setIsSearchVisible(false);
    searchLinkRef.current.click(); // Programmatically click the hidden link
  };
  const variants = {
    hidden: {
      opacity: [1, 1, 0.3, 0.3, 0],
      y: [0, -10, 50, 50, 50],
      x: [0, 0, 0, 0, -60],
      transition: {
        duration: 0.85,
        times: [0, 0.25, 0.6, 0.76, 1],
        ease: ["circOut", "circIn", "linear", "easeIn"],
      },
      transitionEnd: {
        x: 10,
        y: -60,
        opacity: 0,
      },
    },

    visible: {
      opacity: [0, 0, 0.9, 0.9, 1],
      y: [-60, -60, 0, 0, 0],
      x: [20, 20, 20, 20, 0],
      transition: {
        duration: 0.85,
        ease: ["circOut", "circIn", "linear", "easeIn"],
        times: [0, 0.25, 0.6, 0.76, 1],
      },
      transitionEnd: {
        y: 0,
        x: 0,
        opacity: 1,
      },
    },
  };

  return (
    <section className="Section-header relative">
      <div className="Parent-header flex items-center left-0 m-auto z-10 py-3 fixed w-full xsm:justify-between lg:px-10 xl:px-8 md:px-6 sm:px-8 xsm:px-2">
        <img
          src={NavBar}
          onClick={handleToggle}
          className={`md:w-10 h-auto xsm:w-[24px] transition-all duration-500 navbar-ic ${
            isToggle ? "opacity-0" : "navbar-ic"
          }`}
          alt=""
        />
        <AnimatePresence>
          {isToggle && (
            <motion.nav
              variants={variants}
              initial={{ opacity: 0 }}
              animate={isToggle ? "visible" : "hidden"}
              className="fixed left-0 flex flex-col gap-7 rounded-md pl-12 pt-12 xsm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] h-[100vh] bg-white navbar top-[40px] "
            >
              <Link to="/" className="custom-link" onClick={handleToggle}>
                Home
              </Link>
              <Link to="/men" className="custom-link" onClick={handleToggle}>
                Men
              </Link>
              <Link to="/women" className="custom-link" onClick={handleToggle}>
                Women
              </Link>
              <Link
                to="/discount"
                className="custom-link"
                onClick={handleToggle}
              >
                Discount
              </Link>
              <Link to="/login" className="custom-link" onClick={handleToggle}>
                Login
              </Link>
              <motion.img
                src={Close}
                alt=""
                srcset=""
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="close md:w-10 h-auto xsm:w-[20px] absolute top-[3rem] left-[80%]"
                onClick={handleToggle}
              />
            </motion.nav>
          )}
        </AnimatePresence>
        <div className="fixed md:-top-[10px] xsm:-top-[2px] left-[50%] flex Title_head xsm:w-40 xsm:h-5 md:w-auto">
        <img src={Logo} className="md:w-[250px] xsm:w-[150px] h-fit"></img>
        </div>

       
        <div className="flex md:gap-[2.5vw] xsm:gap-[2vw] items-center ">
          {isSearchVisible ? <img
            src={Close}
            className="h-auto md:w-10 xsm:w-[20px] cursor-pointer "
            alt=""
            onClick={handleSearchClick}
          />:  <img
          src={Search}
          className="h-auto md:w-10 xsm:w-[24px] cursor-pointer "
          alt=""
          onClick={handleSearchClick}
        /> }
         
          {isSearchVisible && (
            <div className="absolute flex items-center gap-2 search-div lg:top-3 lg:left-[50%] md:top-16 md:-right-20 sm:top-12 sm:-right-8 xsm:top-12 xsm:-right-16 input-search-div">
              <input
                type="text"
                value={searchInput}
                onChange={handleSearchInputChange}
                className="input-search"
                onKeyDown={handleKeyPress}
              />

              <button
                className="sm:w-20 sm:h-10 xsm:w-14 xsm:h-7 bg-white text-black rounded-xl border border-spacing-12"
                onClick={handleSearchButtonClick}
              >
                Search
              </button>
              <Link
                to="/search"
                ref={searchLinkRef}
                style={{ display: "none" }}
              />
            </div>
          )}

          <Link to="/cart">
            <div
              onMouseEnter={handleBagHover}
              onMouseLeave={handleBagLeave}
              className="relative bag-icon"
            >
              {getTotalItemCount() > 0 && (
                <div className="md:w-7 md:h-7 xsm:w-[12px] xsm:h-[12px] bg-xRed text-white p-[1px] absolute round text-center xsm:left-[10px] md:left-[19.5px] xsm:top-[10px] md:top-[19px] md:text-[17px] xsm:text-[8px] z-50 ">
                  {getTotalItemCount()}
                </div>
              )}
                <img src={Bag} className="bag h-auto md:w-10 xsm:w-[24px]" alt="" />
            </div>
          </Link>
          <div>
            <img src={Avatar} className="h-auto md:w-10 xsm:w-[24px]" ></img>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
