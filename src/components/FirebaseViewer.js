import React, { useState, useEffect } from 'react';
import { productosService, ordenesService, statsService } from '../services/firebaseService';
import './FirebaseViewer.css';

/**
 * Componente para visualizar datos de Firebase en tiempo real
 * Permite ver productos, órdenes y estadísticas de la aplicación
 */

const FirebaseViewer = () => {
  const [activeTab, setActiveTab] = useState('productos');
  const [productos, setProductos] = useState([]);
  const [ordenes, setOrdenes] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Obtiene datos de Firebase según el tipo especificado
   * @param {string} type - Tipo de datos a obtener ('productos', 'ordenes', 'stats')
   */
  const fetchData = async (type) => {
    setLoading(true);
    setError(null);
    
    try {
      switch (type) {
        case 'productos':
          const productosData = await productosService.getAll();
          setProductos(productosData);
          break;
        case 'ordenes':
          const ordenesData = await ordenesService.getAll();
          setOrdenes(ordenesData);
          break;
        case 'stats':
          const statsData = await statsService.getStats();
          setStats(statsData);
          break;
        default:
          break;
      }
    } catch (err) {
      setError(`Error al cargar ${type}: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]);

  /**
   * Formatea un timestamp de Firebase a fecha legible
   * @param {Object} timestamp - Timestamp de Firebase
   * @returns {string} Fecha formateada
   */
  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp.seconds * 1000).toLocaleString('es-ES');
  };

  return (
    <div className="firebase-viewer">
      <h2>🔥 Firebase Data Viewer</h2>
      
      {/* Tabs */}
      <div className="tabs">
        <button 
          className={activeTab === 'productos' ? 'active' : ''}
          onClick={() => setActiveTab('productos')}
        >
          📦 Productos ({productos.length})
        </button>
        <button 
          className={activeTab === 'ordenes' ? 'active' : ''}
          onClick={() => setActiveTab('ordenes')}
        >
          🛒 Órdenes ({ordenes.length})
        </button>
        <button 
          className={activeTab === 'stats' ? 'active' : ''}
          onClick={() => setActiveTab('stats')}
        >
          📊 Estadísticas
        </button>
      </div>

      {/* Refresh Button */}
      <button 
        className="refresh-btn"
        onClick={() => fetchData(activeTab)}
        disabled={loading}
      >
        🔄 {loading ? 'Cargando...' : 'Actualizar'}
      </button>

      {/* Error Display */}
      {error && (
        <div className="error-message">
          ❌ {error}
        </div>
      )}

      {/* Content */}
      <div className="content">
        {activeTab === 'productos' && (
          <div className="productos-list">
            <h3>Productos en Firebase</h3>
            {productos.length === 0 ? (
              <p>No hay productos en la base de datos</p>
            ) : (
              <div className="productos-grid">
                {productos.map(producto => (
                  <div key={producto.id} className="producto-card">
                    <img src={producto.imagen} alt={producto.nombre} />
                    <h4>{producto.nombre}</h4>
                    <p>💰 ${producto.precio}</p>
                    <p>📦 Stock: {producto.stock}</p>
                    <p>🏷️ {producto.categoria}</p>
                    {producto.destacado && <span className="destacado">⭐ Destacado</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'ordenes' && (
          <div className="ordenes-list">
            <h3>Órdenes en Firebase</h3>
            {ordenes.length === 0 ? (
              <p>No hay órdenes en la base de datos</p>
            ) : (
              <div className="ordenes-grid">
                {ordenes.map(orden => (
                  <div key={orden.id} className="orden-card">
                    <h4>Orden #{orden.id.slice(-8)}</h4>
                    <p>📅 {formatDate(orden.fecha)}</p>
                    <p>👤 {orden.comprador?.nombre || 'N/A'}</p>
                    <p>📧 {orden.comprador?.email || 'N/A'}</p>
                    <p>💰 Total: ${orden.total}</p>
                    <p>📦 Items: {orden.items?.length || 0}</p>
                    <p>📋 Estado: {orden.estado}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="stats-container">
            <h3>Estadísticas de la Tienda</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <h4>📦 Total Productos</h4>
                <p className="stat-number">{stats.totalProductos || 0}</p>
              </div>
              <div className="stat-card">
                <h4>🛒 Total Órdenes</h4>
                <p className="stat-number">{stats.totalOrdenes || 0}</p>
              </div>
              <div className="stat-card">
                <h4>✅ Productos Disponibles</h4>
                <p className="stat-number">{stats.productosDisponibles || 0}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FirebaseViewer; 