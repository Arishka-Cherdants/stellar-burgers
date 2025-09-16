import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { nanoid } from '@reduxjs/toolkit';

type TConstructorSlice = {
  constructorBurger: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  error: string | null;
};

const initialState: TConstructorSlice = {
  constructorBurger: {
    bun: null,
    ingredients: []
  },
  error: null
};

export const constructorSlice = createSlice({
  name: 'constructorBurger',
  initialState,
  selectors: {
    getConstructorBurger: (state) => state.constructorBurger
  },
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorBurger.bun = action.payload;
        } else {
          state.constructorBurger.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.constructorBurger.ingredients =
        state.constructorBurger.ingredients.filter(
          (item) => item.id !== action.payload.id
        );
    },
    clearConstructor: (state) => {
      state.constructorBurger.bun = null;
      state.constructorBurger.ingredients = [];
    },
    moveUp: (state, action) => {
      const index = action.payload;
      if (index > 0) {
        [
          state.constructorBurger.ingredients[index],
          state.constructorBurger.ingredients[index - 1]
        ] = [
          state.constructorBurger.ingredients[index - 1],
          state.constructorBurger.ingredients[index]
        ];
      }
    },
    moveDown: (state, action) => {
      const index = action.payload;
      if (index < state.constructorBurger.ingredients.length - 1) {
        [
          state.constructorBurger.ingredients[index],
          state.constructorBurger.ingredients[index + 1]
        ] = [
          state.constructorBurger.ingredients[index + 1],
          state.constructorBurger.ingredients[index]
        ];
      }
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  clearConstructor,
  moveUp,
  moveDown
} = constructorSlice.actions;

export const { getConstructorBurger } = constructorSlice.selectors;
