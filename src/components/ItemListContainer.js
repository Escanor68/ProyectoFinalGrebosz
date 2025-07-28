import React from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';
import ItemList from './ItemList';
import { useProducts } from '../hooks/useProducts';

const ItemListContainer = ({ categoria }) => {
  const { productos, loading, error } = useProducts(categoria);

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
        <p className="mt-2">Cargando productos...</p>
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
    <Container>
      <h2 className="mb-4">
        {categoria ? `Productos - ${categoria.charAt(0).toUpperCase() + categoria.slice(1)}` : 'Todos los productos'}
      </h2>
      <ItemList productos={productos} />
    </Container>
  );
};

export default ItemListContainer; 