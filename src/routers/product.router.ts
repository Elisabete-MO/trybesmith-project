import express from 'express';
import { ProductController } from '../controllers';
import validateId from '../middlewares/validateIdMiddleware';

const router = express.Router();
const productController = new ProductController();

router.get(
  '/',
  productController.getAllProducts,
);

router.get(
  '/:id',
  validateId,
  productController.getById,
);

// router.get(
//   '/search',
//   ProductController.getByNameProduct,
// );

// router.post(
//   '/',
//   validateNewProductFields,
//   ProductController.createProduct,
// );

// router.put(
//   '/:id',
//   validateNewProductFields,
//   ProductController.updateProduct,
// );

// router.delete(
//   '/:id',
//   ProductController.deleteProduct,
// );

export default router;