# Journal App

- CRUD hacia Firestore

- Expandiendo nuestro Store añadiendo otros reducers

- Seleccionar y subir archivos

- Animaciones adicionales en nuestra aplicación

- Limpieza en el logout

- Variables de entorno



Se ha generado con > `npx create-react-app journal-app`

Es mejor usar Chrome como navegador para desarrollo, Brave da problemas

## Preparación

En `src` borramos todo salvo el `index.js`

Creamos `src/JournalApp.js` que va a ser un functional component, usamos el snippet `rafc`

Creamos `src/styles/styles.scss` y lo importamos en `index.js`

La versión actual de React 17.0.1 no es compatible con la última versión de `node-sass` que es la 5.0.0, hay que instalar la versión 4.14.1

> `npm install node-sass@4.14.1`

Reiniciamos el servidor de desarrollo


## Rutas principales y rutas hijas

Instalamos React Router `https://reactrouter.com/web/guides/quick-start`

> `npm install react-router-dom`

Creamos `src/components/authentication` y dentro `LoginScreen.js` y `RegisterScreen.js`
y creamos `src/components/journal/JournalScreen.js`

Ahora creamos `src/routers/AppRouter.js` por convención este es el nombre del router principal y `src/routers/AuthenticationRouter.js`

Los routers son componentes funcionales también. Copiamos el ejemplo de la documentación y lo pegamos en `AppRouter.js` y lo ajustamos

Creamos las rutas


## Sass partials

Creamos `src/styles/base/_settings.scss` y definimos variables de colores

Importamos `_settings.scss` en `styles.scss`

Creamos `src/styles/base/_base.scss` y definimos los estilos generales de la app

Después creamos `src/styles/components` y ahí vamos creando archivos correspondientes a componentes con los estilos propios


# Redux

Para la comunicación entre componentes vamos a trabajar con `Redux`

`Redux` es un patrón, un forma de trabajar. Hay quienes prefieren trabajar con el `Context` de `React`

Es un contenedor predecible del estado de una aplicación. Es decir, es una forma de controlar dónde se encuentra la información de una
aplicación en todo momento.

También ayuda a que la modificación de la información siempre sea en una sóla vía, de manera predecible, con el objeto de
prevenir cambios accidentales en la misma.

`Redux` no es propio de `React`, hasta ahora hemos hecho aplicaciones con `React`, controlando el estado de la aplicación pero sin `Redux`.

`Redux` se puede usar con `Angular`, `React`, `Vue`

Es una forma de mantener el estado de la aplicación independientemente del framework o librarías.

## Store

El `Store` en `Redux` es conocido como la fuente única de la verdad. Ahí está la información que los componentes van a consumir.

Si vovemos al `Reducer` de `React`, es una función pura que maneja un `Estado` (State), el `Estado` sirve la información a la vista para que
muestre la información deseada.

La vista no modifica el estado directamente, sólo lee, sólo está en modo lectura. Cuando se necesita hacer una modificación del
Estado la vista va a generar una `Acción` por ejemplo añadir un nuevo TODO.

Esta `Acción` va ser enviada al `Reducer` y éste sabrá qué hacer: Agregar, borrar o actualizar, después de que se ejecute esa `Acción` en
el `Reducer`, éste genera un nuevo Estado y es el Estado quien notifica a la vista de los cambios.

En Redux siempre vamos a tener un Estado (State) que va a ser proveído de datos, no por el `Reducer`, sino por el Store.

Nuevamente la vista no modifica el estado directamente, sólo lee. Cuando se necesita hacer una modificación del Estado la vista va a
generar una `Acción`.

Esta `Acción` va ser enviada a algo que se llama `Dispatcher`, éste va a recibir la `Acción`, la analiza y la envía a un `Reducer` especial.

Este `Reducer` especial es una combinación de todos los `Reducer`s que va a tener la aplicación: el `Reducer` para manejar la autenticación,
el `Reducer` de los TODOS, el `Reducer` de las tareas pendientes.

