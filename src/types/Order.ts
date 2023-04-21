interface IOrder {
  id: number;
  userId: number;
}

interface INewOrder {
  productsIds: number[];
}

interface IOrders {
  userId: number;
  productIds: number[];
}

interface IOrderService { type: string, message: IOrder[] }

interface IOrderProducts extends IOrder {
  productsIds: string;
}

export { IOrder, IOrderService, IOrderProducts, INewOrder, IOrders };
