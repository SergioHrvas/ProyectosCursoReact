## JAVASCRIPT
Algunos aprendizajes sobre javascript para repasar y afianzar sintáxis:

- Let (variable) vs Const (constante. debe ser inicializada)

- Symbol: Todos son distintos entre sí.

- Console.table -> para imprimir objetos

- Destructuring: Si objeto tiene var1 y var2 dentro, puedo desestructurarlos con:
{ var1, var2 } = objeto

- Object Literal Enhancement: Si var1 y var2 mismo nombre que atributos objeto, puedo unirlos con:
objeto = { var1, var2 }

- Los atributos de los objetos const pueden ser modificados, agregados o eliminados (con delete objeto.atributo). Si queremos restringir esto, hay dos métodos:
    - Object.freeze(objeto): No se puede modificar, ni añadir ni eliminar atributos
    - Object.seal(objeto): No se pueden agregar ni eliminar propiedades pero si modificar valores.

- Hay que tener cuidado al desestructurar objetos con mismos atributos (como nombre). La solución es especificar el nombre de la variable de salida en uno de ellos con ({nombre: nombreSalida} = objeto)

- También hay que tener ojo al desestructurar objetos con otros objetos en su interior. Para desestructurarlo habría que utilizar llaves de la siguiente forma: {desarrollador: {nombre}} = objeto

- Para unir dos objetos hay dos formas:
    - Meter un objeto dentro de otro (carrito = {cantidad:1, producto})
    - Meter los atributos en el otro (carrito = {cantidad:1, ...producto}) -> SPREAD operator

- Para añadir un elemento a un array en otro, se usa ... de la siguiente forma: arrayAmpliado = [...array, otroElemento] -> ESTO SE USA EN VEZ DE PUSH (MUTABLE) SI NO QUEREMOS ACTUALIZAR EL ESTADO

- Para eliminar un elemento de un array, podemos utilizar:
    - shift -> Elimina el primer elemento del arreglo -> MUTA
    - filter(function(objeto){}) -> Para usar si no queremos actualizar el estado

- Para modificar, utilizamos map(function(objeto){}) en vez de asignar con = si queremos inmutabilidad.

| Acción | Mutable | No mutable |
| ----- | ----- | ----- |
| Quitar | shift | filter(function(obj){}) |
| Agregar | push | lista2 = [...lista, elemento1] |
| Modificar | lista[x] = valor | filter(map(obj){})  

- El destructuring de arrays es parecido al de los objetos pero con [] en vez de {}. De esta forma: [elemento1, elemento2] = array

    Para saltarse variables se utilizan comas: [,,,elemento4] = array

- Para iterar por un array hay varias formas:
    - El clásico for(let i = 0, i < array.length; i++)
    - Método forEach: recorre el array sabiendo su longitud
    - Método map: Funciona igual que forEach para iterar, pero **crea un nuevo arreglo** en base a las condiciones de la función.
    - for(let producto of productos) -> Más simple que el primer for loop


- Para las funciones tenemos dos opciones:
    - **Function Declaration**:
    function sumar(){}

        Se pueden declarar en cualquier parte del código (javascript lee primero las funciones existentes)
    - **Function Expression**: const sumar = function(){}
    
        Hay que declararlas antes de utilizarlas

- Las **Arrow functions** son como las *function expression* pero sin usar function y con => {}.
    Con las arrow functions, si tenemos solamente una linea podemos no poner el return.

- A filter, map, etc se le puede pasar la función externa de la siguiente forma array.filter(funcionFiltrado)

- Los arrays contienen varios métodos para operar sobre ellos:
    - Filter: Filtrar en un array
    - Includes: Devuelve si existe o no un elemento en un array
    - Some: Devuelve true si al menos un elemento cumple la condición
    - Find: Devuelve el primer elemento que cumple una condición
    - Every: Devuelve true si todos los elementos cumplen la condición
    - Reduce: Devuelve un acumulado de los elementos


- Hay dos tipos de comparadores
    - No estricto: Compara valor
    - Estricto: Compara valor y tipo de dato

- Operadores ? y ??:
    - Optional chaining (?): Permite acceder a las propiedas de un objeto o llamar métodos sin tener que verificar si existe o no.
    - Nullish coolescing operator (??): Devuelve el valor derecho si el izquierdo es nulo/undefined

- Evaluación de cortocircuito:
    - Todos los valores son true a menos que sean false. Por ejemplo if(40) o if("Hola"). Valores truthy
        - []
        - {}
        - etc
    - Valores falsy:
        - 0
        - -0
        - false
    Para evaluar esto se utiliza variable && codigo

