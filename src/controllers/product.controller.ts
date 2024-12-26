import { Request, Response } from 'express';
import { Product } from '../schemas/Product';
import s3 from '../config/aws-config';
import { v4 as uuidv4 } from 'uuid';

export class ProductController {
    static async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const products = await Product.find();
            return res.status(200).json(products);
        } catch (error) {
            console.error('Error fetching products:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const product = await Product.findOne({ where: { id } });
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            return res.status(200).json(product);
        } catch (error) {
            console.error('Error fetching product:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async create(req: Request, res: Response): Promise<Response> {
        try {
            const { name, price, coins, description, image } = req.body;
            if (!name || !price || !coins || !description || !image) {
                return res.status(400).json({ message: 'Invalid product data' });
            }

            const buffer = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""), 'base64');
            const key = `${uuidv4()}.jpg`;

            const params = {
                Bucket: process.env.AWS_S3_BUCKET_NAME as string,
                Key: key,
                Body: buffer,
                ContentEncoding: 'base64',
                ContentType: 'image/jpeg',
            };

            const { Location } = await s3.upload(params).promise();

            const product = new Product();
            product.name = name;
            product.price = price;
            product.coins = coins;
            product.description = description;
            product.image = Location;

            await Product.save(product);

            return res.status(200).json({ message: 'Product created successfully', product });
        } catch (error) {
            console.error('Error creating product:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async update(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const { name, price, coins, description, image } = req.body;

            const product = await Product.findOne({ where: { id } });
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            if (image) {
                const buffer = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""), 'base64');
                const key = `${uuidv4()}.jpg`;

                const params = {
                    Bucket: process.env.AWS_S3_BUCKET_NAME as string,
                    Key: key,
                    Body: buffer,
                    ContentEncoding: 'base64',
                    ContentType: 'image/jpeg',
                };

                const { Location } = await s3.upload(params).promise();
                product.image = Location;
            }

            product.name = name || product.name;
            product.price = price || product.price;
            product.coins = coins || product.coins;
            product.description = description || product.description;

            await Product.save(product);

            return res.status(200).json({ message: 'Product updated successfully', product });
        } catch (error) {
            console.error('Error updating product:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const product = await Product.findOne({ where: { id } });
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            await Product.remove(product);
            return res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            console.error('Error deleting product:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}