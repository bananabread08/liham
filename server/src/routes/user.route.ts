import express from 'express';
import { getCurrentUser, updateProfile } from '../controllers/user.controller';

export const userRouter = express.Router();

userRouter.get('/currentUser', getCurrentUser);
userRouter.patch('/:userId/update', updateProfile);
