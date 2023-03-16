interface IProduct {
  id?: number;
  name: string;
  amount: string;
  orderId?: number;
}

interface IProductService { type: string, message: IProduct[] }

export { IProduct, IProductService };