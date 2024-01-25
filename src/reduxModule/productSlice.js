import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const PRODUCT_INITIAL_STATE = {  
  products: [],
  categories: [],
};

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async (params) => {
    const productsResp = await fetch(
      "https://dummyjson.com/products?limit=0&skip=0"
    );
    const response = await productsResp.json();

    return response.products;
  }
);

export const getAllCategories = createAsyncThunk(
  "categories/getAll",
  async () => {
    const response = await fetch("https://dummyjson.com/products/categories");
    const data = await response.json();

    return data;
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  "productsByCategory/fetch",
  async (category) => {
    const response = await fetch(
      "https://dummyjson.com/products/category/" + category
    );
    const data = await response.json();

    return data;
  }
);

export const addProductToCart = createAsyncThunk(
  "products/add-product",
  async ({ products }) => {
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

const productSlice = createSlice({
  name: "product",
  initialState: PRODUCT_INITIAL_STATE,
  reducers: {
    addProduct: (state, action) => {
      const newProduct = action.payload;
      // state.products.push({...action.payload});
      let newQuantity = 1;
      const existingProducts = [...state.products];

      const prdIndex = existingProducts.findIndex(
        (cp) => cp.id === newProduct.id
      );
      if (prdIndex >= 0) {
        // Product already exists in the cart so we just need to update its quantity
        newQuantity += existingProducts[prdIndex].quantity;
        existingProducts[prdIndex].quantity = newQuantity;
      } else {
        state.products.push({ ...action.payload });
      }

      let totalItems = 0;
      state.products.forEach((prd) => {
        totalItems = prd.quantity + totalItems;
      });

      state.totalProducts = totalItems;
    },
  },
  extraReducers: (builder) => {   
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

// export const { addProduct } = productSlice.actions;
export const productRecuder = productSlice.reducer;
