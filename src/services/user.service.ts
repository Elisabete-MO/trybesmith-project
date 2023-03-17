import { BadRequestError } from 'restify-errors';
import connection from '../models/connection';
import { UserModel } from '../models';
import { IUser, IUserService } from '../types/User';
import { validateUser } from './validations/validationsUserInputValues';
import { IResponse } from '../types/Response';
import { ILogin } from '../types/Login';

export default class UserService {
  public userModel: UserModel;

  constructor() {
    this.userModel = new UserModel(connection);
  }

  public async findAll(): Promise<IUserService> {
    const users = await this.userModel.findAll();
    return { type: 'OK', message: users };
  }

  public async getById(id: number): Promise<IResponse> {
    const userById = await this.userModel.getById(id);
    if (!userById || userById === undefined) {
      return { type: 'USER_NOT_FOUND', message: 'User not found' };
    }
    return { type: 'OK', message: userById };
  }

  public async getByUserName(user: ILogin): Promise<IResponse> {
    const data = await this.userModel.getByUserName(user);
    if (!data || data === undefined) {
      return { type: 'USER_NOT_FOUND', message: 'User not found' };
    }
    return { type: 'OK', message: data };
  }

  public async create(user: IUser): Promise<IResponse> {
    const isValidUser = validateUser(user);
    if (typeof isValidUser === 'string') {
      throw new BadRequestError(isValidUser);
    }
    const users = await this.userModel.create(user);
    return { type: 'CREATED', message: users };
  }
}
