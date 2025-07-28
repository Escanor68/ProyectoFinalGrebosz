import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

/**
 * Configuración de Firebase para la aplicación
 * Inicializa los servicios de Firestore y Analytics
 */

// 🔥 CONFIGURACIÓN DE FIREBASE - CREDENCIALES REALES
const firebaseConfig = {
  apiKey: "AIzaSyBi5qEQD1zlAFejiTZ6VoaeuIsJWsicVTE",
  authDomain: "gamestore-ecommerce-c0694.firebaseapp.com",
  projectId: "gamestore-ecommerce-c0694",
  storageBucket: "gamestore-ecommerce-c0694.firebasestorage.app",
  messagingSenderId: "847204135848",
  appId: "1:847204135848:web:ec230555486a0c3eda639d",
  measurementId: "G-CDFTF63RZB"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

console.log('✅ Firebase configurado correctamente');
console.log('📊 Proyecto ID:', firebaseConfig.projectId); 