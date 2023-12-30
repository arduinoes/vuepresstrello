---
sidebar: auto
---

# Nuxt Trello Clon

## Introdución

Trello es una herramienta para el trabajo en equipo. 
Una lista de tareas. 
Igual ya te es  familiar.
Usa el método Kaban.
Método visual del flujo de trabajo.
Permite ver el progreso de diferentes tareas.
Puedes añadir nuevas columnas.
Reordenarlas, renombrarlas y añadir nuevas tareas.
En este curso vamos a construir una version mas simple
Vamos ha crear algo como esto.
Puedes añadir nuevas columnas.
Renombrar las que tienes.
Eliminar, recolocarlas y añadir nuevas tareas.
Arrastrar tareas entre diferentes columnas
O simplemente reordenarlas en la columna.
Al final tendremos un bonito panel de tareas Kaban o Trello

Vamos a utilizar la biblioteca Vue Draggable
Nos dota de  una fácil funcionalidad de arrastrar y soltar
Tu puedes hacer cosas como reordenar una lista
O arrastrar de una lista a otra una lista
Clonar o hacer una bonita transición.
En este caso trabajaremos con la biblioteca Sortable.JS
Usaremos vue Use.
Usaremos Tailwind CSS.

## Instalando Nuxt

Nuxt 3 [install](https://nuxt.com/docs/getting-started/installation)

Creo el proyecto con:
```
npx nuxi@latest init trello-tablero
```
![Instalar](../.vuepress/public/instalar.png)

- Contesto que si:
``` 
y
```

![Instalar](../.vuepress/public/npm.png)

- Elijo la opción:

```
npm
```
![Instalar](../.vuepress/public/participar.png)

- Contesto que no.

```
N
```
![Instalar](../.vuepress/public/carpeta.png)

- Selecciono la carpeta del proyecto.

- Ya lo puedo lanzar.

```
npm run dev
```

### Añadiendo módulos

- Vamos al archivo **nuxt.config.ts**.
Aquí podemos definir los módulos que vamos a utilizar.
No necesitamos el server side rendering **ssr: false**.

```ts
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules:[],
  ssr: false,
  
  devtools: { enabled: true }
})
```
## Tailwind 

- Vamos a instalar algunas dependencias para nuestro proyecto.
    - Usaremos Tailwind CSS
    - Usaremos VueDraggable
    - Usaremos nanoID
    - Usaremos Vue-Use
    
```
npm i -D @nuxtjs/tailwindcss
```

## VueDraggable 

```
npm i -S vuedraggable@next
```
## nanoID
```
npm i nanoid 
```
## Vue-Use
```
npm i @vueuse/nuxt
```
### Añadiendo módulos

- Vamos a registrar los modulos:

```
modules:["@nuxtjs/tailwindcss", "@vueuse/nuxt"],
```

## Font Awesome

```
npm i --save @fortawesome/vue-fontawesome@latest-3
```

```
npm i --save @fortawesome/fontawesome-svg-core
```

```
npm i --save @fortawesome/free-solid-svg-icons
```

### plugins/fontawesome.js

```js
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon, {})
})
```
### nuxt.config.ts

```ts
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
```

## Pinia

```
npm install pinia @pinia/nuxt
```

### nuxt.config.ts

```
  modules: [
    // ...
    '@pinia/nuxt',
  ],
```

## Firebase

```
npm install firebase
```

### Archivo firebase.ts

```ts
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCGak5QNXkTqerWSzlGk_ggpztV9d5nxH8",
  authDomain: "trello-93f5d.firebaseapp.com",
  databaseURL: "https://trello-93f5d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "trello-93f5d",
  storageBucket: "trello-93f5d.appspot.com",
  messagingSenderId: "635225529291",
  appId: "1:635225529291:web:48befb5e930751df0e744e",
  measurementId: "G-XPJD17ZPBC"
};

const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);

export { db };
```

- Los otros son dependencias que importaremos directamente cuando las necesitemos.

- Finalmente ejecutaremos la aplicación

```
npm run dev
```