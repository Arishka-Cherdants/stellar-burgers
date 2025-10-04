import { TOrder, TIngredient, TUser } from '@utils-types';
import { TRegisterData, TLoginData } from '@api';

type TIngredientsData = {
  buns: TIngredient[];
  mainsAndSauce: TIngredient[];
};

export const ingredients: TIngredientsData = {
  buns: [
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa093d',
      name: 'Флюоресцентная булка R2-D3',
      type: 'bun',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/bun-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
    }
  ],

  mainsAndSauce: [
    {
      _id: '643d69a5c3f7b9001cfa0949',
      name: 'Мини-салат Экзо-Плантаго',
      type: 'main',
      proteins: 1,
      fat: 2,
      carbohydrates: 3,
      calories: 6,
      price: 4400,
      image: 'https://code.s3.yandex.net/react/code/salad.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/salad-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/salad-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa094a',
      name: 'Сыр с астероидной плесенью',
      type: 'main',
      proteins: 84,
      fat: 48,
      carbohydrates: 420,
      calories: 3377,
      price: 4142,
      image: 'https://code.s3.yandex.net/react/code/cheese.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/cheese-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa0942',
      name: 'Соус Spicy-X',
      type: 'sauce',
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 30,
      price: 90,
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
    }
  ]
};

export const order: TOrder = {
  _id: 'orderId',
  status: 'new',
  name: 'orderNmae',
  createdAt: '2025-10-02T22:59:22.411Z',
  updatedAt: '2025-10-02T22:59:23.811Z',
  number: 90243,
  ingredients: [
    '643d69a5c3f7b9001cfa093c',
    '643d69a5c3f7b9001cfa093e',
    '643d69a5c3f7b9001cfa0947',
    '643d69a5c3f7b9001cfa0945',
    '643d69a5c3f7b9001cfa093c'
  ]
};

export const userOrders: TOrder[] = [
  {
    _id: 'orderIdFirst',
    status: 'done',
    name: 'orderNmaeFirst',
    createdAt: '2025-09-15T19:59:33.658Z',
    updatedAt: '2025-09-15T19:59:34.833Z',
    number: 88810,
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0940',
      '643d69a5c3f7b9001cfa0940',
      '643d69a5c3f7b9001cfa0940',
      '643d69a5c3f7b9001cfa0947',
      '643d69a5c3f7b9001cfa093c'
    ]
  },
  {
    _id: 'orderIdSecond',
    status: 'done',
    name: 'orderNmaeSecond',
    createdAt: '2025-09-16T05:25:57.279Z',
    updatedAt: '2025-09-16T05:25:58.602Z',
    number: 88817,
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa0940',
      '643d69a5c3f7b9001cfa093d'
    ]
  },
  {
    _id: 'orderIdThird',
    status: 'done',
    name: 'orderNmaeThird',
    createdAt: '2025-10-02T15:33:13.165Z',
    updatedAt: '2025-10-02T15:33:14.485Z',
    number: 90208,
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093d'
    ]
  }
];

export const registerData: TRegisterData = {
  email: 'cat@mail.ru',
  name: 'cat',
  password: '1234'
};

export const loginData: TLoginData = {
  email: 'cat@mail.ru',
  password: '1234'
};

export const userData: TUser = {
  email: 'cat@mail.ru',
  name: 'cat',
};

export const updateNameData: Partial<TRegisterData> = {
  name: 'dog',
};

export const updatedUser: TUser = {
  email: 'cat@mail.ru',
  name: 'dog',
};


