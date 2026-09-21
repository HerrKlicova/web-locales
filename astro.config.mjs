// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from "node:url";

// Cada web vive en clientes/<slug>/src. Se elige con la variable CLIENTE:
//   CLIENTE=barberia-argos-caravaca npm run dev
const cliente = process.env.CLIENTE;
if (!cliente) {
  throw new Error('Falta la variable CLIENTE. Ejemplo: CLIENTE=barberia-argos-caravaca npm run build');
}

export default defineConfig({
  output: 'static',
  srcDir: `./clientes/${cliente}/src`,
  publicDir: `./clientes/${cliente}/public`,
  outDir: `./dist/${cliente}`,
  // Sin sitemap en demo (§9). Se añade la integración solo en producción.
  build: { inlineStylesheets: 'always' },
  // PRODUCCION=true quita el noindex (§9). Se lee en la página como import.meta.env.PRODUCCION.
  vite: {
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
