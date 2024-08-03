import Chat from '../models/chat.model';
import User, { IUser } from '../models/user.model';
import { createUser, getUser } from './user.service';

interface IEditArgs {
  chatId: string;
  partner: { firstName: string; lastName: string };
}

export const createChat = async (ownerId: string, partnerId: string) => {
  const result = await Chat.create({
    owner: ownerId,
    partner: partnerId,
    messages: []
  });
  const user = await User.findById(ownerId);
  const partner = await User.findById(partnerId);
  if (user && partner) {
    user.chats.push(result._id);
    partner.chats.push(result._id);
    await user.save();
    await partner.save();
  }
  return result.populate([
    {
      path: 'partner'
    },
    {
      path: 'messages'
    }
  ]);
};

export const createDefaultChats = async (ownerId: string) => {
  const user = await User.findById(ownerId);
  if (user) {
    const partners = await Promise.all([createUser(), createUser(), createUser()]);
    const chatPromises = partners.map((partner) => createChat(ownerId, partner._id.toString()));
    await Promise.all(chatPromises);
    return true;
  }
  return null;
};

export const deleteChat = async (chatId: string) => {
  const chat = await Chat.findById(chatId);
  if (chat) {
    await Chat.findByIdAndDelete(chatId);
    return chat._id;
  }
  return null;
};

export const editChat = async (data: IEditArgs) => {
  const chat = await Chat.findById(data.chatId);
  if (chat) {
    await User.findByIdAndUpdate(chat.partner, data.partner);
    const result = await chat.populate([
      {
        path: 'partner'
      },
      {
        path: 'messages'
      }
    ]);
    return result;
  }
  return null;
};

export const findChat = async (data: { userId: string; search: string }) => {
  const user = await getUser(data.userId);
  const search = data.search.split(' ').join('').toLocaleLowerCase();

  if (user) {
    if (search !== '') {
      const result = user.chats.filter((chat: { partner: IUser }) => {
        const string = (chat.partner.firstName + chat.partner.lastName).toLocaleLowerCase();
        return string.includes(search);
      });
      return result;
    }
    return user.chats;
  }
};
