import React from 'react';
import { Container } from 'react-bootstrap';
import ItemListContainer from '../components/ItemListContainer';

/**
 * Página principal de la aplicación
 * Muestra el catálogo de productos destacados
 */
const Home = () => {
  return (
    <Container>
      {/* 📦 Lista de productos */}
      <ItemListContainer />
    </Container>
  );
};

export default Home; 