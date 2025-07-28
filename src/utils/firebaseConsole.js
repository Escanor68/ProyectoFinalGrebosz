// 🔥 FUNCIONES PARA EJECUTAR DESDE LA CONSOLA DEL NAVEGADOR
// Abre las herramientas de desarrollador (F12) y ejecuta estas funciones

import { loadDataToFirebase, getFirebaseStats } from './loadDataToFirebase';

// Función global para cargar datos (ejecutar: cargarDatosFirebase())
window.cargarDatosFirebase = async () => {
  console.log('🚀 Iniciando carga de datos desde consola...');
  try {
    const result = await loadDataToFirebase();
    console.log('📊 Resultado:', result);
    return result;
  } catch (error) {
    console.error('❌ Error:', error);
    return { success: false, error: error.message };
  }
};

// Función global para ver estadísticas (ejecutar: verEstadisticasFirebase())
window.verEstadisticasFirebase = async () => {
  console.log('📈 Obteniendo estadísticas desde consola...');
  try {
    const result = await getFirebaseStats();
    console.log('📊 Estadísticas:', result);
    return result;
  } catch (error) {
    console.error('❌ Error:', error);
    return { success: false, error: error.message };
  }
};

// Función global para verificar conexión (ejecutar: verificarFirebase())
window.verificarFirebase = () => {
  console.log('🔍 Verificando conexión a Firebase...');
  try {
    const { db } = require('../services/firebase');
    console.log('✅ Firebase conectado correctamente');
    console.log('📊 Base de datos:', db);
    return { success: true, db };
  } catch (error) {
    console.error('❌ Error de conexión:', error);
    return { success: false, error: error.message };
  }
};

// Función global para mostrar ayuda (ejecutar: ayudaFirebase())
window.ayudaFirebase = () => {
  console.log(`
🔥 AYUDA - FUNCIONES DE FIREBASE

Para cargar datos a Firebase:
  cargarDatosFirebase()

Para ver estadísticas:
  verEstadisticasFirebase()

Para verificar conexión:
  verificarFirebase()

Para ver esta ayuda:
  ayudaFirebase()

📝 INSTRUCCIONES:
1. Abre las herramientas de desarrollador (F12)
2. Ve a la pestaña "Console"
3. Ejecuta: cargarDatosFirebase()
4. Espera el mensaje de confirmación
5. ¡Listo! Los datos están en Firebase
  `);
};

// Mostrar ayuda automáticamente
console.log(`
🔥 FIREBASE CONSOLE FUNCTIONS LOADED!

Ejecuta en la consola:
  ayudaFirebase() - Para ver todas las funciones disponibles
  cargarDatosFirebase() - Para cargar los datos de prueba
`); 