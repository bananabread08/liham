import express from 'express';
import {
  getCurrentUser,
  searchUsers,
  updateProfile,
} from '../controllers/user.controller';

export const userRouter = express.Router();

userRouter.get('/currentUser', getCurrentUser);
userRouter.get('/search', searchUsers);
userRouter.patch('/:userId', updateProfile);
