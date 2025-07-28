import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ordenesService } from '../services/firebaseService';
import { validateCheckoutForm, formatPrice } from '../utils/validations';

const CheckoutForm = () => {
  const { cart, getTotalPrice, clear } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setFormErrors({});

    // Validar formulario
    const validation = validateCheckoutForm(formData);
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      setLoading(false);
      return;
    }

    try {
      const orderData = {
        buyer: formData,
        items: cart,
        total: getTotalPrice(),
        totalItems: cart.reduce((total, item) => total + item.quantity, 0)
      };

      const docRef = await ordenesService.create(orderData);
      setOrderId(docRef);
      clear();
      
    } catch (err) {
      setError('Error al procesar la orden. Intenta nuevamente.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0 && !orderId) {
    navigate('/');
    return null;
  }

  if (orderId) {
    return (
      <Container className="py-5">
        <Card className="text-center py-5">
          <Card.Body>
            <div className="mb-4">
              <h1 className="text-success">✅ ¡Orden confirmada!</h1>
              <p className="lead">Tu compra ha sido procesada exitosamente.</p>
            </div>
            
            <Alert variant="success">
              <h4>ID de la orden: {orderId}</h4>
              <p className="mb-0">
                Hemos enviado un email con los detalles de tu compra.
              </p>
            </Alert>
            
            <div className="mt-4">
              <Button 
                variant="primary" 
                onClick={() => navigate('/')}
              >
                Volver al inicio
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4">📋 Finalizar Compra</h2>
      
      <Row>
        <Col lg={8}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Información de contacto</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nombre completo *</Form.Label>
                      <Form.Control
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        isInvalid={!!formErrors.nombre}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.nombre}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        isInvalid={!!formErrors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Teléfono *</Form.Label>
                      <Form.Control
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        isInvalid={!!formErrors.telefono}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.telefono}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Dirección de entrega *</Form.Label>
                      <Form.Control
                        type="text"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleInputChange}
                        isInvalid={!!formErrors.direccion}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.direccion}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                {error && (
                  <Alert variant="danger" className="mt-3">
                    {error}
                  </Alert>
                )}

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <Button 
                    variant="outline-secondary" 
                    onClick={() => navigate('/cart')}
                    disabled={loading}
                  >
                    Volver al carrito
                  </Button>
                  <Button 
                    type="submit" 
                    variant="success" 
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? 'Procesando...' : 'Confirmar orden'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4}>
          <Card className="sticky-top" style={{ top: '20px' }}>
            <Card.Header>
              <h5 className="mb-0">Resumen de la orden</h5>
            </Card.Header>
            <Card.Body>
              {cart.map((item) => (
                <div key={item.id} className="d-flex justify-content-between mb-2">
                  <span>{item.nombre} x{item.quantity}</span>
                  <span>{formatPrice(item.precio * item.quantity)}</span>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between">
                <strong>Total:</strong>
                <strong className="text-primary fs-5">{formatPrice(getTotalPrice())}</strong>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutForm; 