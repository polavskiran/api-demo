import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const INITIAL_CART_STATE = {
  userId: null,
  cart: [],
  totalProducts: null,
  totalQuantity: null,
  totalPrice: null,
  discountedTotal: null,
  openDialog: false,
};

export const addProductToCart = createAsyncThunk(
  "products/add-product",
  async ({ userId, products }) => {
    const resp = fetch("https://dummyjson.com/carts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: 2,
        products: [...products],
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));

    return resp;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState: INITIAL_CART_STATE,
  reducers: {
    addProduct: (state, action) => {
      const newProduct = action.payload;
      // state.products.push({...action.payload});
      let newQuantity = 1;
      const existingProducts = [...state.cart];

      const prdIndex = existingProducts.findIndex(
        (cp) => cp.id === newProduct.id
      );
      if (prdIndex >= 0) {
        // Product already exists in the cart so we just need to update its quantity
        newQuantity += existingProducts[prdIndex].quantity;
        existingProducts[prdIndex].quantity = newQuantity;
      } else {
        state.cart.push({ ...action.payload });
      }

      let totalItems = 0;
      state.cart.forEach((prd) => {
        totalItems = prd.quantity + totalItems;
      });

      state.totalItems = totalItems;
    },
    setOpenDialog: (state, action) => {
      state.openDialog = action.payload;
    },
    resetCartState: (state, action) => {
      state.cart = action.payload;
      state.totalPrice = 0;
      state.totalProducts = 0;
      state.totalQuantity = 0;
      state.discountedTotal = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addProductToCart.fulfilled, (state, action) => {
      let objResponse = { ...action.payload };
      objResponse = {
        [objResponse.id]: { ...objResponse },
      };
      const objKey = Object.keys(objResponse);

      // get existing cart details
      const existingCart = [...state.cart];

      if (existingCart.length === 0) {
        state.cart = [{ ...objResponse }];
      } else {
        let updatedObject = {};
        existingCart.forEach((obj, index, array) => {
          if (obj[objKey]) {
            const products = [...obj[objKey].products];

            // Verify if product is already exists
            const index = products.findIndex(
              (product) => product.id === objResponse[objKey].products[0].id
            );
            if (index >= 0) {
              products.splice(index, 1, ...objResponse[objKey].products);
            } else {
              products.push(...objResponse[objKey].products);
            }

            // products.push(...objResponse[objKey].products);
            // console.log("new products= ",products);
            updatedObject = {
              ...obj,
              [objKey]: {
                ...objResponse[objKey],
                products,
              },
            };
          }
        });
        state.cart = [{ ...updatedObject }];
        console.log("Cart products= ", { ...updatedObject });
        const productDetails = getProductDetails(
          [...updatedObject[objKey].products]
        );
        state.totalPrice = productDetails?.totalPrice;
        state.totalQuantity = productDetails?.totalQuantity;
        state.discountedTotal = productDetails?.discountedTotal;
        state.totalProducts = productDetails?.totalProducts;
      }
      // const productDetails = getProductDetails(...state?.cart[objKey]?.products);
      // state.totalPrice = productDetails?.totalPrice;
      // state.totalQuantity = productDetails?.totalQuantity;
      // state.discountedTotal = productDetails?.discountedTotal;
      // state.totalProducts = productDetails?.totalProducts;
    });
  },
});

const getProductDetails = (productsArray) => {
  console.log("productsArray= ", productsArray);
  return productsArray.reduce(
    (acc, obj, index) => {
      return {
        totalPrice: acc?.totalPrice + obj.total,
        totalQuantity: acc?.totalQuantity + obj.quantity,
        discountedTotal: acc?.discountedTotal + obj.discountedPrice,
        totalProducts: acc?.totalProducts + (index === 0 ? 1 : index),
      };
    },
    { totalPrice: 0, totalQuantity: 0, discountedTotal: 0, totalProducts: 0 }
  );
};

export const { addProduct, setOpenDialog, resetCartState } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
