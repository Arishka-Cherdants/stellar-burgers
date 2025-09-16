import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import {
  getOrdersApi,
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  TRegisterData,
  TLoginData
} from '@api';
import { deleteCookie, setCookie } from '../../utils/cookie';

export const userGetOrdersApi = createAsyncThunk(
  'ingredients/getOrdersApi',
  async () => getOrdersApi()
);

export const userRegisterUserApi = createAsyncThunk(
  'ingredients/registerUserApi',
  async (data: TRegisterData) =>
    registerUserApi(data).then((data) => {
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data.user;
    })
);

export const userLoginUserApi = createAsyncThunk(
  'ingredients/loginUserApi',
  async (data: TLoginData) =>
    loginUserApi(data).then((data) => {
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data.user;
    })
);

export const userGetUserApi = createAsyncThunk(
  'ingredients/getUserApi',
  async () => getUserApi()
);

export const userUpdateUserApi = createAsyncThunk(
  'ingredients/updateUserApi',
  async (data: Partial<TRegisterData>) => updateUserApi(data)
);

export const userLogoutApi = createAsyncThunk('ingredients/logoutApi', () => {
  logoutApi()
    .then(() => {
      localStorage.clear(); // очищаем refreshToken
      deleteCookie('accessToken'); // очищаем accessToken
    })
    .catch(() => {
      console.log('Ошибка выполнения выхода');
    });
});

type TUserSlice = {
  user: TUser | null;
  preloaderLogin: boolean;
  userOrders: TOrder[];
  preloaderOrderUs: boolean;
  isAuthChecked: boolean;
  error: string | null;
};

const initialState: TUserSlice = {
  user: null,
  preloaderLogin: false,
  userOrders: [],
  preloaderOrderUs: false,
  isAuthChecked: false,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  selectors: {
    getUser: (state) => state.user,
    getUserEmail: (state) => state.user?.email,
    getUserName: (state) => state.user?.name,
    getPreloaderLogin: (state) => state.preloaderLogin,
    getUserOrders: (state) => state.userOrders,
    getPreloaderOrderUs: (state) => state.preloaderOrderUs,
    getIsAuthChecked: (state) => state.isAuthChecked,
    getError: (state) => state.error
  },
  reducers: {
    errorCleaner: (state) => {
      state.error = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(userGetOrdersApi.pending, (state) => {
        state.preloaderOrderUs = true;
        state.error = '';
      })
      .addCase(userGetOrdersApi.rejected, (state, action) => {
        state.preloaderOrderUs = false;
        state.error = action.error.message || 'Ошибка';
      })
      .addCase(userGetOrdersApi.fulfilled, (state, action) => {
        state.userOrders = action.payload;
        state.preloaderOrderUs = false;
        state.error = '';
      })

      .addCase(userRegisterUserApi.pending, (state) => {
        state.isAuthChecked = false;
        state.preloaderLogin = true;
        state.error = '';
      })
      .addCase(userRegisterUserApi.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.preloaderLogin = false;
        state.error = action.error.message || 'Ошибка';
      })
      .addCase(userRegisterUserApi.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.preloaderLogin = false;
        state.error = '';
        state.user = action.payload;
      })

      .addCase(userLoginUserApi.pending, (state) => {
        state.preloaderLogin = true;
        state.error = '';
      })
      .addCase(userLoginUserApi.rejected, (state, action) => {
        state.preloaderLogin = false;
        state.error = action.error.message || 'Ошибка';
      })
      .addCase(userLoginUserApi.fulfilled, (state, action) => {
        state.preloaderLogin = false;
        state.isAuthChecked = true;
        state.error = '';
        state.user = action.payload;
      })

      .addCase(userGetUserApi.pending, (state) => {
        state.preloaderLogin = true;
        state.isAuthChecked = false;
        state.error = '';
      })
      .addCase(userGetUserApi.rejected, (state, action) => {
        state.preloaderLogin = false;
        state.isAuthChecked = true;
        state.error = action.error.message || 'Ошибка';
        state.user = null;
      })
      .addCase(userGetUserApi.fulfilled, (state, action) => {
        state.preloaderLogin = false;
        state.isAuthChecked = true;
        state.error = '';
        state.user = action.payload.user;
      })

      .addCase(userUpdateUserApi.pending, (state) => {
        state.preloaderLogin = true;
        state.error = '';
      })
      .addCase(userUpdateUserApi.rejected, (state, action) => {
        state.preloaderLogin = false;
        state.error = action.error.message || 'Ошибка';
        state.user = null;
      })
      .addCase(userUpdateUserApi.fulfilled, (state, action) => {
        state.preloaderLogin = false;
        state.isAuthChecked = true;
        state.error = '';
        state.user = action.payload.user;
      })

      .addCase(userLogoutApi.pending, (state) => {
        state.preloaderLogin = false;
        state.error = '';
        state.user = null;
        state.isAuthChecked = false;
      })
      .addCase(userLogoutApi.rejected, (state, action) => {
        state.preloaderLogin = false;
        state.isAuthChecked = true;
        state.error = action.error.message || 'Ошибка выхода';
      })
      .addCase(userLogoutApi.fulfilled, (state) => {
        state.preloaderLogin = false;
        state.isAuthChecked = true;
        state.user = null;
        state.error = '';
      });
  }
});

export const {
  getUser,
  getUserEmail,
  getUserName,
  getPreloaderLogin,
  getUserOrders,
  getPreloaderOrderUs,
  getIsAuthChecked,
  getError
} = userSlice.selectors;

export const { errorCleaner } = userSlice.actions;
