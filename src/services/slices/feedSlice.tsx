import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const acyncGetFeedsApi = createAsyncThunk(
  'ingredients/getFeedsApi',
  async () => getFeedsApi()
);

export type TFeedSlice = {
  orders: TOrder[];
  preloaderFeeds: boolean;
  total: number;
  totalToday: number;
  error: string | null;
};

const initialState: TFeedSlice = {
  orders: [],
  preloaderFeeds: false,
  total: 0,
  totalToday: 0,
  error: null
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getOrdersSlice: (state) => state.orders,
    getPreloaderFeeds: (state) => state.preloaderFeeds,
    getTotal: (state) => state.total,
    getTotalToday: (state) => state.totalToday
  },
  extraReducers(builder) {
    builder
      .addCase(acyncGetFeedsApi.pending, (state) => {
        state.preloaderFeeds = true;
        state.error = '';
      })
      .addCase(acyncGetFeedsApi.rejected, (state, action) => {
        state.preloaderFeeds = false;
        state.error = action.error.message || 'Ошибка';
      })
      .addCase(acyncGetFeedsApi.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.preloaderFeeds = false;
        state.error = '';
      });
  }
});

export const { getOrdersSlice, getPreloaderFeeds, getTotal, getTotalToday } =
  feedSlice.selectors;

export default feedSlice.reducer;
