import { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { IOrder, IOrderProducts } from '../types/Order';

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

  public async findAll(): Promise<IOrderProducts[]> {
    const result = await this.connection.execute<(IOrderProducts & RowDataPacket)[]>(
      `SELECT t1.id AS 'id', t1.user_id AS 'userId',
      GROUP_CONCAT(t2.id ORDER BY t2.id) AS 'productsIds'
      FROM Trybesmith.orders t1
      INNER JOIN Trybesmith.products t2 ON t1.id = t2.order_id
      GROUP BY t1.id, t1.user_id
      `);
    const [rows] = result;
    return rows as IOrderProducts[];
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
