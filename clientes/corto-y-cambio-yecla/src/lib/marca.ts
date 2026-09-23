/**
 * El trazado de su C de cuatro trazos concéntricos, medido sobre su logo (no calcado):
 * viewBox 0 0 100 100, centro (50,50), radios al eje del trazo 44, 37, 30 y 22,6; grosor 3,2;
 * abertura de 70° centrada a la derecha (de −35° a +35°); extremos cortados en radial
 * (stroke-linecap butt). En «CC» la segunda C va desplazada 106 unidades.
 */
export const RADIOS = [44, 37, 30, 22.6];
export const GROSOR = 3.2;
export const DESPLAZAMIENTO_CC = 106;
const ABERTURA = 35; // grados a cada lado del eje horizontal derecho

const cos = Math.cos((ABERTURA * Math.PI) / 180);
const sin = Math.sin((ABERTURA * Math.PI) / 180);
const n = (v: number) => Number(v.toFixed(3));

/** Cada trazo va del extremo de abajo (+35°) al de arriba (−35°) por el lado largo, en el
 *  sentido de las agujas del reloj: 290° de arco (large-arc 1, sweep 1). */
function arco(cx: number, r: number): string {
  return `M${n(cx + r * cos)} ${n(50 + r * sin)}A${r} ${r} 0 1 1 ${n(cx + r * cos)} ${n(50 - r * sin)}`;
}

/** El atributo d de la C (o de las dos, «CC»). */
export function trazoC(doble = false): string {
  const centros = doble ? [50, 50 + DESPLAZAMIENTO_CC] : [50];
  return centros.flatMap((cx) => RADIOS.map((r) => arco(cx, r))).join('');
}
