import React from 'react';
import { Container } from 'react-bootstrap';
import ItemListContainer from '../components/ItemListContainer';
import FirebaseLoader from '../components/FirebaseLoader';

const Home = () => {
  return (
    <Container>
      {/* 🔥 Firebase Loader - Temporal para cargar datos */}
      <FirebaseLoader />
      
      {/* 📦 Lista de productos */}
      <ItemListContainer />
    </Container>
  );
};

export default Home; 