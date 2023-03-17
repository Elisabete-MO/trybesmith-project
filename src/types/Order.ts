interface IOrder {
  id: number;
  userId: number;
}

interface IOrderService { type: string, message: IOrder[] }

interface IOrderProducts extends IOrder {
  productsIds: string;
}

export { IOrder, IOrderService, IOrderProducts };
