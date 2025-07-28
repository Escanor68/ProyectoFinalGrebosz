export const productos = [
  {
    id: 1,
    nombre: "Nintendo Switch OLED",
    precio: 299.99,
    categoria: "consolas",
    imagen: "https://via.placeholder.com/400x300/FF6B6B/FFFFFF?text=Nintendo+Switch+OLED",
    descripcion: "La nueva Nintendo Switch con pantalla OLED de 7 pulgadas, mejor audio y mayor almacenamiento. Incluye dock mejorado y cable LAN.",
    stock: 15,
    destacado: true
  },
  {
    id: 2,
    nombre: "PlayStation 5",
    precio: 499.99,
    categoria: "consolas",
    imagen: "https://via.placeholder.com/400x300/4ECDC4/FFFFFF?text=PlayStation+5",
    descripcion: "La consola más potente de Sony con gráficos de nueva generación, SSD ultrarrápido y control DualSense con haptic feedback.",
    stock: 8,
    destacado: true
  },
  {
    id: 3,
    nombre: "Xbox Series X",
    precio: 449.99,
    categoria: "consolas",
    imagen: "https://via.placeholder.com/400x300/45B7D1/FFFFFF?text=Xbox+Series+X",
    descripcion: "La Xbox más potente con 4K gaming, Game Pass incluido y retrocompatibilidad con miles de juegos.",
    stock: 12,
    destacado: true
  },
  {
    id: 4,
    nombre: "The Legend of Zelda: Tears of the Kingdom",
    precio: 59.99,
    categoria: "juegos",
    imagen: "https://via.placeholder.com/400x300/96CEB4/FFFFFF?text=Zelda+Tears+of+Kingdom",
    descripcion: "La nueva aventura de Link en el mundo de Hyrule con nuevas habilidades, mecánicas de construcción y exploración vertical.",
    stock: 25,
    destacado: true
  },
  {
    id: 5,
    nombre: "God of War Ragnarök",
    precio: 69.99,
    categoria: "juegos",
    imagen: "https://via.placeholder.com/400x300/FFEAA7/000000?text=God+of+War+Ragnarok",
    descripcion: "Kratos y Atreus enfrentan el Ragnarök en esta épica aventura nórdica con gráficos espectaculares y narrativa envolvente.",
    stock: 18,
    destacado: true
  },
  {
    id: 6,
    nombre: "Mando DualSense",
    precio: 69.99,
    categoria: "accesorios",
    imagen: "https://via.placeholder.com/400x300/DDA0DD/FFFFFF?text=DualSense",
    descripcion: "El control oficial de PlayStation 5 con haptic feedback, micrófono integrado y diseño ergonómico mejorado.",
    stock: 30,
    destacado: false
  },
  {
    id: 7,
    nombre: "Pro Controller Nintendo",
    precio: 59.99,
    categoria: "accesorios",
    imagen: "https://via.placeholder.com/400x300/98D8C8/FFFFFF?text=Pro+Controller",
    descripcion: "Control profesional para Nintendo Switch con excelente ergonomía, batería de larga duración y conectividad inalámbrica.",
    stock: 22,
    destacado: false
  },
  {
    id: 8,
    nombre: "Auriculares Gaming",
    precio: 89.99,
    categoria: "accesorios",
    imagen: "https://via.placeholder.com/400x300/F7DC6F/000000?text=Auriculares+Gaming",
    descripcion: "Auriculares gaming con sonido envolvente 7.1, micrófono con cancelación de ruido y comodidad para largas sesiones.",
    stock: 14,
    destacado: false
  },
  {
    id: 9,
    nombre: "Spider-Man 2",
    precio: 69.99,
    categoria: "juegos",
    imagen: "https://via.placeholder.com/400x300/FF6B6B/FFFFFF?text=Spider-Man+2",
    descripcion: "Marvel's Spider-Man 2 para PS5 con dos Spider-Men, Nueva York expandida y gráficos de nueva generación.",
    stock: 20,
    destacado: true
  },
  {
    id: 10,
    nombre: "Mario Kart 8 Deluxe",
    precio: 49.99,
    categoria: "juegos",
    imagen: "https://via.placeholder.com/400x300/4ECDC4/FFFFFF?text=Mario+Kart+8",
    descripcion: "El clásico de carreras de Mario con todos los DLC incluidos, 48 pistas y modo multijugador local y online.",
    stock: 35,
    destacado: false
  },
  {
    id: 11,
    nombre: "Teclado Mecánico Gaming",
    precio: 129.99,
    categoria: "accesorios",
    imagen: "https://via.placeholder.com/400x300/45B7D1/FFFFFF?text=Teclado+Mecanico",
    descripcion: "Teclado mecánico gaming con switches Cherry MX, retroiluminación RGB personalizable y teclas anti-ghosting.",
    stock: 8,
    destacado: false
  },
  {
    id: 12,
    nombre: "Mouse Gaming",
    precio: 79.99,
    categoria: "accesorios",
    imagen: "https://via.placeholder.com/400x300/96CEB4/FFFFFF?text=Mouse+Gaming",
    descripcion: "Mouse gaming de alta precisión con sensor óptico de 25,600 DPI, botones programables y diseño ergonómico.",
    stock: 16,
    destacado: false
  }
];

export const categorias = [
  { id: "consolas", nombre: "Consolas", icono: "🎮" },
  { id: "juegos", nombre: "Juegos", icono: "🎯" },
  { id: "accesorios", nombre: "Accesorios", icono: "🎧" }
];

// Función para obtener productos por categoría
export const getProductosByCategoria = (categoria) => {
  if (!categoria) return productos;
  return productos.filter(producto => producto.categoria === categoria);
};

// Función para obtener producto por ID
export const getProductoById = (id) => {
  return productos.find(producto => producto.id === parseInt(id));
};

// Función para obtener productos destacados
export const getProductosDestacados = () => {
  return productos.filter(producto => producto.destacado);
}; 