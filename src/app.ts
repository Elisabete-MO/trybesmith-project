import express, { Request, Response } from 'express';
import { ProductRouter, UserRouter, OrderRouter } from './routers';
import errorMessage from './middlewares/validateMiddleware';

const app = express();

app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({ message: 'Ok, ok' });
});

app.use('/products', errorMessage, ProductRouter);
app.use('/users', errorMessage, UserRouter);
app.use('/orders', errorMessage, OrderRouter);

export default app;
