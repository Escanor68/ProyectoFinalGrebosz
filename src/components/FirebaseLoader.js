import React, { useState } from 'react';
import { Button, Alert, Card, Spinner } from 'react-bootstrap';
import { loadDataToFirebase, getFirebaseStats } from '../utils/loadDataToFirebase';

const FirebaseLoader = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [stats, setStats] = useState(null);

  const handleLoadData = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      const result = await loadDataToFirebase();
      setMessage(result.message);
      
      if (result.success) {
        // Obtener estadísticas después de cargar
        const statsResult = await getFirebaseStats();
        if (statsResult.success) {
          setStats(statsResult.stats);
        }
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGetStats = async () => {
    setLoading(true);
    try {
      const result = await getFirebaseStats();
      if (result.success) {
        setStats(result.stats);
        setMessage('Estadísticas obtenidas correctamente');
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-4 border-warning" style={{ borderWidth: '3px' }}>
      <Card.Header className="bg-warning text-dark">
        <h5 className="mb-0">
          🔥 FIREBASE DATA LOADER - IMPORTANTE!
        </h5>
      </Card.Header>
      <Card.Body className="bg-light">
        <div className="alert alert-info">
          <strong>📋 Instrucciones:</strong>
          <ul className="mb-0 mt-2">
            <li>Este componente te permite cargar los datos de prueba a Firebase</li>
            <li>Debes hacer clic en "Cargar Datos a Firebase" para que la app funcione completamente</li>
            <li>Una vez cargados los datos, puedes remover este componente</li>
          </ul>
        </div>
        
        <div className="d-flex gap-2 mb-3">
          <Button 
            variant="success" 
            size="lg"
            onClick={handleLoadData}
            disabled={loading}
            style={{ minWidth: '200px' }}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Cargando...
              </>
            ) : (
              '📊 CARGAR DATOS A FIREBASE'
            )}
          </Button>
          
          <Button 
            variant="info" 
            onClick={handleGetStats}
            disabled={loading}
          >
            📈 Ver Estadísticas
          </Button>
        </div>

        {message && (
          <Alert variant={message.includes('Error') ? 'danger' : 'success'}>
            <strong>Resultado:</strong> {message}
          </Alert>
        )}

        {stats && (
          <Card className="mt-3">
            <Card.Header>
              <h6>📊 Estadísticas de Firebase</h6>
            </Card.Header>
            <Card.Body>
              <div className="row text-center">
                <div className="col">
                  <h4 className="text-primary">{stats.productos}</h4>
                  <small>Productos</small>
                </div>
                <div className="col">
                  <h4 className="text-success">{stats.productosDisponibles}</h4>
                  <small>Disponibles</small>
                </div>
                <div className="col">
                  <h4 className="text-warning">{stats.productosDestacados}</h4>
                  <small>Destacados</small>
                </div>
                <div className="col">
                  <h4 className="text-info">{stats.ordenes}</h4>
                  <small>Órdenes</small>
                </div>
              </div>
            </Card.Body>
          </Card>
        )}
      </Card.Body>
    </Card>
  );
};

export default FirebaseLoader; 