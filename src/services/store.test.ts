import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './store';
import ingredientsReducer, {
  TIngredientsSlice
} from './slices/ingredientsSlice';
import constructorSliceReducer, {
  TConstructorSlice
} from './slices/constructorSlice';
import userSliceReducer, { TUserSlice } from './slices/userSlice';
import orderSliceReducer, { TOrderSlice } from './slices/orderSlice';
import feedSliceReducer, { TFeedSlice } from './slices/feedSlice';
import profileFeedSliceReducer, {
  TProfileFeedSlice
} from './slices/prodileFeedSlice';

describe('тест проверка правильной инициализации rootReducer', () => {
  const ingredientsInitialState: TIngredientsSlice = {
    ingredients: [],
    preloader: false,
    error: ''
  };

  const сonstructorInitialState: TConstructorSlice = {
    constructorBurger: {
      bun: null,
      ingredients: []
    },
    error: null
  };

  const userInitialState: TUserSlice = {
    user: null,
    preloaderLogin: false,
    userOrders: [],
    preloaderOrderUs: false,
    isAuthChecked: false,
    error: null
  };

  const orderInitialState: TOrderSlice = {
    order: null,
    preloaderOrd: false,
    error: ''
  };

  const feedInitialState: TFeedSlice = {
    orders: [],
    preloaderFeeds: false,
    total: 0,
    totalToday: 0,
    error: null
  };

  const profileFeedInitialState: TProfileFeedSlice = {
    order: null,
    preloaderOrder: false,
    error: null
  };

  const expectedInitialState = {
    ingredients: ingredientsInitialState,
    constructorBurger: сonstructorInitialState,
    user: userInitialState,
    order: orderInitialState,
    feed: feedInitialState,
    profileFeed: profileFeedInitialState
  };

  const store = configureStore({
    reducer: rootReducer,
    preloadedState: expectedInitialState
  });

  test('rootReducer возвращает корректное начальное состояние при UNKNOWN_ACTION', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(initialState).toEqual(expectedInitialState);
  });

  test('тест наличия в сторе всех слайсов', () => {
    const storeState = store.getState();

    expect(storeState).toHaveProperty('ingredients');
    expect(storeState).toHaveProperty('constructorBurger');
    expect(storeState).toHaveProperty('user');
    expect(storeState).toHaveProperty('order');
    expect(storeState).toHaveProperty('feed');
    expect(storeState).toHaveProperty('profileFeed');
  });

  test('тест ingredients', () => {
    expect(store.getState().ingredients).toEqual(
      ingredientsReducer(undefined, { type: 'UNKNOWN_ACTION' })
    );

    const getIngredientsListAction = {
      type: 'getIngredientsList'
    };
    store.dispatch(getIngredientsListAction);
    expect(store.getState().ingredients).toEqual(ingredientsInitialState);
  });

  test('тест constructorBurger', () => {
    expect(store.getState().constructorBurger).toEqual(
      constructorSliceReducer(undefined, { type: 'UNKNOWN_ACTION' })
    );
    const testActions = [
      { type: 'addIngredient' },
      { type: 'removeIngredient' },
      { type: 'moveUp' },
      { type: 'moveDown' },
      { type: 'clearConstructor' }
    ];

    testActions.forEach((action) => {
      const state = store.getState();
      store.dispatch(action);
      const newState = store.getState();
      expect(newState.constructorBurger).toEqual(сonstructorInitialState);
    });
  });

  test('тест user', () => {
    expect(store.getState().user).toEqual(
      userSliceReducer(undefined, { type: 'UNKNOWN_ACTION' })
    );

    const testActions = [
      { type: 'userGetOrdersApi' },
      { type: 'userRegisterUserApi' },
      { type: 'userLoginUserApi' },
      { type: 'userGetUserApi' },
      { type: 'userUpdateUserApi' },
      { type: 'userLogoutApi' },
      { type: 'errorCleaner' }
    ];

    testActions.forEach((action) => {
      const state = store.getState();
      store.dispatch(action);
      const newState = store.getState();
      expect(newState.user).toEqual(userInitialState);
    });
  });

  test('тест order', () => {
    expect(store.getState().order).toEqual(
      orderSliceReducer(undefined, { type: 'UNKNOWN_ACTION' })
    );

    const testActions = [{ type: 'clearOrder' }, { type: 'getOrderBurgerApi' }];

    testActions.forEach((action) => {
      const state = store.getState();
      store.dispatch(action);
      const newState = store.getState();
      expect(newState.order).toEqual(orderInitialState);
    });
  });

  test('тест feed', () => {
    expect(store.getState().feed).toEqual(
      feedSliceReducer(undefined, { type: 'UNKNOWN_ACTION' })
    );

    const acyncGetFeedsApiAction = {
      type: 'acyncGetFeedsApi'
    };
    store.dispatch(acyncGetFeedsApiAction);
    expect(store.getState().feed).toEqual(feedInitialState);
  });

  test('тест profileFeed', () => {
    expect(store.getState().profileFeed).toEqual(
      profileFeedSliceReducer(undefined, { type: 'UNKNOWN_ACTION' })
    );

    const acyncGetProfileFeedsApiAction = {
      type: 'acyncGetProfileFeedsApi'
    };
    store.dispatch(acyncGetProfileFeedsApiAction);
    expect(store.getState().profileFeed).toEqual(profileFeedInitialState);
  });
});
