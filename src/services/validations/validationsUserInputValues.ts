import { IUser } from '../../types/User';
import { IResponse } from '../../types/Response';
import { usernameSchema, vocationSchema, levelSchema, passwordSchema } from './schemas';

function validateName(user: IUser): IResponse {
  const { error } = usernameSchema.validate(user.username);
  if (error) { 
    const cleanMessage = error.message.replace('"value"', '"username"');
    return { type: 'INVALID_VALUE', message: cleanMessage };
  }
  return { type: 'OK', message: '' };
}

function validateVocation(user: IUser): IResponse {
  const { error } = vocationSchema.validate(user.vocation);
  if (error) { 
    const cleanMessage = error.message.replace('"value"', '"vocation"');
    return { type: 'INVALID_VALUE', message: cleanMessage };
  }
  return { type: 'OK', message: '' };
}

function validateLevel(user: IUser): IResponse {
  const { error } = levelSchema.validate(user.level);
  if (error) { 
    const cleanMessage = error.message.replace('"value"', '"level"');
    return { type: 'INVALID_VALUE', message: cleanMessage };
  }
  return { type: 'OK', message: '' };
}

function validatePassword(user: IUser): IResponse {
  const { error } = passwordSchema.validate(user.password);
  if (error) { 
    const cleanMessage = error.message.replace('"value"', '"password"');
    return { type: 'INVALID_VALUE', message: cleanMessage };
  }
  return { type: 'OK', message: '' };
}

export {
  validateLevel,
  validateName,
  validatePassword,
  validateVocation,
};