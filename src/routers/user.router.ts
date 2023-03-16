import express from 'express';
import { UserController } from '../controllers';
import validateId from '../middlewares/validateIdMiddleware';
import validateNewUserFields from '../middlewares/validateNewUserFields ';

const router = express.Router();
const userController = new UserController();

router.get(
  '/',
  userController.getAllUsers,
);

router.get(
  '/:id',
  validateId,
  userController.getById,
);

router.post(
  '/',
  validateNewUserFields,
  userController.create,
);

export default router;