import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './shared/layout/Layout';
import Chat from './components/Chat/Chat';

const App: FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/:id" element={<Chat />} />
      </Route>
    </Routes>
  );
};

export default App;
