interface IOrder {
  id: number;
  userId: number;
}

interface IOrderService { type: string, message: IOrder[] }

export { IOrder, IOrderService };
