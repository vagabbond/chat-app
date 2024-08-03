import asyncHandler from '../middlewares/async.handler';

import { createChat, deleteChat, editChat } from '../services/chat.service';
import { createUser } from '../services/user.service';

const createChatController = asyncHandler(async (req, res) => {
  const partner = await createUser(req.body.partner);
  const result = await (
    await createChat(req.body.ownerId, partner._id.toString())
  ).populate('partner');

  if (result) {
    res.status(200).json({ data: result });
  } else {
    res.status(400);
    throw new Error('Something went wrong');
  }
});

const editChatController = asyncHandler(async (req, res) => {
  const result = await editChat(req.body);
  if (result) {
    res.status(200).json({ data: result });
  } else {
    res.status(400);
    throw new Error('Something went wrong');
  }
});

const deleteChatController = asyncHandler(async (req, res) => {
  const result = await deleteChat(req.params.chatId);
  if (result) {
    res.status(200).json({ data: result });
  } else {
    res.status(400);
    throw new Error('Something went wrong');
  }
});

export default {
  createChatController,
  editChatController,
  deleteChatController
};
