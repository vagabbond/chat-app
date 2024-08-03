import { useSocketContext } from '../context/SocketContext';
import { useAppDispatch } from '../redux/store';
import { setChat } from '../redux/user/userSlice';
import { IFindChatResponse } from '../types/sockets';

interface IArgs {
  search: string;
  userId: string;
}

export const useFindChat = (data: IArgs) => {
  const socket = useSocketContext();
  const dispatch = useAppDispatch();
  const findChat = async () => {
    if (socket) {
      socket.emit('findChat', data);
      socket.on('findChat', (data: IFindChatResponse[]) => {
        dispatch(setChat(data));
      });
      return () => {
        socket.off('findChat');
      };
    }
  };
  return findChat;
};
