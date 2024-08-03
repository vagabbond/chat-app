import User, { IUser } from '../models/user.model';

interface IGetUserResult {
  _id: string;
  firstName: string;
  lastName: string;
  photo: string;
  chats: {
    _id: string;
    partner: IUser;
    ownerId: string;
    messages: {
      _id: string;
      text: string;
      date: Date;
    }[];
  }[];
}

export const createUser = async (data?: { firstName: string; lastName: string }) => {
  const req = await fetch('https://randomuser.me/api/');
  const user = await req.json();
  let result;
  if (data) {
    result = await User.create({ ...data, photo: user.results[0].picture.large });
  } else {
    result = await User.create({
      firstName: user.results[0].name.first,
      lastName: user.results[0].name.last,
      photo: user.results[0].picture.large
    });
  }
  return result;
};

export const getUser = async (userId: string): Promise<IGetUserResult | null> => {
  const user = await User.findById(userId).populate({
    path: 'chats',
    populate: [
      {
        path: 'partner',
        model: 'User'
      },
      {
        path: 'messages',
        model: 'Message'
      }
    ]
  });
  return user ? user.toObject() : null;
};
