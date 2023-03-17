import express from 'express';
import { LoginController } from '../controllers';
import validateLoginMiddleware from '../middlewares/validateLoginMiddleware';

const router = express.Router();
const loginController = new LoginController();

router.post(
  '/',
  validateLoginMiddleware,
  loginController.postLogin,
);

export default router;