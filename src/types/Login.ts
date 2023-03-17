import { IUser } from './User';

interface ILogin extends IUser{
  username: string;
  password: string;
}

interface ILoginService { type: string, message: IUser[] }

export { ILogin, ILoginService };