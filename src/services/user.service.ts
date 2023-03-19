import connection from '../models/connection';
import { UserModel } from '../models';
import { IUser, IUserService } from '../types/User';
import { validateName, validateLevel,
  validatePassword, validateVocation } from './validations/validationsUserInputValues';
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
    const validName = validateName(user);
    if (validName.type !== 'OK') {
      return { type: validName.type, message: validName.message };
    }
    const validPassword = validatePassword(user);
    if (validPassword.type !== 'OK') {
      return { type: validPassword.type, message: validPassword.message };
    }
    const validLevel = validateLevel(user);
    if (validLevel.type !== 'OK') {
      return { type: validLevel.type, message: validLevel.message };
    }
    const validVocation = validateVocation(user);
    if (validVocation.type !== 'OK') {
      return { type: validVocation.type, message: validVocation.message };
    }
    const users = await this.userModel.create(user);
    return { type: 'CREATED', message: users };
  }
}
