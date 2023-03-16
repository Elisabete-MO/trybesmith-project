import { Request, Response } from 'express';
import { ProductService } from '../services';
import { errorMap } from '../types/ErrorMap';

export default class ProductController {
  constructor(private productService = new ProductService()) {}

  public getAllProducts = async (_req: Request, res: Response) => {
    const { type, message } = await this.productService.findAll();
    if (type !== 'OK') return res.status(errorMap[type]).json({ message });
    res.status(errorMap[type]).json(message);
  };

  public getById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const { type, message } = await this.productService.getById(id);
    if (type !== 'OK') {
      return res.status(errorMap[type]).json({ message });
    }
    res.status(errorMap[type]).json(message);
  };

  public create = async (req: Request, res: Response) => {
    const product = req.body;
    const { type, message } = await this.productService.create(product);
    if (type !== 'CREATED') {
      return res.status(errorMap[type]).json({ message });
    }
    res.status(errorMap[type]).json(message);
  };
}
