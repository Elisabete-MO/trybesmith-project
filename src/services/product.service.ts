import connection from '../models/connection';
import { ProductModel } from '../models';
import { IProductService, IProduct } from '../types/Product';
import { validateAmount, validateName } from './validations/validationsInputValues';
import { IResponse } from '../types/Response';

export default class ProductService {
  public productModel: ProductModel;

  constructor() {
    this.productModel = new ProductModel(connection);
  }

  public async findAll(): Promise<IProductService> {
    const products = await this.productModel.findAll();
    return { type: 'OK', message: products };
  }

  public async getById(id: number): Promise<IResponse> {
    const productById = await this.productModel.getById(id);
    if (!productById || productById === undefined) {
      return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
    }
    return { type: 'OK', message: productById };
  }

  public async create(product: IProduct): Promise<IResponse> {
    // const { type, message } = validateProduct(product);
    const validName = validateName(product);
    if (validName.type !== 'OK') {
      return { type: validName.type, message: validName.message };
    }
    const validAmount = validateAmount(product);
    if (validAmount.type !== 'OK') {
      return { type: validAmount.type, message: validAmount.message };
    }
    const products = await this.productModel.create(product);
    return { type: 'CREATED', message: products };
  }
}
