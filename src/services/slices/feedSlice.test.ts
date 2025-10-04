import feedSliceReducer, { acyncGetFeedsApi, TFeedSlice } from './feedSlice';
import { TFeedsResponse } from '../../utils/burger-api';
import { userOrders } from './dataForTests';

describe('тесты редьюсера feed', () => {
  const initialState: TFeedSlice = {
    orders: [],
    preloaderFeeds: false,
    total: 0,
    totalToday: 0,
    error: null
  };

  describe('тесты acyncGetFeedsApi', () => {
    test('тест pending', async () => {
      const action = acyncGetFeedsApi.pending('requestData');
      const newState = feedSliceReducer(initialState, action);

      expect(newState.preloaderFeeds).toBe(true);
      expect(newState.error).toBe('');
      expect(newState.orders).toEqual([]);
      expect(newState.total).toBe(0);
      expect(newState.totalToday).toBe(0);
    });

    test('тест rejected', async () => {
      const action = {
        type: acyncGetFeedsApi.rejected.type,
        error: { message: 'ОШИБКА ЗАГРУЗКИ ЗАКАЗОВ' }
      };
      const newState = feedSliceReducer(initialState, action);

      expect(newState.preloaderFeeds).toBe(false);
      expect(newState.error).toBe('ОШИБКА ЗАГРУЗКИ ЗАКАЗОВ');
      expect(newState.orders).toEqual([]);
      expect(newState.total).toBe(0);
      expect(newState.totalToday).toBe(0);
    });

    test('тест fulfilled', async () => {
      const testOrder: TFeedsResponse = {
        orders: userOrders,
        total: 123,
        totalToday: 13,
        success: true
      };
      const action = acyncGetFeedsApi.fulfilled(testOrder, 'fulfilled');
      const newState = feedSliceReducer(initialState, action);

      expect(newState.preloaderFeeds).toBe(false);
      expect(newState.orders).toEqual(userOrders);
      expect(newState.total).toBe(123);
      expect(newState.totalToday).toBe(13);
      expect(newState.error).toBe('');
    });
  });
});
