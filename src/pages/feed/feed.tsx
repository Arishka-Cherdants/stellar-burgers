import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { getOrdersSlice } from '../../services/slices/feedSlice';
import { acyncGetFeedsApi } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  /** TODODONE: взять переменную из стора */
  const orders: TOrder[] = useSelector(getOrdersSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(acyncGetFeedsApi());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(acyncGetFeedsApi());
      }}
    />
  );
};
