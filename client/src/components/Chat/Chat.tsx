import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { useAppSelector } from '../../redux/store';
import { IChat } from '../../types/state';

import ChatFooter from './ChatFooter/ChatFooter';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatMain from './ChatMain/ChatMain';

const Chat: FC = () => {
  const { id } = useParams();

  const { chats } = useAppSelector((state) => state.user);
  const chat: IChat = chats && chats.find((chat: IChat) => chat._id === id);

  return (
    chat && (
      <div className="h-full w-full flex flex-col overflow-hidden">
        <ChatHeader
          firstName={chat.partner.firstName}
          lastName={chat.partner.lastName}
          photo={chat.partner.photo}
        />
        <ChatMain messages={chat.messages} photo={chat.partner.photo} />
        <ChatFooter chatId={chat._id} />
      </div>
    )
  );
};

export default Chat;
