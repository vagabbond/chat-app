import { Server } from 'socket.io';

import Chat from '../models/chat.model';

import { reciveMessage, sendMessage } from '../controllers/message.controller';
import { findChat } from '../services/chat.service';

export const listen = (io: Server) => {
  io.on('connection', (socket) => {
    socket.on('newMessage', async (data) => {
      const chat = await Chat.findById(data.chatId);
      if (chat) {
        const result = await reciveMessage(data);
        io.emit('message', result);
      }
      setTimeout(async () => {
        const result = await sendMessage(data.chatId);
        io.emit('message', result);
      }, 3000);
    });

    socket.on('findChat', async (data) => {
      const result = await findChat(data);
      if (result) {
        io.emit('findChat', result);
      }
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from messages namespace');
    });
  });
};
