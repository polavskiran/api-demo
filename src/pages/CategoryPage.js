import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const CategoryPage = () => {
  const { categoryId } = useParams();
  const allProducts = useSelector((state) => state.products?.products);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (allProducts && categoryId) {
      const filtered = allProducts.filter(
        (product) => product.category === categoryId
      );
      setFilteredProducts(filtered);
    }
  }, [allProducts, categoryId]);

  return (
    <>
      <h2>{categoryId.toUpperCase()}</h2>
      {filteredProducts?.map((product) => {
        return (
          <div class="productItem">
            <div class="productItem-Img">
              <Link to={`../${product.id}`}>
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
                <Link to={`../${product.id}`}>{product.title}</Link>
              </h2>
              <p class="productContent">
                <Link to={`../${product.id}`}>{product.description}</Link>
              </p>
              <span class="itemPrice">{`$ ${product.price}`}</span>
              <span class="discountBox">{`${product.discountPercentage}% OFF`}</span>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CategoryPage;
