---
sidebar: auto
---


## GitHub

### nuxt.config.ts

1. Especificar la baseURL en nuxt.config.ts

```ts
export default defineNuxtConfig({
  app: {
    baseURL: '/nuxt-github-pages/', // baseURL: '/<repositorio>/'
    buildAssetsDir: 'assets', // No uses guiones bajos "_" al inicio de carpetas
  }
})
```
2. Generate con  **npm run generate**
3. Crear un nuevo nuevo repositorio
4. Crear un nuevo branch llamado **gh-pages**
5. Crear un archivo en la propia página de github llamado **.nojekyll** en la raíz del proyecto
6. Subir el proyecto
7. Ir a pages y seleccionar **gh-pages** y **root**





