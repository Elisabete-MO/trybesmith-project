import { IUser } from '../../types/User';
import { IResponse } from '../../types/Response';

const properties = ['username', 'vocation', 'level', 'password'];

function validateProperties(user: IUser): [boolean, string | null] {
  for (let i = 0; i < properties.length; i += 1) {
    if (!Object.prototype.hasOwnProperty.call(user, properties[i])) {
      return [false, properties[i]];
    }
  }
  return [true, null];
}

function validateValues(user: IUser): [boolean, string | null] {
  const entries = Object.entries(user);
  for (let i = 0; i < entries.length; i += 1) {
    const [property, value] = entries[i];
    if (!value) {
      return [false, property];
    }
  }
  return [true, null];
}

function validateUser(user: IUser): IResponse | void {
  let [valid, property] = validateProperties(user);
  if (!valid) {
    return { type: 'INVALID_VALUE', message: `O campo ${property} é obrigatório.` };
  }
  [valid, property] = validateValues(user);
  if (!valid) {
    return { type: 'INVALID_VALUE', message: `O campo ${property} não pode ser nulo ou vazio.` };
  }
}

// const { error } = nameSchema.validate(name);
//   return { type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' };

export {
  validateProperties,
  validateUser,
  validateValues,
};