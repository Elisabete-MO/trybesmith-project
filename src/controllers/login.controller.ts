import { Request, Response } from 'express';
import { UserService } from '../services';
import { errorMap } from '../types/ErrorMap';
import createToken from '../auth/createToken';
import { IUser } from '../types/User';

export default class Login {
  constructor(private userService = new UserService()) {}

  public postLogin = async (req: Request, res: Response) => {
    const user = req.body;
    const { type, message } = await this.userService.getByUserName(user);
    if (type !== 'OK') {
      return res.status(errorMap.UNAUTHORIZED).json({ message: 'Username or password invalid' });
    }
    const token = createToken(message as IUser);
    res.status(errorMap[type]).json({ token });
  };
}
