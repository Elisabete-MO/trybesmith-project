import { NextFunction, Request, Response } from 'express';
import IResponse from '../types/Response';

export default function
validateNewUser(req: Request, res: Response, next: NextFunction): IResponse | void {
  const { username, vocation, level, password } = req.body;
  if (!username || !vocation || !level || !password) {
    res.status(400).json({ message: 'inconsistent data' });
    return;
  } 
  next();
}