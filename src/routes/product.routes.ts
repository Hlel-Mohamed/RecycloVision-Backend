import express from 'express';
import { ProductController } from '../controllers/product.controller';

const router = express.Router();

router.get('/', ProductController.getAll);
router.get('/:id', ProductController.getById);
router.post('/create', ProductController.create);
router.put('/update/:id', ProductController.update);
router.delete('/:id', ProductController.delete);

export default router;