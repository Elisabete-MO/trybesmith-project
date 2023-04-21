import { NextFunction, Request, Response } from 'express';

export default function
validateNewOrder(req: Request, res: Response, next: NextFunction) {
  const { productsIds } = req.body;
  if (!productsIds) {
    return res.status(400).json({ message: '"productsIds" is required' });
  }
  next();
}