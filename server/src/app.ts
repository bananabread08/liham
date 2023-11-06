import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { corsOptions } from './config';
import path from 'path';
import { Request, Response } from 'express';
import * as middlewares from './middlewares/middlewares';

const app = express();

app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(compression());
// app.use(helmet());

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, 'dist')));

  app.get('*', (_req: Request, res: Response) =>
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html')),
  );
} else {
  app.get('/', (_req, res) => {
    res.json({ message: 'welcome to liham api' });
  });
}

app.use(middlewares.unknownEndpoint);
app.use(middlewares.errorHandler);

export default app;
