import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchAllProducts,
  getAllCategories,
} from "../reduxModule/productSlice";
import { getRecipes } from "../reduxModule/recipesSlice";
import { resetCartState } from "../reduxModule/cartSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  // const uuid = () => Math.random().toString(36).substr(2, 9);
  // console.log("uuid= ",uuid());

  useEffect(() => {
    dispatch(resetCartState([]));
    dispatch(fetchAllProducts());
    dispatch(getAllCategories());
    dispatch(getRecipes());
  }, [dispatch]);

  return (
    <>
      <h1>Home Page</h1>
    </>
  );
};

export default HomePage;
