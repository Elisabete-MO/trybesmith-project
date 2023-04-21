// import { INewOrder, IOrder, IOrderProducts } from '../../types/Order';
import { IResponse } from '../../types/Response';
import { orderSchema } from './schemas';

// const properties = ['productsIds'];

// function validateProperties(order: IOrder): [boolean, string | null] {
//   for (let i = 0; i < properties.length; i += 1) {
//     if (!Object.prototype.hasOwnProperty.call(order, properties[i])) {
//       return [false, properties[i]];
//     }
//   }
//   return [true, null];
// }

// function validateValues(order: IOrder): [boolean, string | null] {
//   const entries = Object.entries(order);
//   for (let i = 0; i < entries.length; i += 1) {
//     const [property, value] = entries[i];
//     if (!value) {
//       return [false, property];
//     }
//   }
//   return [true, null];
// }

function validateOrder(order: number[]): IResponse {
  // let [valid, property] = validateProperties(order);
  // return { type: 'INVALID_VALUE', message: `O campo ${property} não pode ser nulo ou vazio.` };
  const { error } = orderSchema.validate(order);
  if (error) { 
    const cleanMessage = error.message.replace('"value"', '"productsIds"');
    return { type: 'INVALID_VALUE', message: cleanMessage };
  }
  return { type: 'OK', message: '' };
}

export default validateOrder;
// validateProperties,  
// validateValues,
