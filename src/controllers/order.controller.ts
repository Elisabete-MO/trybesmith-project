import { Request, Response } from 'express';
import { OrderService } from '../services';
import { errorMap } from '../types/ErrorMap';

export default class OrderController {
  constructor(private orderService = new OrderService()) {}

  public getAllOrders = async (_req: Request, res: Response) => {
    const { type, message } = await this.orderService.findAll();
    if (type !== 'OK') return res.status(errorMap[type]).json({ message });
    res.status(errorMap[type]).json(message);
  };

  public getById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const { type, message } = await this.orderService.getById(id);
    if (type !== 'OK') {
      return res.status(errorMap[type]).json({ message });
    }
    res.status(errorMap[type]).json(message);
  };

  public create = async (req: Request, res: Response) => {
    const userId = req.user;
    const order = req.body;
    const { type, message } = await this.orderService.create(userId, order);
    if (type !== 'CREATED') {
      return res.status(errorMap[type]).json({ message });
    }
    res.status(errorMap[type]).json(message);
  };
}
