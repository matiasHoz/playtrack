import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar/NavBar';
import { ItemListContainer } from './containers/ItemListContainer';
import { ItemDetailContainer } from './containers/ItemDetailContainer/ItemDetailContainer';
import { CartContextProvider } from './context/cartContext/cartContext';
import { Cart } from './components/Cart/Cart';
import { Footer } from './components/Footer/Footer';
import { Contacto } from './components/Contacto/Contacto';
import { Nosotros } from './components/Nosotros/Nosotros';
import { Imagen } from "./components/image/image";



function App() {


  return (
    <CartContextProvider>
    <BrowserRouter>
    <div className="App">
      <header className="App-header">
        <NavBar />
        <Routes>
          <Route exact path="/" element={<ItemListContainer/>} />
          <Route exact path="/categoria/:idCategoria" element={<ItemListContainer/>} />
          <Route exact path="/categoria/:idCategoria/detail/:idProducto" element={<ItemDetailContainer/>} />
          <Route exact path="/detail/:idProducto" element= {<ItemDetailContainer/>} />
          <Route exact path="/cart" element= {<Cart />} />
          <Route exact path="/contacto" element= {<Contacto />} />
          <Route exact path="/nosotros" element= {<Nosotros />} />
          <Route exact path="/proximamente" element= {<Imagen />} />
        </Routes>
        <Footer />
      </header>
    </div>
    </BrowserRouter >
    </CartContextProvider>
  );
}

export default App;