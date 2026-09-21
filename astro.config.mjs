// @ts-check
import { defineConfig } from 'astro/config';
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

export default defineConfig({
  output: 'static',
  srcDir: `./clientes/${cliente}/src`,
  publicDir: `./clientes/${cliente}/public`,
  outDir: rutaDemo ? `./dist/demo/${rutaDemo}` : `./dist/${cliente}`,
  base: rutaDemo ? `/${rutaDemo}` : '/',
  // Sin sitemap en demo (§9). Se añade la integración solo en producción.
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
