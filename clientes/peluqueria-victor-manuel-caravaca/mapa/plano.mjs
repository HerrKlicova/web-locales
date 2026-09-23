// Plano de situación de la peluquería, dibujado a partir de las calles reales de OpenStreetMap.
//   node mapa/plano.mjs          (lee material/mapa/osm.json y escribe src/components/plano.json)
// Adaptado de taller-sanchez-carreno-caravaca/mapa/plano.mjs. Aquí sale en claro, con las calles
// en blanco, la avenida Juan Carlos I en azul noche y la peluquería marcada con su rótulo.
// Datos © colaboradores de OpenStreetMap (ODbL): la atribución va escrita debajo del plano.
//
// Para renovar los datos (Overpass, espejo que responde a curl: maps.mail.ru):
//   [out:json];(way["highway"~"^(motorway|motorway_link|trunk|trunk_link|primary|primary_link|
//   secondary|secondary_link|tertiary|tertiary_link|unclassified|residential|living_street|service|
//   pedestrian|road)$"](around:1100,38.104731,-1.863554);way["waterway"~"^(river|stream)$"]
//   (around:1200,38.104731,-1.863554););out geom tags;
import { readFileSync, writeFileSync } from 'node:fs';

const PELUQUERIA = [38.1024856, -1.8669787];   // ficha.json
const SANTUARIO = [38.1078568, -1.858501];     // Santuario de la Vera Cruz (OSM)
const LADO = 1400;                             // metros de lado del plano
const CENTRO = [300, -250];                    // centro del plano, en metros desde la peluquería (x este, y sur)
const R = 6378137;
const cosLat = Math.cos((PELUQUERIA[0] * Math.PI) / 180);
const proyectar = ([lat, lon]) => [
  ((lon - PELUQUERIA[1]) * Math.PI / 180) * R * cosLat - CENTRO[0] + LADO / 2,
  -((lat - PELUQUERIA[0]) * Math.PI / 180) * R - CENTRO[1] + LADO / 2,
];

// Douglas-Peucker para quitar puntos que no se ven.
function simplificar(pts, tol) {
  if (pts.length < 3) return pts;
  const [a, b] = [pts[0], pts.at(-1)];
  let max = 0, idx = 0;
  const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy) || 1;
  for (let i = 1; i < pts.length - 1; i++) {
    const d = Math.abs(dy * pts[i][0] - dx * pts[i][1] + b[0] * a[1] - b[1] * a[0]) / len;
    if (d > max) { max = d; idx = i; }
  }
  if (max <= tol) return [a, b];
  return [...simplificar(pts.slice(0, idx + 1), tol).slice(0, -1), ...simplificar(pts.slice(idx), tol)];
}
// Recorta una polilínea al cuadro (con margen), partiéndola donde sale.
function recortar(pts, m = 40) {
  const dentro = ([x, y]) => x > -m && y > -m && x < LADO + m && y < LADO + m;
  const tramos = [];
  let actual = [];
  for (const p of pts) {
    if (dentro(p)) actual.push(p);
    else { if (actual.length) { actual.push(p); tramos.push(actual); } actual = []; }
  }
  if (actual.length > 1) tramos.push(actual);
  return tramos.filter((t) => t.length > 1);
}
const AVENIDA = 'Avenida Juan Carlos I';
const CLASE = (t) => {
  const h = t.highway;
  if (t.waterway) return 'rio';
  if (t.name === AVENIDA) return 'avenida';
  if (/^(motorway|trunk|primary|secondary)/.test(h)) return 'principal';
  if (/^tertiary/.test(h)) return 'media';
  if (/^(service|pedestrian)$/.test(h)) return 'menor';
  return 'calle';
};

const osm = JSON.parse(readFileSync(new URL('../material/mapa/osm.json', import.meta.url), 'utf8'));
const capas = {};
const puntosAvenida = [];
for (const e of osm.elements) {
  if (!e.geometry) continue;
  const clase = CLASE(e.tags);
  const pts = e.geometry.map((g) => proyectar([g.lat, g.lon]));
  if (clase === 'avenida') puntosAvenida.push(...pts);
  for (const tramo of recortar(pts)) {
    const s = simplificar(tramo, clase === 'rio' ? 3 : 1.6).map(([x, y]) => [Math.round(x), Math.round(y)]);
    (capas[clase] ??= []).push('M' + s.map((p) => p.join(' ')).join('L'));
  }
}

// El rótulo de la avenida: a unos 260 m de la peluquería, siguiendo la dirección de la calle.
const [px, py] = proyectar(PELUQUERIA);
const cerca = puntosAvenida
  .map(([x, y]) => ({ x, y, d: Math.hypot(x - px, y - py) }))
  .filter((p) => p.d > 200 && p.d < 330 && p.x > 60 && p.x < LADO - 60 && p.y > 60 && p.y < LADO - 60)
  .sort((a, b) => Math.abs(a.d - 260) - Math.abs(b.d - 260));
let rotulo = null;
if (cerca.length) {
  const p = cerca[0];
  const vecino = puntosAvenida
    .filter(([x, y]) => Math.hypot(x - p.x, y - p.y) > 8 && Math.hypot(x - p.x, y - p.y) < 90)
    .sort((a, b) => Math.hypot(a[0] - p.x, a[1] - p.y) - Math.hypot(b[0] - p.x, b[1] - p.y))[0];
  let angulo = vecino ? (Math.atan2(vecino[1] - p.y, vecino[0] - p.x) * 180) / Math.PI : 0;
  if (angulo > 90) angulo -= 180;
  if (angulo < -90) angulo += 180;
  rotulo = { x: Math.round(p.x), y: Math.round(p.y), angulo: Math.round(angulo) };
}

const salida = {
  lado: LADO,
  peluqueria: [Math.round(px), Math.round(py)],
  santuario: proyectar(SANTUARIO).map(Math.round),
  avenida: rotulo,
  capas: Object.fromEntries(Object.entries(capas).map(([k, v]) => [k, v.join('')])),
};
writeFileSync(new URL('../src/components/plano.json', import.meta.url), JSON.stringify(salida));
console.log('plano.json', JSON.stringify(salida).length, 'bytes', Object.fromEntries(Object.entries(capas).map(([k, v]) => [k, v.join('').length])), 'peluquería', salida.peluqueria, 'santuario', salida.santuario, 'avenida', rotulo);
