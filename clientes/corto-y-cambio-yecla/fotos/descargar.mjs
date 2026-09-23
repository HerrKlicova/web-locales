#!/usr/bin/env node
// Trae de Higgsfield las fotos elegidas y las deja en esta carpeta con el nombre que usa la web,
// en JPEG de calidad alta (Astro saca de ahí los AVIF y WebP y el recorte 4:5 del móvil).
//
//   node clientes/corto-y-cambio-yecla/fotos/descargar.mjs
//
// Necesita acceso a los CDN de Higgsfield (d8j0ntlcm91z4.cloudfront.net para lo generado,
// d2ol7oe51mr4n9.cloudfront.net para lo subido). En la sesión de la nube del 23/09 estaban
// bloqueados: ejecutarlo en el Mac o en una sesión con esos dominios permitidos.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const DIR = fileURLToPath(new URL('.', import.meta.url));
const GENERADAS = 'https://d8j0ntlcm91z4.cloudfront.net/user_3JAuaMDVPdsAyTgWQOem3xzwisr/';

/** Las 8 variantes de la primera tanda (fotos/prompts.md). */
const VARIANTES = {
  'A-a': 'hf_20260923_151009_218f1ce3-652b-4f7b-9e33-a31dfb9460f7.png',
  'A-b': 'hf_20260923_151008_c2f6cc99-a040-48bf-b12b-02aab51f2ed5.png',
  'A-c': 'hf_20260923_151010_e7a4fe9a-ce47-409c-a279-806fbb9c4c00.png',
  'A-d': 'hf_20260923_151010_4675b377-dc6b-4f64-a210-d370c834b134.png',
  'D1-a': 'hf_20260923_151009_20851539-23bb-480f-90ee-ab5c1619c9da.png',
  'D1-b': 'hf_20260923_151009_f196ee5f-a127-425d-862b-33c3a0ecbd07.png',
  'D1-c': 'hf_20260923_151008_2c99a25e-0d40-4c48-8140-35616fa2a206.png',
  'D1-d': 'hf_20260923_151008_c5738f46-ca0c-4e5a-8d94-6d9ecd478c52.png',
};

/**
 * Qué foto va en cada archivo. Una clave de VARIANTES o una URL completa (la D2 compuesta, B, C
 * y D). null = todavía no hay foto elegida: se queda el hueco marcado que hay ahora.
 */
const ELEGIDAS = {
  'hero-16x9.jpg': null, // A-? — la elige Eugenio
  'comparador-despues.jpg': null, // D1-?
  'comparador-antes.jpg': null, // URL de la D2 final (compuesta sobre la D1 elegida)
  'color-mechas.jpg': null, // B
  'novia-recogido.jpg': null, // C
  'mantilla.jpg': null, // D
};

for (const [archivo, cual] of Object.entries(ELEGIDAS)) {
  if (!cual) {
    console.log(`· ${archivo}: sin elegir, se queda el hueco`);
    continue;
  }
  const url = cual.startsWith('http') ? cual : GENERADAS + VARIANTES[cual];
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${archivo}: ${r.status} al descargar ${url}`);
  const img = sharp(Buffer.from(await r.arrayBuffer()));
  const { width, height } = await img.metadata();
  await img.jpeg({ quality: 88, mozjpeg: true }).toFile(`${DIR}${archivo}`);
  console.log(`✓ ${archivo} ← ${cual} (${width}×${height})`);
}
