import { Request, Response } from 'express';
import { UserService } from '../services';
import { errorMap } from '../types/ErrorMap';
import createToken from '../auth/createToken';
import { IUser } from '../types/User';

export default class UserController {
  constructor(private userService = new UserService()) {}

  public getAllUsers = async (_req: Request, res: Response) => {
    const { type, message } = await this.userService.findAll();
    if (type !== 'OK') return res.status(errorMap[type]).json({ message });
    res.status(errorMap[type]).json(message);
  };

  public getById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const { type, message } = await this.userService.getById(id);
    if (type !== 'OK') {
      return res.status(errorMap[type]).json({ message });
    }
    res.status(errorMap[type]).json(message);
  };

  public create = async (req: Request, res: Response) => {
    const user = req.body;
    const { type, message } = await this.userService.create(user);
    if (type !== 'CREATED') {
      return res.status(errorMap[type]).json({ message });
    }
    const token = createToken(message as IUser);
    console.log(type);
    res.status(errorMap[type]).json({ token });
  };
}
