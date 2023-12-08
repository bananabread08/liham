import { getUserContacts } from './../controllers/user.controller';
import express from 'express';
import {
  addToContacts,
  getCurrentUser,
  removeFromContacts,
  searchUsers,
  updateProfile,
} from '../controllers/user.controller';

export const userRouter = express.Router();

userRouter.get('/currentUser', getCurrentUser);
userRouter.get('/currentUser/contacts', getUserContacts);
userRouter.patch('/:userId/add/contacts', addToContacts);
userRouter.patch('/:userId/remove/contacts', removeFromContacts);
userRouter.patch('/:userId', updateProfile);
userRouter.get('/:username', searchUsers);