El `Reducer` especial simplemente contiene un montón de `Reducer`s pequeños, el `Dispatcher` recibe la `Acción` y tras analizarla escoge el
`Reducer` pequeño que va a ejecutar dicha `Acción` y esto genera un nuevo `Estado` (State) y éste notifica a la vista.

Todo este proceso es sólo válido para Acciones síncronas, no vale para peticiones asíncronas como peticiones Http.

En el caso de que el `Dispatcher` reciba una tarea asíncrona por ejemplo un login, se implementa un `Middleware` que forma parte del `Dispatcher`,
se pueden tener muchos `Middleware`s.

El `Middleware` recibe la tarea asíncrona, la ejecuta y espera a recibir la respuesta, cuando la recibe el `Dispatcher` del que forma parte,
la envía ya de forma síncrona al `Reducer` Principal que escoge el `Reducer` pequeño que modifica el `Estado` y el `Estado` notifica a la vista del cambio.

El `Store` tiene toda la información en todo momento.


## Configurar Redux en nuestra app

Documentación oficial de Redux: `https://es.redux.js.org/`

Documentación React Redux: `https://react-redux.js.org/`

> `npm install redux react-redux` Instalamos las dos cosas

Vamos a crear `src/reducers/authReducer.js` Creamos un Reducer normal.

Creamos types para que nos ayude en `authReducer.js` > `src/types/types.js`

Ahora creamos el Store `src/store/store.js` y ahora lo importamos en `JournalApp.js` y lo implementamos igual que el Context

En la app corriendo en la página de login vemos en el Inspector > Redux un enlace a las instrucciones `https://github.com/zalmoxisus/redux-devtools-extension#usage`

De la parte de Basic store copiamos `window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()` y lo añadimos a `store.js`

También importamos `compose`

Ahora React sabe que tiene un Store y en el inspector > Redux > State vemos la propiedad `auth` fruto de nuestro primer Reducer `authReducer.js`


## Primer dispatch de una Acción a nuestro Store

Vamos a traenos el custom Hook `useForm` que creamos en ejercicios anteriores y lo ponemos en `src/hooks/useForm.js`

Ahora lo vamos a implementar en `LoginScreen.js`

Manejamos con una función el submit y vamos a hacer el dispatch al Store, para ello tenemos que crear una Acción
para ello creamos `src/actions/authActions.js` y creamos la primera Acción `loginAction`

Ahora en `LoginScreen.js` usamos `useDispatch` que es un Hook para interactuar con el `Dispatcher` de `Redux`, le pasamos la Acción `loginAction`


## Firebase

Vamos a usar Firebase para la autenticación.

Vamos a `https://firebase.google.com/` hay que usar Chrome, con Brave falla.

Creamos un proyecto. Vamos a Authentication > Get Started > Sign-in method

1. Email/Password > Enable
2. Google > aportar el correo electrónico asociado a la cuenta

Ya tenemos montada una base de datos 

Ahora instalamos el manejador de Firebase en la app > `npm install --save firebase`


## Middleware

La tarea de login es asíncrona por lo que hay que aplicar un Middleware que ejecute la tarea, espere a que se resuelva y cuando se resuelva
llama al Dispatcher con una nueva Acción síncrona y el proceso ya sigue de manera habitual para al final generar un nuevo State.


Necesitamos instalar el paquete Redux Thunk `https://www.npmjs.com/package/redux-thunk`

Thunk es un Middleware encargado de hacer esta parte > `npm install --save redux-thunk`

Ahora hacemos la configuración en `store.js`

Tenemos instrucciones aquí `https://github.com/zalmoxisus/redux-devtools-extension#usage`, tenemos que modificar nuestro createStore
usando `const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;`

Ahora vamos a disparar nuestra primera Acción asíncrona de prueba, nos vamos a `authActions.js` y creamos la Acción asíncrona y la implementamos
en `LoginScreen.js`


