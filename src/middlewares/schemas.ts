import Joi from 'joi';

const idSchema = Joi.number().integer().min(1).required();
const nameSchema = Joi.string().min(5).required();

const createSaleSchema = Joi.object({
  productId: idSchema,
  quantity: Joi.number().integer().min(1).required(),
});

export {
  idSchema,
  nameSchema,
  createSaleSchema,
};