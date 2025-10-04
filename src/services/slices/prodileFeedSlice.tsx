import { getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const acyncGetProfileFeedsApi = createAsyncThunk(
  'ingredients/getOrderByNumberApi',
  async (number: number) => getOrderByNumberApi(number)
);

export type TProfileFeedSlice = {
  order: TOrder | null;
  preloaderOrder: boolean;
  error: string | null;
};

const initialState: TProfileFeedSlice = {
  order: null,
  preloaderOrder: false,
  error: null
};

export const profileFeedSlice = createSlice({
  name: 'profileFeed',
  initialState,
  reducers: {},
  selectors: {
    getOrder: (state) => state.order,
    getPreloaderOrder: (state) => state.preloaderOrder
  },
  extraReducers(builder) {
    builder
      .addCase(acyncGetProfileFeedsApi.pending, (state) => {
        state.preloaderOrder = true;
        state.error = '';
      })
      .addCase(acyncGetProfileFeedsApi.rejected, (state, action) => {
        state.preloaderOrder = false;
        state.error = action.error.message || 'Ошибка';
      })
      .addCase(acyncGetProfileFeedsApi.fulfilled, (state, action) => {
        state.order = action.payload.orders[0];
        state.preloaderOrder = false;
        state.error = '';
      });
  }
});

export const { getOrder, getPreloaderOrder } = profileFeedSlice.selectors;
export default profileFeedSlice.reducer;
