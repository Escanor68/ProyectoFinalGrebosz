import { useState, useEffect } from 'react';
import { productosService } from '../services/firebaseService';

/**
 * Hook personalizado para manejar productos
 * Proporciona funcionalidad para obtener productos de Firebase con fallback a datos mock
 */
export const useProducts = (categoria = null) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true);
      setError(null);

      try {
        let productosData;

        // Obtener productos de Firebase
        if (categoria) {
          productosData = await productosService.getByCategoria(categoria);
        } else {
          productosData = await productosService.getAll();
        }

        setProductos(productosData);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los productos');
        setLoading(false);
      }
    };

    fetchProductos();
  }, [categoria]);

  return { productos, loading, error };
};

/**
 * Hook para obtener un producto individual por ID
 * @param {string} id - ID del producto
 * @returns {Object} Estado del producto (producto, loading, error)
 */
export const useProduct = (id) => {
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      setLoading(true);
      setError(null);

      try {
        let productoData;

        // Obtener producto de Firebase
        productoData = await productosService.getById(id);

        if (productoData) {
          setProducto(productoData);
        } else {
          setError('Producto no encontrado');
        }

        setLoading(false);
      } catch (err) {
        setError('Error al cargar el producto');
        setLoading(false);
      }
    };

    if (id) {
      fetchProducto();
    }
  }, [id]);

  return { producto, loading, error };
};

/**
 * Hook para obtener productos destacados
 * @returns {Object} Estado de productos destacados (destacados, loading, error)
 */
export const useDestacados = () => {
  const [destacados, setDestacados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestacados = async () => {
      setLoading(true);
      setError(null);

      try {
        let destacadosData;

        // Obtener productos destacados de Firebase
        destacadosData = await productosService.getDestacados();

        setDestacados(destacadosData);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar productos destacados');
        setLoading(false);
      }
    };

    fetchDestacados();
  }, []);

  return { destacados, loading, error };
}; 