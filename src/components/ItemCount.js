import React, { useState } from 'react';
import { Button, InputGroup } from 'react-bootstrap';

const ItemCount = ({ stock, initial = 1, onAdd }) => {
  const [quantity, setQuantity] = useState(initial);

  const handleIncrement = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    onAdd(quantity);
  };

  return (
    <div className="d-flex flex-column align-items-center gap-2">
      <InputGroup style={{ width: '150px' }}>
        <Button 
          variant="outline-secondary" 
          onClick={handleDecrement}
          disabled={quantity <= 1}
        >
          -
        </Button>
        <div className="form-control text-center">
          {quantity}
        </div>
        <Button 
          variant="outline-secondary" 
          onClick={handleIncrement}
          disabled={quantity >= stock}
        >
          +
        </Button>
      </InputGroup>
      
      <Button 
        variant="primary" 
        onClick={handleAddToCart}
        disabled={stock === 0}
        className="w-100"
      >
        {stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
      </Button>
      
      {stock > 0 && (
        <small className="text-muted">
          Stock disponible: {stock}
        </small>
      )}
    </div>
  );
};

export default ItemCount; 