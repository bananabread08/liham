import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import createHttpError, { isHttpError } from 'http-errors';
import { Strategy as LocalStrategy } from 'passport-local';
import { db } from '../utils/db';
import bcrypt from 'bcrypt';
import { DoneCallback } from 'passport';
import { bufferToDataURI, uploadToCloud } from '../utils/uploadBase';

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
    console.log('local start');
    const user = await db.user.findUnique({ where: { username } });
    if (!user) return done(createHttpError(401, 'User not found.'), false);
    const passwordMatch = bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return done(createHttpError(401, 'Incorrect password.'), false);
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
export const serializeUser = (user: any, done: DoneCallback) => {
  console.log('serializing');
  return done(null, user.id);
};

export const deserializeUser = async (id: number, done: DoneCallback) => {
  try {
    console.log('deserializing');
    const user = await db.user.findUnique({ where: { id } });
    if (user)
      done(null, {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
      });
  } catch (error) {
    done(error);
  }
};

export const isAuthenticated = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  if (req.isAuthenticated()) next();
  else throw createHttpError(401, 'Unauthenticated');
};

export const uploadImage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { file } = req;
  if (!file) {
    res.locals.imageDetails = null;
    return next();
  }

  const fileFormat = file.mimetype.split('/')[1];
  const { base64 } = bufferToDataURI(fileFormat, file.buffer);
  const imageDetails = await uploadToCloud(base64, fileFormat);
  res.locals.imageDetails = imageDetails;

  next();
};
