import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { setMessage, setNotification } from '../redux/user/userSlice';
import { useSocketContext } from '../context/SocketContext';
import { IMessageResponse } from '../types/sockets';

const useListenMessages = () => {
  const dispatch = useAppDispatch();
  const socket = useSocketContext();
  const { _id: currentUserId } = useAppSelector((state) => state.user);
  useEffect(() => {
    if (socket) {
      socket.on('message', async (data: IMessageResponse) => {
        dispatch(setMessage(data));
        if (data.user._id.toString() !== currentUserId.toString()) {
          dispatch(
            setNotification({
              message: data.message.value,
              date: data.message.date,
              chatId: data.chatId,
              user: data.user
            })
          );
        }
      });

      return () => {
        socket.off('message');
      };
    }
  }, [socket]);
};

export default useListenMessages;
