import { NextFunction, Request, Response } from 'express';
import { IResponse } from '../types/Response';

export default function
validateNewProduct(req: Request, res: Response, next: NextFunction): IResponse | void {
  const { name, amount } = req.body;
  if (!name) {
    res.status(400).json({ message: '"name" is required' });
    return;
  }
  if (!amount) {
    res.status(400).json({ message: '"amount" is required' });
    return;
  } 
  next();
}