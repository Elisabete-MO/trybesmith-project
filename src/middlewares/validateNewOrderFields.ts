import { NextFunction, Request, Response } from 'express';
import IResponse from '../types/Response';

export default function
validateNewOrder(req: Request, res: Response, next: NextFunction): IResponse | void {
  const { id } = req.body;
  if (!id) {
    res.status(400).json({ message: 'inconsistent data' });
    return;
  } 
  next();
}