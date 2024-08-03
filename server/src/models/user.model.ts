import { Schema, Model, model, Types } from 'mongoose';

export interface IUser {
  firstName: string;
  lastName: string;
  photo?: string;
  chats: Types.ObjectId[];
}

const UserSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  photo: { type: String },
  chats: [{ type: Schema.Types.ObjectId, ref: 'Chat' }]
});

const User: Model<IUser> = model('User', UserSchema);

export default User;
