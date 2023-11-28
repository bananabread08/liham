import { Request, Response } from 'express';
import { db } from '../utils/db';
import { excludePass } from '../utils/excludePass';
import createHttpError from 'http-errors';

export const getCurrentUser = async (req: Request, res: Response) => {
  const user = await db.user.findUnique({
    where: { id: req.user?.id },
    select: excludePass,
  });

  if (!user) throw createHttpError(400, 'User not found');
  res.status(200).json(user);
};

export const updateProfile = async (req: Request, res: Response) => {
  const { firstName, lastName } = req.body;

  const updated = await db.user.update({
    where: { id: req.user?.id },
    data: { firstName, lastName },
    select: excludePass,
  });

  res.status(200).json(updated);
};
