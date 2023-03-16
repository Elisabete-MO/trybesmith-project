import express from 'express';
import { ProductController } from '../controllers';
import validateId from '../middlewares/validateIdMiddleware';
import validateNewProductFields from '../middlewares/validateNewProductFields';

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

router.post(
  '/',
  validateNewProductFields,
  productController.create,
);

// router.get(
//   '/search',
//   ProductController.getByNameProduct,
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