import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import {
  getUserOrders,
  userGetOrdersApi
} from '../../services/slices/userSlice';

export const ProfileOrders: FC = () => {
  /** TODODONE: взять переменную из стора */
  const orders: TOrder[] = useSelector(getUserOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userGetOrdersApi());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
