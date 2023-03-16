import express from 'express';
import { OrderController } from '../controllers';
import validateId from '../middlewares/validateIdMiddleware';
import validateNewOrderFields from '../middlewares/validateNewOrderFields';

const router = express.Router();
const orderController = new OrderController();

router.get(
  '/',
  orderController.getAllOrders,
);

router.get(
  '/:id',
  validateId,
  orderController.getById,
);

router.post(
  '/',
  validateNewOrderFields,
  orderController.create,
);

export default router;