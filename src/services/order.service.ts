import { BadRequestError } from 'restify-errors';
import connection from '../models/connection';
import { OrderModel } from '../models';
import { IOrder, IOrderService } from '../types/Order';
import { validateOrder } from './validations/validationsOrderInputValues';
import IResponse from '../types/Response';

export default class OrderService {
  public orderModel: OrderModel;

  constructor() {
    this.orderModel = new OrderModel(connection);
  }

  public async findAll(): Promise<IOrderService> {
    const orders = await this.orderModel.findAll();
    return { type: 'OK', message: orders };
  }

  public async getById(id: number): Promise<IResponse> {
    const orderById = await this.orderModel.getById(id);
    if (!orderById || orderById === undefined) {
      return { type: 'USER_NOT_FOUND', message: 'Order not found' };
    }
    return { type: 'OK', message: orderById };
  }

  public async create(order: IOrder): Promise<IResponse> {
    const isValidOrder = validateOrder(order);
    if (typeof isValidOrder === 'string') {
      throw new BadRequestError(isValidOrder);
    }
    const orders = await this.orderModel.create(order);
    return { type: 'CREATED', message: orders };
  }
}
