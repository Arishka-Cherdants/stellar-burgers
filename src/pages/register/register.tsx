import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';

import {
  errorCleaner,
  getError,
  userRegisterUserApi
} from '../../services/slices/userSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const error = useSelector(getError);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      userRegisterUserApi({
        name: userName,
        email,
        password
      })
    );
  };

  useEffect(() => {
    dispatch(errorCleaner());
  }, []);

  return (
    <RegisterUI
      errorText={error!}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