## Configuración Firebase para Google Sign-in

Vamos a crear una app en nuestro proyecto de Firebase

Vamos a Firebase > Project Overview > Get started by adding Firebase to your app > Web

Registramos la nueva app de Firebase sin Hosting

Creamos `src/firebase/firebase-config.js` según la documentación, ésta hace tres exportaciones

Ahora en `authActions.js` creamos una nueva Acción asíncrona con las exportaciones de `firebase-config.js`

Y ahora vinculamos el botón de Sign in con Google en `LoginScreen.js` con nuestra nueva Acción asíncrona


## Registro de usarios

Vamos a `RegisterScreen.js` y vamos a setear los campos del formulario con valores por defecto para las pruebas.

Al hacer el submit vamos a recibir los datos de los campos, hacemos unas validaciones, para validar el email
usamos `https://www.npmjs.com/package/validator`

> npm install validator


## Reducer

Creamos `src/reducers/uiReducer.js` y lo añadimos a `combineReducers` en `store.js` y ahora forma parte del `Store` con `createStore`

ahora en `RegisterScreen.js` Vamos a recuperar el mensaje de error del State y mostrarlo de manera condicional en la vista


## Crear usuario en Firebase

Vamos a crear una Acción para grabar los datos en `Firebase`, vamos a `authActions.js` y creamos la acción con
la función `createUserWithEmailAndPassword` de `Firebase` esto graba los datos en base de datos. La función retorna
una promesa con los datos guardados que usamos para hacer el `dispatch` de `loginAction`

Ahora disparamos la Acción en `RegisterScreen.js` cuando el formulario es válido

Debemos estar observando Firebase y borrar usuarios registrados durante las pruebas ya que si metemos el mismo usuario dos
veces se dispara un error


## Login de usuario con Firebase

Ya podemos registrar usuarios en Firebase, vamos a realizar el login



Vamos a bloquear el botón de login cuando está en el proceso de autenticación.

1. Crear dos tipos en nuestros types.js
    uiStartLoading: '[UI] Start loading'
    uiFinishLoading: '[UI] Finish loading'

2. Crear dos acciones que modifiquen nuestro state en el uiReducer (no reciben argumentos)
    uiStartLoading: debe de colocar la propiedad loading en true 
    uiFinishLoading: debe de colocar la propiedad loading en false

    Esas acciones tendrán el nombre de startLoading y finishLoading respectivamente

3. Las acciones de startLoading y finishLoading serán despachadas únicamente en la acción `startLoginEmailPassword`
    Tan pronto la acción es creada, debe de disparar la acción de startLoading
    Cuando se resuelve la petición de Firebase de autenticación con éxito o error, deben de disparar la acción finisLoading

4. En el `LoginScreen.js`, deben de bloquear el botón de Login, añadiendo la propiedad: `disabled={ loading }`
    Donde loading es la propiedad del state ui.loading.


## Mantener el state de la autenticación al recargar la página

Vamos a `AppRouter` añadimos un efecto para ejecutar algo cada vez que cambia el estado de autenticación de usuario


## Mostrar un loading global en la app

En `AppRouter` creamos dos banderas una que indica si la app está comprobando la autenticación y otra que indica si
el usuario está logueado

Mostramos de manera condicional un texto de loading...


## Logout

Vamos a `Sidebar.js` y manejamos el click de logout que dispara la Acción `startLogoutAction` que todavía no existe.

Vamos a `authActions.js` y creamos dos Acciones nuevas `startLogoutAction` que con `signOut` de firebase hace el logout, es asíncrono
así que usamos async/await y cuando haya terminado realiza la otra Acción `logout` que borra los datos de login del State


## Protección de rutas




## Mensajes de error

Vamos a usar Sweet Alert 2 `https://sweetalert2.github.io/#download`

> `npm install sweetalert2`

Vamos a `authActions.js` 


# CRUD en Firebase

