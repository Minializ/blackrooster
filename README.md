# Blackrooster

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Base de datos (Supabase)

La app usa [Supabase](https://supabase.com) para usuarios, productos e imágenes.

### 1. Crear proyecto en Supabase

1. Entra en [supabase.com](https://supabase.com) y crea un proyecto.
2. En **Settings → API** copia la **URL** y la **anon public** key.

### 2. Configurar variables de entorno

- En `src/environments/environment.ts` (desarrollo) y `src/environments/environment.prod.ts` (producción), sustituye:
  - `url`: la URL de tu proyecto (ej. `https://xxxx.supabase.co`).
  - `anonKey`: la anon key que copiaste.

### 3. Crear tabla y almacenamiento

En el **SQL Editor** de tu proyecto Supabase, ejecuta el contenido del archivo:

`supabase/migrations/001_products_and_storage.sql`

Ese script crea la tabla `products`, políticas RLS y el bucket `product-images` para las fotos.

### 4. Autenticación

- En el dashboard: **Authentication → Providers** y deja **Email** habilitado.
- El primer usuario se crea desde la app: clic en "Acceso administrador" → "Crear cuenta" y regístrate con tu correo y contraseña. Solo los usuarios autenticados pueden ver la sección de administración y agregar productos.

### Resumen

- **Usuarios**: Supabase Auth (email/contraseña). Solo usuarios logueados ven y usan la sección de administración.
- **Productos**: tabla `products` (nombre, descripción, precio, categoría, URL de imagen).
- **Imágenes**: subida de archivos al bucket `product-images` o uso de una URL externa al agregar producto.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
