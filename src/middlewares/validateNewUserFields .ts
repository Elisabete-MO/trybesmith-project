import { NextFunction, Request, Response } from 'express';

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
validateNewUser(req: Request, res: Response, next: NextFunction) {
  const { username, vocation, level, password } = req.body;
  if (!isUsernameValid(username)) {
    return res.status(400).json({ message: '"username" is required' });
  } 
  if (!isVocationValid(vocation)) {
    return res.status(400).json({ message: '"vocation" is required' });
  }
  if (!isLevelValid(level)) {
    return res.status(400).json({ message: '"level" is required' });
  }
  if (!isPasswordValid(password)) {
    return res.status(400).json({ message: '"password" is required' });
  } next();
}

//   const requiredFields = ['username', 'vocation', 'level', 'password'];
//   for (const field of requiredFields) {
//     if (!req.body[field]) {
//       return res.status(400).json({ message: `"${field}" is required` });
//     }
//   }
//   next();