Hay un playlist en youtube que explica paso a paso como hacer CRUD en Firebase `https://www.youtube.com/playlist?list=PLCKuOXG0bPi29EkcAuVCln9ISbExcQk66`


## notesReducer

Creamos `src/reducers/notesReducer.js` 

Vamos a crear un reducer para conseguir un State de las notas, este State va a ser un objeto con una propiedad `notes` que va a ser un arreglo de notas,
otra propiedad `active` que será la nota activa que podrá ser null o un objeto con un id de firebase, un title, un body, un imageUrl y un date

Primero definimos el reducer que recibe dos argumentos: state y action

Después definimos el initialState y lo ponemos como valor por defecto al state.

Ahora en el reducer creamos el switch y dejamos tan solo el return del state, esta es la configuración mínima, más adelante añadiremos cases.

Ahora añadimos este `notesReducer.js` a nuestro reducer global que está en el `store.js` que es el que combina todos los reducers

Ya tenemos notesReducer en nuestro store > state

Vamos a JournalScreen.js y vamos a comprobar si tenemos una nota activa vamos a mostrar una pantalla o no


## Crear una nueva nota

Vamos a Firebase > Cloud Firestore > Create database > Production mode > Enable

Más adelante implementaremos reglas de acceso para que sólo la persona logueada pueda hacer cambios a sus propias notas.

Vamos a `Sidebar.js` y añadimos un handler del evento click que dispara un dispatch de una acción que todavía no existe.

Creamos `src/actions/notesActions.js` y dentro la función `startAddNewNoteAction`

Vamos a Firebase a nuestra base de datos > Rules > `allow read, write: if request.auth != null`;

En `notesActions.js` creamos una función que se va a disparar cuando `startAddNewNoteAction` termine, esta función retorna un
objeto con un `type` que añadimos a `types.js`

Vamos a `notesReducer.js` y añadimos el case


## Cargar notas de Firestore

Creamos `src/helpers/loadNotes.js` y dentro la función `loadNotes` que retorna las notas del usuario

Ahora en `AppRouter.js` que es el primer lugar donde conocemos el `uid` disparamos `loadNotes`

Creamos una nueva Acción en `notesActions.js`

Vamos a `notesReducer.js` y añadimos el case y en `AppRouter.js` llamamos la acción con dispatch.

Vamos a refactorizar metiendo `loadNotes` en una Acción, en `notesActions.js` creamos la Acción `startLoadNotesAction`


## Pintar notas en Sidebar

Vamos a `JournalEntries.js` leemos del Store y almacenamos las notas en un arreglo, pasamos las props a <JournalEntry />

instalamos `moment.js` > `npm install moment --save` y lo usamos para la fecha


## Activar una nota para su edición

En `JournalEntry.js` creamos un handler para manejar el click de una nota, usamos `activeNoteStoreAction` para setear active
con el objeto clicado

En `noteScreen.js` y en `NotesAppBar.js` leemos del Store y pintamos los datos


## Cambiar la vista de la nota al cambiar la selección

La vista cambia sólo la primera vez, sin embargo el state de active sí cambia. Usamos useEffect, para evitar causar un
ciclo infinito vamos a `useForm.js` y en la función `reset` añadimos un argumento.

En `noteScreen.js` añadimos un `useEffect` que usa `reset` si la nota ha cambiado y otro `useEffect` que actualiza el
State de active según vamos escribiendo.


## Update de nota actual en Firebase

En `notesActions.js` creamos una nueva Acción `startSaveNoteAction`, en `NotesAppBar.js` manjeamos el click de save y hacemos
el dispatch de la Acción


## Actualizar el panel lateral

Al guardar en Firebase no se actualiza la nota en el panel lateral. Podríamos recargar el panel lateral pero es mala
práctica, lo óptimo es recargar sólo la nota que ha cambiado del panel lateral.

Vamos a crear una nueva Acción que actualice únicamente la nota cambiada en el panel lateral y hacemos el dispatch
de ella al terminar de guardar en Firebase. Para ello basta con cambiar los datos de la nota en el Store en notes.

