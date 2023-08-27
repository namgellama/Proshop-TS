import axios from 'axios';
import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { Product as IProduct } from '../interfaces/product';

const HomePage = () => {
	const [products, setProducts] = useState<IProduct[]>();

	useEffect(() => {
		const fetchProducts = async () => {
			const { data } = await axios.get<IProduct[]>('/api/products');
			setProducts(data);
		};

		fetchProducts();
	}, []);

	return (
		<>
			<h1>Latest Products</h1>
			<Row>
				{products?.map((product) => (
					<Col sm={12} md={6} lg={4} xl={3}>
						<Product product={product} key={product.id} />
					</Col>
				))}
			</Row>
		</>
	);
};

export default HomePage;
