---
sidebar: auto
---

# Componente NewTask.vue

## NewTask.vue

- En **components** crea el nuevo archivo **NewTask.vue**

```vue
<script setup lang="ts">
import type { Task } from "@/types";
import { nanoid } from "nanoid";

const emit = defineEmits<{
  (e: "add", payload: Task): void;
}>();

const focused = ref(false);
const title = ref("");

function createTask(e: Event) {
  if (title.value.trim()) {
    e.preventDefault();
    emit("add", {
      title: title.value.trim(),
      createdAt: new Date(),
      id: nanoid(),
    } as Task);
  }

  title.value = "";
}
</script>
<template>
  <div>
    <textarea
      v-model="title"
      @keydown.tab="createTask"
      @keyup.enter="createTask"
      class="focus:bg-white focus:shadow resize-none rounded w-full border-none bg-transparent p-2 cursor-pointer"
      :class="{
        'h-7': !focused,
        'h-20': focused,
      }"
      style="outline: none !important"
      @focus="focused = true"
      @blur="focused = false"
      :placeholder="!focused ? '+ Add A Card' : 'Enter a title for this card'"
    />
  </div>
</template>
```

## Modificar archivo TrelloBoardTask.vue

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

## Modificar el footer en pages/index.vue

```vue
 <footer>
  <NewTask @add="column.tasks.push($event)" />
</footer>
```

## Eliminar tarea

### TrelloBoardTask.vue

```vue
<script>
const emit = defineEmits<{
  (e: "delete", payload: ID): void;
}>();

const borrar = () => {
  if (focused.value) emit("delete", props.task.id);
}

const focused = ref(false);
onKeyStroke("Backspace", (e) => {
  if (focused.value) emit("delete", props.task.id);
});
</script>
```

### Modificar en pages/index.vue

```vue
<TrelloBoardTask
  :task="task"
  @delete="
    column.tasks = column.tasks.filter((t) => t.id !== $event)
  "
/>
```

### Añadir botón eliminar components/TrelloBoardTask.vue

Después de la etiqueta **span**

```vue
<div>
  <Remove class="ml-2" @click="borrar"/>
</div>
```



