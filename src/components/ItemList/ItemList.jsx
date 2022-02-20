import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import React from 'react';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Item } from "../Item/Item";
import "./ItemList.css";

export const productos = [{ id: "1", categoria:"novedades", name: "House of Gucci", price: 700, pictureUrl: "../img/gucci.jpg"},
                   { id: "2", categoria:"novedades", name: "Spider-Man NWH", price: 900, pictureUrl: "../img/spidey.jpg"},
                   { id: "3", categoria:"novedades", name: "No Time To Die", price: 800, pictureUrl: "../img/bond.jpg"},
                   { id: "4", categoria:"novedades", name: "Cruella", price: 1000, pictureUrl: "../img/cruella.jpg"},
                   { id: "5", categoria:"promociones", name: "Skyfall", price: 500, pictureUrl: "../img/skyfall.jpg"},
                   { id: "6", categoria:"promociones", name: "Spider-Man 3", price: 400, pictureUrl: "../img/spiderman3.jpg"},
                   { id: "7", categoria:"promociones", name: "The Dark Knight", price: 400, pictureUrl: "../img/tdk.jpg"},
                   { id: "8", categoria: "promociones", name: "Luca", price: 500, pictureUrl: "../img/luca.webp"},
                   { id: "9", categoria: "exitos", name: "A Star is Born", price: 1200, pictureUrl: "../img/aStar.jpg"},
                   { id: "10", categoria: "exitos", name: "ITSV", price: 1400, pictureUrl: "../img/itsv.webp"},
                   { id: "11", categoria: "exitos", name: "Dune", price: 1200, pictureUrl: "../img/dune.jpg"},
                   { id: "12", categoria: "exitos", name: "Tick Tick Boom", price: 1500, pictureUrl: "../img/tick.jpg"}]


export function ItemList() {


const [productos, setProductos] = useState([])
const [loading, setLoading] = useState(true)

const { idCategoria } = useParams()


useEffect(() => {

    const db = getFirestore()
    const queryCollection = collection(db, "items");

    const queryFiltro = !idCategoria ?
    queryCollection
    :
    query(queryCollection,
        where("categoria", "==", idCategoria)
        )

    getDocs(queryFiltro)
    .then(resp => setProductos( resp.docs.map(prod => ({ id: prod.id, ...prod.data() })) ))
    .catch(err => console.log(err))
    .finally(() => setLoading(false)) 

}, [idCategoria])

console.log(idCategoria)
console.log(productos)

    

    return (
        <div id="listado">
            { loading ? <><section id="cargando"><img src="/img/disk.gif" alt="disco" id="disk"></img><h2 id="cargar">Cargando...</h2></section></> : 
            productos.map( (producto) => <Item key={producto.id} nombre={producto.name} picture={producto.pictureUrl} precio={producto.price} detalle="Ver detalle" productos={producto}/>)}
        </div>
    )
}

/*if (idCategoria) {
    getDocs(queryCollection)
    .then(resp => setProductos( resp.docs.map(prod => ({ id: prod.id, ...prod.data() })) ))
    .catch(err => console.log(err))
    .finally(() => setLoading(false))
    }else {
    getDocs(queryFiltro)
    .then(resp => setProductos( resp.docs.map(prod => ({ id: prod.id, ...prod.data() })) ))
    .catch(err => console.log(err))
    .finally(() => setLoading(false))
    }

    getDoc(itemRef)
    .then(resp => setProducto( {id: resp.id, ...resp.data() } ))
    .catch(err => console.log(err))
    .finally(() => setLoading(false))*/



    /*if (idCategoria) {
        task
        .then(resolve => setProductos(resolve.filter(producto => producto.categoria === idCategoria)))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))    
    }else {
    task
    .then(resolve => setProductos(resolve))
    .catch(error => console.log(error))
    .finally(() => setLoading(false))
    }*/