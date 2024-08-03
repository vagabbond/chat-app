import { FC, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from './redux/store';
import { login, register } from './redux/user/userOperations';

import Layout from './shared/layout/Layout';
import Chat from './components/Chat/Chat';
import useListenMessages from './hooks/useListenMessages';

const App: FC = () => {
  useListenMessages();

  const dispatch = useAppDispatch();
  const { _id } = useAppSelector((state) => state.user);
  useEffect(() => {
    if (_id) {
      dispatch(login(_id));
    } else {
      dispatch(register({}));
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="" element={<Chat />}>
          <Route path=":id" element={<Chat />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="" />} />
    </Routes>
  );
};

export default App;
