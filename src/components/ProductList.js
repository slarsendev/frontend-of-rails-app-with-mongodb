import { useEffect, useState } from 'react';
import { Alert, Row } from 'react-bootstrap';
import { ProductApi } from '../api';
import Product from './Product';

function ProductList() {
  const [products, setProducts] = useState([]);

	useEffect(() => {
    ProductApi.getProducts('/products')
			.then((response) => {
				setProducts(response.data);
			})
			.catch((response) => {
			})
  },[]);

  return (
		<Row>
			{
				products ? products.map((product) => 
					<Product product={product} />
				) :
				<Alert variant='warning' className="m-5">
					There is no product yet
				</Alert>
			}
		</Row>
  );
}

export default ProductList;
