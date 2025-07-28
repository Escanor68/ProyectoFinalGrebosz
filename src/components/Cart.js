import React from 'react';
import { Container, Card, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from './CartItem';

const Cart = () => {
  const { cart, clear, getTotalPrice, getTotalQuantity } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <Container className="py-5">
        <Card className="text-center py-5">
          <Card.Body>
            <h3>🛒 Tu carrito está vacío</h3>
            <p className="text-muted mb-4">
              No tienes productos en tu carrito de compras.
            </p>
            <Button as={Link} to="/" variant="primary">
              Continuar comprando
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4">🛒 Carrito de Compras</h2>
      
      <div className="row">
        <div className="col-lg-8">
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        
        <div className="col-lg-4">
          <Card className="sticky-top" style={{ top: '20px' }}>
            <Card.Header>
              <h5 className="mb-0">Resumen de compra</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <span>Productos ({getTotalQuantity()}):</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong className="text-primary fs-5">${getTotalPrice().toFixed(2)}</strong>
              </div>
              
              <div className="d-grid gap-2">
                <Button 
                  variant="success" 
                  size="lg"
                  onClick={handleCheckout}
                >
                  Finalizar compra
                </Button>
                <Button 
                  variant="outline-danger" 
                  onClick={clear}
                >
                  Vaciar carrito
                </Button>
                <Button 
                  as={Link} 
                  to="/" 
                  variant="outline-primary"
                >
                  Continuar comprando
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default Cart; 