# 🎮 GameStore - E-commerce de Videojuegos

Una aplicación web moderna de e-commerce especializada en videojuegos, consolas y accesorios gaming, construida con React y Firebase.

## ✨ Características

- 🛍️ **Catálogo de productos** con filtrado por categorías
- 🛒 **Carrito de compras** con persistencia de datos
- 🔥 **Integración completa con Firebase** para base de datos en tiempo real
- 📱 **Diseño responsive** optimizado para móviles
- ⚡ **Rendimiento optimizado** con lazy loading
- 🎨 **UI moderna** con Bootstrap y CSS personalizado

## 🚀 Tecnologías Utilizadas

- **Frontend:** React 18, React Router, Bootstrap
- **Backend:** Firebase Firestore, Firebase Analytics
- **Estado:** React Context API
- **Herramientas:** Create React App, ESLint

## 📦 Instalación

1. **Clona el repositorio:**
   ```bash
   git clone <url-del-repositorio>
   cd ProyectoFinalGrebosz
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Configura Firebase:**
   - Ve a [console.firebase.google.com](https://console.firebase.google.com)
   - Crea un nuevo proyecto o usa uno existente
   - Habilita Firestore Database
   - Copia las credenciales a `src/services/firebase.js`

4. **Configura las reglas de Firestore:**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }
   ```

5. **Ejecuta la aplicación:**
   ```bash
   npm start
   ```

## 🔧 Configuración de Firebase

### Estructura de la Base de Datos

```
gamestore-ecommerce-c0694/
├── productos/
│   ├── {productoId}/
│   │   ├── nombre: string
│   │   ├── precio: number
│   │   ├── categoria: string
│   │   ├── imagen: string
│   │   ├── descripcion: string
│   │   ├── stock: number
│   │   └── destacado: boolean
└── orders/
    ├── {orderId}/
    │   ├── comprador: object
    │   ├── items: array
    │   ├── total: number
    │   ├── fecha: timestamp
    │   └── estado: string
```

### Componentes de Firebase

- **FirebaseViewer:** Visualización en tiempo real de datos
- **FirebaseSetup:** Configuración y diagnóstico de conexión
- **FirebaseService:** Servicios para interactuar con la base de datos

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── FirebaseViewer.js    # Visor de datos de Firebase
│   ├── FirebaseSetup.js     # Configuración de Firebase
│   ├── NavBar.js            # Barra de navegación
│   ├── Cart.js              # Carrito de compras
│   └── ...
├── services/           # Servicios y APIs
│   ├── firebase.js         # Configuración de Firebase
│   └── firebaseService.js  # Servicios de base de datos
├── hooks/              # Hooks personalizados
│   └── useProducts.js      # Hook para productos
├── context/            # Context API
│   └── CartContext.js      # Contexto del carrito
├── pages/              # Páginas de la aplicación
│   ├── Home.js             # Página principal
│   └── Category.js         # Página de categorías
└── utils/              # Utilidades y helpers
    ├── loadDataToFirebase.js # Cargador de datos
    ├── firebaseConsole.js    # Funciones de consola
    └── validations.js        # Validaciones
```

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm start          # Inicia el servidor de desarrollo
npm test           # Ejecuta las pruebas
npm run build      # Construye para producción

# Firebase (desde la consola del navegador)
loadDataToFirebase()    # Carga datos de prueba
getFirebaseStats()      # Obtiene estadísticas
clearFirebaseData()     # Limpia datos (cuidado!)
```

## 🎯 Funcionalidades Principales

### Catálogo de Productos
- Visualización de productos con imágenes y detalles
- Filtrado por categorías (Consolas, Juegos, Accesorios)
- Productos destacados en la página principal
- Búsqueda y navegación intuitiva

### Carrito de Compras
- Agregar/eliminar productos
- Modificar cantidades
- Cálculo automático de totales
- Persistencia de datos en localStorage

### Gestión de Órdenes
- Formulario de checkout completo
- Validación de datos del cliente
- Generación de órdenes en Firebase
- Seguimiento de estado de órdenes

### Panel de Administración
- Visor de datos de Firebase en tiempo real
- Estadísticas de la tienda
- Herramientas de configuración y diagnóstico

## 🔒 Seguridad

### Reglas de Firestore (Desarrollo)
```javascript
// Permitir todo para desarrollo
match /{document=**} {
  allow read, write: if true;
}
```

### Reglas de Firestore (Producción)
```javascript
// Reglas más restrictivas para producción
match /productos/{productoId} {
  allow read: if true;
  allow write: if request.auth != null && request.auth.token.admin == true;
}

match /orders/{orderId} {
  allow read, write: if request.auth != null;
}
```

## 📊 Monitoreo y Analytics

- **Firebase Analytics:** Seguimiento de eventos de usuario
- **Console Logging:** Logs detallados para debugging
- **Error Handling:** Manejo robusto de errores
- **Performance Monitoring:** Monitoreo de rendimiento

## 🚀 Despliegue

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

### Netlify
```bash
npm run build
# Subir carpeta build/ a Netlify
```

### Vercel
```bash
npm install -g vercel
vercel
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Grebosz** - [GitHub](https://github.com/tu-usuario)

## 🙏 Agradecimientos

- Firebase por la infraestructura backend
- React por el framework frontend
- Bootstrap por los componentes de UI
- La comunidad de desarrolladores por el apoyo

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!
