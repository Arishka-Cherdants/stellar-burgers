import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

import {
  getConstructorBurger,
  clearConstructor
} from '../../services/slices/constructorSlice';
import {
  clearOrder,
  getOrderBurger,
  getPreloaderOrd
} from '../../services/slices/orderSlice';
import { getIsAuthChecked, getUser } from '../../services/slices/userSlice';
import { getOrderBurgerApi } from '../../services/slices/orderSlice';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODODONE: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(getConstructorBurger);
  const orderRequest = useSelector(getPreloaderOrd);
  const orderModalData = useSelector(getOrderBurger);
  const user = useSelector(getUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auntificated = useSelector(getIsAuthChecked);

  useEffect(() => {
    if (orderModalData && !orderRequest) {
      dispatch(clearConstructor());
    }
  }, [orderModalData, orderRequest, dispatch]);

  const onOrderClick = () => {
    if (auntificated && !user) {
      navigate('/login');
      return;
    }

    const { bun, ingredients } = constructorItems;

    if (!bun || orderRequest) return;
    const order: string[] = [
      bun._id,
      ...ingredients.map((ing) => ing._id),
      bun._id
    ];
    dispatch(getOrderBurgerApi(order));
  };
  const closeOrderModal = () => {
    navigate('/', { replace: true });
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
