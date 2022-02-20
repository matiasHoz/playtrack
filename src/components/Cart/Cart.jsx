import React from 'react';
import { useContext } from 'react/cjs/react.development';
import { cartContext } from '../../context/cartContext/cartContext';
import "./Cart.css";

export const Cart = () => {

    const { cart, precioTotal, borrarUno } = useContext(cartContext);


    return (
        <>
        <div id="carro">
        {cart.length !== 0 ? <>
        {cart.map((selec1, selec2) => <div key={selec2}>
        <ul className='lista'>
        <button id="eliminar" onClick={() => borrarUno(selec1.id)}>X</button>
        <img src={selec1.img} alt="dune" className="fotis"></img>
        <h3 id="precioo">${selec1.precio}</h3>
        <li className='cantid'> {selec1.cantidad}x 
         {selec1.titulo}</li></ul></div>)}
        <h2>Precio: {precioTotal()}</h2>
        </>
        :
        <h1 id="nohay">No hay productos</h1> 
        }
        </div>
        </>
    )
}