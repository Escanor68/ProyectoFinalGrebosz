import React from 'react';
import { useParams } from 'react-router-dom';
import ItemListContainer from '../components/ItemListContainer';

const Category = () => {
  const { categoria } = useParams();
  return <ItemListContainer categoria={categoria} />;
};

export default Category; 