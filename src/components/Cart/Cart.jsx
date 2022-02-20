import { addDoc, collection, getFirestore } from 'firebase/firestore';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react/cjs/react.development';
import { cartContext } from '../../context/cartContext/cartContext';
import "./Cart.css";

export const Cart = () => {


    const [ idCompra, setIdCompra ] = useState("")
    const [ dataForm, setDataForm ] = useState({ email: "", phone: "", name: ""})

    const { cart, precioTotal, borrarUno } = useContext(cartContext);

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

    console.log(cart)
    console.log(dataForm)
    

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
        <br/>
        <form onSubmit={hacerCompra}>
            <input type="text" name="name" placeholder="name"
            onChange={handleChange}
            value={dataForm.name}/>
        <br/>
            <input type="number" name="phone" placeholder="cel"
            onChange={handleChange}
            value={dataForm.phone}/>
        <br/>
            <input type="email" name="email" placeholder="email"
            onChange={handleChange}
            value={dataForm.email}/>
        <br />
            <input type="email" name="confirmarEmail" placeholder="Confirmar Email"
            onChange={handleChange}
            />
        <br/>
        <button>Realizar pedido</button>
        </form>
        {idCompra !== "" && `su id de compra es: ${idCompra}`}
        </>
        :
        <>
        <h1 id="nohay">No hay productos</h1> 
        <Link to="/">
        <button id="comprando">Ir a comprar</button>
        </Link>
        </>
        }
        </div>
        </>
    )
}