- Modulos ECMAScript: Para reutilizar funciones de ficheros js. 
    - En el HTML ponemos type module en la etiqueta script donde se utilizarán las funciones de otro ficheor
    - En las funciones ponemos export para exportarlas
    - En el fichero donde se utilizan, las importamos con import {sumar} from './funciones.js'
    - Se pueden exportar al final con export { funcion1, funcion2 }
    - Se puedee renombrar la funcion al importar con import {funcion1 as nuevoNombre}
    - Se puedee exportar con export default: En este caso, al importarlo con import funcion1, {funcion2, funcion3}, puedo usar funcion1. Solo se puede utilizar una vez (se puede nombrar como deseemos)

- fetch -> Obtener datos del exterior (API).
    - La sintáxis es con .then((response) => {}).catch()
    - También con async y await (en funciones si o si) -> Para detectar errores try {} catch {}

- Medir performance: performance.now() (fin-inicio)
    - Paralelizar con promise: [resp1, resp2, resp3] = Promise.all([accion1, accion2, accion3])

- Un selector es aquel que nos permite actuar sobre un elemento html. Todos los selectores empiezan con document.
    Algunos elementos pueden ser accedidos por atributo como document.title. Pero la mayoría necesitan usar querySelector o QuerySelectorAll. *getElementById, getElementByClass... ya no se utiliza tanto.*
    Una vez tengo el selector puedo ver su contenido con .content, su etiqueta con .tagName, las clases que tiene con .classList, su identificador con .id
    - QuerySelector: Busca el primer elemento que cumpla con las condiciones
    - QuerySelectorAll: Devuelve una lista con todos los ementos que las cumplan

- Puedo modificar los atributos de los elementos de forma fácil como poe ejemplo ``elemento.textContent = "hola"``

- Puedo eliminar atributos con elemento.removeAttribute('id')

- Puedo incluso asignar atributos personalizados con elemento.dataset.nombre = "PROBANDO", generando en el html el atributo data-nombre="PROBANDO"

- Para añadir un evento a un elemento, se usa elemento.addEventListener. Se le pasa como primer parámetro el nombre del evento (ej 'click') y como segundo parametro una funcion de callback que se ejecutará cuando se produzca el evento.

- PROBLEMA: NO se puede usar addEventListener sobre un vector de elementos. Hay que recorrelo y añadirselo a cada elemento. 
    - PROBLEMA: SALTA ARRIBA CUANDO CLICKO. Es una acción por default. Se soluciona pasando el evento a la función de callback.
        - El evento tiene una propiedad target sobre lo que hemos dado click.
        - Hacemos e.preventDefault() -> Le dice al enlace que no haga el comportamiento que tiene el enlace. DE esta forma decimos por código qué acción va a realizar (seguir el enlace en este caso)

- SetTimeout -> FUnción que espera cierto tiempo y luego se ejecuta. EL timeout -> 1000 = 1s, 10000 = 10 s, etc

- Podemos crear elementos: document.createElement('TAG'). Las tags en mayuscula

- En vez de asignarle clases con elemento.classList = "clase1 clase2", es mejor añadirlo con elemento.classList,add('clase1','clase2') 

- Para asignar un elemento creado dentro de otro, elementoPadre.appendChild(nuevoElemento)


## REACT VITE

- Crear proyecto con npm create vite@latest
- La sintáxis propia de React es con llaves {} y se le llama jsx, que permite combinar HTML con JS
- Tengo el main.jsx que carga el App.jsx en el dom. En App.jsx es donde cargaré los componentes y en index.css donde pondré los estilos que afecten a todo.
- Formas de escribir CSS en React:
    - CSS plano
    - SASS
    - Modulos CSS
    - Librerias basadas en componentes
    - Frameworks CSS como bootstrap o tailwind
    - Styled componentes: crear componentes que tienen un diseño en CSS
    Lo suyo es utilizar solamente una de estas formas en un proyecto.

- Un componente:
    - Es una función de JS
    - Siempre tiene que empezar en mayusculas.
    - El contenido está dentro de las llaves 
    - Se le puede pasar contenido/info por props (parametros entre parentesis)
    - El return es lo que se muestra en pantalla
    - Se basa en tener HTML y JS en un mismo archivo.
    - Puede ser jsx o tsx. (.js tambien pero no es recomendado)
    - Dos objetivos:
        - Ser reutilizable
        - Separar la funcionalidad

