# Cómo correr el proyecto Blackrooster

## Requisitos previos

- **Node.js** v18 o superior
- **npm** v10 o superior (incluido con Node.js)
- **Angular CLI** v21 (`npm install -g @angular/cli`)

## Instalación

1. Clona el repositorio:

   ```bash
   git clone <url-del-repositorio>
   cd blackrooster
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

## Variables de entorno (opcional)

El proyecto puede usar variables de entorno en tiempo de build. Para generarlas:

```bash
node scripts/generate-env.js
```

Esto crea `src/assets/env.js` con las variables definidas en el script. Puedes configurar `API_URL` como variable de entorno del sistema antes de ejecutar el script:

```bash
# Windows (PowerShell)
$env:API_URL = "https://tu-api.ejemplo.com"

# Linux / macOS
export API_URL="https://tu-api.ejemplo.com"
```

## Servidor de desarrollo

```bash
npm start
```

Esto ejecuta `ng serve`. Abre tu navegador en `http://localhost:4200/`. La app se recarga automáticamente al modificar archivos fuente.

## Build de producción

```bash
npm run build
```

Los artefactos se generan en `dist/Blackrooster/`.

## Server-Side Rendering (SSR)

Después de hacer build, puedes correr el servidor SSR:

```bash
npm run serve:ssr:Blackrooster
```

## Tests

```bash
npm test
```

Ejecuta los tests unitarios con Vitest.

## Despliegue en Netlify

El proyecto incluye un `netlify.toml` preconfigurado. Solo conecta el repositorio a Netlify y el build se ejecutará automáticamente con:

- **Comando de build:** `ng build`
- **Directorio de publicación:** `dist/Blackrooster/browser`

## Estructura del proyecto

| Carpeta / Archivo | Descripción |
|---|---|
| `src/app/` | Componentes, servicios y rutas de la aplicación |
| `src/app/core/` | Servicios centrales (auth, productos) |
| `src/app/components/` | Componentes UI (home, admin) |
| `src/environments/` | Configuración por entorno |
| `scripts/` | Scripts auxiliares de build |
| `supabase/migrations/` | Migraciones SQL para Supabase |
| `public/` | Archivos estáticos servidos directamente |