Al cambiar el State React reacciona y pinta el cambio

Después hay que ir a `notesReducer.js` y retornar el objeto del Store con la nota modificada


## Mensaje de grabación en base de datos

En `notesActions.js` al terminar de grabar en Firebase usamos `sweet alert 2`


## Cloudinary.com - Backend para subir imágenes

creamos una cuenta en `https://cloudinary.com/`

En settings > Upload > Add upload preset, cambiamos el nombre Upload preset name por lo que queramos pero lo vamos
a necesitar en la app, en Signing Mode ponemos Unsigned, todo el mundo puede subir, esto para desarrollo. Guardamos
y regresamos al Dashboard > Account Details > more

Copiamos API Base URL > Image upload y lo pegamos en Postman, es un POST, Body > form-data

Key > file tipo file - Value > escogemos una imagen
Key > upload_preset - Value > el Upload preset name que hayamos puesto

Presionamos send y de la respuesta obtenemos secure_url con la url a la imagen subida


## Subir imágenes a Cloudinary.com desde la app

Vamos a `NotesAppBar.js` manejamos el click con un handler que a su vez dispara otro handler de un campo oculto
para escoger la imagen, esto dispara una Acción que recibe el archivo como argumento.

Creamos la Acción asíncrona en `notesActions.js` como el código de la subida de imagen es largo lo vamos a modular
en un helper `src/helpers/fileUpload.js` este helper es una función asíncrona que recibe el archivo como argumento
y retorna la url de la imagen subida a Cloudinary.com


## Update en Firebase de la nota activa con la url

Reutilizamos la Acción `startSaveNoteAction` asegurándonos de que el objeto contiene la url


## Borrar una nota

Vamos a `NoteScreen.js` y creamos un botón de borrar, manejamos el click con un handler que hace el dispatch de una
nueva Acción `startDeleteNoteAction` que es una función asíncrona que borra la nota de Firebase.

Una vez finalizado el borrado en Firebase se dispara otra nueva Acción que borra la nota del Store


## Borrar todas las notas al logout

En `authActions.js` al hacer logout hacemos el dispatch de `deleteAllNoteStoreAction` Acción que creamos en `notesActions.js`
que purga notes y active del Store






# Pruebas Unitarias y de Integración

Las pruebas unitarias están enfocadas en pequeñas funcionalidades mientras las pruebas de integración están enfocadas en cómo reaccionan
varias piezas en conjunto, el proceso de las pruebas se conoce como **AAA**: Arrange, Act, Assert

1. Arrange, es cuando preparamos el estado inicial: iniciamos variables, importaciones necesarias, preparamos el ambiente del sujeto a probar
2. Act, aplicamos acciones o estímulos sobre el sujeto a probar: llamamos métodos, simulamos clicks
3. Assert, observamos el comportamiento resultante y afirmamos que los resultados son los esperados


## Instalaciones de paquetes y configuración del entorno de pruebas

Creamos `src/setupTests.js`

### Enzyme

Enzyme es una utilidad para probar componentes de React, fue desarrollado por AirBnB y ahora es mantenido por Facebook

Documentación: `https://enzymejs.github.io/enzyme/`

A fecha de hoy no hay Enzyme para React 17 oficial, hay una versión no oficial en beta pero que nos va a servir: 
`https://github.com/wojtekmaj/enzyme-adapter-react-17`

La instalamos > `npm install --save-dev enzyme @wojtekmaj/enzyme-adapter-react-17`

Lo importamos en `setupTests.js` según la documentación

### Snapshot

Ahora vamos a trabajar con Snapshot que toma una fotografía de lo que renderiza el componente en forma de datos y que son
almacenados en una carpeta autogenerada `_snapshots_`

Pero para poder trabajar con esos datos en Jest necesitamos instalar el paquete enzyme-to-json: `https://www.npmjs.com/package/enzyme-to-json`

