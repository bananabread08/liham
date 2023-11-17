import express from 'express';
import { getCurrentUser } from '../controllers/user.controller';
import { isAuthenticated } from '../middlewares/middlewares';

export const userRouter = express.Router();

userRouter.get('/currentUser', isAuthenticated, getCurrentUser);
