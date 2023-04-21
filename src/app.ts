import express, { Application, Request, Response } from 'express';
import { ProductRouter, UserRouter, OrderRouter, LoginRouter } from './routers';
import errorMessage from './middlewares/validateMiddleware';

const app: Application = express();

app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({ message: 'Ok, ok' });
});

app.use('/products', errorMessage, ProductRouter);
app.use('/users', errorMessage, UserRouter);
app.use('/orders', errorMessage, OrderRouter);
app.use('/login', errorMessage, LoginRouter);

export default app;
