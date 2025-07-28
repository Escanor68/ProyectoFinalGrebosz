import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';

/**
 * Datos de productos para cargar en Firebase
 * Estos datos se usan para poblar la base de datos inicialmente
 */
const productos = [
  {
    nombre: "PlayStation 5",
    precio: 499.99,
    categoria: "consolas",
    imagen: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400",
    descripcion: "La consola más potente de Sony con gráficos 4K y ray tracing",
    stock: 15,
    destacado: true
  },
  {
    nombre: "Xbox Series X",
    precio: 449.99,
    categoria: "consolas",
    imagen: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400",
    descripcion: "La consola más potente de Microsoft con Game Pass incluido",
    stock: 12,
    destacado: true
  },
  {
    nombre: "Nintendo Switch OLED",
    precio: 349.99,
    categoria: "consolas",
    imagen: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400",
    descripcion: "La versión mejorada de Switch con pantalla OLED",
    stock: 20,
    destacado: false
  },
  {
    nombre: "God of War Ragnarök",
    precio: 59.99,
    categoria: "juegos",
    imagen: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400",
    descripcion: "La épica continuación de la saga de Kratos",
    stock: 50,
    destacado: true
  },
  {
    nombre: "Elden Ring",
    precio: 54.99,
    categoria: "juegos",
    imagen: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400",
    descripcion: "El nuevo RPG de FromSoftware con mundo abierto",
    stock: 35,
    destacado: true
  },
  {
    nombre: "Mario Kart 8 Deluxe",
    precio: 49.99,
    categoria: "juegos",
    imagen: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400",
    descripcion: "La versión definitiva del clásico de carreras",
    stock: 40,
    destacado: false
  },
  {
    nombre: "DualSense Controller",
    precio: 69.99,
    categoria: "accesorios",
    imagen: "https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=400",
    descripcion: "El control inalámbrico oficial de PlayStation 5",
    stock: 25,
    destacado: false
  },
  {
    nombre: "Xbox Wireless Controller",
    precio: 59.99,
    categoria: "accesorios",
    imagen: "https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=400",
    descripcion: "El control inalámbrico oficial de Xbox Series X",
    stock: 30,
    destacado: false
  },
  {
    nombre: "Nintendo Pro Controller",
    precio: 49.99,
    categoria: "accesorios",
    imagen: "https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=400",
    descripcion: "El control profesional para Nintendo Switch",
    stock: 18,
    destacado: false
  }
];

// 📊 SCRIPT PARA CARGAR DATOS A FIREBASE
export const loadDataToFirebase = async () => {
  try {
    console.log('🔄 Iniciando carga de datos a Firebase...');

    // Verificar si ya existen productos
    const productosSnapshot = await getDocs(collection(db, 'productos'));
    
    if (!productosSnapshot.empty) {
      console.log('⚠️ Ya existen productos en Firebase. Saltando carga...');
      return { success: false, message: 'Los productos ya existen en Firebase' };
    }

    // Cargar productos uno por uno
    const promises = productos.map(async (producto) => {
      try {
        const docRef = await addDoc(collection(db, 'productos'), {
          nombre: producto.nombre,
          precio: producto.precio,
          categoria: producto.categoria,
          imagen: producto.imagen,
          descripcion: producto.descripcion,
          stock: producto.stock,
          destacado: producto.destacado,
          fechaCreacion: new Date()
        });
        console.log(`✅ Producto cargado: ${producto.nombre} (ID: ${docRef.id})`);
        return docRef.id;
      } catch (error) {
        console.error(`❌ Error cargando producto ${producto.nombre}:`, error);
        throw error;
      }
    });

    const resultados = await Promise.all(promises);
    
    console.log(`🎉 Carga completada! ${resultados.length} productos cargados exitosamente.`);
    
    return { 
      success: true, 
      message: `${resultados.length} productos cargados exitosamente`,
      productosCargados: resultados.length
    };

  } catch (error) {
    console.error('❌ Error durante la carga de datos:', error);
    return { 
      success: false, 
      message: 'Error durante la carga de datos',
      error: error.message 
    };
  }
};

// 🧹 SCRIPT PARA LIMPIAR DATOS DE FIREBASE (CUIDADO!)
export const clearFirebaseData = async () => {
  try {
    console.log('🧹 Iniciando limpieza de datos de Firebase...');
    
    const productosSnapshot = await getDocs(collection(db, 'productos'));
    const ordenesSnapshot = await getDocs(collection(db, 'orders'));
    
    console.log(`📊 Productos encontrados: ${productosSnapshot.size}`);
    console.log(`📊 Órdenes encontradas: ${ordenesSnapshot.size}`);
    
    // ⚠️ ADVERTENCIA: Este código eliminaría todos los datos
    // Solo usar en desarrollo o con mucho cuidado
    console.log('⚠️ ADVERTENCIA: Esta función eliminaría todos los datos');
    console.log('⚠️ Comentada por seguridad. Descomenta si es necesario.');
    
    /*
    const deletePromises = [
      ...productosSnapshot.docs.map(doc => doc.ref.delete()),
      ...ordenesSnapshot.docs.map(doc => doc.ref.delete())
    ];
    
    await Promise.all(deletePromises);
    console.log('✅ Datos eliminados exitosamente');
    */
    
    return { 
      success: true, 
      message: 'Función de limpieza (comentada por seguridad)',
      productos: productosSnapshot.size,
      ordenes: ordenesSnapshot.size
    };

  } catch (error) {
    console.error('❌ Error durante la limpieza:', error);
    return { 
      success: false, 
      message: 'Error durante la limpieza',
      error: error.message 
    };
  }
};

// 📈 SCRIPT PARA VER ESTADÍSTICAS
export const getFirebaseStats = async () => {
  try {
    const productosSnapshot = await getDocs(collection(db, 'productos'));
    const ordenesSnapshot = await getDocs(collection(db, 'orders'));
    
    const stats = {
      productos: productosSnapshot.size,
      ordenes: ordenesSnapshot.size,
      productosDisponibles: productosSnapshot.docs.filter(doc => doc.data().stock > 0).length,
      productosDestacados: productosSnapshot.docs.filter(doc => doc.data().destacado).length
    };
    
    console.log('📊 Estadísticas de Firebase:', stats);
    return { success: true, stats };

  } catch (error) {
    console.error('❌ Error obteniendo estadísticas:', error);
    return { 
      success: false, 
      message: 'Error obteniendo estadísticas',
      error: error.message 
    };
  }
}; 