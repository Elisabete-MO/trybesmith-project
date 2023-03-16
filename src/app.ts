import express, { Request, Response } from 'express';
import { ProductRouter } from './routers';
import errorMessage from './middlewares/validateMiddleware';

const app = express();

app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({ message: 'Ok, ok' });
});

app.use('/products', errorMessage, ProductRouter);

export default app;
