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
    - Método map: Funciona igual que forEach para iterar, pero **crea un nuevo arreglo** en base a las conficiones de la función.
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