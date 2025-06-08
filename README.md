# Cinemark Perú Clone

Este es un clon del sitio web de **Cinemark Perú**, desarrollado con Next.js 14, React, Tailwind CSS y TypeScript. La aplicación incluye funcionalidades como cartelera actual, próximos estrenos, promociones, visualización por cines y filtros por formato e idioma.

## Tecnologías Utilizadas

- [Next.js](https://nextjs.org/)
- [React 19](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)

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

## Estructura del proyecto

- `components/` – Componentes reutilizables y UI.
- `hooks/` – Hooks personalizados como `usePeliculas` y `useCines`.
- `public/data/` – Archivos `.json` para cines, cartelera y promociones.
- `app/` o `pages/` – Rutas de la aplicación (dependiendo de si usas App Router).
- `styles/` – Archivos CSS globales y de Tailwind.

## Funcionalidades

- Filtro por cine, formato e idioma.
- Horarios dinámicos por película y cine.
- Visualización de promociones y próximos estrenos.
- UI moderna, responsiva y accesible.

---

## Licencia

MIT © 2025 Johan Carlo Amador Egoavil
