import { Router } from 'express';

import userControllers from '../controllers/user.controller';

export const userRouter = Router();

userRouter.get('/login/:userId', userControllers.loginController);

userRouter.post('/register', userControllers.registerController);
