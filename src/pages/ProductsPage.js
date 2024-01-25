import React, { Suspense } from "react";
import { json, defer } from "react-router-dom";
import Products from "../components/products/products";
import { useSelector } from "react-redux";

export const ProductsPage = () => {
  // const { products } = useLoaderData();
  const allProducts = useSelector(state => state.products?.products);

  const RECORDS_PER_PAGE = 10;
  const nPages = Math.ceil(allProducts.length / RECORDS_PER_PAGE);

  return (
    // <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
    //   <Await resolve={products}>
    //     {(loadedProducts) => <Products products={loadedProducts} />}
    //   </Await>
    // </Suspense>
    <Products products={allProducts} numPages={nPages} />
  );
};

const loadProducts = async () => {
  const response = await fetch("https://dummyjson.com/products?limit=0");

  if (!response.ok) {
    throw json(
      {
        message: "Could not fetch products!",
      },
      {
        status: 500,
      }
    );
  } else {
    const respData = await response.json();
    return respData.products;
  }
};

export const loader = () => {
  return defer({
    products: loadProducts(),
  });
};

export default ProductsPage;
