import asyncHandler from '../middlewares/async.handler';
import { createDefaultChats } from '../services/chat.service';
import { createUser, getUser } from '../services/user.service';

export const loginController = asyncHandler(async (req, res) => {
  const result = await getUser(req.params.userId);
  if (result) {
    res.status(200).json({ data: result });
  } else {
    res.status(400).json({ message: 'Something went wrong' });
  }
});

export const registerController = asyncHandler(async (req, res) => {
  const user = await createUser();
  const chats = await createDefaultChats(user._id.toString());
  if (user && chats) {
    const result = await getUser(user._id.toString());
    res.status(200).json({ data: result });
  } else {
    res.status(400).json({ message: 'Something went wrong' });
  }
});

export default { loginController, registerController };
