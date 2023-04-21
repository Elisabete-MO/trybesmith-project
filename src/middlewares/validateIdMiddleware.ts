import { NextFunction, Request, Response } from 'express';
import { idSchema } from '../services/validations/schemas';

export default function
validateId(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: '"id" is required' });
  }  
  const { error } = idSchema.validate(id);
  if (error) {
    return res.status(400).json({ message: '"id" must be a number' });
  }
  next();
}
