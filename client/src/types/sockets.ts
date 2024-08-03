import { IMessage, IUser } from './state';

export interface IMessageResponse {
  chatId: string;
  message: IMessage;
  user: IUser;
}

export interface IFindChatResponse {
  messages: IMessage[];
  owner: string;
  partner: IUser;
  _id: string;
}
