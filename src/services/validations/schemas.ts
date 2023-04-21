import * as Joi from 'joi';

const idSchema = Joi.number().integer().min(1).required();
const nameSchema = Joi.string().min(3).required();
const amountSchema = nameSchema;
const usernameSchema = nameSchema;
const vocationSchema = nameSchema;
const levelSchema = Joi.number().integer().min(1).required();
const passwordSchema = Joi.string().min(8).required();
const orderSchema = Joi.array()
  .min(1)
  .items(Joi.number().required())
  .required();

export {
  idSchema,
  nameSchema,
  amountSchema,
  usernameSchema,
  vocationSchema,
  levelSchema,
  passwordSchema,
  orderSchema,
};