import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Item from './Item';

const ItemList = ({ productos }) => {
  if (!productos || productos.length === 0) {
    return (
      <div className="text-center py-5">
        <h4>No se encontraron productos</h4>
        <p className="text-muted">Intenta con otra categoría o vuelve más tarde.</p>
      </div>
    );
  }

  return (
    <Row xs={1} md={2} lg={3} xl={4} className="g-4">
      {productos.map((producto) => (
        <Col key={producto.id}>
          <Item producto={producto} />
        </Col>
      ))}
    </Row>
  );
};

export default ItemList; 