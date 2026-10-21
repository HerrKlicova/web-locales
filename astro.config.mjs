// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Cada web vive en clientes/<slug>/src. Se elige con la variable CLIENTE:
//   CLIENTE=barberia-argos-caravaca npm run dev
const cliente = process.env.CLIENTE;
if (!cliente) {
  throw new Error('Falta la variable CLIENTE. Ejemplo: CLIENTE=barberia-argos-caravaca npm run build');
}

// DEMO=true: la web se sirve bajo /<slug>-<token> (URL no adivinable, §9) y sale en dist/demo/.
// El token vive en ficha.json (demo_token) para que la URL no cambie entre despliegues.
const demo = process.env.DEMO === 'true';
const ficha = JSON.parse(readFileSync(new URL(`./clientes/${cliente}/ficha.json`, import.meta.url), 'utf8'));
if (demo && !ficha.demo_token) {
  throw new Error(`Falta demo_token en clientes/${cliente}/ficha.json (6 caracteres aleatorios).`);
}
const rutaDemo = demo ? `${cliente}-${ficha.demo_token}` : null;

// PRODUCCION=true: la web se publica en el dominio del cliente, sin noindex y con sitemap (§9).
const produccion = process.env.PRODUCCION === 'true';
if (produccion && !ficha.dominio) {
  throw new Error(`Falta dominio en clientes/${cliente}/ficha.json (por ejemplo "https://ejemplo.es").`);
}
const internas = ficha.paginas_internas ?? [];
// Páginas que se publican pero no se anuncian (pruebas que el cliente mira desde el móvil): fuera del sitemap.
const ocultas = ficha.paginas_ocultas ?? [];

export default defineConfig({
  output: 'static',
  srcDir: `./clientes/${cliente}/src`,
  publicDir: `./clientes/${cliente}/public`,
  outDir: rutaDemo ? `./dist/demo/${rutaDemo}` : `./dist/${cliente}`,
  base: rutaDemo ? `/${rutaDemo}` : '/',
  site: produccion ? ficha.dominio : undefined,
  // Sin sitemap en demo (§9): la integración solo entra en producción. Las páginas de trabajo
  // interno (ficha.paginas_internas, p. ej. una versión antigua para comparar) se quedan fuera;
  // scripts/produccion.mjs además las borra de dist antes de publicar.
  integrations: produccion
    ? [sitemap({ filter: (url) => ![...internas, ...ocultas].some((p) => url.includes(`/${p}/`)) })]
    : [],
  build: { inlineStylesheets: 'always' },
  vite: {
    // PRODUCCION=true quita el noindex (§9). Se lee en la página como import.meta.env.PRODUCCION.
    define: { 'import.meta.env.PRODUCCION': JSON.stringify(process.env.PRODUCCION ?? '') },
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@plantilla': fileURLToPath(new URL('./plantilla', import.meta.url)),
        '@cliente': fileURLToPath(new URL(`./clientes/${cliente}`, import.meta.url)),
      },
    },
  },
});
