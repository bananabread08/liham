import { NextFunction, Request, Response } from 'express';
import { db } from '../utils/db';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';

export const register = async (req: Request, res: Response) => {
  const { username, firstName, lastName, password, confirmPassword } = req.body;
  if (!username || !password) {
    throw createHttpError(401, 'Please provide all fields');
  }
  if (password !== confirmPassword) {
    throw createHttpError(401, 'Passwords do not match');
  }

  const emailExists = await db.user.findUnique({ where: { username } });
  if (emailExists) throw createHttpError(400, 'Email is already in use.');
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const createdUser = await db.user.create({
    data: {
      username,
      firstName,
      lastName,
      password: passwordHash,
    },
  });
  res.status(200).json({
    id: createdUser.id,
    email: createdUser.username,
    firstName: createdUser.firstName,
    lastName: createdUser.lastName,
  });
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password)
    throw createHttpError(401, 'Please provide all fields');
  const user = await db.user.findUnique({
    where: {
      username,
    },
  });
  if (!user) throw createHttpError(401, 'User not found. Please register.');
  const passwordCorrect = user
    ? await bcrypt.compare(password, user.password)
    : false;
  if (!passwordCorrect) throw createHttpError(401, 'Incorrect password.');
  res.status(200).json({
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    avatar: user.avatar,
  });
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.clearCookie('connect.sid');
    res.json({ message: 'logout success' });
  });
};
