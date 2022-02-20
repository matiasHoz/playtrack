import React from 'react';
import "./Item.css";
import { Link } from 'react-router-dom';

export const Item = ( prop ) => {
    return (
            <div className="producto">
            <h1 id="name">{prop.nombre}</h1>
            <img src={prop.picture} alt="fotito" id="picture"></img>
            <h2 id="price">${prop.precio}</h2>
            <Link to={`./detail/${prop.productos.id}`}>
            <button id="det">{prop.detalle}</button>
            </Link>
        </div>
    )
}