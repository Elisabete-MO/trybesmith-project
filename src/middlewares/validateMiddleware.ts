import { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

interface CustomError extends Error {
  details?: { message: string }[];
}

export default function 
errorMessage(err: CustomError, _req: Request, res: Response, next: NextFunction): void {
  const { name, message } = err;
  switch (name) {
    case 'BadRequestError' || 'ValidationError':
      res.status(400).json({ message });
      break;
    case 'NotFoundError':
      res.status(404).json({ message });
      break;
    case 'ConflictError':
      res.status(409).json({ message });
      break;
    default:
      console.error(err);
      res.sendStatus(500);
  }
  next();
}