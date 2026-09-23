// Plano de situación del taller, dibujado a partir de las calles reales de OpenStreetMap.
//   node mapa/plano.mjs          (lee material/mapa/osm.json y escribe src/components/plano.json)
// Sale en negro, con las calles en gris, la carretera de Granada en blanco y el taller en rojo.
// Datos © colaboradores de OpenStreetMap (ODbL): la atribución va escrita debajo del plano.
//
// Para renovar los datos (Overpass, centrado entre el taller y el centro de Caravaca):
//   [out:json];(way["highway"~"^(motorway|motorway_link|trunk|trunk_link|primary|primary_link|
//   secondary|secondary_link|tertiary|tertiary_link|unclassified|residential|living_street|service|
//   pedestrian|road)$"](around:1500,38.101869,-1.863724);way["waterway"~"^(river|stream)$"]
//   (around:1600,38.101869,-1.863724););out geom tags;
import { readFileSync, writeFileSync } from 'node:fs';

const TALLER = [38.098276, -1.866577];          // ficha.json
const SANTUARIO = [38.1078568, -1.858501];      // Santuario de la Vera Cruz (OSM)
const LADO = 2000;                              // metros de lado del plano
const CENTRO = [250, -400];                     // centro del plano, en metros desde el taller (x este, y sur)
const R = 6378137;
const cosLat = Math.cos((TALLER[0] * Math.PI) / 180);
// Metros desde el taller → unidades del plano (0..LADO).
const proyectar = ([lat, lon]) => [
  ((lon - TALLER[1]) * Math.PI / 180) * R * cosLat - CENTRO[0] + LADO / 2,
  -((lat - TALLER[0]) * Math.PI / 180) * R - CENTRO[1] + LADO / 2,
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
function recortar(pts, m = 60) {
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
const CLASE = (t) => {
  const h = t.highway;
  if (t.waterway) return 'rio';
  if (/^(motorway|trunk)/.test(h)) return 'autovia';
  if (t.name === 'Carretera de Granada') return 'granada';
  if (/^(primary|secondary)/.test(h)) return 'principal';
  if (/^tertiary/.test(h)) return 'media';
  if (/^(service|pedestrian)$/.test(h)) return 'menor';
  return 'calle';
};
const osm = JSON.parse(readFileSync(new URL('../material/mapa/osm.json', import.meta.url), 'utf8'));
const capas = {};
for (const e of osm.elements) {
  if (!e.geometry) continue;
  const clase = CLASE(e.tags);
  const pts = e.geometry.map((g) => proyectar([g.lat, g.lon]));
  for (const tramo of recortar(pts)) {
    const s = simplificar(tramo, clase === 'rio' ? 4 : 2.2).map(([x, y]) => [Math.round(x), Math.round(y)]);
    (capas[clase] ??= []).push('M' + s.map((p) => p.join(' ')).join('L'));
  }
}
const [tx, ty] = proyectar(TALLER).map(Math.round);
const [sx, sy] = proyectar(SANTUARIO).map(Math.round);
const salida = {
  lado: LADO,
  taller: [tx, ty],
  santuario: [sx, sy],
  capas: Object.fromEntries(Object.entries(capas).map(([k, v]) => [k, v.join('')])),
};
writeFileSync(new URL('../src/components/plano.json', import.meta.url), JSON.stringify(salida));
const bytes = JSON.stringify(salida).length;
console.log('plano.json', bytes, 'bytes', Object.fromEntries(Object.entries(capas).map(([k, v]) => [k, v.join('').length])), 'taller', tx, ty, 'santuario', sx, sy);
