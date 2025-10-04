import { nanoid } from '@reduxjs/toolkit';

import { ingredients } from './dataForTests';
import constructorSliceReducer, {
  TConstructorSlice,
  addIngredient,
  removeIngredient,
  clearConstructor,
  moveUp,
  moveDown
} from './constructorSlice';

jest.mock('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  nanoid: jest.fn()
}));

describe('тесты редьюсеров constructorSlice', () => {
  const mockNanoid = nanoid as jest.Mock;
  const initialState: TConstructorSlice = {
    constructorBurger: {
      bun: null,
      ingredients: []
    },
    error: null
  };

  const filledState: TConstructorSlice = {
    constructorBurger: {
      bun: { ...ingredients.buns[0], id: 'bun-1' },
      ingredients: [
        { ...ingredients.mainsAndSauce[0], id: 'ing-1' },
        { ...ingredients.mainsAndSauce[1], id: 'ing-2' }
      ]
    },
    error: null
  };

  beforeEach(() => {
    mockNanoid.mockReturnValue('ingId');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('тест обработка экшена добавления ингредиента addIngredient', () => {
    test('тест добавления булочки в пустой конструктор', () => {
      const action = addIngredient(ingredients.buns[0]);
      const newState = constructorSliceReducer(initialState, action);

      expect(newState.constructorBurger.bun).toEqual({
        ...ingredients.buns[0],
        id: 'ingId'
      });
    });

    test('тест добавления начинки в пустой конструктор', () => {
      const action = addIngredient(ingredients.mainsAndSauce[0]);
      const newState = constructorSliceReducer(initialState, action);

      expect(newState.constructorBurger.ingredients).toHaveLength(1);
      expect(newState.constructorBurger.ingredients[0]).toEqual({
        ...ingredients.mainsAndSauce[0],
        id: 'ingId'
      });
    });

    test('тест добавление начинки в заполненный конструктор', () => {
      const action = addIngredient(ingredients.mainsAndSauce[2]);
      const newState = constructorSliceReducer(filledState, action);

      expect(newState.constructorBurger.ingredients).toHaveLength(3);
      expect(newState.constructorBurger.ingredients[2]).toEqual({
        ...ingredients.mainsAndSauce[2],
        id: 'ingId'
      });
    });

    test('тест замены булочки', () => {
      const action = addIngredient(ingredients.buns[1]);
      const newState = constructorSliceReducer(filledState, action);

      expect(newState.constructorBurger.bun).toEqual({
        ...ingredients.buns[1],
        id: 'ingId'
      });
    });
  });

  test('тест обработка экшена удаления ингредиента removeIngredient', () => {
    const removingIngredient = filledState.constructorBurger.ingredients[0];
    const action = removeIngredient(removingIngredient);
    const newState = constructorSliceReducer(filledState, action);

    expect(newState.constructorBurger.ingredients).toHaveLength(1);
    expect(newState.constructorBurger.ingredients).not.toContainEqual(
      removingIngredient
    );
    expect(newState.constructorBurger.ingredients[0].id).toBe('ing-2');
  });

  describe('тест обработки экшена изменения порядка ингредиентов в начинке', () => {
    test('тестирование перемещение ингредиента вверх moveUp', () => {
      const action = moveUp(1);
      const newState = constructorSliceReducer(filledState, action);

      expect(newState.constructorBurger.ingredients[0].id).toBe('ing-2');
      expect(newState.constructorBurger.ingredients[1].id).toBe('ing-1');
    });

    test('тестирование перемещение ингредиента вниз moveDown', () => {
      const action = moveDown(0);
      const newState = constructorSliceReducer(filledState, action);

      expect(newState.constructorBurger.ingredients[0].id).toBe('ing-2');
      expect(newState.constructorBurger.ingredients[1].id).toBe('ing-1');
    });
  });

  test('тестирование очистки конструктора', () => {
    const action = clearConstructor();
    const newState = constructorSliceReducer(filledState, action);

    expect(newState.constructorBurger.bun).toBeNull();
    expect(newState.constructorBurger.ingredients).toHaveLength(0);
  });
});
