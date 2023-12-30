---
sidebar: auto
---

# Datos

## TypeScript

Vamos a crear dos tipos de datos, uno para columnas con los campos:

- título
- id
- tarea

y otros para tarea:

- título
- id
- fecha de creación

### Carpeta types/index.ts

- Creemos una carpeta llamada **types**
- Creemos un archivo llamado **index.ts**

```ts
export type ID = string;

export interface Column {
    title: string;
    id: ID;
    task: Task[];
}

export interface Task {
    id: ID;
    title: string;
    createdAt: Date;
}
```

## app.vue NuxtPages

Redirigimos a la carpeta pages archivo index.vue

```vue
<NuxtPage />
```


## Carpeta pages/index.vue

Creamos la carpeta pages y el archivo index.vue

Introducimos el siguiente códico:

```vue
<script setup lang="ts">
import { ref } from "vue";
import type { Column } from "../types/index";

import { nanoid } from "nanoid";

const columns = ref<Column[]>([
    {
    id: nanoid(),
    title: "Columna 1",
    tasks: [
        {
        id: nanoid(),
        title: "Tarea 1",
        createdAt: new Date()
        },
         {
        id: nanoid(),
        title: "Tarea 2",
        createdAt: new Date()
        },
         {
        id: nanoid(),
        title: "Tarea 3",
        createdAt: new Date()
        }
    ]
    },
    {
    id: nanoid(),
    title: "Columna 2",
    tasks: []
    },
      {
    id: nanoid(),
    title: "Columna 3",
    tasks: []
    },
])

</script>

<template>
  <div>
    <div v-for="column in columns" :key="column.id">
      <header>
       {{ column.title}} 
      </header>
      <p v-for="task in column.tasks" :key="task.id">
        {{ task.title }}
      </p>
    </div>
  </div>  
</template>
```

## TailWind CSS 

Vamos a añadir ahora un poco de css para eso utilizaremos las clases de TailWind

### Carpeta pages/index.vue

- En **pages** archivo **index.vue**

```vue
<template>
  <div class="flex gap-4 overflow-x-auto items-start">
    <div v-for="column in columns" :key="column.id" 
    class="column bg-gray-200 p-5 rounded min-w-[250px]">
      <header>
       {{ column.title}} 
      </header>
      <p v-for="task in column.tasks" :key="task.id">
        {{ task.title }}
      </p>
    </div>
  </div>  
</template>
```

### App.vue

- En el archivo **App.vue**
- Modificamos:

```vue
<template>
<div class="p-5 bg-cyan-400 h-screen over-flow-auto">
    <NuxtPage />
  </div>
</template>
```