import { IChat, IMessage, IUser } from './state';

export interface IChatResponse {
  _id: string;
  partner: IUser;
  ownerId: string;
  messages: IMessage[];
}

export interface ICreateArgs {
  ownerId: string;
  partner: { firstName: string; lastName: string };
}

export interface IEditArgs {
  chatId: string;
  partner: { firstName: string; lastName: string };
}

export interface IAuthResponse {
  _id: string;
  firstName: string;
  lastName: string;
  photo: string;
  chats: IChat[];
}

export interface IRegisterArgs {}

export interface IError {
  rejectValue: {
    message: string;
  };
}
