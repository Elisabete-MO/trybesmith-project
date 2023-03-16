import jwt, { SignOptions } from 'jsonwebtoken';
import { IUser } from '../types/User';

const secret = process.env.JWT_SECRET || 'secretJWT';

export default function generateToken(user: IUser) {
  const { id, username, level } = user;

  const jwtConfig: SignOptions = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: { 
    userId: id,
    userName: username,
    level,
  } }, secret, jwtConfig);

  return token;
}