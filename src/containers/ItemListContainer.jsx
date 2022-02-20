import React from 'react';
import { ItemList } from "../components/ItemList/ItemList";
import "./ItemListContainer.css";


export const ItemListContainer = (prop) => {


    return(
        <>
        <h1 id="saludo">{prop.greeting}</h1>
        <ItemList />
        </>
    )
}