import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import products from './data/products';

dotenv.config();

const app = express();

app.get('/', (req: Request, res: Response) => {
	res.send('API is running');
});

app.get('/api/products', (req: Request, res: Response) => {
	res.json(products);
});

app.get('/api/products/:id', (req: Request, res: Response) => {
	const product = products.find((p) => p.id === parseInt(req.params.id));
	res.json(product);
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server is running on port ${port}`));
