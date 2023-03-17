import { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { ILogin } from '../types/Login';
import { IUser } from '../types/User';

const dataModel = (data: IUser | ILogin) => {
  const columns = Object.keys((data)).join(', ');
  const placeholders = Object.keys(data)
    .map((_key) => '?')
    .join(', ');
  return ({ columns, placeholders });
};

export default class UserModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async findAll(): Promise<IUser[]> {
    const result = await this.connection.execute<(IUser & RowDataPacket)[]>(
      'SELECT * FROM Trybesmith.users');
    const [rows] = result;
    return rows as IUser[];
  }

  public async getById(id: number): Promise<IUser> {
    const result = await this.connection
      .execute('SELECT * FROM Trybesmith.users WHERE id = (?)', [id]);
    const [rows] = result;
    const [user] = rows as IUser[];
    return user;
  }

  public async getByUserName(user: ILogin): Promise<IUser> {
    const result = await this.connection.execute(
      'SELECT * FROM Trybesmith.users WHERE username = ? AND password = ?',
      [...Object.values(user)],
    );
    const [row] = result;
    const [data] = row as IUser[];
    return data;
  }

  public async create(user: IUser): Promise<IUser> {
    const { columns, placeholders } = dataModel(user);
    const result = await this.connection.execute<ResultSetHeader>(
      `INSERT INTO Trybesmith.users (${columns}) VALUE (${placeholders})`,
      [...Object.values(user)],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...user };
  }
}
