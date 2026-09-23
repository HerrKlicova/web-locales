// Iconos de la web a partir del logotipo vectorial (src/lib/logo.mjs).
//   node fotos/logo/iconos.mjs
// Escribe public/favicon.svg (la marca sobre un cuadrado negro redondeado, que en la pestaña se
// lee mejor que el círculo entero) y public/apple-touch-icon.png (180 × 180, para cuando alguien
// guarda la web en la pantalla de inicio del móvil; iOS le redondea las esquinas solo).
// La imagen para compartir por WhatsApp (public/og.jpg) sale de og.html, en esta misma carpeta.
import { createRequire } from 'node:module';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { logoDibujo } from '../../src/lib/logo.mjs';

const AQUI = dirname(fileURLToPath(import.meta.url));
const PUBLICO = join(AQUI, '..', '..', 'public');
const sharp = createRequire(import.meta.url)('sharp');

// Favicon: el dibujo ocupa casi todo el cuadrado para que se reconozca a 16 px.
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="140 150 896 896"><rect x="140" y="150" width="896" height="896" rx="200" fill="#000"/>${logoDibujo()}</svg>`;
writeFileSync(join(PUBLICO, 'favicon.svg'), favicon);

// Icono de pantalla de inicio: con más aire alrededor.
const apple = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="60 70 1056 1056" width="180" height="180"><rect x="60" y="70" width="1056" height="1056" fill="#000"/>${logoDibujo()}</svg>`;
await sharp(Buffer.from(apple), { density: 300 }).resize(180, 180).png({ compressionLevel: 9 }).toFile(join(PUBLICO, 'apple-touch-icon.png'));
console.log('favicon.svg', favicon.length, 'bytes · apple-touch-icon.png');
