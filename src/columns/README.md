---
sidebar: auto
---

# Columnas editables

## Añadir columna

### pages/index.vue

- Hacer el texto editable

A continuación de DragHandle

Añadimos el título de la columna

```vue
 <input
  class="title-input bg-transparent focus:bg-white rounded px-1 w-4/5"
  @keyup.enter="($event.target as HTMLInputElement).blur()"
  type="text"
  v-model="column.title"
/>
```

### Botón que añade una columna

Después de la etiqueta final draggable

```vue
<button
  @click="createColumn"
  class="bg-gray-200 whitespace-nowrap p-2 rounded opacity-50"
>
  + Add Another Column
</button>
```

### Añadir estilo en el primer div del template

```vue
<div class="flex items-start overflow-x-auto gap-4">

```

### Función crear nueva columna

- Creamos un objeto columna
  - Con un id generado automáticamente
  - Un título
- Ya tenemos el tipo de dato Column
- Añadimos el array de tareas
- Añadimos el nuevo valor de la columna al array de columnas con push()
- Luego añadimos código para que haga focus en la columna y añadamos un título



```ts
function createColumn() {
  const column: Column = {
    id: nanoid(),
    title: "",
    tasks: [],
  };
  columns.value.push(column);
  nextTick(() => {
    (
      document.querySelector(
        ".column:last-of-type .title-input"
      ) as HTMLInputElement
    ).focus();
  });
}
```

## Eliminar columna

### components/Remove.vue

Creamos el componente botón eliminar

```vue
<template>
  <div class="bg-white w-6 text-center">
    <i>
      <font-awesome-icon icon="fa-solid fa-remove" />
    </i>
  </div>
</template>
```

### Función eliminar columna

```ts
const remove = (idx) => {
  console.log("Columna ID: ", idx)
  columns.value = columns.value.filter((c) => c.id !== idx);
}
```

### Añadimos el botón

Después del input

```
 <Remove @click="remove(column.id)"/>
```

### Tecla eliminar columna

-  Ahora si pulsamos la tecla **retroceder espacio** selecionaremos la columna con el campo id y podremos eleminarla

Después de @keyup.enter

```vue
@keydown.backspace="
  column.title === ''
    ? (columns = columns.filter((c) => c.id !== column.id))
    : null
"
```
