import "./ItemDetailContainer.css";
import React, { useState, useEffect } from 'react';
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
{id: "12", nombre: "Tick Tick Boom", description:"Jon es un aspirante a compositor de obras teatrales que, a punto de cumplir 30 años, se siente abrumado por la ansiedad, preguntándose si su sueño merece la pena.", imageUrl: "/img/tick2.webp", stock: 20, precio: 1500, categoria: "exitos"},
{id: "13", nombre: "JL Snyder Cut", description: "Bruce Wayne se une a Diana Prince, tras el sacrificio de Superman, para reclutar a un equipo de metahumanos que protejan el mundo de una amenaza inminente de proporciones catastróficas.", imageUrl: "/img/SNYDERCUT.jpg", stock: 21, precio: 1000, categoria: "novedades"},
{id: "14", nombre: "The Suicide Squad", description: "Con tal de salir de una prisión infernal, los supervillanos más peligrosos del mundo aceptan una misión del Gobierno: viajar a una remota isla, enemiga de los Estados Unidos y repleta de soldados, para destruir un laboratorio de alta tecnología.", imageUrl: "/img/TSS2.jpeg", stock: 22, precio: 900, categoria: "novedades"},
{id: "15", nombre: "West Side Story", description: "Dos adolescentes de diferentes raíces étnicas se enamoran en la ciudad de Nueva York de los años 50. Nueva versión del legendario musical West Side Story sobre el enfrentamiento entre dos bandas callejeras de Nueva York, adaptación de una famosa obra de teatro de Broadway.", imageUrl: "/img/WSS2.jpg", stock: 25, precio: 800, categoria: "novedades"},
{id: "16", nombre: "Eternals", description: "Los Eternos son una raza de seres inmortales con poderes sobrehumanos que han vivido en secreto en la Tierra durante miles de años. Aunque nunca han intervenido en el destino de la población, ahora una amenaza se cierne sobre la humanidad.", imageUrl: "/img/eternals2.jpg", stock: 21, precio: 1000, categoria: "novedades"},
{id: "17", nombre: "King Kong", description: "Un grupo de exploradores, liderado por un extrovertido director de cine, visitan Skull Island para investigar todo lo relacionado con la leyenda del gorila gigante llamado King Kong. Ahí encuentran una jungla llena de criaturas prehistóricas.", imageUrl: "/img/kingKong2.jpg", stock: 11, precio: 350, categoria: "promociones"},
{id: "18", nombre: "Batman Begins", description: "Bruce Wayne vive obsesionado con el recuerdo de la muerte de sus padres. Atormentado, se va de Gotham y encuentra a un extraño personaje que lo entrena en todas las disciplinas físicas y mentales que le servirán para combatir el Mal.", imageUrl: "/img/BB2.jpg", stock: 12, precio: 400, categoria: "promociones"},
{id: "19", nombre: "Harry Potter 3", description: "El tercer año de estudios de Harry en Hogwarts se ve amenazado por la fuga de Sirius Black de la prisión de Azkaban. Al parecer, se trata de un peligroso mago que fue cómplice de Lord Voldemort y que intentará vengarse de Harry Potter.", imageUrl: "/img/HP2.jpg", stock: 10, precio: 300, categoria: "promociones"},
{id: "20", nombre: "Iron Man", description: "Tony Stark es un inventor de armamento brillante que es secuestrado en el extranjero. Sus captores son unos terroristas que le obligan a construir una máquina destructiva pero Tony se construirá una armadura para poder enfrentarse a ellos y escapar.", imageUrl: "/img/ironMan2.jpg", stock: 9, precio: 400, categoria: "promociones"},
{id: "21", nombre: "Avatar", description: "En un exuberante planeta llamado Pandora viven los Na'vi, seres que aparentan ser primitivos pero que en realidad son muy evolucionados. Debido a que el ambiente de Pandora es venenoso, los híbridos humanos/Na'vi, llamados Avatares, están relacionados con las mentes humanas, lo que les permite moverse libremente por Pandora", imageUrl: "/img/avatar2.jpg", stock: 14, precio: 1300, categoria: "exitos"},
{id: "22", nombre: "The Force Awakens", description: "Treinta años después de la victoria de la Alianza Rebelde sobre la segunda Estrella de la Muerte, la galaxia tiene que enfrentarse a una nueva amenaza: el malvado Kylo Ren y la Primera Orden.", imageUrl: "/img/SW2.jpg", stock: 11, precio: 1200, categoria: "exitos"},
{id: "23", nombre: "La La Land", description: "Mia y Sebastian son dos jóvenes que quieren abrirse camino en el mundo de Hollywood. Mia es una joven aspirante a actriz que trabaja como camarera mientras acude a castings y Sebastian toca el piano en bares. Un día sus caminos se cruzan e inmediatamente se enamoran.", imageUrl: "/img/lala2.jpg", stock: 7, precio: 1350, categoria: "exitos"},
{id: "24", nombre: "Planet of Apes 3", description: "César y sus simios son obligados a enfrentar un conflicto mortal contra un ejército de humanos liderado por un brutal coronel. Después de sufrir pérdidas enormes, César pelea con sus instintos más oscuros en una búsqueda por vengar a su especie.", imageUrl: "/img/apes2.jpg", stock: 10, precio: 1400, categoria: "exitos"}]

    new Promise ((resolve, reject) => {
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
}, [idProducto])


   return (
       <div className='segundoOrden'>
           { loading ? 
           <><section id="cargando"><img src="/img/disk.gif" alt="disco" id="disk"></img><h2 id="cargar">Cargando...</h2></section></> 
           :
           info.map( (rey) => <ItemDetail key={rey.id} id={rey.id} titulo= {rey.nombre} descrip={rey.description} img={rey.imageUrl} total={rey.stock} precio={rey.precio} />)}
       </div>
   )

}