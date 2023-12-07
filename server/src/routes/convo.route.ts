import express from 'express';
import {
  createConversation,
  deleteConversation,
} from '../controllers/convo.controller';

export const convoRouter = express.Router();

convoRouter.post('/convo', createConversation);
convoRouter.delete('/convo/:convoId', deleteConversation);
