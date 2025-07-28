import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { removeItem } = useCart();

  return (
    <Card className="mb-3">
      <Card.Body>
        <Row className="align-items-center">
          <Col md={2}>
            <img 
              src={item.imagen} 
              alt={item.nombre}
              className="img-fluid rounded"
              style={{ width: '100px', height: '80px', objectFit: 'cover' }}
            />
          </Col>
          <Col md={4}>
            <Card.Title className="h6 mb-1">{item.nombre}</Card.Title>
            <small className="text-muted">Categoría: {item.categoria}</small>
          </Col>
          <Col md={2} className="text-center">
            <span className="fw-bold">${item.precio}</span>
          </Col>
          <Col md={2} className="text-center">
            <span className="badge bg-secondary fs-6">{item.quantity}</span>
          </Col>
          <Col md={2} className="text-center">
            <span className="fw-bold text-primary">${(item.precio * item.quantity).toFixed(2)}</span>
          </Col>
          <Col md={1} className="text-end">
            <Button 
              variant="outline-danger" 
              size="sm"
              onClick={() => removeItem(item.id)}
            >
              🗑️
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CartItem; 