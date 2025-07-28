import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import { useCart } from '../context/CartContext';

const CartWidget = () => {
  const { getTotalQuantity } = useCart();
  const totalQuantity = getTotalQuantity();

  return (
    <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <span style={{ fontSize: '1.5rem' }}>🛒</span>
        {totalQuantity > 0 && (
          <Badge 
            bg="danger" 
            style={{ 
              position: 'absolute', 
              top: '-8px', 
              right: '-8px',
              fontSize: '0.7rem'
            }}
          >
            {totalQuantity}
          </Badge>
        )}
      </div>
    </Link>
  );
};

export default CartWidget; 