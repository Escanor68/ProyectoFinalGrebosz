import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { loadDataToFirebase } from '../utils/loadDataToFirebase';
import './FirebaseSetup.css';

/**
 * Componente para configurar y verificar la conexión con Firebase
 * Proporciona herramientas para diagnosticar problemas de conexión
 */

const FirebaseSetup = () => {
  const [status, setStatus] = useState('checking');
  const [message, setMessage] = useState('');
  const [productosCount, setProductosCount] = useState(0);
  const [ordenesCount, setOrdenesCount] = useState(0);
  const [loading, setLoading] = useState(false);

  /**
   * Verifica la conexión con Firebase y obtiene estadísticas básicas
   */
  const checkFirebaseConnection = async () => {
    setStatus('checking');
    setMessage('Verificando conexión a Firebase...');

    try {
      // Intentar leer una colección
      const productosSnapshot = await getDocs(collection(db, 'productos'));
      const ordenesSnapshot = await getDocs(collection(db, 'orders'));
      
      setProductosCount(productosSnapshot.size);
      setOrdenesCount(ordenesSnapshot.size);
      
      setStatus('connected');
      setMessage(`✅ Conexión exitosa! Productos: ${productosSnapshot.size}, Órdenes: ${ordenesSnapshot.size}`);
      
    } catch (error) {
      setStatus('error');
      setMessage(`❌ Error de conexión: ${error.message}`);
      
      if (error.message.includes('permissions')) {
        setMessage(`
          ❌ Error de permisos en Firebase
          
          🔧 Para solucionarlo:
          1. Ve a console.firebase.google.com
          2. Selecciona tu proyecto: gamestore-ecommerce-c0694
          3. Ve a Firestore Database > Rules
          4. Reemplaza las reglas con:
          
          rules_version = '2';
          service cloud.firestore {
            match /databases/{database}/documents {
              match /{document=**} {
                allow read, write: if true;
              }
            }
          }
          
          5. Haz clic en "Publish"
        `);
      }
    }
  };

  /**
   * Carga datos de prueba en Firebase
   */
  const handleLoadData = async () => {
    setLoading(true);
    setMessage('Cargando datos de prueba...');

    try {
      const result = await loadDataToFirebase();
      
      if (result.success) {
        setMessage(`✅ ${result.message}`);
        // Actualizar contadores
        setTimeout(checkFirebaseConnection, 1000);
      } else {
        setMessage(`❌ ${result.message}`);
      }
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Crea una colección de prueba para verificar permisos de escritura
   */
  const createTestCollection = async () => {
    setLoading(true);
    setMessage('Creando colección de prueba...');

    try {
      const docRef = await addDoc(collection(db, 'test'), {
        mensaje: 'Prueba de conexión',
        timestamp: new Date(),
        status: 'success'
      });
      
      setMessage(`✅ Colección de prueba creada! ID: ${docRef.id}`);
      setTimeout(checkFirebaseConnection, 1000);
      
    } catch (error) {
      setMessage(`❌ Error creando colección: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkFirebaseConnection();
  }, []);

  return (
    <div className="firebase-setup">
      <h2>🔧 Configuración de Firebase</h2>
      
      {/* Status Card */}
      <div className={`status-card ${status}`}>
        <h3>Estado de la Conexión</h3>
        <div className="status-indicator">
          {status === 'checking' && '🔄 Verificando...'}
          {status === 'connected' && '✅ Conectado'}
          {status === 'error' && '❌ Error'}
        </div>
        <p className="message">{message}</p>
      </div>

      {/* Stats */}
      {status === 'connected' && (
        <div className="stats-grid">
          <div className="stat-card">
            <h4>📦 Productos</h4>
            <p className="stat-number">{productosCount}</p>
          </div>
          <div className="stat-card">
            <h4>🛒 Órdenes</h4>
            <p className="stat-number">{ordenesCount}</p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="actions">
        <button 
          onClick={checkFirebaseConnection}
          disabled={loading}
          className="btn-primary"
        >
          🔄 Verificar Conexión
        </button>
        
        <button 
          onClick={createTestCollection}
          disabled={loading || status !== 'connected'}
          className="btn-secondary"
        >
          🧪 Crear Colección de Prueba
        </button>
        
        <button 
          onClick={handleLoadData}
          disabled={loading || status !== 'connected'}
          className="btn-success"
        >
          📊 Cargar Datos de Prueba
        </button>
      </div>

      {/* Instructions */}
      <div className="instructions">
        <h3>📋 Instrucciones de Configuración</h3>
        
        <div className="instruction-step">
          <h4>1. Configurar Reglas de Firestore</h4>
          <p>Ve a la consola de Firebase y actualiza las reglas de seguridad:</p>
          <pre className="code-block">
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}`}
          </pre>
        </div>

        <div className="instruction-step">
          <h4>2. Verificar Configuración</h4>
          <p>Haz clic en "Verificar Conexión" para confirmar que todo funciona.</p>
        </div>

        <div className="instruction-step">
          <h4>3. Cargar Datos</h4>
          <p>Una vez conectado, puedes cargar datos de prueba para ver la aplicación funcionando.</p>
        </div>
      </div>

      {/* Troubleshooting */}
      {status === 'error' && (
        <div className="troubleshooting">
          <h3>🔧 Solución de Problemas</h3>
          <ul>
            <li><strong>Error de permisos:</strong> Actualiza las reglas de Firestore</li>
            <li><strong>Error de red:</strong> Verifica tu conexión a internet</li>
            <li><strong>Error de configuración:</strong> Revisa las credenciales en firebase.js</li>
            <li><strong>Proyecto no encontrado:</strong> Verifica el Project ID en la consola</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default FirebaseSetup; 