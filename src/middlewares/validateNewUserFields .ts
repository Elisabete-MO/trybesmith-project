import { NextFunction, Request, Response } from 'express';
import { IResponse } from '../types/Response';

function isUsernameValid(username: string): boolean {
  return !!username;
}

function isVocationValid(vocation: string): boolean {
  return !!vocation;
}

function isLevelValid(level: number): boolean {
  return level !== undefined && level !== null;
}

function isPasswordValid(password: string): boolean {
  return !!password;
}

export default function
validateNewUser(req: Request, res: Response, next: NextFunction): IResponse | void {
  const { username, vocation, level, password } = req.body;
  if (!isUsernameValid(username)) {
    res.status(400).json({ message: '"username" is required' });
    return;
  } 
  if (!isVocationValid(vocation)) {
    res.status(400).json({ message: '"vocation" is required' });
    return;
  }
  if (!isLevelValid(level)) {
    res.status(400).json({ message: '"level" is required' });
    return;
  }
  if (!isPasswordValid(password)) {
    res.status(400).json({ message: '"password" is required' });
    return;
  } next();
}

//   const requiredFields = ['username', 'vocation', 'level', 'password'];
//   for (const field of requiredFields) {
//     if (!req.body[field]) {
//       return res.status(400).json({ message: `"${field}" is required` });
//     }
//   }
//   next();
