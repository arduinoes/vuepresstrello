---
sidebar: auto
---

# Firebase

## Pinia

### stores/trello.ts

```ts
import { defineStore } from 'pinia';
import { collection, query, getDocs, orderBy,  doc, setDoc, Timestamp, updateDoc  } from "firebase/firestore";
import { db } from "../firebase";

export const useTrelloStore = defineStore({
  id: 'trello',
    state: () => {
      return {      
        columns: [],
        columnas: []
      }
  },
  getters: {

  },
  actions: {
    // Añadir datos
    async addArray() {
      const docData = { data: this.columns};
      await setDoc(doc(db, "trello", "columns"), docData);
    },
    // Añadir dato
    async addItem(title) {
    const docRef = await setDoc(doc(db, "trello", "Columns"), 
    {
      title: title,
     
      });
    },
    // Actualizar dato
    async updateItem() {   
      const columnRef = doc(db, 'columns', '4' );
      await updateDoc(columnRef, 
        { tasks: [
          {
          id: "1",
          title: "Tarea 2 Columna 4",
          createdAt: "20/12/2023"
          },
          {
          id: "2",
          title: "Tarea 2 Columna 4",
          createdAt: "20/12/2023"
          },
          {
          id: "3",
          title: "Tarea 3 Columna 4",
          createdAt: "20/12/2023"
          }
      ]
    });
      },
      // Obtener datos
    async getItems () {
      const column = query(collection(db, "trello"));
      this.columns = [];
      const queryColumnSnapshot = await getDocs(column);
      queryColumnSnapshot.forEach((doc) => {
        let item = doc.data();
        item.id = doc.id;
        this.columnas.push(item);
        console.log("Columnas: ", this.columnas);
      });  
      // Filtar datos    
      this.columns = this.columnas[0].data;
      console.log("Columns: ", this.columns);
    },
 
  }
});
```

### Importar datos

```ts
import { useTrelloStore } from '../stores/trello';
const trelloStore = useTrelloStore();
trelloStore.getItems();
```

### Nuevas funciones

```ts
const remove = (idx) => {
  console.log("Columna ID: ", idx)
  trelloStore.columns = trelloStore.columns.filter((c) => c.id !== idx);
}

function createColumn() {
  const column: Column = {
    id: nanoid(),
    title: "",
    tasks: [],
  };
  trelloStore.columns.push(column);
  nextTick(() => {
    (
      document.querySelector(
        ".column:last-of-type .title-input"
      ) as HTMLInputElement
    ).focus();
    console.log("Columnas: ", trelloStore.columns)
  });
}
```

### Nuevo template

```vue
<template>
  <div class="flex-wrap flex items-start overflow-x-auto gap-4">
    <draggable
      v-model="trelloStore.columns"
      group="columns"
      :animation="150"
      handle=".drag-handle"
      item-key="id"
      class="flex-wrap flex gap-4 items-start"
    >
      <template #item="{ element: column }:  { element: Column }">
        <div class="column bg-gray-200 p-5 rounded min-w-[250px]">
          <header class="justify-between flex font-bold mb-4 ">
            <drag-handle />
            <input
              class="title-input bg-transparent focus:bg-white rounded px-1 w-4/5"
              @keydown.enter="($event.target as HTMLInputElement).blur()"
              @keydown.escape="
                column.title === ''
                  ? (trelloStore.columns = trelloStore.columns.filter((c) => c.id !== column.id))
                  : null
              "
              type="text"
              v-model="column.title"
            />
            <Remove @click="remove(column.id)"/>
          </header>
          <draggable
            v-model="column.tasks"
            group="tasks"
            :animation="150"
            item-key="id">
            <template #item="{ element: task }: { element: Task }">
              <TrelloBoardTask
              :task="task"
              @delete="column.tasks = column.tasks.filter((t) => t.id !== $event)" 
              />
          </template>
          </draggable>   
          <footer>
            <NewTask @add="column.tasks.push($event)" />
          </footer>
        </div>
      </template>
    </draggable>
    <button
      @click="createColumn"
      class="bg-gray-200 whitespace-nowrap p-2 rounded opacity-50"
    >
      + Añadir columna
    </button>
    <!-- <RawDisplayer  :value="trelloStore.columns" title="List" /> -->
  </div>  
</template> 
```
  ### app.vue

```vue
<script setup>
import { useTrelloStore } from './stores/trello';
const trelloStore = useTrelloStore();

</script>

<template>
<div class="p-5 h-[100vh] bg-teal-600 over-flow-auto">  
    <h1 class="text-2xl text-white flex items-center mb-10">
    <button 
        type="button" 
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        v-on:click="trelloStore.addArray()"
        >Guardar
    </button>

    <img width="200" class="mr-3" src="/vue.png" alt="Vue.js-ES">
    Trello-Tablero
    </h1>
    <NuxtPage />
</div>
</template>
```