import React from "react";
import { json, useRouteLoaderData } from "react-router-dom";
import classes from "./ProductDetailsPage.module.css";
import DisplayImages from "./displayImages";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { addProductToCart } from "../reduxModule/cartSlice";
import { addProduct } from "../reduxModule/cartSlice";

export const ProductDetailsPage = () => {
  const data = useRouteLoaderData("productDetail");
  const dispatch = useDispatch();
  const [products, setProducts] = React.useState({});
  const existingProducts = useSelector(state => state.cart.products);

  const addToCartHandler = () => {
    let newQuantity = 1;
    let updatedCartItems = { ...products };
    console.log(updatedCartItems);

    if (Object.keys(updatedCartItems).length > 0) {
      newQuantity = updatedCartItems.quantity + 1;
      updatedCartItems.quantity = newQuantity;
    } else {
      updatedCartItems = { id: data.id, quantity: 1 };
    }

    setProducts({ ...updatedCartItems });
    // dispatch(addProduct({ ...updatedCartItems }));
    dispatch(addProductToCart({ products: [{...updatedCartItems}] }));
  };

  return (
    <div className={classes.mainContainer}>
      <div class="middleInfo">
        <h1>{data.title}</h1>
        <span>{data.description}</span>
      </div>
      <div class="leftInfo">
        <DisplayImages images={data.images} />
      </div>
      <div>
        <Button
          id="addToCart"
          variant="contained"
          size="medium"
          onClick={() => addToCartHandler()}
        >
          Add To Cart
        </Button>
        {/* <Button
          id="submitToCart"
          variant="outlined"
          size="medium"
          onClick={() => submitToCart()}
        >
          Submit
        </Button> */}
      </div>
    </div>
  );
};

export const loader = async ({ request, params }) => {
  const id = params.productId;

  const respData = await fetch(`https://dummyjson.com/products/${id}`);
  if (!respData.ok) {
    throw json(
      {
        message: "Error in loading product details!",
      },
      {
        status: 500,
      }
    );
  } else {
    const resp = await respData.json();
    return resp;
  }
};

export default ProductDetailsPage;
