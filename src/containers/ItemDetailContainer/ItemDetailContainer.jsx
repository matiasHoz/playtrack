import React from 'react';
import "./ItemDetailContainer.css";
import { useState, useEffect } from 'react';
import { ItemDetail } from '../../components/ItemDetail/ItemDetail';
import { useParams } from 'react-router-dom';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

const informacion = [{  id: "1", nombre: "House of Gucci", description:"Una mirada al asesinato de Maurizio Gucci el 27 de marzo de 1995, nieto heredero de Guccio Gucci, fundador de la famosa marca de lujo italiana.", imageUrl: "/img/gucci2.jpg", stock: 10, precio: 700, categoria: "novedades"},
{id: "2", nombre: "Spider-Man NWH", description: "Tras descubrirse la identidad secreta de Peter Parker como Spider-Man, la vida del joven se vuelve una locura. Peter decide pedirle ayuda al Doctor Strange.", imageUrl: "/img/spidey2.jpg", stock: 12, precio: 900, categoria: "novedades"},
{id: "3", nombre: "No Time To Die", description: "El legendario espía James Bond ha dejado el servicio activo. Su paz dura poco ya que su viejo amigo Felix Leiter de la CIA aparece pidiendo ayuda.", imageUrl: "/img/bond2.jpg", stock: 15, precio: 800, categoria: "novedades"},
{id: "4", nombre:"Cruella", description: "Decidida a convertirse en una exitosa diseñadora de moda, una joven y creativa estafadora llamada Estella se asocia con un par de ladrones para sobrevivir.", imageUrl: "/img/cruella2.jpg", stock: 14, precio: 1000, categoria: "novedades"},
{id: "5", nombre:"Skyfall", description: "La lealtad de James Bond, el mejor agente de los servicios británicos, hacia su superiora M se verá puesta a prueba cuando el pasado de ella vuelve para atormentarla.", imageUrl: "/img/skyfall2.webp", stock: 15, precio: 500, categoria: "promociones"},
{id: "6", nombre:"Spider-Man 3", description: "Peter Parker sufre una terrible transformación cuando su traje se vuelve negro y libera su personalidad oscura y vengativa. Afrontará el mayor desafío de su vida al tener que redescubrir la humildad y compasión que lo hacen ser quien es: un héroe.", imageUrl: "/img/spiderman3-2.webp", stock: 14, precio: 400, categoria: "promociones"},
{id: "7", nombre: "The Dark Knight", description: "Con la ayuda del teniente Jim Gordon y del Fiscal del Distrito Harvey Dent, Batman mantiene a raya el crimen organizado en Gotham. Todo cambia cuando aparece el Joker, un nuevo criminal que desencadena el caos y tiene aterrados a los ciudadanos.", imageUrl:"/img/tdk2.webp", stock: 10, precio: 400, categoria: "promociones"},
{id: "8", nombre: "Luca", description: "Luca es un monstruo marino que vive debajo de un pueblo de la costa italiana. Cuando sale a la superficie, adquiere una apariencia humana, y conoce a un nuevo amigo, igual que él. Juntos emprenden una aventura entre humanos que odian a los monstruos.", imageUrl:"/img/luca2.jpg", stock: 17, precio: 500, categoria: "promociones"},
{id: "9", nombre: "A Star is Born", description: "Jackson, una estrella de la música country con problemas de alcoholismo, descubre el talento de Ally, una joven cantante de la cual se enamora. Mientras la carrera de ella despega, Jackson percibe que sus días de gloria están llegando a su fin.", imageUrl:"/img/aStar2.jpg", stock: 10, precio: 1200, categoria: "exitos"},
{id: "10", nombre: "Spider-Man ITSV", description: "Luego de ser mordido por una araña radioactiva, el joven Miles Morales desarrolla misteriosos poderes que lo transforman en el Hombre Araña. Ahora deberá usar sus nuevas habilidades ante el malvado Kingpin, un enorme demente que puede abrir portales hacia otros universos.", imageUrl: "/img/itsv2.jpg", stock: 5, precio: 1400, categoria: "exitos"},
{id: "11", nombre: "Dune", description: "Arrakis, también denominado Dune, se ha convertido en el planeta más importante del universo. A su alrededor comienza una gigantesca lucha por el poder que culmina en una guerra interestelar.", imageUrl: "/img/dune2.webp", stock: 16, precio: 1200, categoria: "exitos"},
{id: "12", nombre: "Tick Tick Boom", description:"Jon es un aspirante a compositor de obras teatrales que, a punto de cumplir 30 años, se siente abrumado por la ansiedad, preguntándose si su sueño merece la pena.", imageUrl: "/img/tick2.webp", stock: 20, precio: 1500, categoria: "exitos"}]

const desafio = new Promise ((resolve, reject) => {
    let condition= true;
    setTimeout(() => {
    if (condition){
    resolve(informacion);
    }else {
    reject("ERROR NUEVO")
    }
    }, 5000)
})


export function ItemDetailContainer() {

const [ info, setInfo ] = useState([])
const [loading, setLoading] = useState(true)

const { idProducto } = useParams()

useEffect(() => {

    const db = getFirestore()
    const itemRef = doc(db, "items", idProducto)
    getDoc(itemRef)
    .then(resp => setInfo( [ {id: resp.id, ...resp.data()}] ))
    .catch(err => console.log(err))
    .finally(() => setLoading(false))



    /*if (idProducto) {
    desafio
    .then(res => setInfo(res.filter(rey => rey.id === idProducto)))
    .catch(err => console.log(err))
    .finally(() => setLoading(false))
    } else {
    desafio
    .then(res => setInfo(res))
    .catch(err => console.log(err))
    .finally(() => setLoading(false))
    }*/
}, [idProducto])

console.log(idProducto)
console.log(info)
console.log(desafio)


   return (
       <div className='segundoOrden'>
           { loading ? <><section id="cargando"><img src="/img/disk.gif" alt="disco" id="disk"></img><h2 id="cargar">Cargando...</h2></section></> :
           info.map( (rey) => <ItemDetail key={rey.id} id={rey.id} titulo= {rey.nombre} descrip={rey.description} img={rey.imageUrl} total={rey.stock} precio={rey.precio} />)}
       </div>
   )

}