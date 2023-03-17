import { IOrder } from './Order';
import { IProduct } from './Product';
import { IUser } from './User';

interface IResponse {
  type: string | number ;
  message: string | number | IProduct | IUser | IOrder | IResponseOrder;
}

interface IResponseOrder extends IOrder{
  productsIds?: number[];
}

export { IResponse, IResponseOrder };
