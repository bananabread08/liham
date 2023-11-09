import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import createHttpError, { isHttpError } from 'http-errors';
import { Strategy as LocalStrategy } from 'passport-local';
import { db } from '../utils/db';
import bcrypt from 'bcrypt';

export const unknownEndpoint = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  next(createHttpError(404, `Not Found - ${req.originalUrl}`));
};

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(error);
  let errorMessage = 'An unknown error has occurred';
  let status = 500;
  // check if IDs from Prisma are malformatted
  // if (error instanceof PrismaClientKnownRequestError) {
  //   if (error.code === 'P2023') {
  //     status = 400;
  //     errorMessage = 'Malformatted ID';
  //   }
  // }
  if (isHttpError(error)) {
    status = error.status;
    errorMessage = error.message;
  }
  res.status(status).json({ error: errorMessage });
  next();
};

export const passportHandler = new LocalStrategy(async function (
  username,
  password,
  done,
) {
  try {
    const user = await db.user.findUnique({ where: { username } });
    if (!user) return done(null, false);
    const passwordMatch = bcrypt.compare(password, user.password);
    if (!passwordMatch) return done(null, false);
    return done(null, {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
    });
  } catch (err) {
    return done(err);
  }
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const serializeUser = (user: any, cb: any) => {
  cb(null, user.id);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deserializeUser = async (id: number, cb: any) => {
  try {
    const user = await db.user.findUnique({ where: { id } });
    if (user)
      cb(null, {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
      });
  } catch (error) {
    cb(error);
  }
};
