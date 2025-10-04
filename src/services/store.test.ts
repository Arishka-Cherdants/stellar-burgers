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

  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
      ingredients: ingredientsInitialState,
      constructorBurger: сonstructorInitialState,
      user: userInitialState,
      order: orderInitialState,
      feed: feedInitialState,
      profileFeed: profileFeedInitialState
    }
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

  test('тест инициализация слайсов с ожидаемыми initialStates', () => {
    const state = store.getState();
    expect(state.ingredients).toEqual(ingredientsInitialState);
    expect(state.constructorBurger).toEqual(сonstructorInitialState);
    expect(state.user).toEqual(userInitialState);
    expect(state.order).toEqual(orderInitialState);
    expect(state.feed).toEqual(feedInitialState);
    expect(state.profileFeed).toEqual(profileFeedInitialState);
  });

  test('тест проверки возвращаемых данных редьюсером', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });
    const newState = rootReducer(initialState, { type: 'UNKNOWN_ACTION' });
    expect(newState).toEqual(initialState);
  });

  test('тест store экшенами для каждого слайса', () => {
    expect(ingredientsReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      ingredientsReducer(undefined, { type: '' })
    );

    expect(
      constructorSliceReducer(undefined, { type: 'UNKNOWN_ACTION' })
    ).toEqual(constructorSliceReducer(undefined, { type: '' }));

    expect(userSliceReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      userSliceReducer(undefined, { type: '' })
    );

    expect(orderSliceReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      orderSliceReducer(undefined, { type: '' })
    );

    expect(feedSliceReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      feedSliceReducer(undefined, { type: '' })
    );

    expect(
      profileFeedSliceReducer(undefined, { type: 'UNKNOWN_ACTION' })
    ).toEqual(profileFeedSliceReducer(undefined, { type: '' }));
  });
  test('тест влияние несуществующих экшенов на изменение слайсов', () => {
    const testActions = [
      { type: 'FIRST_ACTION' },
      { type: 'SECOND_ACTION' },
      { type: 'THIRD_ACTION' }
    ];

    testActions.forEach((action) => {
      const state = store.getState();
      store.dispatch(action);
      const newState = store.getState();
      expect(newState).toEqual(state);
    });
  });
});
