import { createContext } from "react";
import { useState } from "react/cjs/react.development";


export const cartContext = createContext([])

export function CartContextProvider({ children }) {

    const [ cart, setCart ] = useState([]);

    function sumarProducto(item) {
        if(evitarCopias(item)) {
            const cambiarCantidad = [...cart]
            cambiarCantidad.forEach(x => {
                if(x.id === item.id) {
                    x.cantidad += item.cantidad
                }
            })
            return setCart(cambiarCantidad)
        } 
        return setCart([...cart, item])
    }

    function borrarProducto(){
        setCart([])
    }

    function evitarCopias(item){
        const findCharacter = cart.find((i) =>  {
            return i.id === item.id
        })
        return findCharacter
    }

    const borrarUno = (id) => {
        setCart( cart.filter( prodi => prodi.id !== id ))
    }
        

    const precioTotal = () => {
        return cart.reduce((total, prodi) => total = total + (prodi.precio * prodi.cantidad), 0)
    }

    const cantidadTotal = () => {
        return cart.reduce((total, prodi) => total += prodi.cantidad, 0)
    }
        

    return <><cartContext.Provider value={{
        cart,
        sumarProducto,
        borrarProducto,
        precioTotal,
        borrarUno,
        cantidadTotal
    }}>
        {children}
    </cartContext.Provider>
    </>
}
