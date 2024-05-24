import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../Context/ShopContext";
import { Link } from "react-router-dom";
import Add from "../../images/more.png";
import Minus from "../../images/minus.png";
import "./Cart.css";
import Cancel from "../../images/close.png";
const Cart = () => {
  const { Datas, cartItems, addToCart, removeFromCart, removeFromCartAll } =
    useContext(ShopContext);
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
  }, [Datas]); // Watch for changes in the Datas array

  // Function to calculate total order value
  const calculateTotalOrderValue = () => {
    let total = 0;
    Datas.forEach((data) => {
      const item = cartItems[data.id];
      if (item) {
        Object.keys(item).forEach((size) => {
          total += data.new_price * item[size];
        });
      }
    });
    return total;
  };
  useEffect(() => {
    const handleScroll = () => {
      const scrollButtons = document.getElementById('scrollButtons-2');
      if (scrollButtons) {
        if (window.innerWidth <= 768) { // Check if viewport width is less than or equal to 768px
          if (window.scrollY <= 100) { // Check if the scroll position is less than or equal to 100px
            scrollButtons.style.display = 'flex'; // Show the buttons
          } else {
            scrollButtons.style.display = 'flex'; // Hide the buttons
          }
        } else {
          // Hide the buttons if viewport width is greater than 768px
          scrollButtons.style.display = 'flex';
        }
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  // Function to calculate delivery charge
  const calculateDeliveryCharge = () => {
    const totalOrderValue = calculateTotalOrderValue();
    return totalOrderValue >= 2000 ? 0 : 100;
  };

  const handleIncrement = (itemId, size) => {
    addToCart(itemId, size);
  };

  const handleDecrement = (itemId, size) => {
    removeFromCart(itemId, size);
  };
  const handleRemove = (itemId, size) => {
    removeFromCartAll(itemId, size);
  };

  return (
    <div className="Parent-cart md:mt-32 xsm:mt-20 flex w-full relative ">
      {loading ? ( // Display loader if loading state is true
        <div class="loader"></div>
      ) : (
        <div className="boxes flex xsm:flex-col md:flex-row">
          <div className="box-1 md:w-[50vw] xsm:w-[90vw]">
            {cartItems &&
            Object.keys(cartItems).some(
              (id) => Object.keys(cartItems[id]).length > 0
            ) ? (
              <div className="flex flex-col gap-4">
                <h2>Shopping Cart items</h2>
                {Datas.map((data) => {
                  const item = cartItems[data.id];
                  const sizes = Object.keys(item);
                  return sizes.map((size, index) => (
                    <div
                      className="md:w-[50vw] relative xsm:w-full"
                      style={{
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                        borderRadius: "8px", // Optional: Add border radius for rounded corners
                      }}
                      key={`${data.id}_${index}`}
                    >
                      <div className="flex items-center p-5 gap-8">
                        <img
                          src={data.image}
                          className="md:w-[90px] lg:w-[110px] h-fit xsm:w-[80px] sm:w-[60px] rounded-lg object-cover"
                          alt=""
                        />
                        <img
                          src={Cancel}
                          className="md:w-4 xsm:w-4 h-auto absolute top-2 right-6"
                          onClick={() => handleRemove(data.id, size)}
                        ></img>
                        <div>
                          <Link
                            className="flex flex-col "
                            to={`/product/${data.id}`}
                            key={`${data.id}_${index}`}
                          >
                            <h2>{data.Category_Type} </h2>

                            <h3 style={{ ":hover": { color: "red" } }} className="opacity-90">
                              {data.title}
                            </h3>
                          </Link>

                          <div>
                            <div>
                              <h2>Rs {data.new_price}</h2>
                              <h3 className="text-red-500">
                                Size: <span>{size}</span>
                              </h3>{" "}
                              {/* Render the selected size */}
                            </div>

                            <div className="flex items-center gap-4 mt-1">
                              <img
                                src={Minus}
                                className="md:w-5 h-fit xsm:w-5 "
                                onClick={() => handleDecrement(data.id, size)}
                              ></img>
                              <h3>{item[size]}</h3>
                              <img
                                src={Add}
                                className="md:w-5 h-fit xsm:w-5 "
                                onClick={() => handleIncrement(data.id, size)}
                              ></img>
                            </div>

                            <h2 className="absolute bottom-1 right-2">
                              Rs {data.new_price * item[size]}
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  ));
                })}
              </div>
            ) : (
              <div className="flex items-center py-36">
                <h1 className="text-center">The Shopping Cart is empty</h1>
              </div>
            )}
            
          </div>
          <div className="box-2 md:w-[30vw] md:mt-8 sticky top-[100px] h-[100px]">
          {cartItems &&
            Object.keys(cartItems).some(
              (id) => Object.keys(cartItems[id]).length > 0
            ) && <div className="flex flex-col gap-1 md:mt-0 xsm:mt-12 items-center">
              <div className="md:flex flex-col items-center xsm:hidden">
                  <div className="flex gap-4 justify-center">
                    <div className="flex flex-col gap-2">
                    <h3 >Order Value</h3>
                    <h3>Delivery Charge</h3>
                    <h3 className="font-sb">Total</h3>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3>: Rs{" "}{calculateTotalOrderValue()}</h3>
                      <h3>: Rs{" "}{calculateDeliveryCharge()}</h3>
                      <h3 className="font-b">: Rs{" "}{calculateTotalOrderValue() + calculateDeliveryCharge()} </h3>
                  </div>
                  </div>
                  <div className="btn-product-black xsm:mt-5">
                    <button className=""> Proceed To checkout</button>
                  </div>
              </div>
              <div id="scrollButtons-2" className="md:hidden xsm:flex justify-evenly items-center fixed bottom-0 gap-[1vw] bg-white w-full h-fit py-2">
                <div className="flex items-center">
              <h3 className="font-sb text-[20px]">Total</h3>
              <h3 className="font-b text-[20px] opacity-85">: Rs{" "}{calculateTotalOrderValue()}</h3>
              </div>
              <div>
                  <Link to='/dhina'>  <button className="btn-product-black"> Proceed To checkout</button></Link> 
                  </div>
                </div>
              </div>}
          </div>
        </div>
      )}

      
    </div>
  );
};

export default Cart;
