import React from 'react';
import { useState } from "react";
import "./ItemCount.css";

export const ItemCount = ( {stock, initial, onAdd} ) => {
    const [count, setCount] = useState(1);

    const Sumar = () => {
        if (count < stock){
            setCount(count + 1)
        } else {
            alert("El número elegido es mayor al stock.");
        }
    }

    const Restar = () => {
        if (count > initial){
            setCount(count - 1)
        } else {
            alert("No puedes seleccionar un número menor a uno.")
        }

    }

    const Carrito = () => {
        onAdd(count)
    }

    return (
        <div>
            <section id="contador">
            <button id="restar" onClick={Restar}>-</button>
            <br />
            <h2 id="numero">{count}</h2>
            <br />
            <button id="sumar" onClick={Sumar}>+</button>
            </section>
            <br />
            <button id="agregar" onClick={Carrito}>Agregar al carrito</button>
        </div>
    )
}