- Crear un componente es:
    - Crear un fichero Nombre.jsx
    - Crear la funcion func Nombre(){
        return (*contenidohtml*)
    }
    - Exportarlo con export 

- JSX - Javascript Syntax Extension
    - Extension del lenguaje para React -> Para agregar HTML y JS en un solo fichero.
    - Parece JS pero muestra codigo HTML. Básicamente es un lenguaje de templates/vistas que muestra HTML con todas las funciones de JavaScript
    - Una vez compilado (para produccion) son archivos JS con funciones y objetos.

- Para renderizar variables de la funcion en el html del return: {variable}

- Solo puedo retornar un solo elemento en un componente en el nivel máximo. Crear divs puede llevarme a tener un montón de divs innecesarios. -> Solución: usar fragments.
    - DOS FORMAS DE CREAR FRAGMENTS EN REACT:
        - import {Fragment} from 'react' -> <Fragment></Fragment> -> No me va a crear divs innecesarios, pero va a cumplir con la característica de devolver solo un elemento en el nivel máximo.
        - No importar nada y hacer <></> -> Mejor porque no hay que importar y hay que escribir menos

- Estructura del código de un componente.jsx
    1. Importamos librerías o componentes (fuera del componente)
    2. Estado o funciones(dentro del componente)
    3. return HTML/Vista (dentro del componente)


- class es una palabra reservada de JS y como en REACT se mezcla codigo HTML con JS, para no confundir, las clases de HTML en vez de class son className. Una vez que se sube a produccion, los className se renombran a class

- **Los Hooks** permiten utilizar las funciones de React en los componentes. React tiene una serie de Hooks (useState, useEffect, useContext, useReducer, useCallback...) pero podemos crear los nuestros. Los hooks se dividen entre básicos y adicionales.
    Creando nuestros propios Hooks podremos separar el código en funciones reutilizables y sacar todo el beneficio que nos ofrece React.

