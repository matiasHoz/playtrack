import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../context/cartContext/cartContext";
import { CartWidget } from "../CartWidget/CartWidget";
import "./NavBar.css";


export let NavBar = () => {

    const { cantidadTotal, borrarProducto } = useContext(cartContext);

    return (
        <>
        <div>
        <nav>
            <ul className="menu">
                <Link to="/">
                <li id="logo"><img src="/img/perritocumbia.png" alt="perrito" className="perro"></img>Playtrack</li>
                </Link>
                <Link to="/categoria/novedades">
                <li className="op">Novedades</li>
                </Link>
                <Link to="/categoria/promociones">
                <li className="op">Promociones</li>
                </Link>
                <Link to="/categoria/exitos">
                <li className="op">Éxitos</li>
                </Link>
                <Link to="/cart">
                <CartWidget />
                </Link>
                <h4 id="numerito">{cantidadTotal() !== 0 && cantidadTotal()}</h4>
                <button id="borrar" onClick={borrarProducto}>Vaciar carrito</button>
            </ul>
        </nav>
        </div>
        </>
    )

}