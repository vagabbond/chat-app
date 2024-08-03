import { useSocketContext } from '../context/SocketContext';

interface IProps {
  value: string;
  chatId: string;
  userId: string;
}

export const useSendMessage = ({ value, chatId, userId }: IProps) => {
  const socket = useSocketContext();
  const sendMessage = () => {
    if (socket) {
      socket.emit('newMessage', { chatId, userId, value });
    }
  };

  return sendMessage;
};
