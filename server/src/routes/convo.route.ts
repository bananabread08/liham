import express from 'express';
import {
  createConversation,
  deleteConversation,
  getCurrentUserConversations,
} from '../controllers/convo.controller';

export const convoRouter = express.Router();

convoRouter.get('/currentUser', getCurrentUserConversations);
convoRouter.post('/convo', createConversation);
convoRouter.delete('/convo/:convoId', deleteConversation);
