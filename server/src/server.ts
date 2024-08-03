import express, { Express } from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';

import { connect } from './config/db';
import { userRouter } from './routes/user.route';
import { chatRouter } from './routes/chat.route';
import { errorHandler, notFound } from './middlewares/error.handler';
import { listen } from './socket/messages';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});
dotenv.config();

const corsOptions = {
  origin: true,
  credentials: true
};

const port = 3000;
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', chatRouter);
app.use('/api', userRouter);

app.use(notFound);
app.use(errorHandler);
server.listen(port, async () => {
  await connect();
  listen(io);
  console.log(`Server is running on http://localhost:${port}`);
});
