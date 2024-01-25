import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const INITIAL_CART_STATE = {
  userId: null,
  cart: [],
  totalProducts: null,
  totalQuantity: null,
  totalPrice: null,
  openDialog: false,
};

export const addProductToCart = createAsyncThunk(
  "products/add-product",
  async ({ userId, products }) => {
    const resp = fetch("https://dummyjson.com/carts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: 1,
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
  },
  extraReducers: (builder) => {
    builder.addCase(addProductToCart.fulfilled, (state, action) => {
      const objResponse = action.payload;
      console.log("objResponse= ", objResponse);

      // get existing cart details
      const existingCart = [...state.cart];
      const isProductExists = existingCart[objResponse.id].products.findIndex((product) => product.id === objResponse.products[0].id);

    });
  },
});

export const { addProduct, setOpenDialog } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
