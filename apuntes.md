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

## TYPESCRIPT
- Es un lenguaje de programación opensource de Microsfot. Es un superconjunto tipado de JS -> cualquier código JS válido es también código TS válido
- Agrega un sistema de tipos estático a JS, lo que permite detectar errores y proporcionar herramientas de desarrollo más sólidas.
- Ventajas:
    - Permite especificar los tipos de variable, parámetros de función, valores de retorno... esto da la capacidad de comprobar los tipos durante la compilación y detectar posibles errores antes de que se ejecute el código.+
- TS con React:
    - Una vez escrito el código TS, se compila a JS.
    - React y Vite incluyen soporte a JS. 
    - Es un estándar para crear aplicaciones React, Angular, VueJS
- Al crear el proyecto React en TS:
    - La estructura es la misma excepto los dos ficheros tsconfig -> configuración de typescript con reglas para compilar.
    - Los archivos son tsx en vez de jsx
- TS utiliza inferencia para decir: esta variable es de X tipo o nula. Para asegurarse que no es nula, podemos decir "as Tipodedato" pero no es muy buena práctica porque le estamos diciendo algo como "confía en mí". Podemos utilizar entonces el Assertion notnull (!) -> le decimos "no va a ser null"

- Primitive Types son los que soporta TS de forma nativa: number, string, boolean, null y undefined 

- Los arrays tienen una sintáxis especial para crearlos. ``const db: Instrument[] = [elemento1, elemento2]``

- **Types e interfaces**: Pueden ser utilizadas de forma alterna y hay muy pocas diferencias entre ambos. Es una forma de crear una estructura o agrupar propiedades de un objeto

- **Tipo de dato any**: Si nos fijamos podemos asignar una variable un string, luego un number... etc. Esto hay que evitarlo en TS sobre todo. A eso se refiere el tipo de dato any -> puede recibir cualquier tipo de dato, puede ser reescrito en cualquier momento. Llenarlo de any es como no usar any. Hay que dar mas información

- Para dar esta información de tipo de datos en los props, hay dos formas de hacerlo:
    - Inline type: ``function Instrument({instrument, addToCart} : {instrument: Instrument, addToCart: (item: Instrument) => void})`` -> Es mas facil tener errores
    - Crear type separado para los props

- Es bueno reutilizar los types para la consistencia. Dos formas de hacerlo:
    - Creamos un archivo types.d.ts en src. Pegamos el tipo de dato que queremos reutilizar y vemos que no da errores. el ``.d``del fichero no se necesita importar. PEro no es recomendable hacerlo de esta forma.
    - Crear carpeta types, dentro index.ts con los tipos y export y los importamos con ``import type { Instrument } from "../types"``

- Al obtener datos de localStorage o de fetchAPI, a ts se le hace muy dificil inferir el tipo de dato -> es externo, se le complica.

- Herencia entre types: para simplificar el codigo es bueno utilizar herencia de la siguiente forma: 
```
export type CartItem = Instrument & {
    count: number
}
```

si CartItem lo definimos como interfaz sería: 
```
export interface CartItem extends Instrument & {
    count: number
}
```

- **Utility Types**: https://www.typescriptlang.org/docs/handbook/utility-types.html
    - Sintáxis un poco extraña
    - Pick : Nos permite escoger ciertos elementos de otro type.

    ``export type CartItem = Pick<Element, 'id | 'name' | 'price' > & {
        count: number
    }``

    - Omit: Quita ciertos atributos de otro type.
    - Hay más en la documentación

- Podemos tomar el id como number con id: number y se solucionarían los problemas. Pero qué pasa si en algún momento migramos de bd de una que utiliza id como numeros a string. Habría que cambiar todas las partes del código donde se toma el id como string. Queremos que los cambios sean lo mas sencillos posibles. Creamos un type llamado InstrumentId:
``export type InstrumentId = Pick<Instrument, 'id'>``
También podemos utilizar algo que se conoce com lookup que es: 
``export type InstrumentId = Instrument['id']``
Puede no ser necesario crear el type y simplemente sustituir los lugares donde ponemos id a Instument['id'] y de esta forma el tipo de dato inferido siempre será ese

- Los **generics** nos permiten escribir código más flexible y reutilizable. COn ``<>``podemos especificar un tipo de dato para que no solo lo infiera por su valor inicial. Esto es util cuando tienes un type un poco más complejo. Por ejemplo: ``const [order, setOrder] = useState<OrderProducto[]>([])``

- Para convertir de String a number se puede:
    - Poner un signo + delante: ``onChange={e => setTip(+e.target.value)}``
    - poner e.target.valueAsNumber (no funciona con los input de tipo radio)
    - 

