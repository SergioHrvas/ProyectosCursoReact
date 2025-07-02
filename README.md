# ProyectosCursoReact
Repositorio para los proyectos que se realizan durante mi formación en el curso de React: **React y TypeScript - La Guía Completa Creando + 10 Proyectos.** Una formación de React desde cero: Hooks y State hasta TypeScript, Zod, Zustand, React Query, Next.js, React Router, MERN y PERN.

A continuación describiré los distintos proyectos que voy haciendo a la vez que sigo el curso, donde reflejo los conocimientos adquiridos en cada uno.

- **MusicShop:** Proyecto de venta de instrumentos musicales. Una aplicación sencilla y básica para comenzar con los fundamentos de React: estado y hooks (tanto de react como custom). En este caso, se realizó el proyecto tres veces:
    - En JavaScript
    - Migración a TypeScript
    - Utilizando un reducer en lugar de custom hook una vez realizados otros proyectos con useReducer, para afianzar el conocimiento.
    - Enlace al proyecto: https://heartfelt-praline-0cd1e3.netlify.app/

- **TipCalc:** Proyecto para calcular las propinas de un restaurante en una carta. Se avanzan en conocimientos como . Posteriormente también se realizó su version con useReducer para poder asentar esta forma de utilizar el estado.
    - Enlace al proyecto: https://cozy-seahorse-6ab040.netlify.app/

- **CaloCalc:** Proyecto para calcular las calorías consumidas por el usuario, donde puede introducir las calorías consumidas y quemadas durante el día para hacer un balance de déficit o no. En este caso, se utilizó por primera vez el Reducer, viendo otra posibilidad de almacenar el estado en la aplicación y modificarlo mediante acciones. A partir de este proyecto, se pudieron hacer las versiones con reducer de las dos anteriores.
    - Enlace al proyecto: https://dainty-panda-3b1694.netlify.app/

- **SpendingPlanner:** Aplicación para planificar los gastos realizados por el usuario, donde podrá introducir los gatos realizados con su nombre y su categoría. En este proyecto se comenzó a utilizar un estado global para evitar la sobreutilización de props desde App.tsx a los distintos componentes. De esta forma, junto con el reducer, se mantiene un estado global para todos los componentes de forma más sencilla y escalable. Para ello se utilizó **ContextAPI**.
    - Se utilizaron algunas librerías externas como:
        - *react-date-picker* y *react-calendar* para seleccionar la fecha de un calendario.
        - *react-swipeable-list* para tener una forma de editar y eliminar items de una lista de forma más moderna.
        - *react-circular-progressbar* para facilitar la visualización de datos