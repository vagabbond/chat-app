import { Schema, model, Model } from 'mongoose';

interface IMessage {
  value: string;
  userId: string;
  date: Date;
}

const MessageSchema = new Schema<IMessage>({
  value: { type: String, required: true },
  userId: { type: String, required: true },
  date: { type: Date, required: true }
});

const Message: Model<IMessage> = model('Message', MessageSchema);

export default Message;
