import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services';
import { IResponse } from '../types/Response';

require('dotenv/config');

const secret = process.env.JWT_SECRET ?? 'default-secret';

declare module 'express' {
  export interface Request {
    user?: IResponse;
  }
}

export default async function  
validateJWT(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;
    const payloadData = decoded.data;
    const userService = new UserService();
    const user = await userService.getById(payloadData.userId);
    if (!user) {
      return res.status(401).json({ message: 'Erro ao procurar usuário do token' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
}