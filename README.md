# ProyectosCursoReact
Repositorio para los proyectos que se realizan durante mi formación en el curso de React: **React y TypeScript - La Guía Completa Creando + 10 Proyectos.** 

Este curso abarca desde los fundamentos de React (Hooks, State) hasta conceptos avanzados como TypeScript, Zod, Zustand, React Query, Next.js, React Router, y stacks como MERN y PERN.

Todos los proyectos están desarrollados con React + VITE + Tailwind CSS con TypeScript (a excepción del primero que también cuenta con una versión en JavaScript).


A continuación describiré los distintos proyectos que voy haciendo a la vez que sigo el curso, donde reflejo los conocimientos adquiridos en cada uno.

- **MusicShop:** Proyecto de venta de instrumentos musicales. Una aplicación sencilla y básica para comenzar con los fundamentos de React: estado y hooks (tanto de react como custom). En este caso, se realizó el proyecto tres veces:
    - En JavaScript
    - Migración a TypeScript
    - Utilizando un reducer en lugar de custom hook una vez realizados otros proyectos con useReducer, para afianzar el conocimiento.
    - Enlace al proyecto: https://heartfelt-praline-0cd1e3.netlify.app/

- **TipCalc:** Proyecto para calcular las propinas de un restaurante en una carta. Se avanzan en conocimientos básicos de React (hooks, state...).
    - La versión básica usa el estado básico en los componnetes con useState y hooks custom. Posteriormente también se realizó su version con useReducer para poder asentar esta forma de utilizar el estado.
    - Enlace al proyecto: https://cozy-seahorse-6ab040.netlify.app/

- **CaloCalc:** Proyecto para calcular las calorías consumidas por el usuario, donde puede introducir las calorías consumidas y quemadas durante el día para hacer un balance de déficit o no. En este caso, se utilizó por primera vez el Reducer, viendo otra posibilidad de almacenar el estado en la aplicación y modificarlo mediante acciones. A partir de este proyecto, se pudieron hacer las versiones con reducer de las dos anteriores.
    - Se ha realizado una versión con useReducer y otra con ContextAPI para manejar estado global.
    - Enlace al proyecto: https://dainty-panda-3b1694.netlify.app/

- **SpendingPlanner:** Aplicación para planificar los gastos realizados por el usuario, donde podrá introducir los gatos realizados con su nombre y su categoría. En este proyecto se comenzó a utilizar un estado global para evitar la sobreutilización de props desde App.tsx a los distintos componentes. De esta forma, junto con el reducer, se mantiene un estado global para todos los componentes de forma más sencilla y escalable. Para ello se utilizó **ContextAPI**.
    - Se utilizaron algunas librerías externas como:
        - *react-date-picker* y *react-calendar* para seleccionar la fecha de un calendario.
        - *react-swipeable-list* para tener una forma de editar y eliminar items de una lista de forma más moderna.
        - *react-circular-progressbar* para facilitar la visualización de datos
    - Enlace al proyecto: https://fancy-taiyaki-c18769.netlify.app/

- **VetCare:** Proyecto para la gestión de pacientes de una clínica veterinaria, donde se podrán añadir, modificar y eliminar pacientes ingresados. La novedad en esta aplicación es la incorporación de un estado global con **Zustand**, una herramienta que simplifica este tipo de estado en comparación con ContextAPI. Además, se utiliza la librería de *FormHookReact* para simplificar la validación de los formularios. Por último, se agregaron mensajes de alerta con la librería *React-Toastify* para cuando el usuario haga alguna acción poder retroalimentarle el resultado.
    - Enlace al proyecto: https://heartfelt-sunshine-90fcc7.netlify.app/

- **SearchingWeather**: Aplicación para conocer el clima de las ciudades de los distintos países. Se comienza a trabajar con APIS externas haciendo consultas a la API gratuita de *OpenWeatherMap*. Se trabaja con **Axios** para las peticiones HTTP y se utiliza **Zod** (también se exploró y probó la alternativa de Valibot) para parsear y tipar el resultado, mejorando la calidad y robustez del código TypeScript.
    - Enlace al proyecto: https://spectacular-raindrop-5d756d.netlify.app/

- **CryptoConvert**: Aplicación para la cotización y conversión de divisas y criptomonedas. Se trabaja con **Zustand** para el estado global, con **axios** para las peticiones HTTP a la API de *CoinDesk*, y con **Zod** para parsear y tipar la respuesta de las peticiones HTTP. De esta forma, se refuerzan los conceptos más importantes vistos en los proyectos anteriores.
    - Enlace al proyecto: https://classy-piroshki-3431a2.netlify.app/

- **Drinkify**: Proyecto para la búsqueda de recetas de cocktails y bebidas varias. Consumiendo la API de **TheCocktailDB**, obtenemos las recetas con **axios** validando la respuesta con **Zod** y manteniendo un estado global, esta vez dividido en slices, con **Zustand**. También utilizamos ventanas modales para la información de cada receta y para las notificaciones con **HeadlessUI** y tras un par de proyectos utilizando CSS Modules, en este caso se ha vuelto a trabajar con **Tailwind**. Es además el primer proyecto en el que se usa **React Router** para poder añadir varias vistas/páginas en la aplicación. Adicionalmente se le ha añadido un modelo de IA con **OpenRouter**, que permitirá generar recetas bebidas de forma automática a partir de un prompt.
    - Enlace al proyecto: https://grand-liger-d77862.netlify.app/

- **StockUp**: Aplicación para la gestión de inventario de una tienda genérica. Se pueden crear, modificar, cambiar la disponibilidad y eliminar productos. Novedades de este proyecto:
    - El frontend de React con una API REST propia desarrollada con NodeJS, Express y PostgreSQL (*proyectos/StockUp/api*)
    - Se utilizan herramientas como:
        - **Valibot** como alternativa a *Zod* y así ampliar las herramientas posibles para la validación de los tipos de datos de TS.
        -  **React Router**: Nos ayuda con la gestión de las rutas y páginas.
            - Actions y Loaders para obtener los datos y enviarlos de forma más eficiente.
        - **Axios**: Para enviar las peticiones HTTP
        - **Tailwind**: Para estilos responsive
    - Enlace al proyecto (sin backend y base de datos activa para evitar sobrecostes): https://whimsical-gumption-d44a6d.netlify.app/