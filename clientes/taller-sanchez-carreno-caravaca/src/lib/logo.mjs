// El logotipo de Sánchez Carreño, redibujado en vectorial a partir de su foto de perfil de
// Instagram (@carrenomotor.1988): una rueda roja en perspectiva con la banda de rodadura a la
// izquierda, y una llave fija y un destornillador cruzados que pasan por dentro de ella.
//
// Las medidas salen de la imagen original llevada a 1200 × 1200. La rueda es un cilindro: la
// misma elipse repetida de atrás adelante, y los surcos son arcos de esa elipse. Los huecos de las
// herramientas se pintan en negro, que es el fondo del logotipo: por eso va siempre sobre negro o
// como insignia (con su círculo). No lleva ids internos, así que se puede repetir en una página.
//
// Es un .mjs a propósito: lo usan la página (Logo.astro) y los scripts que generan el favicon y la
// imagen para compartir (fotos/logo/iconos.mjs), y así los tres salen del mismo dibujo.

export const ROJO = '#d2101a';

const f = (n) => +n.toFixed(1);
const E = { cy: 552, rx: 200, ry: 357 };
const ATRAS = 536;
const DELANTE = 666;
const H = { cx: 665, cy: 552, rx: 112, ry: 275 };
const xIzq = (cx, y) => cx - E.rx * Math.sqrt(Math.max(0, 1 - ((y - E.cy) / E.ry) ** 2));
const xDer = (cx, y) => cx + E.rx * Math.sqrt(Math.max(0, 1 - ((y - E.cy) / E.ry) ** 2));
const arcoIzq = (cx, y1, y2) => `M${f(xIzq(cx, y1))} ${y1}A${E.rx} ${E.ry} 0 0 0 ${f(xIzq(cx, y2))} ${y2}`;
const arcoDer = (cx, y1, y2) => `M${f(xDer(cx, y1))} ${y1}A${E.rx} ${E.ry} 0 0 1 ${f(xDer(cx, y2))} ${y2}`;
const hueco = `M${H.cx} ${H.cy - H.ry}A${H.rx} ${H.ry} 0 1 0 ${H.cx} ${H.cy + H.ry}A${H.rx} ${H.ry} 0 1 0 ${H.cx} ${H.cy - H.ry}Z`;
// La rueda entera (las dos elipses unidas por arriba y por abajo) menos el hueco.
const rueda = `M${ATRAS} ${E.cy - E.ry}A${E.rx} ${E.ry} 0 0 0 ${ATRAS} ${E.cy + E.ry}H${DELANTE}A${E.rx} ${E.ry} 0 0 0 ${DELANTE} ${E.cy - E.ry}Z${hueco}`;
// La parte a la izquierda del hueco (banda de rodadura y flanco): va por delante de las
// herramientas, que pasan por dentro de la rueda.
const tapa = `M${ATRAS} ${E.cy - E.ry}A${E.rx} ${E.ry} 0 0 0 ${ATRAS} ${E.cy + E.ry}H${H.cx}V${H.cy + H.ry}A${H.rx} ${H.ry} 0 0 1 ${H.cx} ${H.cy - H.ry}V${E.cy - E.ry}Z`;
const SURCOS = [
  { cx: 561, w: 21 },
  { cx: 596.5, w: 20 },
  { cx: 634.5, w: 25 },
  { cx: 676.5, w: 25 },
];

/** Encuadres: la insignia es la foto de perfil entera; la marca, solo el dibujo. */
export const VISTA = { insignia: '0 0 1200 1200', marca: '172 182 832 832' };

/** Solo el dibujo, sin <svg>: para meterlo dentro de otro SVG. */
export function logoDibujo({ insignia = false } = {}) {
  return [
    insignia ? '<circle cx="600" cy="600" r="600" fill="#000"/>' : '',
    `<path fill="${ROJO}" fill-rule="evenodd" d="${rueda}"/>`,
    `<path d="${arcoDer(632, 470, 700)}" fill="none" stroke="#000" stroke-width="7" stroke-linecap="round"/>`,
    // Destornillador: punta en gota, varilla, casquillo y mango.
    '<g transform="translate(300 270) rotate(46.5)"><g fill="#fff">',
    '<path d="M97 5C86-30 66-44 36-48 2-52-26-32-26-1c0 29 26 49 58 48 28-1 48-13 68-21L300 12V-8Z"/>',
    '<path d="M290-6 520-20V4L290 18Z"/>',
    '<rect x="505" y="-52" width="70" height="82" rx="10"/>',
    '<path d="M572-112c-12 0-12 214 0 214l68-2c15-12 15-30 22-43l218 27a101 101 0 0 0 0-202L662-82c-7-14-7-28-22-36Z"/>',
    '</g><g fill="#000">',
    '<path d="M-4-2c0-16 18-24 36-20 22 4 40 12 58 19-18 7-36 15-58 23-20 4-36-6-36-22Z"/>',
    '<rect x="518" y="-18" width="60" height="16"/>',
    '</g></g>',
    // Llave fija: anillo abajo a la izquierda, caña con dos colisos y boca abierta arriba.
    '<g transform="translate(300 870) rotate(-45)"><g fill="#fff">',
    '<circle cx="-15" cy="1" r="106"/>',
    '<path d="M40-55 630-61c30 0 20-67 115-68a131 131 0 0 1 0 262c-95-1-85-70-115-70L40 56Z"/>',
    '</g><g fill="#000">',
    '<circle cx="-15" cy="1" r="52"/>',
    '<rect x="318" y="-20" width="94" height="40" rx="20"/>',
    '<rect x="432" y="-20" width="104" height="40" rx="20"/>',
    '<path d="M738 1 752-24H900V26H752Z"/>',
    '</g></g>',
    `<path fill="${ROJO}" d="${tapa}"/>`,
    '<g fill="none" stroke="#000" stroke-linecap="round">',
    ...SURCOS.map((s) => `<path d="${arcoIzq(s.cx, 252, 868)}" stroke-width="${s.w}"/>`),
    '</g>',
  ].join('');
}

/** El <svg> completo. `alt` vacío = decorativo (el nombre ya está escrito al lado). */
export function logoSVG({ insignia = false, clase = '', alt = '' } = {}) {
  const a11y = alt ? `role="img" aria-label="${alt}"` : 'aria-hidden="true"';
  const cls = clase ? ` class="${clase}"` : '';
  return `<svg${cls} viewBox="${insignia ? VISTA.insignia : VISTA.marca}" xmlns="http://www.w3.org/2000/svg" ${a11y} focusable="false">${logoDibujo({ insignia })}</svg>`;
}
