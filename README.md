# 🎮 GameStore - E-commerce de Videojuegos

## Descripción

GameStore es una aplicación web de e-commerce desarrollada con React que permite a los usuarios explorar, comprar y gestionar productos de videojuegos, consolas y accesorios gaming.

## 🚀 Características

- **Catálogo de productos**: Visualización de productos organizados por categorías
- **Detalle de productos**: Vista detallada con información completa y opciones de compra
- **Carrito de compras**: Gestión de productos con Context API
- **Navegación**: Sistema de rutas con React Router
- **Responsive Design**: Interfaz adaptativa para diferentes dispositivos
- **Integración con Firebase**: Base de datos para productos y órdenes

## 🛠️ Tecnologías Utilizadas

- **React 19.1.1**: Framework principal
- **React Router DOM**: Navegación entre componentes
- **Bootstrap & React Bootstrap**: Framework de estilos
- **Firebase**: Base de datos y servicios en la nube
- **Context API**: Gestión de estado global del carrito

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── NavBar.js       # Barra de navegación
│   ├── CartWidget.js   # Widget del carrito
│   ├── ItemListContainer.js  # Contenedor de lista de productos
│   ├── ItemList.js     # Lista de productos
│   ├── Item.js         # Producto individual
│   ├── ItemDetailContainer.js  # Contenedor de detalle
│   ├── ItemDetail.js   # Detalle de producto
│   ├── ItemCount.js    # Selector de cantidad
│   ├── Cart.js         # Carrito de compras
│   ├── CartItem.js     # Item del carrito
│   └── CheckoutForm.js # Formulario de checkout
├── context/            # Contextos de React
│   └── CartContext.js  # Contexto del carrito
├── pages/              # Páginas principales
│   ├── Home.js         # Página de inicio
│   └── Category.js     # Página de categoría
├── services/           # Servicios externos
│   └── firebase.js     # Configuración de Firebase
└── utils/              # Utilidades
    └── mockData.js     # Datos de prueba
```

## 🎯 Funcionalidades Implementadas

### ✅ Listado y Detalle de Productos
- Generación dinámica del catálogo
- Vista detallada de cada producto
- Separación entre componentes contenedores y de presentación

### ✅ Navegación
- Sistema de rutas con React Router
- Navegación SPA sin recargas
- Enlaces en NavBar para todas las secciones

### ✅ Carrito de Compras
- Gestión de estado con Context API
- Agregar/eliminar productos
- Cálculo de totales
- Widget con contador de items

### ✅ Componente ItemCount
- Selector de cantidad con validaciones
- Límites de stock
- Ocultación después de agregar al carrito

### ✅ Firebase Integration
- Configuración de Firestore
- Almacenamiento de órdenes
- Generación de IDs únicos

### ✅ Experiencia de Usuario
- Loaders y estados de carga
- Mensajes condicionales
- Validaciones de formularios
- Feedback visual de acciones

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js (versión 14 o superior)
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd ProyectoFinalGrebosz
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar Firebase**
   - Crear un proyecto en Firebase Console
   - Habilitar Firestore Database
   - Actualizar la configuración en `src/services/firebase.js`

4. **Ejecutar la aplicación**
```bash
npm start
```

La aplicación estará disponible en `http://localhost:3000`

## 📱 Rutas de la Aplicación

- `/` - Página de inicio (todos los productos)
- `/categoria/:categoria` - Productos por categoría
- `/item/:id` - Detalle de producto específico
- `/cart` - Carrito de compras
- `/checkout` - Formulario de finalización de compra

## 🎨 Categorías de Productos

- **Consolas**: PlayStation 5, Xbox Series X, Nintendo Switch OLED
- **Juegos**: Títulos populares para diferentes plataformas
- **Accesorios**: Controles, auriculares y otros periféricos

## 🔧 Configuración de Firebase

Para conectar con Firebase, actualiza el archivo `src/services/firebase.js` con tu configuración:

```javascript
const firebaseConfig = {
  apiKey: "tu-api-key",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "tu-app-id"
};
```

## 📝 Convenciones de Código

- **Componentes**: PascalCase (ej: `ItemListContainer`)
- **Funciones**: camelCase (ej: `handleAddToCart`)
- **Variables**: camelCase (ej: `productosFiltrados`)
- **Archivos**: PascalCase para componentes, camelCase para utilidades

## 🎯 Criterios de Evaluación Cumplidos

- ✅ Front-end con React
- ✅ Integración con Firestore
- ✅ Componentes contenedores y de presentación
- ✅ Navegación con React Router
- ✅ Context API para estado global
- ✅ Validaciones y UX
- ✅ Documentación del proyecto

## 👨‍💻 Autor

**Grebosz** - Proyecto Final de React

---

*Desarrollado como proyecto final para el curso de React*
