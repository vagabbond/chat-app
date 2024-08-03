import { FC } from 'react';
import { IMessage } from '../../../types/state';

import UserMessage from './UserMessage/UserMessage';
interface IProps {
  messages: IMessage[];
  photo: string;
}

const ChatMain: FC<IProps> = ({ messages, photo }) => {
  return (
    <main className="h-[78vh] bg-[#faf8f9] p-5 overflow-y-auto">
      <ul className="flex w-full flex-col gap-2 ">
        {messages.length > 0 ? (
          messages.map((message) => (
            <UserMessage key={message._id} message={message} photo={photo} />
          ))
        ) : (
          <p className="text-center text-gray-500">No messages yet</p>
        )}
      </ul>
    </main>
  );
};

export default ChatMain;
