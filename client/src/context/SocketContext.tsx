import { createContext, ReactNode, useState, useEffect, useContext } from 'react';
import { io, Socket } from 'socket.io-client';

import { useAppSelector } from '../redux/store';
import { API_URL } from '../types/constants';

export const SocketContext = createContext<Socket | null>(null);

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  return context;
};

interface ISocketProviderProps {
  children: ReactNode;
}

export const SocketContextProvider = ({ children }: ISocketProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { _id } = useAppSelector((state) => state.user);
  useEffect(() => {
    if (_id) {
      const newSocket = io(API_URL, {
        query: {
          userId: _id
        }
      });

      setSocket(newSocket);
      return () => {
        if (socket) {
          socket.disconnect();
        }
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, []);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
