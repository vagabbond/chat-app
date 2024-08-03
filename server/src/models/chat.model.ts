import { Schema, model, Model } from 'mongoose';

export interface IChat {
  owner: Schema.Types.ObjectId;
  partner: Schema.Types.ObjectId;
  messages: string[];
}

const ChatSchema = new Schema<IChat>({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  partner: { type: Schema.Types.ObjectId, ref: 'User' },
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Message'
    }
  ]
});

const Chat: Model<IChat> = model('Chat', ChatSchema);

export default Chat;
