import { useState, useEffect } from 'react';
import { productosService } from '../services/firebaseService';
import { productos as mockProductos } from '../utils/mockData';

// 🎯 HOOK PERSONALIZADO PARA PRODUCTOS
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

        // Intentar obtener de Firebase primero
        try {
          if (categoria) {
            productosData = await productosService.getByCategoria(categoria);
          } else {
            productosData = await productosService.getAll();
          }
        } catch (firebaseError) {
          console.log('Firebase no disponible, usando datos mock:', firebaseError);
          // Si Firebase falla, usar datos mock
          if (categoria) {
            productosData = mockProductos.filter(p => p.categoria === categoria);
          } else {
            productosData = mockProductos;
          }
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

// 🎯 HOOK PARA PRODUCTO INDIVIDUAL
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

        // Intentar obtener de Firebase primero
        try {
          productoData = await productosService.getById(id);
        } catch (firebaseError) {
          console.log('Firebase no disponible, usando datos mock:', firebaseError);
          // Si Firebase falla, usar datos mock
          productoData = mockProductos.find(p => p.id === parseInt(id));
        }

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

// 🎯 HOOK PARA PRODUCTOS DESTACADOS
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

        // Intentar obtener de Firebase primero
        try {
          destacadosData = await productosService.getDestacados();
        } catch (firebaseError) {
          console.log('Firebase no disponible, usando datos mock:', firebaseError);
          // Si Firebase falla, usar datos mock
          destacadosData = mockProductos.filter(p => p.destacado);
        }

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