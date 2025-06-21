const producto = {
    nombre: "Televisión",
    precio: 349.90,
    disponible: false
}

const cliente = {
    nombre: "Sergio",
    edad: 30,
    vip: true
}


/*
console.log(producto)
console.table(producto)


//Destructuring
// const nombre = producto.nombre // Ya no se utiliza tanto
const { nombre, precio, disponible } = producto
console.log(nombre)
console.log(precio)
console.log(disponible)

// Object Literal Enhancement
const autenticado = true
const username = "juanito23"

const nuevoObjeto = {
    autenticado,
    usuario
}


// Aunque sea const, puedo manipular los atributos del objeto:
producto.disponible = true
console.log(producto.disponible)

// Añadirle atributos
producto.imagen = "imagen.png"
console.log(producto.imagen)

// Incluso eliminar atributos
delete producto.imagen
console.table(producto)

// Para evitar que se modifiquen los atributos:
Object.freeze(producto)

producto.imagen = "imagen.png"
console.log(producto.imagen)

// Si solo queremos que no se agreguen o eliminen propiedades
Object.seal(producto)
delete producto.precio
console.table(producto)




// Destructuring de dos o más ob jetos
// Problema: cliente y producto tienen los dos mismos atributos: 
// peta al intentar destructuring
// const {nombre} = producto
// const {nombre} = cliente

// Solución: Acceder a la variable nombre pero 
// renombrar la variable de salida con :nombreCliente
const { nombre: nombreCliente } = cliente
const { nombre } = producto
console.log(nombre)
console.log(nombreCliente)

// Aplicar destructuring de un objeto dentro de otro objeto
const juego = {
    nombre: "Stardew Valley",
    precio: 20,
    desarrollador: {
        nombre: "ConcernedApe"
    }
}

// Para desestructurarlo, tengo que usar llaves:
const { nombre: nombreJuego, desarrollador: { nombre: nombreDesarrollador }} = juego
console.log(nombreJuego)
console.log(nombreDesarrollador)



// Unir varios objetos 

// 1. Objeto en su interior
const carrito = {
    cantidad: 1,
    producto
}

console.log(carrito)


// 2. Atributos en su interior
const carrito2 = {
    cantidad: 2,
    ...producto
}
console.log(carrito2)

//Las dos de abajo es lo mismo:

// const nuevoObjeto = {
//     producto: {...producto},
//     cliente: {...cliente}
// }
// const nuevoObjeto = {
//     ...producto,
//     ...cliente
// }


// De la siguiente forma podríamos unir los atributos en un nuevo objeto
const nuevoObjeto = {
    ...producto,
    ...cliente
}

console.log(nuevoObjeto)

// Esto también se puede hacer:
const nuevoObjeto2 = Object.assign(producto, cliente)
console.log(nuevoObjeto2)



// CONCATENACIÓN
const product = "Televisión"
const precio = 450 
const marca = "LG"

console.log(product + " " + marca + " (" + precio + "€)")
console.log(`${product} ${marca} (${precio}€)`)

*/

// ARRAYS

// const productos = ["Television", "Tablet", "Móvil", "Altavoz", "Auriculares", "Consola"]

// const productosAmpliado = [...productos, "SmartWatch"]
// console.log(productosAmpliado)

// // productosAmpliados.shift()

// productos2 = productosAmpliado.filter(function(product){
//     if(product !== "Television"){
//         return product
//     }
// })

// console.log(productos2)

// // Destructuring de arrays
// const [television, tablet] = productos
// console.log(television, tablet)

// const [,,,altavoz] = productos
// console.log(altavoz)

// Iteramos por arrays

// for(let i = 0; i < productos.length; i++){
//     console.log(productos[i])
// }

// // ForEach
// productos.forEach(
//     producto => {
//         console.log(producto)
//     }
// )
// productos.forEach(
//     function(producto){
//         console.log(producto)
//     }
// )
//
// // Map
// productos.map( 
//     producto => {
//         console.log(producto)
//     }
// )
//
// for ... of
// for(let producto of productos){
//     console.log(producto)
// }