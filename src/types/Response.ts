import { IProduct } from './Product';
import { IUser } from './User';

interface IResponse {
  type: string | number ;
  message: string | number | IProduct | IUser;
}

export default IResponse;
