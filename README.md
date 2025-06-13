# Cinemark Perú Clone

Este es un clon del sitio web de **Cinemark Perú**, desarrollado con Next.js 14, React, Tailwind CSS y TypeScript. La aplicación incluye funcionalidades como cartelera actual, próximos estrenos, promociones, visualización por cines, filtros por formato e idioma, y ahora se ha integrado la API de Cinemark para obtener la **cartelera de películas**, **cines disponibles** y **sesiones** en tiempo real.

## Tecnologías Utilizadas

* [Next.js](https://nextjs.org/)
* [React 19](https://reactjs.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [TypeScript](https://www.typescriptlang.org/)
* [Shadcn/ui](https://ui.shadcn.com/)
* [Lucide Icons](https://lucide.dev/)
* [API Cinemark](https://api.cinemark-peru.com)

## Actualización 12/06/2024

Hoy se integraron los siguientes componentes de la **API de Cinemark**:

* **Películas**: Se cargan las películas actualmente en cartelera desde la API.
* **Cines**: Obtención de la lista de cines disponibles y su información (dirección, servicios, horarios, etc.).
* **Cartelera**: Visualización dinámica de la cartelera de películas y horarios por cine.

Con estas actualizaciones, ahora es posible visualizar los cines y las películas de manera dinámica, con filtros por formato, idioma y fechas disponibles.

## Instalación y ejecución

1. Clona el repositorio:

```bash
git clone https://github.com/UltimateCosmic/cinemark-peru.git
cd cinemark-peru
```

2. Instala las dependencias:

```bash
pnpm install
# o
npm install
```

3. Ejecuta el servidor de desarrollo:

```bash
pnpm dev
# o
npm run dev
```

4. Abre el navegador en `http://localhost:3000`

---

## Estructura del Proyecto

* `components/` – Componentes reutilizables y UI.
* `hooks/` – Hooks personalizados como `usePeliculas` y `useCines`.
* `public/data/` – Archivos `.json` para cines, cartelera y promociones.
* `app/` o `pages/` – Rutas de la aplicación (dependiendo de si usas App Router).
* `styles/` – Archivos CSS globales y de Tailwind.

## Funcionalidades

* Filtro por cine, formato e idioma.
* Horarios dinámicos por película y cine.
* Visualización de promociones y próximos estrenos.
* UI moderna, responsiva y accesible.
* **Integración de la API de Cinemark**: Ahora se cargan los datos de la cartelera y cines de manera dinámica desde la API de Cinemark.
* **Cartelera interactiva**: Los usuarios pueden ver las películas en cartelera con filtros de formato e idioma, y acceder a los horarios disponibles de cada cine.

---

## Licencia

MIT © 2025 Johan Carlo Amador Egoavil
