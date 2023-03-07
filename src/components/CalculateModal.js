import { useEffect, useRef, useState } from 'react';
import { Badge, Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { ProductApi } from '../api';

function CalculateModal({ show, handleClose, setProduct }) {

  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [length, setLength] = useState(0);
  const [weight, setWeight] = useState(0);
  const [productName, setProductName] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() =>  {
    setHeight(0);
    setWidth(0);
    setLength(0);
    setWeight(0);
    setProductName(null);
    setError(null);
    return () => clearTimeout(timerRef.current);
  }, [show]);

  const timerRef = useRef(null);

  const handleCalculate = () => {
    ProductApi.calculate(length, width, height, weight)
      .then(({ data }) => {
        setProductName(data.product_name);
        setProduct({
          name: data.product_name
        })
      })
      .catch((response) => {
        setError('Product not found!')
        setProduct(null)
      })
    timerRef.current = setTimeout(() => {
      console.log("Time out called");
      handleClose();
    }, 5000);
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter Dimensions</Form.Label>
            <Row>
              <Col>
                <Form.Control type="number" value={length} onChange={(e) => setLength(e.target.value)} placeholder="Enter length" />
              </Col>
              <Col>
                <Form.Control type="number" value={width} onChange={(e) => setWidth(e.target.value)} placeholder="Enter width" />
              </Col>
              <Col>
                <Form.Control type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="Enter height" autoFocus />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Enter Weight</Form.Label>
            <Form.Control type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
          </Form.Group>
        </Form>
        { productName && <Badge bg="info">
          {productName}
        </Badge>}
        { error && <Badge bg="danger">
          {error}
        </Badge>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCalculate}>
          Calculate
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CalculateModal;
