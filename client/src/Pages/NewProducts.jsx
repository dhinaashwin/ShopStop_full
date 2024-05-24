import React from "react";
import FilteredItems from "./FilterItems/FilterItems";
const newProducts = ({ type }) => {
  const filterCondition = (data) => data.newProduct === true;
  return <FilteredItems filterCondition={filterCondition} />;
};
export default newProducts;