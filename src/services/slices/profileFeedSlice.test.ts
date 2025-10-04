import profileFeedSliceReducer, {
  acyncGetProfileFeedsApi,
  TProfileFeedSlice
} from './prodileFeedSlice';
import { TOrderResponse } from '../../utils/burger-api';
import { userOrders } from './dataForTests';

describe('тесты редьюсера feed', () => {
  const initialState: TProfileFeedSlice = {
    order: null,
    preloaderOrder: false,
    error: null
  };
  describe('тесты acyncGetProfileFeedsApi', () => {
    test('тест pending', async () => {
      const action = acyncGetProfileFeedsApi.pending('requestData', 88817);
      const newState = profileFeedSliceReducer(initialState, action);

      expect(newState.preloaderOrder).toBe(true);
      expect(newState.error).toBe('');
      expect(newState.order).toBeNull();
    });

    test('тест rejected', async () => {
      const action = {
        type: acyncGetProfileFeedsApi.rejected.type,
        error: { message: 'ОШИБКА ЗАГРУЗКИ ЗАКАЗОВ' }
      };
      const newState = profileFeedSliceReducer(initialState, action);

      expect(newState.preloaderOrder).toBe(false);
      expect(newState.error).toBe('ОШИБКА ЗАГРУЗКИ ЗАКАЗОВ');
      expect(newState.order).toBeNull();
    });

    test('тест fulfilled', async () => {
      const testOrder: TOrderResponse = {
        orders: [userOrders[1]],
        success: true
      };
      const action = acyncGetProfileFeedsApi.fulfilled(
        testOrder,
        'fulfilled',
        88817
      );
      const newState = profileFeedSliceReducer(initialState, action);

      expect(newState.preloaderOrder).toBe(false);
      expect(newState.order).toEqual(userOrders[1]);
      expect(newState.error).toBe('');
    });
  });
});
