import { NextFunction, Request, Response } from 'express';
import { IResponse } from '../types/Response';

export default function
validateNewProduct(req: Request, res: Response, next: NextFunction): IResponse | void {
  const { name, amount } = req.body;
  if (!name || !amount) {
    res.status(400).json({ message: '"name" and "amount" are required' });
    return;
  } 
  next();
}