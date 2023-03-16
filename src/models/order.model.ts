import { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { IOrder } from '../types/Order';

const dataModel = (data: IOrder) => {
  const columns = Object.keys((data)).join(', ');
  const placeholders = Object.keys(data)
    .map((_key) => '?')
    .join(', ');
  return ({ columns, placeholders });
};

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async findAll(): Promise<IOrder[]> {
    const result = await this.connection.execute<(IOrder & RowDataPacket)[]>(
      'SELECT * FROM Trybesmith.orders');
    const [rows] = result;
    return rows as IOrder[];
  }

  public async getById(id: number): Promise<IOrder> {
    const result = await this.connection
      .execute('SELECT * FROM Trybesmith.orders WHERE id = (?)', [id]);
    const [rows] = result;
    const [order] = rows as IOrder[];
    return order;
  }

  public async create(order: IOrder): Promise<IOrder> {
    const { columns, placeholders } = dataModel(order);
    const result = await this.connection.execute<ResultSetHeader>(
      `INSERT INTO Trybesmith.orders (${columns}) VALUE (${placeholders})`,
      [...Object.values(order)],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, userId: order.userId };
  }
}
