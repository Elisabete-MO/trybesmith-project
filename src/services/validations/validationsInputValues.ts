import { IProduct } from '../../types/Product';
import { IResponse } from '../../types/Response';

const properties = ['name', 'amount'];

function validateProperties(product: IProduct): [boolean, string | null] {
  for (let i = 0; i < properties.length; i += 1) {
    if (!Object.prototype.hasOwnProperty.call(product, properties[i])) {
      return [false, properties[i]];
    }
  }
  return [true, null];
}

function validateValues(product: IProduct): [boolean, string | null] {
  const entries = Object.entries(product);
  for (let i = 0; i < entries.length; i += 1) {
    const [property, value] = entries[i];
    if (!value) {
      return [false, property];
    }
  }
  return [true, null];
}

function validateProduct(product: IProduct): IResponse | void {
  let [valid, property] = validateProperties(product);
  if (!valid) {
    return { type: 'INVALID_VALUE', message: `O campo ${property} é obrigatório.` };
  }
  [valid, property] = validateValues(product);
  if (!valid) {
    return { type: 'INVALID_VALUE', message: `O campo ${property} não pode ser nulo ou vazio.` };
  }
}

// const { error } = nameSchema.validate(name);
//   return { type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' };

export {
  validateProperties,
  validateProduct,
  validateValues,
};