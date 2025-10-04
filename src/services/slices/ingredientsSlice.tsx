import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const getIngredientsList = createAsyncThunk(
  'ingredients/getIngredients',
  async () => getIngredientsApi()
);

export type TIngredientsSlice = {
  ingredients: TIngredient[];
  preloader: boolean;
  error: string;
};

const initialState: TIngredientsSlice = {
  ingredients: [],
  preloader: false,
  error: ''
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsItem: (state) => state.ingredients,
    getIngredientsPreloader: (state) => state.preloader
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsList.pending, (state) => {
        state.preloader = true;
        state.error = '';
      })
      .addCase(getIngredientsList.rejected, (state, action) => {
        state.preloader = false;
        state.error = action.error.message || 'Ошибка';
      })
      .addCase(getIngredientsList.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.preloader = false;
        state.error = '';
      });
  }
});

export const { getIngredientsItem, getIngredientsPreloader } =
  ingredientsSlice.selectors;
export default ingredientsSlice.reducer;
