import { BadRequestError } from 'restify-errors';
import connection from '../models/connection';
import { ProductModel } from '../models';
import { IProductService, IProduct } from '../types/Product';
import { validateProduct } from './validations/validationsInputValues';
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
    const isValidProduct = validateProduct(product);
    if (typeof isValidProduct === 'string') {
      throw new BadRequestError(isValidProduct);
    }
    const products = await this.productModel.create(product);
    return { type: 'CREATED', message: products };
  }
}

// const updateProduct = async (id, name) => {
//   const findId = await findById(id);
//   if (findId.type) return findId;
//   const respName = schema.validateNewProduct(name);
//   if (respName.type) return respName;

//   await productModel.update(id, name);
//   const updatedProduct = await productModel.findById(id);

//   return { type: null, message: updatedProduct };
// };

// const deleteProduct = async (id) => {
//   const findId = await findById(id);
//   if (findId.type) return findId;

//   await productModel.deleteProduct(id);

//   return { type: null, message: '' };
// };
