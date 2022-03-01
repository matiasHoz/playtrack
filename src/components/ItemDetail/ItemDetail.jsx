import { Link } from 'react-router-dom';
import React, { useContext, useState } from 'react/cjs/react.development';
import { cartContext } from '../../context/cartContext/cartContext';
import { ItemCount } from '../ItemCount/ItemCount';
import "./ItemDetail.css";

export const ItemDetail = ( propi ) => {

    const [ numero, setNumero ] = useState(0);
    const {sumarProducto} = useContext(cartContext);


    function onAdd(cantidad) {
        setNumero(cantidad)
        sumarProducto({...propi, cantidad: cantidad})
    }


    return (
        <>
        <div className="producto2">
            <h1>{propi.titulo}</h1>
            <p id="masinfo">{propi.descrip}</p>
            <img src={propi.img} className="imagen22" alt="segunda foto"></img>
            <p id="stock">Stock: {propi.total}</p>
        </div>
        <div id="count">
            {numero === 0 ?
            <ItemCount onAdd={onAdd} initial={1} stock={propi.total}/>
            :
            <>
            <Link to="/cart">
            <button className='terminar'>Terminar compra</button>
            </Link>
            <Link to="/">
            <button className='terminar'>Seguir comprando</button>
            </Link>
            </>
           }
        </div>
        </>
    )
}