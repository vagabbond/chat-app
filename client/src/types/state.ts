export interface IMessage {
  value: string;
  userId: string;
  date: string;
  _id: string;
}

export interface IChat {
  partner: IUser;
  _id: string;
  messages: IMessage[];
}

export interface IUser {
  _id: string;
  photo: string;
  firstName: string;
  lastName: string;
  chats: IChat[];
}

export interface INotification {
  value: string;
  date: string;
  user: IUser;
}

export interface IState {
  _id: string | null;
  firstName: string | null;
  photo: string | null;
  lastName: string | null;
  chats: IChat[] | null;
  notification: INotification | null;
  error: string | null;
}
