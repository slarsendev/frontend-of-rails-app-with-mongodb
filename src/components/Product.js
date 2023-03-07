import { Card } from 'react-bootstrap';

function Product({ product }) {

  return (
    <Card className="m-5 col-3">
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default Product;
