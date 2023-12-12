import { Request, Response } from 'express';
import { db } from '../utils/db';
import { excludePass } from '../utils/excludePass';
import createHttpError from 'http-errors';
import { assertHasUser } from '../utils/assertHasUser';

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

export const searchUsers = async (req: Request, res: Response) => {
  const username = req.params.username;
  if (!username) {
    return res.json([]);
  }
  const users = await db.user.findMany({
    where: {
      OR: [
        {
          username: {
            contains: username,
            mode: 'insensitive',
          },
        },
        {
          firstName: {
            contains: username,
            mode: 'insensitive',
          },
        },
        {
          lastName: {
            contains: username,
            mode: 'insensitive',
          },
        },
      ],
    },
    select: excludePass,
  });
  res.json(users);
};

export const getUserContacts = async (req: Request, res: Response) => {
  assertHasUser(req);
  const userId = req.user.id;
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      contacts: {
        select: {
          username: true,
          id: true,
          addedByContacts: {
            select: {
              username: true,
              id: true,
            },
          },
        },
      },
    },
  });
  if (!user) throw createHttpError(401, 'Invalid User');
  res.json(user.contacts);
};

export const addToContacts = async (req: Request, res: Response) => {
  assertHasUser(req);
  const userId = parseInt(req.params.userId);
  const yourId = req.user.id;
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user) throw createHttpError(401, 'Invalid User');
  await db.user.update({
    where: { id: yourId },
    data: { contacts: { connect: { id: user.id } } },
  });
  res.json({ message: 'Added to Contacts' });
};

export const removeFromContacts = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  const yourId = req.user?.id;
  const currentUser = await db.user.findUnique({
    where: { id: yourId },
    select: excludePass,
  });
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!currentUser) throw createHttpError(401, 'User not found');
  if (!user) throw createHttpError(401, 'Invalid User');
  await db.user.update({
    where: { id: currentUser.id },
    data: { contacts: { disconnect: { id: user.id } } },
  });
  res.json({ message: 'Removed from Contacts' });
};
