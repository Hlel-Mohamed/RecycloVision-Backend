import { Request, Response } from 'express';
import { Order } from '../schemas/Order';
import { User } from '../schemas/User';

export class OrderController {
    static async createOrder(req: Request, res: Response): Promise<Response> {
        try {
            const { items, totalAmount, totalCoins, userId } = req.body;

            if (!items || !totalAmount || !totalCoins || !userId) {
                return res.status(400).json({ message: 'Invalid order data' });
            }

            const user = await User.findOne({ where: { id: userId } });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const order = new Order();
            order.items = items;
            order.totalAmount = totalAmount;
            order.totalCoins = totalCoins;
            order.userId = userId;

            await Order.save(order);

            return res.status(201).json({ message: 'Order created successfully', order });
        } catch (error) {
            console.error('Error creating order:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getOrderById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const order = await Order.findOne({ where: { id } });

            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            return res.status(200).json(order);
        } catch (error) {
            console.error('Error fetching order:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getOrdersByUser(req: Request, res: Response): Promise<Response> {
        try {
            const { userId } = req.params;
            const orders = await Order.find({ where: { userId } });
            return res.status(200).json(orders);
        } catch (error) {
            console.error('Error fetching orders:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getAllOrders(req: Request, res: Response): Promise<Response> {
        try {
            const orders = await Order.find();
            return res.status(200).json(orders);
        } catch (error) {
            console.error('Error fetching orders:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async deleteOrder(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const order = await Order.findOne({ where: { id } });

            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            await Order.remove(order);
            return res.status(200).json({ message: 'Order deleted successfully' });
        } catch (error) {
            console.error('Error deleting order:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}