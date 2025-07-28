import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Category from './pages/Category';
import ItemDetailContainer from './components/ItemDetailContainer';
import Cart from './components/Cart';
import CheckoutForm from './components/CheckoutForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Importar funciones de consola de Firebase
import './utils/firebaseConsole';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <NavBar />
          <main className="min-vh-100">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/categoria/:categoria" element={<Category />} />
              <Route path="/item/:id" element={<ItemDetailContainer />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<CheckoutForm />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
