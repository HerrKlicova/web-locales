// Etalonaje en blanco y negro de las fotos y del vídeo del taller (23/09/2026).
//
// La web va con los tres colores de su logotipo: el negro del fondo, el blanco de las
// herramientas y el rojo de la rueda. Las fotos de Higgsfield traían el verde de los armarios y
// el óxido de la pared, que peleaban con ese rojo; aquí se pasan a blanco y negro con contraste,
// y solo sobreviven los rojos puros (pilotos, algún cajón), apagados.
//
//   node fotos/bn/etalonaje.mjs
// escribe material/bn.cube (LUT 3D para ffmpeg, la usa fotos/capo/procesar.sh --bn; va fuera de
// git porque se regenera) y las fotos en blanco y negro en fotos/bn/. Los originales en color no se tocan: para volver al color basta
// con importar otra vez fotos/*.jpg en la página.
import { createRequire } from 'node:module';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));

function tonoSaturacion(r, g, b) {
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min, l = (max + min) / 2;
  if (d === 0) return [0, 0];
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  const h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [h * 60, s];
}

/**
 * Blanco y negro «con filtro amarillo»: los verdes bajan y la chapa y la piel suben un poco.
 * Curva en S suave con el negro hundido y el blanco sin quemar. Los rojos puros (tono a menos de
 * 14° del rojo y saturación alta) conservan parte de su color.
 */
export function etalonar([r, g, b]) {
  const y0 = 0.36 * r + 0.54 * g + 0.1 * b;
  const x = clamp((y0 - 0.03) / 0.95);
  const s = x * x * (3 - 2 * x);
  const y = clamp(0.55 * s + 0.45 * x) ** 1.06;
  const [h, sat] = tonoSaturacion(r, g, b);
  const d = Math.min(Math.abs(h), Math.abs(360 - h));
  const w = clamp((14 - d) / 8) * clamp((sat - 0.42) / 0.2) * 0.75;
  if (w <= 0) return [y, y, y];
  const lr = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const k = lr > 0 ? y / lr : 1;
  const c = [r * k, g * k, b * k].map((v) => y + (clamp(v) - y) * 0.8);
  return [0, 1, 2].map((i) => y + (c[i] - y) * w);
}

const AQUI = dirname(fileURLToPath(import.meta.url));
const FOTOS = join(AQUI, '..');
// Las fotos que usa la web. Los fotogramas del capó no van aquí: salen del vídeo con la LUT
// (fotos/capo/procesar.sh --bn), para que casen con él fotograma a fotograma.
const LISTA = ['manos-motor', 'taller-hero', 'elevador', 'carro-herramienta', 'banco-trabajo', 'taller-nave'];

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  // LUT 3D de 33 puntos por canal. En el .cube el rojo es el índice que corre más rápido.
  const N = 33;
  const lineas = ['TITLE "Sanchez Carreno BN"', `LUT_3D_SIZE ${N}`, 'DOMAIN_MIN 0 0 0', 'DOMAIN_MAX 1 1 1'];
  for (let bi = 0; bi < N; bi++)
    for (let gi = 0; gi < N; gi++)
      for (let ri = 0; ri < N; ri++) {
        const o = etalonar([ri / (N - 1), gi / (N - 1), bi / (N - 1)]);
        lineas.push(o.map((v) => clamp(v).toFixed(5)).join(' '));
      }
  writeFileSync(join(FOTOS, '..', 'material', 'bn.cube'), lineas.join('\n') + '\n');
  console.log('material/bn.cube');

  const sharp = createRequire(import.meta.url)('sharp');
  for (const nombre of LISTA) {
    const { data, info } = await sharp(join(FOTOS, `${nombre}.jpg`)).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    const out = Buffer.alloc(data.length);
    for (let i = 0; i < data.length; i += 3) {
      const o = etalonar([data[i] / 255, data[i + 1] / 255, data[i + 2] / 255]);
      for (let k = 0; k < 3; k++) out[i + k] = Math.round(clamp(o[k]) * 255);
    }
    await sharp(out, { raw: info }).jpeg({ quality: 90, mozjpeg: true }).toFile(join(AQUI, `${nombre}.jpg`));
    console.log(`${nombre}.jpg`, info.width, '×', info.height);
  }
}