> `npm install --save-dev enzyme-to-json`

Ahora en `setupTests.js` importamos createSerializer según la documentación


## Prueba de types.js

Creamos la carpeta `src/tests`

> `npm run test`

Vamos a evaluar que que el objeto `types` tiene todas las propiedades.

Creamos `src/tests/types/type.test.js` usamos el snippet `desc` ponemos la descripción y dentro usamos el snippet `test` con
la descripción de lo que se va a probar

Importamos el objeto `types` y comparamos


## Prueba de subir un archivo a Cloudinary.com y retornar la URL

Creamos `src/tests/helpers/fileUpload.test.js` probamos que nos retorne un string cuando funciona y null cuando falla

Para que no se vaya acumulando fotos en Cloudinary.com cada vez que ejecutamos las pruebas las vamos a borrar al
finalizar la prueba, necesitamos usar > `npm install cloudinary --save-dev` lo importamos y lo usamos según la documentación


## Prueba de authReducer

Creamos `src/tests/reducers/authReducer.test.js`


## Prueba de uiActions

Creamos `src/tests/actions/uiActions.test.js`. Comprobamos que todas las acciones funcionen. Todas son síncronas.


## Prueba de notesActions

Creamos `src/tests/actions/notesActions.test.js`. Vamos a probar acciones asíncronas.

Una gran ayuda para trabajar con pruebas de Redux es realizar un mock del Store de Redux `https://www.npmjs.com/package/redux-mock-store`

El mock Store creará un arreglo de Acciones despachadas

> `npm install redux-mock-store --save-dev`

Importamos y configuramos según la documentación. Creamos un mock del Store de Redux.

Para hacer pruebas con Firebase lo mejor es crear un copia de la base de datos sólo para pruebas.

En `firebase-config.js` vamos a crear otra configuración para testing

En cuanto realizamos la prueba se crea automáticamente la estructura de la base de datos con sus documnetos, colecciones y documentos


## Crear varibles de entorno

Documentación `https://create-react-app.dev/` > Docs > Building your app > Environment Variables

Creamos dos archivos uno para testing y otro para desarrollo, de ir a producción crearíamos un tercero

En la raíz de la app `.env.test` creamos variables de entorno que podemos leer con `process.env`

Debemos parar el proceso de testing y levantarlo de nuevo para ver las variables. Lo mismo para el servidor de desarrollo.
Las variables son siempre strings, se pueden parsear para convertir en número


## Pruebas en subida de archivos

Seguimos en `src/tests/actions/notesActions.test.js`. Vamos a probar acciones asíncronas.

Esta prueba es complicada y gran parte no funciona por incompatibilidades de versiones de paquetes


## Pruebas en Acciones de authActions

Creamos `src/tests/actions/authActions.test.js`


## Pruebas en LoginScreen

Creamos `src/tests/components/authentication/LoginScreen.test.js`


## Pruebas en RegisterScreen

Creamos `src/tests/components/authentication/RegisterScreen.test.js`


## Pruebas en AppRouter

Creamos `src/tests/routers/AppRouter.test.js`


## Pruebas en Sidebar

Creamos `src/tests/components/journal/Sidebar.test.js`

Probamos que el componente se muestra correctamente, para ello creamos un wrapper.

Necesitamos envolver <Sidebar /> con un <Provider> que necesita un `store`

Después comprobamos que startLogoutAction y startAddNewNoteAction son disparados, para ello hay que hacer un mock
de cada función


## Pruebas en NoteScreen

Creamos `src/tests/components/notes/NoteScreen.test.js`

Probamos que el componente se muestra correctamente, para ello creamos un wrapper.

Necesitamos envolver <NoteScreen /> con un <Provider> que necesita un `store`

Después comprobamos que activeNoteStoreAction se dispara, para ello hay que hacer un mock
de la función


## Pruebas en JournalEntry

Creamos `src/tests/components/journal/JournalEntry.test.js`







# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
