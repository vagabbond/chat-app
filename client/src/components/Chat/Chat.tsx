import { FC } from 'react';
import { useParams } from 'react-router-dom';
import ChatFooter from './ChatFooter/ChatFooter';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatMain from './ChatMain/ChatMain';

const Chat: FC = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      <ChatHeader firstName="Maks" lastName="Thimbarov" />
      <ChatMain />
      <ChatFooter />
    </div>
  );
};

export default Chat;
