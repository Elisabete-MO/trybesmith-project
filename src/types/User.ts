interface IUser {
  id?: number;
  username: string;
  vocation: string;
  level: number;
  password: string;
}
interface IUserService { type: string, message: IUser[] }

export { IUser, IUserService };