## TAILWIND CSS
Framework CSS basado en utilidades. A diferencia de bootstrap donde una clase contiene propiedades CSS, en taildind cada clase es una propiedad de CSS con un nombre similar.
- Ventajas:
    - Escribimos código CSS en los componentes sin hojas externas.
    - No es necesario preocuparse por la hetencia de CSS. (evitamos uso de important y demas)
    - No hay que preocuparse por cómo nombrar las clases.

- Instalamos con: 
    ```
    npm install -D tailwindcss@3 postcss autoprefixer
    npx tailwindcss init -p
    ```
    - Vemos que se crean dos archivos. A tailwind.config.js le agregamos
    ```
      content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    ],
    ```
    De esta forma le estamos especificando en qué archivos o dónde va a encontrar codigo HTML que va a tener clases de CSS. De esta forma una vez construyamos el proyecto, solo va a tomar las clases del framework que hemos utilizado y crear una hoja de estilos solo con esas clases (a diferencia de bootstrap que incluye las miles de lineas de clases predefinidas). 

    - Añadimos al index.css 
    ```
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```
    Esto indica que vamos a utilizar talwind y queremos habilitar esos componentes y utilidades.
    - Cuando ya tenemos configurado tailwind, vemos que todo tiene la misma apariencia (h1 y p por ejemplo). Tailwind quita todos los estilos para que comencemos a agregar la apariencia que deseemos a cada elemento.

    - ``grid md:grid-cols-2`` hace que al disminuir el ancho de la página, las columnas se apile una encima de otra verticalmente (responsive)


