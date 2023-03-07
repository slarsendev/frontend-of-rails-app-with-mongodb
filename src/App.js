import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert, Button, Container} from 'react-bootstrap';
import { useSearchParams } from "react-router-dom";
import { CalculateModal, Product, ProductList } from './components';
import { ProductApi } from './api';

function App() {
	let [searchParams, setSearchParams] = useSearchParams();
  const dimensions = searchParams.get("dimensions");
  const weight = searchParams.get("weight");
  const [show, setShow] = useState(false);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

	useEffect(() => {
		searchParams.has('dimensions') && searchParams.has('weight') && ProductApi.getProduct(dimensions, weight)
			.then(({ data }) => {
				setProduct(data.product);
			})
			.catch(() => {
				setError('Product not found!');
			})
	}, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container>
			{error ? 
				<Alert variant='danger' className="m-5">
      		{error}
    		</Alert> :
				product ? <Product product={product} /> : <ProductList />
			}
      <Button variant="primary" onClick={handleShow} className="float-end">Launch Calculator</Button>
      <CalculateModal show={show} handleClose={handleClose} setProduct={setProduct} />
    </Container>
  );
}

export default App;
