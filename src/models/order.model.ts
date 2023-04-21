import { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { IOrder, IOrderProducts } from '../types/Order';

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

  public async create(userId: number, productsIds: number[]): 
  Promise<{ userId: number, productIds: number[] }> {
    const [result] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.orders (user_id) VALUES (?)',
      [userId],
    );
    const orderId = result.insertId;
  
    const productIds: number[] = await Promise.all(productsIds.map(async (productId) => {
      const [rows] = await this.connection.execute<RowDataPacket[]>(
        'SELECT id, name, amount FROM Trybesmith.products WHERE id = ?',
        [productId],
      );
      const [{ name, amount }] = rows;
      const [productResult] = await this.connection.execute<ResultSetHeader>(
        'INSERT INTO Trybesmith.products (name, amount, order_id) VALUES (?, ?, ?)',
        [name, amount, orderId],
      );
      return productResult.insertId;
    })); return { userId, productIds };
  }
}