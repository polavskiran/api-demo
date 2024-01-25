import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const RECIPE_INITIAL_STATE = {
    recipeDetails: []
};

export const getRecipes = createAsyncThunk(
    "recipe/getRecipes",
    async (id) => {
        const response = await fetch('https://dummyjson.com/recipes?limit=0&skip=0');
        const resp = await response.json();

        return resp;
    }
)

export const recipeSlice = createSlice({
    name: "recipe",
    initialState: RECIPE_INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getRecipes.fulfilled, (state, action) => {
            state.recipeDetails = [...state.recipeDetails, action.payload];
        })
    }
});

export const recipeReducer = recipeSlice.reducer;