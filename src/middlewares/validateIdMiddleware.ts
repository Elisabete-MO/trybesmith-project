import { NextFunction, Request, Response } from 'express';
import { IResponse } from '../types/Response';

import { idSchema } from './schemas';

export default function
validateId(req: Request, res: Response, next: NextFunction): IResponse | void {
  const { id } = req.params;
  if (!id) {
    return { type: 'INVALID_VALUE', message: '"id" is required' };
  }  
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };
  next();
}
