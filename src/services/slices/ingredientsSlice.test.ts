import ingredientsReducer, {
  TIngredientsSlice,
  getIngredientsList
} from './ingredientsSlice';
import { ingredients } from './dataForTests';

describe('тестирование редьюсера ingredients', () => {
  test('тест getIngredientsList.pending', async () => {
    const initialState: TIngredientsSlice = {
      ingredients: [],
      preloader: false,
      error: ''
    };
    const action = { type: getIngredientsList.pending.type };
    const newState = ingredientsReducer(initialState, action);

    expect(newState.preloader).toBe(true);
    expect(newState.error).toBe('');
  });

  test('тест getIngredientsList.rejected', async () => {
    const initialState: TIngredientsSlice = {
      ingredients: [],
      preloader: false,
      error: ''
    };

    const action = {
      type: getIngredientsList.rejected.type,
      error: { message: 'ОШИБКА ЗАГРУЗКИ ИНГРЕДИЕНТОВ' }
    };

    const newState = ingredientsReducer(initialState, action);

    expect(newState.preloader).toBe(false);
    expect(newState.error).toBe('ОШИБКА ЗАГРУЗКИ ИНГРЕДИЕНТОВ');
  });

  test('тест getIngredientsList.fulfilled', async () => {
    const initialState: TIngredientsSlice = {
      ingredients: [],
      preloader: false,
      error: ''
    };

    const action = {
      type: getIngredientsList.fulfilled.type,
      payload: ingredients
    };

    const newState = ingredientsReducer(initialState, action);

    expect(newState.preloader).toBe(false);
    expect(newState.error).toBe('');
    expect(newState.ingredients).toEqual(ingredients);
  });
});
