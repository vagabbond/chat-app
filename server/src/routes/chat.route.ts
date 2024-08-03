import { Router } from 'express';

import chatControllers from '../controllers/chat.controller';

export const chatRouter = Router();

chatRouter.post('/chat', chatControllers.createChatController);
chatRouter.put('/chat', chatControllers.editChatController);
chatRouter.delete('/chat/:chatId', chatControllers.deleteChatController);
