import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import products from './data/products';
import productRoutes from './routes/productRoutes';
import { notFound, errorHandler } from './middlewares/errorMiddleware';

dotenv.config();

const app = express();

app.get('/', (req: Request, res: Response) => {
	res.send('API is running');
});

app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server is running on port ${port}`));
