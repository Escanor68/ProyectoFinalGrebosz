import React, { useState } from 'react';
import { Card, Row, Col, Badge, Alert } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import ItemCount from './ItemCount';

const ItemDetail = ({ producto }) => {
  const { addItem, isInCart } = useCart();

  const handleAddToCart = (quantity) => {
    addItem(producto, quantity);
  };

  if (!producto) {
    return (
      <Alert variant="warning">
        Producto no encontrado
      </Alert>
    );
  }

  return (
    <Card className="shadow">
      <Row className="g-0">
        <Col md={6}>
          <Card.Img 
            src={producto.imagen} 
            alt={producto.nombre}
            className="h-100"
            style={{ objectFit: 'cover' }}
          />
        </Col>
        <Col md={6}>
          <Card.Body className="p-4">
            <Card.Title className="h3 mb-3">{producto.nombre}</Card.Title>
            <Card.Text className="text-muted mb-3">
              {producto.descripcion}
            </Card.Text>
            
            <div className="mb-3">
              <Badge bg="primary" className="me-2">
                {producto.categoria}
              </Badge>
              <Badge bg={producto.stock > 0 ? "success" : "danger"}>
                {producto.stock > 0 ? `Stock: ${producto.stock}` : 'Sin stock'}
              </Badge>
            </div>
            
            <div className="mb-4">
              <span className="h2 text-primary">${producto.precio}</span>
            </div>
            
            <ItemCount 
              stock={producto.stock} 
              onAdd={handleAddToCart}
            />
            
            {isInCart(producto.id) && (
              <Alert variant="success" className="text-center mt-2">
                ¡Producto en el carrito! 🎉
              </Alert>
            )}
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default ItemDetail; 