import express from 'express';
import { OrderController } from '../controllers/order.controller';

const router = express.Router();

router.post('/create', OrderController.createOrder);
router.get('/user/:userId', OrderController.getOrdersByUser);
router.get('/all', OrderController.getAllOrders);
router.put('/validate/:id', OrderController.validateOrder);
router.put('/cancel/:id', OrderController.cancelOrder);
router.delete('/:id', OrderController.deleteOrder);
router.get('/:id', OrderController.getOrderById);
export default router;