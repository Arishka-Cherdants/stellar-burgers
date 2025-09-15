import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getOrderBurgerApi = createAsyncThunk(
  'ingredients/getOdredBurger',
  async (data: string[]) => orderBurgerApi(data)
);

type TOrderSlice = {
  order: TOrder | null;
  preloaderOrd: boolean;
  error: string;
};

const initialState: TOrderSlice = {
  order: null,
  preloaderOrd: false,
  error: ''
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  selectors: {
    getOrderBurger: (state) => state.order,
    getPreloaderOrd: (state) => state.preloaderOrd
  },
  reducers: {
    clearOrder: (state) => {
      ((state.order = null), (state.preloaderOrd = false), (state.error = ''));
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getOrderBurgerApi.pending, (state) => {
        state.preloaderOrd = true;
        state.error = '';
      })
      .addCase(getOrderBurgerApi.rejected, (state, action) => {
        state.preloaderOrd = false;
        state.error = action.error.message || 'Ошибка загрузки заказа';
      })
      .addCase(getOrderBurgerApi.fulfilled, (state, action) => {
        state.order = action.payload.order;
        state.preloaderOrd = false;
        state.error = '';
      });
  }
});

export const { clearOrder } = orderSlice.actions;
export const { getOrderBurger, getPreloaderOrd } = orderSlice.selectors;
