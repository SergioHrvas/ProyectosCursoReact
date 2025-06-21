// // Function Declaration
// function sumar(num1, num2){
//     return num1 + num2
// }

// // Function Expression
// const sumar2 = function(num1, num2){
//     return num1 + num2
// }

// Arrow Function
// const sumar = (numero1, numero2) => {
//     console.log(numero1 + numero2)
// }

// const sumar2 = (numero1, numero2) => console.log(numero1, numero2)

// const sumar = (numero1, numero2) => numero1 + numero2

// console.log(sumar(2,5))


// Arrays methods
const productos = ["Television", "Tablet", "Móvil", "Altavoz", "Auriculares", "Consola"]
const numeros = [5, 10, 15, 20]

// Filter
// const nuevoArray = productos.filter(producto => producto === "HTML") 
// const nuevoArray2 = productos.filter(producto => producto !== "HTML") 

// console.log(nuevoArray)
// console.log(nuevoArray2)

// // Includes
// const resultado = productos.includes("Tablet")
// console.log(resultado)

// // Some
// const resultado = numeros.some(numero => numero > 20)
// console.log(resultado)

// // Find
// const resultado = numeros.find (numero => numero < 11)
// console.log(resultado)

// // Every
// const resultado = numeros.every( numero => numero > 0)
// console.log(resultado)

// // Reduce
// const resultado = numeros.reduce ( (total, numero) => {
//     return total + numero
// }, 0) //Valor inicial
// const resultado = numeros.reduce ( (total, numero) => total + numero, 0)
// console.log(resultado)

// // Optional chaining '?'
// const alumno = {
//     nombre: "Juan",
//     clase: "Programación I",
//     aprobado: true,
// }

// // console.log(alumno.examenes.examen1) // No está definida, por lo que daría error y no
// //                                      // se ejecutaría lo de abajo
// // console.log("Despues de alumno")

// console.log(alumno.examenes?.examen1) // No está definida, pero si no exite no da el error
// console.log("Despues de alumno")


// // Nullish coolescing operator '??'
// const page = null
// const pagina = page ?? 1
// console.log(pagina)


// // Shortcircuit evaluation
// const user = {}

// user && console.log('Usuario Autenticado') // CUIDADO! Es vacío pero devuelve usuario antenticado

// const auth = true

// auth && console.log("Usuario autenticado") // De esta forma ejecutamos el codigo solo si está autenticado


// Fetch API con PROMISES
const url = "https://jsonplaceholder.typicode.com/comments"
const url2 = "https://jsonplaceholder.typicode.com/todos"
const url3 = "https://jsonplaceholder.typicode.com/photos"

// fetch(url)
//     .then((response) => {
//         if(response.ok){
//             console.log(response)
//             return response.json()
//         }
//         else{
//             throw new Error("Hubo un error...")
//         }
//     })
//     .then((response) => {
//         console.log(response)
//     })
//     .catch(error => console.log(error))

// Fetch API con async y await


const consultarAPI = async () => {
    try{
        const inicio = performance.now()

        // PETICIONES SECUENCIALES
        const response = await fetch(url)
        if(!response.ok){
            throw new Error("Hubo un error...")
        }
        
        const data = await response.json()

        const response2 = await fetch(url2)
        if(!response2.ok){
            throw new Error("Hubo un error...")
        }
        
        const data2 = await response2.json()


        const response3 = await fetch(url3)
        if(!response3.ok){
            throw new Error("Hubo un error...")
        }
        
        const data3 = await response3.json()

        console.log(data)
        // console.log(data2)
        // console.log(data3)

        const fin = performance.now()

        console.log(`El resultado 1 es ${fin-inicio}ms`)
    }
    catch (error) {
        console.log(error)
    }
}

consultarAPI()



const consultarAPI2 = async () => {
    try{
        const inicio = performance.now()
        
        // PETICIONES PARALELAS
        const [response, response2, response3] = await Promise.all([fetch(url), fetch(url2), fetch(url3)])
        const [data, data2, data3] = await Promise.all([response.json(), response2.json(), response3.json()])

        console.log(data)
        console.log(data2)
        console.log(data3)

        const fin = performance.now()

        console.log(`El resultado 2 es ${fin-inicio}ms`)
    }
    catch (error) {
        console.log(error)
    }
}

consultarAPI2()