## CSS MODULES
- Cuando trabajamos con modulos, lo escribimos con el mismo nombre que el componente de react y ``.module.css``. Definimos ahí los estilos e importamos en el tsx de la siguiente forma ``import styles from 'ruta'``. Para usarlo, es tan fácil como ``className={styles.estilo}``

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

        - HTML: ``<form onsubmit="agregarCliente(); return false">``
        - JSX: ``<form onSubmit={handleSubmit}>``-> Convención, en el caso de los eventos se recomienda tener un handle y el nombre del evento (Al igual que setNombrestado)

        - **CUIDADO**: Cuando la función tiene argumentos/parámetros, hay que colocar un callback:
            - Antes: ``onClick={handleClick(id)}``
            - Después: ``onClick={() => {handleClick(id0)}}``

    - No es bueno tener un state muy grande porque la lógica sería muy compleja al manejar ese estado
        - Pero tampoco es bueno tener muuuuchos useState (para eso habria que usar herramientas como context, zustand...)


    - Imaginemos que quiero añadir a mi estado array un elemento. Puedo usar ``setEstado([...estado, nuevoElemento])`` y funcionaría. Pero setEstado conoce su estado asociado mediante su callback: ``setEstado(prevEstado => [...prevEstado, nuevoElemento])``
    De esta forma, podemos pasar de: ``onClick={() => setCart([...cart, element])}>`` a ``onClick={() => setCart(prevCart => [...prevCart, element])}>``

    - **INMUTABILIDAD EN REACT**: Si yo escribo estadoArray.push(elemento), estoy mutando el estado, lo cual está mal. Hay que usar setState. Para saber qué métodos mutan: doesitmutate.xyz
    
    - Si quiero actualizar la cantidad de un elemento de un array, no puedo hacer ``cart[itemExists].count++`` porque estoy modificando el state directamnte (lo estoy mutando y el state es inmutable). Para hacerlo bien, debo crear una copia con ``const updatedCart = ...cart``y luego hacer el count++ sobre esa copia. Finalmente, usamos setCart(updatedCart) para modificar el estado correctamente. El motivo de esto es que si no lo hago mediante esa función, react no detectará el cambio porque la referencia del objeto/array seguirá siendo la misma aunque sus propiedades cambien.

    - **State derivado**: Si tenemos un state (por ejemplo, array) podemos crear una función/variable cuyo valor dependa de ese estado. Por ejemplo: si tenemos el estado cart que es un array, podemos declarar la variable ``const isEmpty = () => cart.length === 0``. De esta forma podemos dejar la lógica fuera del template y mejorar la legibilidad del código.

    - **hook useMemo**: parecido al Computed Properties de VueJS. Simplifica los templates y está enfocado al performance porque evita que el código del componente se ejecute si alguna de las dependencias que vamos a definir en ese useMemo no han cambiado. Renderizar completamente la app cada vez que se cambia el state, puede ralentizar la aplicación. Con useMemo podemos decirle: no hagas render completo de la app hasta que no cambie x cosa.
        - Por ejemplo: ``const isEmpty = useMemo(() => cart.length === 0, [cart])`` -> Vuelve a hacer el render cada vez que cambie el carrito. Ese código solo se ejecuta cuando carrito se haya modificado.
        - No se usa en todos lados. ES enfocado a performance, pero como lo que hace es cachear los resultados entre renders, a veces puede ser contraproducente cachear tanto. 

    - **hook useCallback**: Alternativa a useMemo. Funcionan igual pero la forma de llamarlas es diferente (como funcion en vez de como variable)
    
    Pasaríamos de esto:
    ```
    const subTotal = useMemo(() =>
        order.reduce((total, element) => total + element.count * element.price, 0)
    , [order])

    const tipTotal = useMemo(() =>
        subTotal * tip
    , [tip, subTotal])
    
    const total = useMemo(() =>
        subTotal + tipTotal
    , [subTotal + tipTotal])
    ```
    
    A esto:
    ```
    const subTotal = useCallback(() =>
        order.reduce((total, element) => total + element.count * element.price, 0)
    , [order])

    const tipTotal = useCallback(() =>
        subTotal() * tip
    , [tip, order])
    
    const total = useCallback(() =>
        subTotal() + tipTotal()
    , [tip, order])
    ``` 

    - **Persistencia**: Utilizaremos LocalStorage.
        - LocalStorage.setItem:
            - Primer parametro: nombre de lo que quiero almacenar
            - Segundo parametro: valor (no permite objetos complejos)

    - El estado en react es ASINCRONO: no se actualiza inmediatamente sino que tarda unos milisegundos. Si fuera síncrono, no podriamos interactuar con la pantalla hasta que se guarde, lo que afectaría al rendimiento. Cuando se hace setEstado() se sigue con el código a continuación. -> Utilizamos useEffect para asegurarnos de hacer algo cuando el estado se guarde por completo (como la persistencia).

    - Al hacer
    ```
    useEffect(()=> {
            localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])
    ```
    le estamos diciendo que se ejecute cada vez que el carrito cambie pero también se ejecuta una vez cuando el component esté listo (similar a cuando no tiene dependencias). Por tanto, como el carrito esta vacío (``const [cart, setCart] = useState([])``), le estamos estableciendo el carrito vacío al localStorage al principio. Debemos revisar primero si hay algo en localStorage (si no hay nada, le asignamos el vacío.)

    ```
    // Carrito inicial (recuperamos de localStorage)
    const initialCart = () : CartItem[] => {
        const localStorageCart = localStorage.getItem('cart')

        // Comprobamos si hay algo
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    //Estados
    const [cart, setCart] = useState(initialCart())
    ```

    - **Deploy**: Ahora mismo tenemos todo en desarrollo pero una vez hemos terminado el proyecto, hay que construirlo con npm run build. Este comando va hacer unas mejoras de performance haciendo una versión simplificada y ligera.

    - **Crear hooks propios**: Se trata de incorporar state y otros hooks de react a nuestro código para poderlo reutilizar en otros proyectos. De esta forma podemos organizar el código para que el hook se encargue de toda la lógica del state mientras que los componentes se encarguen de mostrar la información
        - Ventajas: El código tendrá todas las ventajas de react (effects, state, integrar otros hooks, performance), reutilizable para otros proyectos y fácil de escribir las pruebas/testing.

        - Los hooks son funciones JS con algunas reglas. Deben seguir la convención de react useNombredelhook. Un hook solo debe tener lógica y no presentación.

        - Al llamar al hook personalizado, estoy creando algo como "instancias" de una clase. Si llamamos dos veces a useHook es como si creara dos estados distintos. No se comparten, no se conectan. Son dos distintos. 

    - Con el plugin de React snippets, podemos escribir ``rfc`` o ``rafc`` para crear la base de un componente

    - Se puede poner el estado y las funciones en un hook personalizado como se ha explicado antes y es correcto, pero cuando vamos teniendo states mas complejos, podemos almacenarlos en **reducers**, que son una forma de almacenar el state. No es de forma global, es un archivo aparte en el cual vamos colocando el state y utilizamos un hook llamado useReducer. 

    - **HOOK USEREDUCER**: Aparte de un hook nuevo es la base de herramientas como Zustand y Redux Toolkit que se explicarán más adelante.
        - UseReducer es una alternativa de useState (está basado en él).
        - Es un hook para manejar el state. Permite agregar un reducer a los componentes.
        - Simplifica la administración del estado en las aplicaciones.
        - Se utiliza para manejar estados más complejos y transiciones de estado que involucran lógica más complicada. Mientras que *useState* es ideal para manejar estados simples, useReducer es más idóneo para situaciones donde el nuevo estado depende del anterior o cuando hay varios sub-valores o lógica condicional a considerar (por ejemplo múltiples states que se actualizan en base a ciertas acciones). 
        - Sintáxis:
            - ``const [state, dispatch] = useReducer(reducer, initialState):``
            - Reducer: Función que toma el estado actual y una acción y devuelve un nuevo estado.
            - Estado inicial: Estado inicial del reducer (cómo va a iniciar el state y en base a las interacciones del usuario, se irá actualizando)
        - Términos importantes:
            - state: valor del estado cuya lógica se maneja dentro del Reducer.
            - initialState
            - Actions: acciones o funciones que manejan toda la lógica para modificar el state. Básicamente es una función que desde afuera (desde el componnete) llega y modificia el state. Muy similar a las funciones que exportamos en nuestro custom hook 
            - Payload: información que modifica el state (similar a los customhooks, donde teníamos una función y le pasábamos un id o un objeto con la información modificando el state)
            - Dispatch: función que manda llamar la acción con el payload.

        - Preparación:
        ```
        // Type que describirá lo que pasará en el reducer
        export type ActivityActions = {

        }

        // Tipo del estado
        type ActivityState = {
            activities : Activity[]
        }

        // Estado
        export const initialState: ActivityState = {
            activities: []
        }

        // Conecta las acciones y el estado
        export const activityReducer = (
            state: ActivityState = initialState,
            action: ActivityActions
        ) => {
            
        }
        ```
        - Una acción consta de dos partes:
            - El type: descripcion
            - Payload: información que modifica o vamos a agregar al state

    - Todo esto del useReducer está genial, pero podemos evitar estar pasandos esos props de state y de dispatch a los componentes utilizando ContextAPI o algun otro manejador de estados globales. Si el proyecto empieza a ser más complejo, tener un estado global nos puede ahorrar muchas líneas de código.

    - **Context API**: Nos permite manejar un estado global sin instalar dependencias porque ya viene incluido en React. 
        - Permite tener un estado global en la aplicacion: solo se tiene una instancia del state que se puede acceder desde cualquier componente sin tener que pasarlo por distintos componentes vía props.
        - Si colocamos un state en un custom hook o reducer, lo que hemos hecho ha sido pasarlo en el App.tsx a los demás componentes vía props. Si comenzamos a instanciar ese reducer o ese custom hook, tendríamos múltiples instancias del state. Por tanto las funciones no se pueden comunicar correctamente, solo podrían hacerlo con el state que fue instanciado. Esto lo solucionamos con ContextAPI: solo vamos a tener una instancia del state porque va a estar fuera de la aplicación: la va a rodear.
        - Utilizaremos el hook **useContext** (otras opciones son Redux Toolkit o Zustand). Context es muy bueno porque no requiere dependencias, pero su boilerplate para configurarlo puede ser complejo (de hecho vamos a crear nuestro context y un custom hook para poder acceder directamente a ese context)
        - Creamos la carpeta de context en src y creamos dentro el fichero budgetContext.tsx (en este caso)
            - Creamos el provider primero que todo. De ahí vienen los datos. 
            ```
            export const BudgetProvider = () => {

                return (
                    
                )
            }
            ```
            - Si queremos acceder al state y a las acciones del reducer, hay que agregar el useReducer dentro. Si no utilizaramos reducer, utilizaríamos los hooks useState, useEffect... En el return pasamos tanto el state como el dispatch para que siempre que utilicemos nuestro provider, podamos tener acceso al reducer y a las funciones de ese reducer (el dispatch).
            
            - Para ello hay que crear el context porque hasta ahora solo era la sintaxis para poder acceder a la información y utilizar la sintáxis de react. Lo haremos con la función ``createContext`. Hay que pasarle un valor por defecto.
            
            - Antes vamos a decirle qué va a manejar el provider: El provider maneja el state y el dispatch, por tanto, creamos el tipo de dato nuevo. Aqui se conectará el context y el provider. Digamos que context es la acción de tener el estado global pero provider serán los datos que va a tener ese context. 

            ```
            type BudgetContextProps = {
                state: BudgetState,
                dispatch: ActionDispatch<[action: BudgetActions]>
            }

            export const BudgetContext = createContext()

            export const BudgetProvider = () => {

                const [state, dispatch] = useReducer(budgetReducer, initialState) 

                return (

                )
            }
            ```

            De esta formna sabe el context qué es lo que tiene que tener registrado y al tener esos props, tenemos el autocompletado y va a estar sincronizado tanto el context, que va a saber lo que tiene que manejar y el provider igual.
        
        - Ahora que tenemos el context y el provider, lo que los contecta o lo que le dice al context que el provider va a manejar el state y el dispatch es el type (BudgetContextProps). Pero como tal no están conectados de ninguna forma. Solo le estamos diciendo a nuestro context que el provider va a tener un state y un dispactch. -> En el return, colocamos el BudgetContext con sintáxis de componente y pasamos state y dispatch, y de esa forma cuando instanciemos o utilicemos nuestro context, tendremos acceso a state y dispatch.

            ```
            return (
                <BudgetContext.Provider>
                    
                </BudgetContext.Provider>
            )
            ```

            Lo que va a hacer es rodear la aplicación de React y dentro va a ser muy simple tener acceso al state y al dispatch. ¿Cómo? Con los children -> Props especial que existe en React y hace referencia a los hijos de un componente. Hace referencia a todos los hijos de un componente. 

            ```
            import { createContext, useReducer, type ActionDispatch, type ReactNode } from 'react'
            import { budgetReducer, initialState, type BudgetActions, type BudgetState } from '../reducers/budgetReducer'

            type BudgetContextProps = {
                state: BudgetState,
                dispatch: ActionDispatch<[action: BudgetActions]>
            }

            type BudgetProviderProps = {
                children: ReactNode
            }

            // "Confia en mi, te voy a pasar correctamente tanto state como dispatch"
            // export const BudgetContext = createContext<BudgetContextProps>({} as BudgetContextProps)

            export const BudgetContext = createContext<BudgetContextProps>(null!)

            export const BudgetProvider = ({children}: BudgetProviderProps) => {

                const [state, dispatch] = useReducer(budgetReducer, initialState) 

                return (
                    <BudgetContext.Provider
                        value={{
                            state, dispatch
                        }}>
                        {children}
                    </BudgetContext.Provider>
                )
            }
            ```

            De esta forma, creando el type BudgetProviderProps con los children (como ReactNode) y devolviendo el Context.Provider con state y dispatch en el value y los hijos dentro, tenemos el context acabado.
        - Para colocar este context, hay que irse al main.tsx. Ahí se ve lo que renderiza la app principal. Context lo que hace es colocarse sobre la aplicación (rodearla) para permitir acceder a las funciones, state y datos que tengamos en el provider. 
            - Importamos en main.tsx el BudgetProvider (recordemos que es lo que contiene los datos, mientras el context solamente lo genera)

            ```
            createRoot(document.getElementById('root')!).render(
                <StrictMode>
                    <BudgetProvider>
                        <App />
                    </BudgetProvider>
                </StrictMode>,
            )
            ```
        - Para poder utilizar el context y acceder a lo que retornamos en ``value = {{state, dispatch}}``, hay que utilizar useContext: 
        ``const context = useContext(BudgetContext)``. De esta forma podremos tener acceso a state y a dispatch desde ahí. Por ejemplo, en el BudgetContext podríamos definir tambien algo como ``const auth = true`` y devolverlo, para que todos los componentes puedan acceder a él con useContext. Pero estar accediendo al contexto con ``useContext(BudgetContext)`` no es la mejor forma -> Utilizaremos un customHook. De esta forma utilizamos los hooks de react para conectar con el context que hemos creado personalizado.
        ```
        export const useBudget = () => {
            const context = useContext(BudgetContext)
            return context
        }
        ```
        De esta forma ya podemos mandar llamar el hook y no tenemos que estar mandando a llamar useContext pasandole el BudgetContext cada vez, sino que directamente al importar el hook personalizado ya estamos importanto tanto useContext (el hook de react) como el context que queremos mandar llamar 
    
    - Librerias de formularios: Si vamos a utilizar varios formularios, muy grandes y complejos, o con valicaciones complejas, una librería nos solucionará muchos problemas. Tenemos varias opciones: React Hook Form (la utilizaremos), Formik (se integra con la libreria de validaciones Yup) o utilizar ZOD.

        - Instalamos ``npm i react-hook-form``
        - Documentacion: https://react-hook-form.com/get-started
        - useForm es uno de los hooks que nos trae esta librería. Su sintáxis es const { register, handleSubmit, formState } = useForm().
            - Register nos va a permitir registrar un input o un select y aplicar las reglas de validación de RHF. Lo utilizamos de la siguiente forma: ``<input {...register(name, {opciones})}`` donde:
                - El nombre es lo que utilizaremos para recuperar los datos que el usuario ingresó (debe ser único)
                - Opciones: entre algunas de ellas está la validación (por ejemplo: required: 'nombre del error')
                - Ejemplo:
                ```
                <input
                    id:"name"
                    type:"text"
                    {...register('name', {
                        required: 'El nombre del paciente es obligatorio'
                    })}
                />
                ```
                - Otra validación podría ser:
                ```
                {{...register('name', {
                    required: 'El nombre del paciente es obligatorio',
                    maxLength: {
                        value: 8,
                        message: "Maximo 8 Caracteres"
                    }
                })}}
                ```

                - También se puede usar ``pattern`` si queremos validar que el valor sigue algún patrón como el del correo electrónico.


            - handleSubmit: lo ponemos en el form de la siguiente forma: ``<form onSubmit={handleSubmit(registerPatient)}> </form>`` -> Parece confuso porque es un parámetro con una función dentro de otra -> registerPatient es la función que creamos en el componente y se encargará  de esperar a que ocurra ese evento y recuperar los valores.
                - Si tenemos las distintas validaciones y tratamos de hacer un submit, no se ejecutará la acción puesta hasta que las validaciones de los campos se cumplan.
            - formState es el estado del formulario. Es decir, contiene el estado en el que se encuentra el formulario que he creado. -> Tiene mucha información. 
                - Para recuperar los errores tenemos la parte de ``errors`` (va a ser reactivo) -> Va a ser un objeto. Podemos acceder a cada error segun el nombre que le pusimos a su register correspondiente. Por ejemplo ``errors.name.message`` para acceder al mensaje
        - RHF nos evita tener que ir almacenando en estados los distintos valores que vamos escribiendo en los formularios e ir cambiandolos con los distintos onChange. Lo que mantiene ese state es el register. Para recuperar lo que el usuario ingresa, es muy simple. En la función que se llama en el handleSubmit (en el ejemplo, ``registerPatient``), se toma como parámetro de dicha función lo que el usuario ingresó (lo podemos nombrar como queramos pero normalmente es data). De esta forma:
        ``const registerPatient = (data) => { console.log(data )}``
    
    - Una forma que simplifica tanto useReducer como el estado global es **Zustand**. No viene incluido con React pero es muy útil. Zustand es una dependencia para manejar un estado global en apps de React. Su API es bastante sencilla y sirve tanto para JS como TS. ES una de las principales alternativas a Redux Toolkit.
        - Para instalar ``npm i zustand``
        - Un store de Zustand es similar al Reducer. Allí colocaremos el state y las funciones que modifican el state. 
        - La función ``create`` nos permitirá crear el store. 
        ```
        export const usePatientStore = create(() => ({
            // Aqui pondremos tanto el state como las funciones que modifican dicho state
        }))
        ```
        - En zustand seguimos teniendo las acciones, pero la cantidad de código es infinitamente menor. Son funciones que tenemos que especificar qué parámetros toman, qué retornan y toda la lógica. Todo esto dentro del store. 

        - Para llamar usar el store global: ``const { addPatient } = usePatientStore()``. Otra forma sería ``const addPatient = usePatientStore( state => state.addPatient )``

        - Para que las acciones puedan modificar y obtener el estado, tengo que recibir en el callback de ``create`` de zustand las funciones get y set
        ``export const usePatientStore = create<PatientState>((set, get) => ({``

        - Para implementar localStorage en Zustand, es muy sencillo:
            - Primero importamos el middleware persist: ``import {persist} from 'zustand/middleware'`` -> Nos permite tener un estado persistente, y se le puede especificar si queremos almacenar en sessionStorage o en localStorage.
            - Envolvemos todo el callback de create de zustand entre ``persist()`` -> ``create<PatientState>()(persist( (set) => ({...}), { name: 'patient-storage'}))`` -> De esta forma se almacena en localStorage por defecto.
            - También podemos almacenar en sessionStorage o solamente que mantenga el estado mientras tenga la ventana abierta. Para ello utilizamos el parámetro ``storage: createJSONStorage(() => sessionStorage)``
            - Podemos ver que lo sincroniza automaticamente cuando añadimos o modificamos el state -> no hace falta useEffect

    - Una API (Application Programming Interface) se define como funciones/métodos que ofrece una librería para ser utilizada por otro software como una capa de abstracción. Pone a disposición recursos que están alojados en otro servidor o db. Usualmente hay que enviar una petición estructurada -> Estándar.
        - Para consultar una API con React podemos utilizar FetchAPI, axios o librerías como SWR. Algunas API's requieren un KEY y otras están protegidas por CORS

    - Para hacer una petición con axios es tan fácil como importarlo y hacer ``await axios(url)``
    - Las variables de entorno hay que definirlas en el .env (.env.local para que git lo ignore) con VITE_NOMBRE para que VITE las detecte. Luego en el código se cargan con: ``import.meta.env.VITE_NOMBRE``

    - Cuando obtenemos resultados de APIs externas, los resultados que recibo no son tipados: los detecta como any. Esto es un problema para TS y hay varias formas de solucionarlo tipando el resultado.
        - La "peor" es crear un type nuevo con la información que me interesa y poniendo el tipo de la siguiente forma``axios<WeatherType>(url)`` -> puede dar lugar a valores undefined porque estamos forzando a que la respuesta tenga ese type y si no lo encuentra, TS lo marca como undefined -> no va a revisar si es correcto o no.  Lo que estamos haciendo es castear el resultado.
        - TypeGuards: Creamos una función ``isWeatherResponse(weather: unknown)``. Unknown es un tipo utilizado para representar un valor cuyo tipo no conocezs aún -> forma de decirle al compilador de TS que no estás seguro de qué tipo de dato se va a recibir pero aún así con la función quiero asegurarme de hacer algunas verificaciones de tipo antes de operar con ese valor. -> unknown es mejor que any para este caso. Cuando hagamos las operaciones, hay que devolver si es correcto o no y convertir dicho objeto al tipo (``function isWeatherResponse(weather : unknown) : weather is WeatherType``) para el autocompletado y que TS lo detecte como tipo válido.
        ```
        function isWeatherResponse(weather : unknown) : weather is WeatherType{
            return (
                Boolean(weather) && // comprobamos que weather exista
                typeof(weather) === 'object' && // comprobamos que weather sea un objeto
                typeof(weather as WeatherType).name === 'string' && //accedemos a cada elemento comprobando su tipo
                typeof(weather as WeatherType).main.temp === 'number' && 
                typeof(weather as WeatherType).main.temp_max === 'number' && 
                typeof(weather as WeatherType).main.temp_min === 'number'
            )
        }
        ```        
        y luego se usaría:
        ```
        const {data: weatherResult} = await axios(weatherUrl)
        const result = isWeatherResponse(weatherResult)
        if(result){
            console.log(weatherResult.main.temp)
        }
        ```
        El problema de esto es que no es un código mantenible. Con respuestas grandes, habrá funciones muy grandes y por tanto será poco escalable. Además, normalmente hay varios endpoints y habría que crear una función por cada uno. Tampoco es lo conveniente.
        - Utilizar una librería como ZOD, que permite definir un esquema fácilmente y comprobar si el objeto cumple con esa condición. Hemos definido los types hasta ahora pero podemos definir un esquema e inferir el type que se generaría en base a ese esquema:
        ```
        const Weather = z.object({
            name: z.string(),
            main: z.object({
                temp: z.number(),
                temp_max: z.number(),
                temp_min: z.number()
            })      
        })
        ```
        Luego definimos el type a partir del esquema con: ``type Weather = z.infer<typeof Weather> ``. 

        Para utilizarlo entonces y hacer algo muy parecido al Type Guards (que tiene implicito Zod de forma muy fácil), utilizamos ``safeParse``del zod Weather, que lo que hace es tomar el reusltado de la consulta de la APÌ y va a revisar si esas propiedades que estoy recibiendo en JSON coinciden con lo que he definido en el esquema. Si es asi, devuelve true, si no devuelve FALSE. -> Devuelve success true o false y, en caso de true, también devuelve data, con la info parseada al esquema
        ```
        const {data: weatherResult} = await axios(weatherUrl)
            const result = Weather.safeParse(weatherResult)
            if(result.success){
                console.log(result.data.name, result.data.main.temp)
        }
        ```

        La desventaja de zod es que no es modular (importamos todo de una vez y eso lo hace un poco más pesado, sobre todo si lo vamos importando en distintos hooks o ficheros)
        - Valibot: Es más modular que Zod, haciendolo más ligero. Realizamos lo mismo: definimos esquema (de la misma forma pero sin z. porque hemos importando solo ``string(), number() y object()``), inferimos con ``InferOutput<typeof esquemaDefinido>`` y parseamos con ``parse()``

    - React Router es una herramienta que nos permite tener aplicaciones en React con múltiples páginas. Es una de las librerías más comunes para las apps con múltiples páginas y navegación. 
        - Permite crear secciones con distintas urls como /tienda, /login, /productos...
        - También permite consultar APIs y procesar formularios. 
        - Para utilizarlo sustituimos App.tsx por un router de la siguiente forma:
        ```
        import { BrowserRouter, Routes, Route } from 'react-router-dom'
        import { IndexPage } from './pages/IndexPage'
        import { FavPages } from './pages/FavPages'

        export default function AppRouter() {
        return (
            <BrowserRouter>
            <Routes>
                <Route path='/' element={<IndexPage/>}/>
                <Route path='/favourites' element={<FavPages/>}/>
            </Routes>
            </BrowserRouter>
        )
        }
        ```

    - Para reutilizar código y no poner por ejemplo el <Header> en todas las rutas, se utilizan los layouts. Yo creo mi layout, lo añado como Element en un <Route></Route> que agrupe todas las páginas que quiera que incorporen ese layout. Posteriormente, en el componente del layout utilizo Outlet de react-router, el cual inyecta el contenido de la página, permitiendo tener elementos compartidos o comunes a varias páginas
    ```
    import { Header } from '../components/Header'
    import { Outlet } from 'react-router-dom'

    export const Layout = () => {
    return (
        <>
        <Header/>
        <Outlet/>
        </>
    )
    }
    ```

    - Al Route de la página principal, se le suele pasar el props `index`
    - Para navegar entre páginas lo tradicional siempre ha sido utilizar la etiqueta `<a>` y ponerle la ruta a la que navegar. Esto provoca flashes entre páginas y empeora el rendimiento de la aplicación. Para mejorar esto hay dos opciones:
        - Link: hay que pasarle `to="ruta"`
        ```
        <nav>
            <Link to="/" className='text-white font-bold text-2xl py-2 px-8 rounded-lg cursor-pointer hover:bg-slate-500'>
                Inicio
            </Link>
            <Link to="/favourites" className='text-white font-bold text-2xl py-2 px-8 rounded-lg cursor-pointer hover:bg-slate-500'>
                Favoritos
            </Link>
        </nav>
        ```
        - NavLink: Misma sintáxis que `<Link>` pero tiene acceso a un callback en el className para detectar la página actual -> Muy útil para resaltar  en el header la página en la que se encuentra el usuario.
        ```
        <nav className="flex gap-6">
            <NavLink to="/" className={({isActive}) => 
                isActive ? 
                'text-orange-500 uppercase font-bold text-2xl py-2 px-8 rounded-lg cursor-pointer hover:bg-slate-500' : 
                'text-white uppercase font-bold text-2xl py-2 px-8 rounded-lg cursor-pointer hover:bg-slate-500'
            }>
                Inicio
            </NavLink>
            <NavLink to="/favourites" className={({isActive}) => 
                isActive ? 
                'text-orange-500 uppercase font-bold text-2xl py-2 px-8 rounded-lg cursor-pointer hover:bg-slate-500' : 
                'text-white uppercase font-bold text-2xl py-2 px-8 rounded-lg cursor-pointer hover:bg-slate-500'
            }>
                Favoritos
            </NavLink>
        </nav>
        ```
    - Cuando trabajamos en proyectos multipágina, muchas veces queremos saber donde se encuentra el usuario para poder ocultar ciertas páginas, mostrar X información... React Router nos da algunos hooks, entre ellos useLocation.
        - Lo usamos así:
        ```
        const location = useLocation()
        console.log(location)
        ```
        - Podemos ver que tiene las siguientes partes:
            - hash: cuando agregamos en la url ``#nosotros``
            - key: forma de identificar la navegación que estamos usando
            - pathname: ubicación -> lo que uilizaremos para saber donde está el usuario
            - search: cuando tenemos hun query string `?q=hola` -> en sistema de busqueda es util
            - state: podemos colocar state en las rutas

    - En Zustand también podemos tener multiples stores. Conforme nuestras apps crecen, el store también puede hacerlo, para tener un  poco de modularidad y simplificarlo, hay dos opciones para manejar multiples stores:
        - Crear distintos archivos de stores 
        - Dividirlos con Slice Pattern: algo que también se encuentra en Redux Toolkit -> Forma de dividir los stores en piezas pequeñas y unirlas en un store principal finalmente
        
    - Para los slices utilizamos un StateCreator, que nos va a permitir crear el state especificandole qué tipo va a tener el slice. De esta forma en TS vamos a tener el autocompletado. Asi nos quedaría el slice base:
    ```
    // Para que no se queje de momento
    type Category = {}

    export type RecipeSliceType = {
        categories: Category[]
    }

    export const createRecipeSlice: StateCreator<RecipeSliceType> = (set, get, api) => ({
        categories: [],
    })
    ```

    Y en el store global que une los distintos slices, se crearía así:
    ```
    export const useAppStore = create<RecipeSliceType> ( (...a) => ( { // pasamos todos los argumentos (set, get...) a los demás 
        ...createRecipeSlice(...a) // los tres puntos para que tome una copia
    }))
    ```

    - ¿Que pasa si desde un slice quiero consumir el estado de otro slice?  Importamos el otro slice y lo utilizamos pasandole get, set y api. Por ejemplo ``createRecipesSlice(set,get,api).closeModal(). El problema es que da error en el set (TS se queja por tipos) y para solucionarlo hay que ir al slice importado y añadirle al StateCreateor el tipo del slice actual, dos arrays y el tipo del slice importado de nuevo, algo como:
    ```
    export const createRecipeSlice: StateCreator<RecipeSliceType & FavouriteSliceType, [], [], RecipeSliceType> = (set) => ({
    ```
    Y lo mismo en el otro slice:
    ```
    export const createFavouriteSlice: StateCreator<FavouriteSliceType & RecipeSliceType, [], [], FavouriteSliceType> = (set, get, api) => ({
    ```
    Esto lo hace muy complejo y añade código poco legible, por lo que es mejor llamar a la función deseada del otro slice desde fuera del slice actual. ESto se llama nested slices
