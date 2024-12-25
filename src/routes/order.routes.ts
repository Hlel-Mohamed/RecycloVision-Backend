import express from 'express';
import { OrderController } from '../controllers/order.controller';

const router = express.Router();

router.post('/create', OrderController.createOrder);
router.get('/:id', OrderController.getOrderById);
router.get('/user/:userId', OrderController.getOrdersByUser);
router.get('/all', OrderController.getAllOrders);
router.delete('/:id', OrderController.deleteOrder);
export default router;