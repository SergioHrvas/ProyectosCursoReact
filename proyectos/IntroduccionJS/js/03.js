// Selectores
const heading = document.querySelector('.heading')

// console.log(heading)
// console.log(heading.tagName) // Etiqueta (h1)
// console.log(heading.textContent) //Contenido 
// console.log(heading.classList)
// console.log(heading.id)


const enlaces = document.querySelectorAll('.navegacion a')
// console.log(enlaces)

// Manipular elementos 
heading.textContent = "Hola" //asignar atributo
heading.id = "idNuevo"

heading.removeAttribute('id') // Eliminamos atributo

const inputNombre = document.querySelector("#nombre")
inputNombre.value = "valor por defecto"

// Para atributos personalizados sería:
inputNombre.dataset.nombre = "PROBANDO" //GENERA data-nombre="PROBANDO"

// Eventos del DOM
heading.addEventListener('click', () => {
    heading.textContent = "Nuevo heading"
})

enlaces.forEach( enlace => {
    enlace.addEventListener('click', (e) => {
        console.log("HAS DADO CLICK A UN ENLACE")
        e.preventDefault()

     })
})

inputNombre.addEventListener('input', (e) => {
    console.log(e.target.value)
})

const inputPassword = document.querySelector('#password')
inputPassword.addEventListener('input', (e) => {   
    inputPassword.type = "text"

    setTimeout (() => {
        inputPassword.type = "password"
    },200)
    console.lo
})

const formulario = document.querySelector("#formulario")
formulario.addEventListener('submit', (e) => {
    e.preventDefault() 

    const nombre = document.querySelector("#nombre").value
    const password = document.querySelector("#password").value

    //Prevenir nuevas alertas
    const alertaPrevia = document.querySelector('.alerta')

    alertaPrevia && alertaPrevia.remove()


    console.log(nombre)
    console.log(password)

    const alerta = document.createElement('DIV')
    alerta.classList.add('alerta', 'text-white', 'uppercase', 'text-sm', 'text-center', 'p-2', 'font-black')
    
    console.log(alerta)

    if(nombre == '' || password == ''){
        alerta.textContent = "Todos los campos son obligatorios"
        alerta.classList.add("bg-red-500")
        console.log("Todos los campos son obligatorios")

    }
    else{
        alerta.textContent = "Iniciando sesión correctamente"
        alerta.classList.add("bg-green-500")

        console.log("Iniciando sesión")
    }

    formulario.appendChild(alerta)

    setTimeout(() => {
        alerta.remove()
    }, 3000
    )
})