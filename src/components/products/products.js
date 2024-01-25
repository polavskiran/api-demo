import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./products.css";
import { Pagination } from "@mui/material";
import { useSelector } from "react-redux";

export const Products = (props) => {
  const { products, numPages } = props;
  const allProducts = useSelector(state => state.products?.products);
  const [pageNum, setPageNum] = useState(1);
  const RECORDS_PER_PAGE = 10;
  const [shopProducts, setShopProducts] = useState(allProducts);
  const nPages = Math.ceil(products.length / RECORDS_PER_PAGE);

  // const [products, setProducts] = useState([]);

  /* useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((res) => setProducts(res));
  }, []); */

  // const products = require("./products.json");

  useEffect(() => {
    const limit = pageNum * RECORDS_PER_PAGE;
    setShopProducts(products.slice(limit - RECORDS_PER_PAGE, limit));
  }, [pageNum, products]);

  const handlePageChange = (event, page) => {
    setPageNum(page);
  };

  return (
    <React.Fragment>
      <div class="sp-wrp">
        <div class="sp-hd">
          <div class="sp-ttl-wrp">
            {shopProducts.length > 0 &&
              shopProducts?.map((product) => {
                return (
                  <div class="productItem">
                    <div class="productItem-Img">
                      <Link to={`${product.id}`}>
                        <img
                          key={product.thumbnail}
                          src={product.thumbnail}
                          alt="product pic"
                          title={product.description}
                        />
                      </Link>
                    </div>
                    <div class="productItem-cont">
                      <h2 class="productHdng">
                        <Link to={`${product.id}`}>{product.title}</Link>
                      </h2>
                      <p class="productContent">
                        <Link to={`${product.id}`}>{product.description}</Link>
                      </p>
                      <span class="itemPrice">{`$ ${product.price}`}</span>
                      <span class="discountBox">{`${product.discountPercentage}% OFF`}</span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div class="paginationDiv">
        <Pagination
          count={numPages}
          color="primary"
          onChange={handlePageChange}
        />
      </div>
    </React.Fragment>
  );
};

export default Products;
