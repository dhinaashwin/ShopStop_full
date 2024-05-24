import React from "react";
import FilteredItems from "./FilterItems/FilterItems";

const DiscountPage = () => {
  const filterCondition = (data) => data.discount === "true";
  return <FilteredItems filterCondition={filterCondition} />;
};

export default DiscountPage;