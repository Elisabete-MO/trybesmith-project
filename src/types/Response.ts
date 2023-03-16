import { IProduct } from './Product';

interface IResponse {
  type: string ;
  message: string | number | IProduct;
}

export default IResponse;
