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
                   { id: "5", categoria:"novedades", name: "JL Snyder Cut", price: 1100, pictureUrl: "../img/snyderCut.png"},
                   { id: "6", categoria:"novedades", name: "The Suicide Squad", price: 900, pictureUrl: "../img/TSS.jpg"},
                   { id: "7", categoria:"novedades", name: "West Side Story", price: 800, pictureUrl: "../img/WSS.jpeg"},
                   { id: "8", categoria:"novedades", name: "Eternals", price: 1000, pictureUrl: "../img/eternals.jpg"},
                   { id: "9", categoria:"promociones", name: "King Kong", price: 350, pictureUrl: "../img/kingKong.jpg"},
                   { id: "10", categoria:"promociones", name: "Skyfall", price: 500, pictureUrl: "../img/skyfall.jpg"},
                   { id: "11", categoria:"promociones", name: "Spider-Man 3", price: 400, pictureUrl: "../img/spiderman3.jpg"},
                   { id: "12", categoria:"promociones", name: "The Dark Knight", price: 400, pictureUrl: "../img/tdk.jpg"},
                   { id: "13", categoria: "promociones", name: "Luca", price: 500, pictureUrl: "../img/luca.webp"},
                   { id: "14", categoria: "promociones", name: "Batman Begins", price: 400, pictureUrl: "../img/BB.jpg"},
                   { id: "15", categoria: "promociones", name: "Harry Potter 3", price: 300, pictureUrl: "../img/HP.jpg"},
                   { id: "16", categoria: "promociones", name: "Iron Man", price: 400, pictureUrl: "../img/ironMan.jpg"},
                   { id: "17", categoria: "exitos", name: "Avatar", price: 1300, pictureUrl: "../img/avatar.jpg"},
                   { id: "18", categoria: "exitos", name: "The Force Awakens", price: 1200, pictureUrl: "../img/SW.jpg"},
                   { id: "19", categoria: "exitos", name: "La La Land", price: 1350, pictureUrl: "../img/lala.jpg"},
                   { id: "20", categoria: "exitos", name: "Planet of Apes 3", price: 1400, pictureUrl: "../img/apes.jpg"},
                   { id: "21", categoria: "exitos", name: "A Star is Born", price: 1200, pictureUrl: "../img/aStar.jpg"},
                   { id: "22", categoria: "exitos", name: "ITSV", price: 1400, pictureUrl: "../img/itsv.webp"},
                   { id: "23", categoria: "exitos", name: "Dune", price: 1200, pictureUrl: "../img/dune.jpg"},
                   { id: "24", categoria: "exitos", name: "Tick Tick Boom", price: 1500, pictureUrl: "../img/tick.jpg"}]


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



    

    return (
        <div id="listado">
            { loading ? <><section id="cargando"><img src="/img/disk.gif" alt="disco" id="disk"></img><h2 id="cargar">Cargando...</h2></section></> :
            productos.map( (producto) => <Item key={producto.id} nombre={producto.name} picture={producto.pictureUrl} precio={producto.price} detalle="Ver detalle" productos={producto}/>)}
        </div>
    )
}

