import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  doc, 
  serverTimestamp,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import { db } from './firebase';

// 🔥 SERVICIO DE PRODUCTOS
export const productosService = {
  // Obtener todos los productos
  async getAll() {
    try {
      const querySnapshot = await getDocs(collection(db, 'productos'));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error obteniendo productos:', error);
      throw error;
    }
  },

  // Obtener producto por ID
  async getById(id) {
    try {
      const docRef = doc(db, 'productos', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error('Producto no encontrado');
      }
    } catch (error) {
      console.error('Error obteniendo producto:', error);
      throw error;
    }
  },

  // Obtener productos por categoría
  async getByCategoria(categoria) {
    try {
      const q = query(
        collection(db, 'productos'),
        where('categoria', '==', categoria)
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error obteniendo productos por categoría:', error);
      throw error;
    }
  },

  // Obtener productos destacados
  async getDestacados() {
    try {
      const q = query(
        collection(db, 'productos'),
        where('destacado', '==', true)
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error obteniendo productos destacados:', error);
      throw error;
    }
  }
};

// 🛒 SERVICIO DE ÓRDENES
export const ordenesService = {
  // Crear nueva orden
  async create(ordenData) {
    try {
      const docRef = await addDoc(collection(db, 'orders'), {
        ...ordenData,
        fecha: serverTimestamp(),
        estado: 'pendiente'
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creando orden:', error);
      throw error;
    }
  },

  // Obtener orden por ID
  async getById(id) {
    try {
      const docRef = doc(db, 'orders', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error('Orden no encontrada');
      }
    } catch (error) {
      console.error('Error obteniendo orden:', error);
      throw error;
    }
  },

  // Obtener todas las órdenes
  async getAll() {
    try {
      const q = query(collection(db, 'orders'), orderBy('fecha', 'desc'));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error obteniendo órdenes:', error);
      throw error;
    }
  }
};

// 📊 SERVICIO DE ESTADÍSTICAS
export const statsService = {
  // Obtener estadísticas básicas
  async getStats() {
    try {
      const productosSnapshot = await getDocs(collection(db, 'productos'));
      const ordenesSnapshot = await getDocs(collection(db, 'orders'));
      
      return {
        totalProductos: productosSnapshot.size,
        totalOrdenes: ordenesSnapshot.size,
        productosDisponibles: productosSnapshot.docs.filter(doc => doc.data().stock > 0).length
      };
    } catch (error) {
      console.error('Error obteniendo estadísticas:', error);
      throw error;
    }
  }
}; 