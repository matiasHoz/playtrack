import { addDoc, collection, getFirestore } from 'firebase/firestore';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react/cjs/react.development';
import { cartContext } from '../../context/cartContext/cartContext';
import "./Cart.css";

export const Cart = () => {


    const [ idCompra, setIdCompra ] = useState("")
    const [ dataForm, setDataForm ] = useState({ email: "", phone: "", name: ""})

    const { cart, precioTotal, borrarUno, borrarProducto } = useContext(cartContext);

    const hacerCompra = async (e) => {
        e.preventDefault()

        let orden = {}

        orden.buyer = dataForm
        orden.total = precioTotal();

        orden.items = cart.map(cartProd => {
            const id = cartProd.id;
            const nombre = cartProd.titulo;
            const precio = cartProd.precio * cartProd.cantidad;
            const cantidad = cartProd.cantidad


            return {
                id,
                nombre,
                precio,
                cantidad
            }
        })
        const db = getFirestore()
        const ordersCollection = collection(db, "orders")
        await addDoc (ordersCollection, orden)
        .then(resp => setIdCompra(resp.id))
    }

    
    const handleChange = (event) => {
        setDataForm({
            ...dataForm,
            [event.target.name]: event.target.value 
        })
    }
    

    return (
        <>
        <div id="carro">
        {cart.length !== 0 ?
        <>
        {cart.map((selec1, selec2) => <div id="borde" key={selec2}>
        <ul className='lista'>
        <button id="eliminar" onClick={() => borrarUno(selec1.id)}>X</button>
        <img src={selec1.img} alt="dune" className="fotis"></img>
        <h3 id="precioo">${selec1.precio}</h3>
        <li className='cantid'> {selec1.cantidad}x 
         {selec1.titulo}</li></ul></div>)}
        <h2 id="total">Precio: ${precioTotal()}</h2>
        <br/>
        <form id="formu" onSubmit={hacerCompra}>
            <h4 id="finalizar">¡Último paso!</h4>
            <input className='espacio' type="text" name="name" placeholder="Nombre"
            onChange={handleChange}
            value={dataForm.name}/>
        <br/>
            <input className='espacio' type="number" name="phone" placeholder="Celular"
            onChange={handleChange}
            value={dataForm.phone}/>
        <br/>
            <input className='espacio' type="email" name="email" placeholder="Email"
            onChange={handleChange}
            value={dataForm.email}/>
        <br />
            <input className='espacio' type="email" name="confirmarEmail" placeholder="Confirmar Email"
            onChange={handleChange}
            />
        <br/>
        <button className="terminar">Hacer pedido</button>
        <button className="terminar" onClick={borrarProducto}>Finalizar</button>
        </form>
        {idCompra !== "" && <p id="suid">Su ID de compra es: {idCompra}</p>}
        </>
        :
        <>
        <h1 id="nohay">No hay productos todavía...</h1> 
        <Link to="/">
        <button id="comprando">Ir a comprar</button>
        </Link>
        </>
        }
        </div>
        </>
    )
}