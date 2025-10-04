import userSliceReducer, {
  TUserSlice,
  errorCleaner,
  userGetOrdersApi,
  userRegisterUserApi,
  userLoginUserApi,
  userGetUserApi,
  userUpdateUserApi,
  userLogoutApi
} from './userSlice';
import {
  userOrders,
  registerData,
  loginData,
  userData,
  updateNameData,
  updatedUser
} from './dataForTests';

describe('тесты редьюсера user', () => {
  const initialState: TUserSlice = {
    user: null,
    preloaderLogin: false,
    userOrders: [],
    preloaderOrderUs: false,
    isAuthChecked: false,
    error: null
  };
  describe('тесты userGetOrdersApi', () => {
    test('тест pending', async () => {
      const action = userGetOrdersApi.pending('requestData');
      const newState = userSliceReducer(initialState, action);

      expect(newState.preloaderOrderUs).toBe(true);
      expect(newState.error).toBe('');
    });

    test('тест rejected', async () => {
      const action = {
        type: userGetOrdersApi.rejected.type,
        error: { message: 'ОШИБКА ЗАГРУЗКИ ЗАКАЗОВ' }
      };
      const newState = userSliceReducer(initialState, action);

      expect(newState.preloaderOrderUs).toBe(false);
      expect(newState.error).toBe('ОШИБКА ЗАГРУЗКИ ЗАКАЗОВ');
    });

    test('тест fulfilled', async () => {
      const action = userGetOrdersApi.fulfilled(userOrders, 'fulfilled');
      const newState = userSliceReducer(initialState, action);

      expect(newState.userOrders).toEqual(userOrders);
      expect(newState.preloaderOrderUs).toBe(false);
      expect(newState.error).toBe('');
    });
  });

  describe('тесты userRegisterUserApi', () => {
    test('тест pending', async () => {
      const action = userRegisterUserApi.pending('requstdata', registerData);
      const newState = userSliceReducer(initialState, action);

      expect(newState.preloaderLogin).toBe(true);
      expect(newState.error).toBe('');
      expect(newState.isAuthChecked).toBe(false);
    });

    test('тест rejected', async () => {
      const action = {
        type: userRegisterUserApi.rejected.type,
        payload: registerData,
        error: { message: 'ОШИБКА РЕГИСТАРЦИИ' }
      };
      const newState = userSliceReducer(initialState, action);

      expect(newState.preloaderLogin).toBe(false);
      expect(newState.error).toBe('ОШИБКА РЕГИСТАРЦИИ');
    });

    test('тест fulfilled', async () => {
      const action = userRegisterUserApi.fulfilled(
        userData,
        'requstdata',
        registerData
      );
      const newState = userSliceReducer(initialState, action);

      expect(newState.preloaderLogin).toBe(false);
      expect(newState.error).toBe('');
      expect(newState.isAuthChecked).toBe(true);
      expect(newState.user).toEqual(userData);
    });
  });

  describe('тесты userLoginUserApi', () => {
    test('тест pending', async () => {
      const action = userLoginUserApi.pending('requstdata', loginData);
      const newState = userSliceReducer(initialState, action);

      expect(newState.preloaderLogin).toBe(true);
      expect(newState.error).toBe('');
    });

    test('тест rejected', async () => {
      const action = {
        type: userLoginUserApi.rejected.type,
        payload: loginData,
        error: { message: 'ОШИБКА ВХОДА' }
      };
      const newState = userSliceReducer(initialState, action);

      expect(newState.preloaderLogin).toBe(false);
      expect(newState.error).toBe('ОШИБКА ВХОДА');
    });

    test('тест fulfilled', async () => {
      const action = userLoginUserApi.fulfilled(
        userData,
        'requstdata',
        loginData
      );
      const newState = userSliceReducer(initialState, action);

      expect(newState.preloaderLogin).toBe(false);
      expect(newState.error).toBe('');
      expect(newState.isAuthChecked).toBe(true);
      expect(newState.user).toEqual(userData);
    });
  });

  describe('тесты userGetUserApi', () => {
    test('тест pending', async () => {
      const action = userGetUserApi.pending('requestData');
      const newState = userSliceReducer(initialState, action);

      expect(newState.preloaderLogin).toBe(true);
      expect(newState.isAuthChecked).toBe(false);
      expect(newState.error).toBe('');
    });

    test('тест rejected', async () => {
      const initialStateUserData = { ...initialState, user: userData };
      const action = {
        type: userGetUserApi.rejected.type,
        error: { message: 'ОШИБКА ПОЛУЧЕНИЯ ДАННЫХ ПОЛЬЗОВАТЕЛЯ' }
      };
      const newState = userSliceReducer(initialStateUserData, action);

      expect(newState.preloaderLogin).toBe(false);
      expect(newState.error).toBe('ОШИБКА ПОЛУЧЕНИЯ ДАННЫХ ПОЛЬЗОВАТЕЛЯ');
      expect(newState.user).toBeNull();
    });

    test('тест fulfilled', async () => {
      const action = userGetUserApi.fulfilled(
        { success: true, user: userData },
        'requestData'
      );
      const newState = userSliceReducer(initialState, action);

      expect(newState.preloaderLogin).toBe(false);
      expect(newState.error).toBe('');
      expect(newState.isAuthChecked).toBe(true);
      expect(newState.user).toEqual(userData);
    });
  });

  describe('тесты userUpdateUserApi', () => {
    test('тест pending', async () => {
      const action = userUpdateUserApi.pending('requstdata', updateNameData);
      const newState = userSliceReducer(initialState, action);

      expect(newState.preloaderLogin).toBe(true);
      expect(newState.error).toBe('');
    });

    test('тест rejected', async () => {
      const action = {
        type: userUpdateUserApi.rejected.type,
        payload: updateNameData,
        error: { message: 'ОШИБКА ИЗМЕНЕНИЯ' }
      };
      const newState = userSliceReducer(initialState, action);

      expect(newState.preloaderLogin).toBe(false);
      expect(newState.error).toBe('ОШИБКА ИЗМЕНЕНИЯ');
    });
    test('тест fulfilled', async () => {
      const action = userUpdateUserApi.fulfilled(
        { success: true, user: updatedUser },
        'requstdata',
        updateNameData
      );
      const newState = userSliceReducer(initialState, action);

      expect(newState.preloaderLogin).toBe(false);
      expect(newState.error).toBe('');
      expect(newState.isAuthChecked).toBe(true);
      expect(newState.user).toEqual(updatedUser);
    });
  });

  describe('тесты userLogoutApi', () => {
    test('тест pending', async () => {
      const initialStateUserData = {
        ...initialState,
        user: userData,
        isAuthChecked: true
      };
      const action = userLogoutApi.pending('requestData');
      const newState = userSliceReducer(initialStateUserData, action);

      expect(newState.preloaderLogin).toBe(false);
      expect(newState.isAuthChecked).toBe(false);
      expect(newState.error).toBe('');
      expect(newState.user).toBeNull();
    });

    test('тест rejected', async () => {
      const action = {
        type: userLogoutApi.rejected.type,
        error: { message: 'ОШИБКА ПРИ ВЫХОДЕ' }
      };
      const newState = userSliceReducer(initialState, action);

      expect(newState.preloaderLogin).toBe(false);
      expect(newState.error).toBe('ОШИБКА ПРИ ВЫХОДЕ');
    });

    test('тест fulfilled', async () => {
      const initialStateUserData = {
        ...initialState,
        user: userData,
        isAuthChecked: true
      };
      const action = userLogoutApi.fulfilled(undefined, 'requestData');
      const newState = userSliceReducer(initialStateUserData, action);

      expect(newState.preloaderLogin).toBe(false);
      expect(newState.error).toBe('');
      expect(newState.user).toBeNull();
    });
  });

  test('тестирование очистки заказов errorCleaner', () => {
    const initialState: TUserSlice = {
      user: null,
      preloaderLogin: false,
      userOrders: [],
      preloaderOrderUs: false,
      isAuthChecked: false,
      error: 'ошибка авторизации'
    };

    const newOrderState = userSliceReducer(initialState, errorCleaner());
    expect(newOrderState.error).toBe(null);
    expect(newOrderState.user).toBeNull();
    expect(newOrderState.preloaderLogin).toBe(false);
  });
});
