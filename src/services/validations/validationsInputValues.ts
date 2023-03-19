import { IProduct } from '../../types/Product';
import { IResponse } from '../../types/Response';
import { amountSchema, nameSchema } from './schemas';

// const properties = ['name', 'amount'];

// function validateProperties(product: IProduct): [boolean, string | null] {
//   for (let i = 0; i < properties.length; i += 1) {
//     if (!Object.prototype.hasOwnProperty.call(product, properties[i])) {
//       console.log(properties[i]);
//       return [false, properties[i]];
//     }
//   }
//   return [true, null];
// }

// function validateValues(product: IProduct): [boolean, string | null] {
//   const entries = Object.entries(product);
//   for (let i = 0; i < entries.length; i += 1) {
//     const [property, value] = entries[i];
//     if (!value) {
//       return [false, property];
//     }
//   }
//   return [true, null];
// }

// function validateProduct(product: IProduct): IResponse {
//   let [valid, property] = validateProperties(product);
//   if (!valid) {
//     return { type: 'INVALID_VALUE', message: `O campo ${property} é obrigatório.` };
//   }
//   [valid, property] = validateValues(product);
//   if (!valid) {
//     return { type: 'INVALID_VALUE', message: `O campo ${property} não pode ser nulo ou vazio.` };
//   }
//   return { type: 'OK', message: '' };
// }

function validateName(product: IProduct): IResponse {
  const { error } = nameSchema.validate(product.name);
  if (error) { 
    const cleanMessage = error.message.replace('"value"', '"name"');
    return { type: 'INVALID_VALUE', message: cleanMessage };
  }
  return { type: 'OK', message: '' };
}

function validateAmount(product: IProduct): IResponse {
  const { error } = amountSchema.validate(product.amount);
  if (error) { 
    const cleanMessage = error.message.replace('"value"', '"amount"');
    return { type: 'INVALID_VALUE', message: cleanMessage };
  }
  return { type: 'OK', message: '' };
}

export {
  validateAmount,
  validateName,
};
