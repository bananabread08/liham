import { logout } from './../controllers/auth.controller';
import express from 'express';
import { login, register } from '../controllers/auth.controller';
import passport from 'passport';
export const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', passport.authenticate('local'), login);
authRouter.post('/logout', logout);
