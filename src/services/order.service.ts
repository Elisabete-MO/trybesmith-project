import connection from '../models/connection';
import { OrderModel, ProductModel } from '../models';
import { IOrderProducts, IOrderService } from '../types/Order';
import { validateOrder } from './validations/validationsOrderInputValues';
import { IResponse, IResponseOrder } from '../types/Response';

export default class OrderService {
  public orderModel: OrderModel;

  public productModel: ProductModel;

  constructor() {
    this.orderModel = new OrderModel(connection);
    this.productModel = new ProductModel(connection);
  }

  public async findAll(): Promise<IOrderService> {
    const orders: IOrderProducts[] = await this.orderModel.findAll();
    const result = orders.map((row) => {
      const productsIds = typeof row.productsIds === 'string'
        ? row.productsIds.split(',')
        : [] ?? [];
      return {
        ...row,
        productsIds: productsIds.length === 1
          ? [parseInt(productsIds[0], 10)]
          : productsIds.map((id: string) => parseInt(id, 10)),
      };
    });
    return { type: 'OK', message: result };
  }

  public async getById(id: number): Promise<IResponse> {
    const orderById = await this.orderModel.getById(id);
    if (!orderById || orderById === undefined) {
      return { type: 'ORDER_NOT_FOUND', message: 'Order not found' };
    }
    const productsByOrderId = await this.productModel.getByOrderId(id);
    const productIds = productsByOrderId.map((product) => product.id);
    const responseOrder: IResponseOrder = {
      ...orderById,
      productsIds: productIds as number[],
    };
    return { type: 'OK', message: responseOrder };
  }

  public async create(userId: number, productsIds: number[]): Promise<IResponse> {
    const validName = validateOrder(productsIds);
    console.log(validName);
    if (validName.type !== 'OK') {
      return { type: validName.type, message: validName.message };
    }
    const orders = await this.orderModel.create(userId, productsIds);
    return { type: 'CREATED', message: orders };
  }
}
