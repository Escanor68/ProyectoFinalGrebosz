import React from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ItemDetail from './ItemDetail';
import { useProduct } from '../hooks/useProducts';

const ItemDetailContainer = () => {
  const { id } = useParams();
  const { producto, loading, error } = useProduct(id);

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
        <p className="mt-2">Cargando producto...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <ItemDetail producto={producto} />
    </Container>
  );
};

export default ItemDetailContainer; 