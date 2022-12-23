import { HttpError } from '@adwesh/common';
import express, { Request, Response, NextFunction } from 'express';
import { userRoutes } from './routes/users';

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  throw new HttpError('Invalid method / route', 404);
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) return next(error);
  res.status(error instanceof HttpError ? error.code : 500).json({
    message:
      error instanceof HttpError
        ? error.message
        : 'An error occured, try again',
  });
});

export { app };
