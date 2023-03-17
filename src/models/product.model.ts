import { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { IProduct } from '../types/Product';

const dataModel = (data: IProduct) => {
  const columns = Object.keys((data)).join(', ');
  const placeholders = Object.keys(data)
    .map((_key) => '?')
    .join(', ');
  return ({ columns, placeholders });
};

export default class ProductModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async findAll(): Promise<IProduct[]> {
    const result = await this.connection.execute<(IProduct & RowDataPacket)[]>(
      'SELECT * FROM Trybesmith.products');
    const [rows] = result;
    return rows as IProduct[];
  }

  public async getById(id: number): Promise<IProduct> {
    const result = await this.connection
      .execute('SELECT * FROM Trybesmith.products WHERE id = (?)', [id]);
    const [rows] = result;
    const [product] = rows as IProduct[];
    return product;
  }

  public async getByOrderId(id: number): Promise<IProduct[]> {
    const result = await this.connection
      .execute('SELECT id FROM Trybesmith.products WHERE order_id = (?)', [id]);
    const [rows] = result;
    return rows as IProduct[];
  }

  public async create(product: IProduct): Promise<IProduct> {
    const { columns, placeholders } = dataModel(product);
    const result = await this.connection.execute<ResultSetHeader>(
      `INSERT INTO Trybesmith.products (${columns}) VALUE (${placeholders})`,
      [...Object.values(product)],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...product };
  }
}

// const insert = async (product) => {
//   const { columns, placeholders } = dataModel(product);
//   const [{ insertId }] = await connection.execute(
//     `INSERT INTO Trybesmith.products (${columns}) VALUE (${placeholders})`,
//     [...Object.values(product)],
//   );

//   return insertId;
// };

// const update = async (id, name) => {
//   await connection.execute(
//     'UPDATE Trybesmith.products SET name = (?) WHERE id = (?)',
//     [name, id],
//     );
//   return id;
// };

// const deleteProduct = async (id) => {
//   await connection.execute(
//     'DELETE FROM Trybesmith.products WHERE id = (?)',
//     [id],
//     );
//   return id;
// };
