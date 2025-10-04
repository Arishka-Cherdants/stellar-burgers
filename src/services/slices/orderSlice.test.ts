import orderSliceReducer, {
  TOrderSlice,
  clearOrder,
  getOrderBurgerApi
} from './orderSlice';
import { order } from './dataForTests';
import { TNewOrderResponse } from '../../utils/burger-api';

describe('тесты редьюсера order', () => {
  const initialState: TOrderSlice = {
    order: null,
    preloaderOrd: false,
    error: ''
  };
  describe('тесты getOrderBurgerApi', () => {
    test('тест pending', async () => {
      const action = getOrderBurgerApi.pending(
        'requestData',
        order.ingredients
      );
      const newState = orderSliceReducer(initialState, action);

      expect(newState.preloaderOrd).toBe(true);
      expect(newState.error).toBe('');
      expect(newState.order).toBeNull();
    });

    test('тест rejected', async () => {
      const action = {
        type: getOrderBurgerApi.rejected.type,
        error: { message: 'ОШИБКА ЗАГРУЗКИ ЗАКАЗА' }
      };
      const newState = orderSliceReducer(initialState, action);

      expect(newState.preloaderOrd).toBe(false);
      expect(newState.error).toBe('ОШИБКА ЗАГРУЗКИ ЗАКАЗА');
      expect(newState.order).toBeNull();
    });

    test('тест fulfilled', async () => {
      const testOrder: TNewOrderResponse = {
        order: order,
        name: 'testOrder',
        success: true
      };

      const action = getOrderBurgerApi.fulfilled(
        testOrder,
        'fulfilled',
        order.ingredients
      );
      const newState = orderSliceReducer(initialState, action);

      expect(newState.preloaderOrd).toBe(false);
      expect(newState.error).toBe('');
      expect(newState.order).toEqual(order);
    });
  });

  test('тестирвоание очистки заказа clearOrder', () => {
    const newState = orderSliceReducer(initialState, clearOrder());
    expect(newState.order).toBeNull();
    expect(newState.preloaderOrd).toBe(false);
    expect(newState.error).toBe('');
  });
});
