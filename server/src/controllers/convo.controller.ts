import { Request, Response } from 'express';
import { db } from '../utils/db';
import createHttpError from 'http-errors';
import { assertHasUser } from '../utils/assertHasUser';
// import { excludePass } from '../utils/excludePass';
// import createHttpError from 'http-errors';

export const createConversation = async (req: Request, res: Response) => {
  assertHasUser(req);
  const userId = req.user.id;
  const { name, participants } = req.body;
  if (!participants || participants.length < 1) {
    throw createHttpError(401, 'Add a participant to initiate conversation.');
  }
  participants.concat(userId);
  await db.conversation.create({
    data: {
      name: name ?? '',
      participant: {
        createMany: {
          data: participants.map((id: string) => ({
            userId: parseInt(id),
            status: 'pending',
          })),
        },
      },
    },
  });
  res.json({ message: 'Successfully created a conversation!' });
};

export const deleteConversation = async (req: Request, res: Response) => {
  // const userId = req.user?.id;
  const convoId = parseInt(req.params.convoId);
  // delete message then participant in order.
  await db.message.deleteMany({ where: { conversationId: convoId } });
  await db.participant.deleteMany({ where: { conversationId: convoId } });
  await db.conversation.delete({ where: { id: convoId } });
  res.json({ message: 'Successfully deleted a conversation!' });
};