- **El state** (o estado) en React es la pieza fundamental. Es una variable con información relevante. A veces pertenece a un componente específico y otras se debe compartir por diferentes componentes. Hay que pensar en el estado como el resultado de alguna interacción en la aplicación: por ejemplo el listado de clientes, la imagen a mostrar, si un usuario está autenticado o no... **Es creado con el hook useState**
    Ejemplo: 
    - Importamos el useState con ``import {useState} from "react"``
    - Declaramos el estado con: ``const [customer, setCustomer] = useState({})`` -> useState siempr devuelve un arreglo. Los corchetes {} es el valor inicial. Por ejemplo también podríamos hacer:
        - ``const [total, setTotal] = useState(0)``
        - ``const [products, setProducts] = useState([])``
        - ``const [modal, setModal] = useState(false)``

    - Volviendo al ejemplo ``const [customer, setCustomer] = useState({})``
        - Customer es el state: la variable con la información
        - setCustomer es la función qye modifica el state -> la utilizaremos cuando queramos hacer cambios en el state
        - useState es el hook que nos da react
        - {} es el valor inicial

    - React reacciona en base al State. CAda vez que cambia, la aplicación se renderiza y se actualiza con esos cambios automaticamente. La interfaz por tanto estará siempre sincronizada con el state. Para modificar el state se utiliza la función setXXXX en lugar de asignar un valor con =.

    - Regla de hook: Se colocan en la parte superior de los componentes. Fuera de los ifs/for y return. **NO SE PUEDEN TENER HOOKS DE FORMA CONDICIONAL**

    - El hook **useEffect** -> Es un callback. Se utiliza para diferentes escenarios. Dependiendo de la delaración va a realizar diversas acciones.
        - Sintáxis:
            - Declaramos con ```import {useEffect} from 'react'```
            - Utilizamos ```useEffect(() => {
                console.log("Componente listo)
            }, [])``` -> Los corchetes finales son los arreglos de dependencias (luego se verá con mas profundidad)
        - Se ejecuta automáticamente cuando el componente está listo: ideal para consultar una API o obtener datos de LocalStorage. 
        - Como le podemos pasar una dependencia (normalmente state), va a estar escuchando por los cambios que sucedan en esta variable/state y podemos actualizar el componente o ejecutar ciertas funciones cuando ocurra ese cambio. Por ejemplo, estar sincronziando con localStorage por ejemplo. 
        - Dependiendo del valor que pasemos en el array de dependencias (o no pasemos nada), el hook hará algo diferente.
        - Cuando el componente esté listo:
        ```useEffect(() => {
            console.log("Componente listo)
        }, [])``` -> si dejamos vacío el array de dependencias, este codigo solo se ejecuta una vez, cuando el componente esté listo.

    - Statements y expresiones en JS:
        - Un statement es una instruccion para hacer alguna acción -> crear variables, ifs, lanzar errores con throw, iterar con for/while, etc. No se pueden utilizar en la parte del return
        - Expresiones: Algo que produce un valor: ternarios, array methods para generar un nuevo array (filter, map...). Estos se pueden utilizar en la parte del return.

        Por tanto, si queremos iterar sobre un array state en el return, debemos hacerlo con la expresion entre llaves:
        ```js
            {
                data.map((element) => {
                return (
                  <Instrument/>
                )
              })
            }
        ```

    - **Los props** son una forma de compartir información entre componentes. Lo utilizan para comunicarse entre ellos. Se puede pasar información de un componente padre al hijo por medio de estos.

        - Son similares a los atributos en HTML pero se les pueda pasar arrays, objetos o funciones. 
        - NUNCA se pueden pasar del hijo al padre
        - Ejemplo:
        ```
            <Header nombreProp={datos / state / funciones} />

            <Users users={users} setUsers={setUsers} title="Listado de usuarios"/>
        ```

        - Si tenemos un state que va a pasar por diferentes componentes, lo mejor es colocarlo en el archivo principal.
        - Cada nivel deberá tomar y pasar el prop hacia otros componentes. Algunas tecnologías como Redux, Context etc evitan hacerlo así.

        - Para recibirlos en el componente hijo, se le pone en el parámetro "props": ``function Child(props){}``
    
    - Siempre que iteremos utilizando un .map hay que pasarle un identificador único para que react pueda aplicar algunas mejoras al rendimiento. Se hace ``<Componente key={identificador}>``

    - **Los eventos en React** se manejan de forma similar a JS nativo, aunque tiene algunos cambios. Los eventos se escriben en camelCase. A diferencia de HTML y JS, en React las funciones se escribe entre llaves.
        - HTML: ``<button onclick="getOrders()">``  
        - React (JSX): ``<button onClick={getOrders()}``

        - HTML: ``<form onsubmit="agregarCliente(); retur false">``
        - JSX: ``<form onSubmit={handleSubmit}>``-> Convención, en el caso de los eventos se recomienda tener un handle y el nombre del evento (Al igual que setNombrestado)

        - **CUIDADO**: Cuando la función tiene argumentos/parámetros, hay que colocar un callback:
            - Antes: ``onClick={handleClick(id)}``
            - Después: ``onClick={() => {handleClick(id0)}}``

    - No es bueno tener un state muy grande porque la lógica sería muy compleja al manejar ese estado
        - Pero tampoco es bueno tener muuuuchos useState (para eso habria que usar herramientas como context, zustand...)


    - Imaginemos que quiero añadir a mi estado array un elemento. Puedo usar ``setEstado([...estado, nuevoElemento])`` y funcionaría. Pero setEstado conoce su estado asociado mediante su callback: ``setEstado(prevEstado => [...prevEstado, nuevoElemento])``
    De esta forma, podemos pasar de: ``onClick={() => setCart([...cart, element])}>`` a ``onClick={() => setCart(prevCart => [...prevCart, element])}>``

    - **INMUTABILIDAD EN REACT**: Si yo escribo estadoArray.push(elemento), estoy mutando el estado, lo cual está mal. Hay que usar setState. Para saber qué métodos mutan: doesitmutate.xyz
    
    - Si queiro actualizar la cantidad de un elemento de un array, no puedo hacer ``cart[itemExists].count++`` porque estoy modificando el state directamnte (lo estoy mutando y el state es inmutable). Para hacerlo bien, debo crear una copia con ``const updatedCart = ...cart``y luego hacer el count++ sobre esa copia. Finalmente, usamos setCart(updatedCart) para modificar el estado correctamente. El motivo de esto es que si no lo hago mediante esa función, react no detectará el cambio porque la referencia del objeto/array seguirá siendo la misma aunque sus propiedades cambien.

    - **State derivado**: Si tenemos un state (por ejemplo, array) podemos crear una función/variable cuyo valor dependa de ese estado. Por ejemplo: si tenemos el estado cart que es un array, podemos declarar la variable ``const isEmpty = () => cart.length === 0``. De esta forma podemos dejar la lógica fuera del template y mejorar la legibilidad del código.