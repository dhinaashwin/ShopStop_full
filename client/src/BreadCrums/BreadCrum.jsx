import React from "react";
import RightArrow from "../images/right-arrow.png";
const BreadCrum = (props) => {
  const { product } = props;
  return (
    <div className="Parent-breadCrum px-8 xsm:pt-14 md:pt-28 flex items-center gap-1 md:text-[14px] opacity-75">
      <p className="xsm:text-[13px]">Home </p>
      <img src={RightArrow} className="w-3 h-3 " alt="" />
      <p className="xsm:text-[13px]">{product.category} </p>
      <img src={RightArrow} className="w-3 h-3" alt="" />
      <p className="xsm:text-[13px]">
        {product.title.length > 30
          ? `${product.title.slice(0, 30)}...`
          : product.title}
      </p>
    </div>
  );
};

export default BreadCrum;
