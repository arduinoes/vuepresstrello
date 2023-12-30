---
sidebar: auto
---

# Draggable

## components/DragHandle.vue

```vue
<script setup lang="ts">

</script>

<template>
    <span class="drag-handle cursor-move pr-2">⣿</span>  
</template>
```
## components/RawDisplayer.vue

```vue
<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{
  title: string
  value: any
}>()

const valueString = computed(() => {
  return JSON.stringify(props.value, null, 2);})

</script>

<template>
  <div>
    <h3>{{ props.title }}</h3>
    <pre>{{ valueString }}</pre>
  </div>
</template>

<style scoped>
pre {
  text-align: start;
}
</style>
```

## Columnas

### Archivo pages/index.vue

- Importamos la dependencia **draggable**

```ts
import draggable from "vuedraggable"
```
### pages/index.vue

```vue
<template>
  <div>
     <draggable
      v-model="columns"
      group="columns"
      :animation="150"
      handle=".drag-handle"
      item-key="id"
      class="flex gap-4 items-start"
    >
      <template #item="{ element: column }:  { element: Column }">
        <div class="column bg-gray-200 p-5 rounded min-w-[250px]">
         <header class="justify-between flex font-bold mb-4 ">
            <drag-handle />
          {{ column.title}} 
          </header>
      <TrelloBoardTask v-for="task in column.tasks" 
      :key="task.id" 
      :task="task" />
      <footer>
        <button class="text-gray-500">+ Add a Card</button>
      </footer>
    </div>
    </template>
    </draggable>
  </div>  
</template>
```

### App.vue

Incluimos una imangen corporativa y un título de página.

- En el archivo **App.vue**
- Modificamos:

```vue
<template>
  <div class="p-5 h-[100vh] bg-teal-600 over-flow-auto">  
    <h1 class="text-2xl text-white flex items-center mb-10">
      <img width="200" class="mr-3" src="/vue.png" alt="Vue.js-ES">
      Trello-Tablero
    </h1>
   <NuxtPage />
  </div>
</template>
```
## Tareas

### components/TrelloBoardTask.vue

```vue
<script setup lang="ts">
import type { Task, ID } from "@/types";
const props = defineProps<{
  task: Task;
}>();

</script>
<template>
  <div
    :title="task.createdAt.toLocaleString()"
    class="flex justify-between"
    @focus="focused = true"
    @blur="focused = false"
    tabindex="0"
  >
    <DragHandle class="pr-2" />
    <div class="task bg-white p-2 mb-2 rounded shadow-sm w-full">
    <span class="h-60 w-60" >
      {{ task.title }}
    </span>
    </div>
    <div>
    <Remove class="ml-2" @click="borrar"/>
    </div>
    </div>
</template>
<style>
.sortable-drag .task {
  transform: rotate(5deg);
}

.sortable-ghost .task {
  position: relative;
}

.sortable-ghost .task::after {
  content: "";
  @apply absolute top-0 bottom-0 left-0 right-0 bg-slate-300 rounded;
}

.task:focus,
.task:focus-visible {
  @apply outline-gray-400 !important;
  outline: gray auto 1px;
}
</style>
```


### pages/index.vue

```vue
<template>
  <div >
    <draggable
      v-model="columns"
      group="columns"
      :animation="150"
      handle=".drag-handle"
      item-key="id"
      class="flex gap-4 items-start"
    >
      <template #item="{ element: column }:  { element: Column }">
        <div class="column bg-gray-200 p-5 rounded min-w-[250px]">
          <header class="justify-between flex font-bold mb-4 ">

            <drag-handle />
          {{ column.title}} 
          </header>
          <draggable
            v-model="column.tasks"
            group="tasks"
            :animation="150"
            item-key="id">
            <template #item="{ element: task }: { element: Task }">
              <TrelloBoardTask
              :task="task" 
              />
          </template>
          </draggable>   
          <footer>
            <button class="text-gray-500">+ Add a Card</button>
          </footer>
        </div>
      </template>
    </draggable> 
  </div>  
</template> 
```
 
### Clonar Tareas

```vue
<script>
import { useKeyModifier } from '@vueuse/core'


const shift = useKeyModifier('Shift', { initial: false })

console.log(shift.value)
</script>

<template>
  <div >
    <draggable
      v-model="columns"
      group="columns"
      :animation="150"
      handle=".drag-handle"
      item-key="id"
      class="flex gap-4 items-start"
    >
      <template #item="{ element: column }:  { element: Column }">
        <div class="column bg-gray-200 p-5 rounded min-w-[250px]">
          <header class="justify-between flex font-bold mb-4 ">
            <drag-handle />
          {{ column.title}} 
          </header>
          <draggable
            v-model="column.tasks"
            :group="{ name: 'tasks', pull: shift ? 'clone' : true }"
            :animation="150"
            handle=".drag-handle"
            item-key="id">
            <template #item="{ element: task }: { element: Task }">
              <TrelloBoardTask
              :task="task" 
              />
          </template>
          </draggable>   
          <footer>
            <button class="text-gray-500">+ Add a Card</button>
          </footer>
        </div>
      </template>
    </draggable> 
  </div>  
</template>

```


