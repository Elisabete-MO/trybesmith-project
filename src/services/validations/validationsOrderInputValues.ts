import { IOrder } from '../../types/Order';
import { IResponse } from '../../types/Response';

const properties = ['id', 'userId'];

function validateProperties(order: IOrder): [boolean, string | null] {
  for (let i = 0; i < properties.length; i += 1) {
    if (!Object.prototype.hasOwnProperty.call(order, properties[i])) {
      return [false, properties[i]];
    }
  }
  return [true, null];
}

function validateValues(order: IOrder): [boolean, string | null] {
  const entries = Object.entries(order);
  for (let i = 0; i < entries.length; i += 1) {
    const [property, value] = entries[i];
    if (!value) {
      return [false, property];
    }
  }
  return [true, null];
}

function validateOrder(order: IOrder): IResponse | void {
  let [valid, property] = validateProperties(order);
  if (!valid) {
    return { type: 'INVALID_VALUE', message: `O campo ${property} é obrigatório.` };
  }
  [valid, property] = validateValues(order);
  if (!valid) {
    return { type: 'INVALID_VALUE', message: `O campo ${property} não pode ser nulo ou vazio.` };
  }
}

// const { error } = nameSchema.validate(name);
//   return { type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' };

export {
  validateProperties,
  validateOrder,
  validateValues,
};