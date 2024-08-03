import Chat from '../models/chat.model';
import Message from '../models/messages.model';
import User from '../models/user.model';

interface IReciveArgs {
  value: string;
  userId: string;
  chatId: string;
}

export const reciveMessage = async ({ value, userId, chatId }: IReciveArgs) => {
  const chat = await Chat.findById(chatId);
  const user = await User.findById(userId);
  if (chat) {
    const message = new Message({
      value,
      userId,
      date: new Date()
    });
    chat.messages.push(message._id.toString());
    await message.save();
    await chat.save();

    return {
      chatId: chat._id,
      message: message,
      user
    };
  }
};
export const sendMessage = async (chatId: string) => {
  const chat = await Chat.findById(chatId);
  if (chat) {
    const user = await User.findById(chat.partner);
    const msg = await (await fetch('https://quotes-api-self.vercel.app/quote')).json();
    const message = new Message({
      value: msg.quote,
      userId: chat.partner,
      date: new Date()
    });
    chat.messages.push(message._id.toString());
    await message.save();
    await chat.save();

    return {
      chatId: chat._id,
      message: message,
      user
    };
  }
};
