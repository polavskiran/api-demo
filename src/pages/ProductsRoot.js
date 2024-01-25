import React from "react";
import { Outlet } from "react-router-dom";
import MenuBar from "../components/products/menuBar";

export const ProductsRoot = () => {
  return (
    <>
      {/* <MenuBar /> */}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default ProductsRoot;
