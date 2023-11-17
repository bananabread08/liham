import 'express-async-errors';
import express, { NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { corsOptions } from './config';
// import path from 'path';
import { Request, Response } from 'express';
import * as middlewares from './middlewares/middlewares';
import 'express-async-errors';
import passport from 'passport';
import session from 'express-session';
import { authRouter } from './routes/auth.route';
import connectPgSimple from 'connect-pg-simple';
import { SESSION_SECRET } from './config';
import { userRouter } from './routes/user.route';

const store = new (connectPgSimple(session))();
const app = express();

app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(compression());
// app.use(helmet());
app.use(
  session({
    store: store,
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production' ? true : false,
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(middlewares.passportHandler);
passport.serializeUser(middlewares.serializeUser);
passport.deserializeUser(middlewares.deserializeUser);

app.get('/api/v1/demo', (req: Request, res: Response, _next: NextFunction) => {
  res.json({ sessionID: req.sessionID });
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
// if (process.env.NODE_ENV === 'production') {
//   const __dirname = path.resolve();
//   app.use(express.static(path.join(__dirname, 'dist')));

//   app.get('*', (_req: Request, res: Response) =>
//     res.sendFile(path.resolve(__dirname, 'dist', 'index.html')),
//   );
// } else {
//   app.get('/', (_req, res) => {
//     res.json({ message: 'welcome to liham api' });
//   });
// }

app.use(middlewares.unknownEndpoint);
app.use(middlewares.errorHandler);

export default app;
