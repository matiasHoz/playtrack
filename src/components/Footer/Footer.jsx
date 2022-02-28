import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css"

export let Footer = () => {
    return (
        <nav>
            <ul id="footer">
                <Link className="sinLink" to="/contacto">
                <li className="ops">Contacto</li>
                </Link>
                <Link className="sinLink" to="/nosotros">
                <li className="ops">Sobre nosotros</li>
                </Link>
                <Link className="sinLink" to="/proximamente">
                <li className="ops">Próximamente</li>
                </Link>
            </ul>
        </nav>
    )
}