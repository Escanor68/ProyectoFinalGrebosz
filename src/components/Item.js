import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const Item = ({ producto }) => {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img 
        variant="top" 
        src={producto.imagen} 
        alt={producto.nombre}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="h6">{producto.nombre}</Card.Title>
        <Card.Text className="text-muted small mb-2">
          {producto.descripcion.substring(0, 80)}...
        </Card.Text>
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="h5 mb-0 text-primary">${producto.precio}</span>
            <small className="text-muted">Stock: {producto.stock}</small>
          </div>
          <Button 
            as={Link} 
            to={`/item/${producto.id}`} 
            variant="outline-primary" 
            className="w-100"
          >
            Ver detalles
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Item; 