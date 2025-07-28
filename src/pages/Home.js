import React from 'react';
import { Container } from 'react-bootstrap';
import ItemListContainer from '../components/ItemListContainer';
import FirebaseLoader from '../components/FirebaseLoader';
import FirebaseChecker from '../components/FirebaseChecker';

const Home = () => {
  return (
    <Container>
      {/* 🔍 Firebase Checker - Para verificar estado */}
      <FirebaseChecker />
      
      {/* 🔥 Firebase Loader - Temporal para cargar datos */}
      <FirebaseLoader />
      
      {/* 📦 Lista de productos */}
      <ItemListContainer />
    </Container>
  );
};

export default Home; 