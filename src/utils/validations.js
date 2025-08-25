// 📝 VALIDACIONES DE FORMULARIOS

// Validar email
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validar teléfono
export const validatePhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// Validar nombre (solo letras y espacios)
export const validateName = (name) => {
  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  return name.trim().length >= 2 && 
         name.trim().length <= 50 && 
         nameRegex.test(name.trim());
};

// Validar dirección
export const validateAddress = (address) => {
  return address.trim().length >= 10 && address.trim().length <= 200;
};

// Validar cantidad de productos
export const validateQuantity = (quantity, stock) => {
  return quantity > 0 && quantity <= stock;
};

// Validar precio
export const validatePrice = (price) => {
  return price > 0 && price <= 999999;
};

// Validar formulario de checkout
export const validateCheckoutForm = (formData) => {
  const errors = {};

  if (!validateName(formData.nombre)) {
    errors.nombre = 'El nombre debe tener entre 2 y 50 caracteres y solo puede contener letras';
  }

  if (!validateEmail(formData.email)) {
    errors.email = 'Ingresa un email válido';
  }

  if (!validatePhone(formData.telefono)) {
    errors.telefono = 'Ingresa un teléfono válido';
  }

  if (!validateAddress(formData.direccion)) {
    errors.direccion = 'La dirección debe tener entre 10 y 200 caracteres';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Formatear precio
export const formatPrice = (price) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
};

// Formatear fecha
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Generar ID único
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Validar stock disponible
export const checkStock = (producto, cantidad) => {
  if (!producto) return false;
  return producto.stock >= cantidad;
};

// Calcular total con descuento
export const calculateTotalWithDiscount = (subtotal, discountPercentage = 0) => {
  const discount = (subtotal * discountPercentage) / 100;
  return subtotal - discount;
};

// Validar código de descuento (ejemplo simple)
export const validateDiscountCode = (code) => {
  const validCodes = ['WELCOME10', 'GAMING20', 'SUMMER15'];
  return validCodes.includes(code.toUpperCase());
}; 