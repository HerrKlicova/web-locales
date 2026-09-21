const ORDEN = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
const INGLES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function normaliza(d: string) {
  return d.toLowerCase().replace('miercoles', 'miércoles').replace('sabado', 'sábado').trim();
}

/** "Martes a viernes" → [1,2,3,4]; "Lunes" → [0]; "Lunes y miércoles" → [0,2]. Índice 0 = lunes. */
export function indicesDia(texto: string): number[] {
  const t = normaliza(texto);
  const rango = t.match(/^(\S+)\s+a\s+(\S+)$/);
  if (rango) {
    const i = ORDEN.indexOf(rango[1]);
    const j = ORDEN.indexOf(rango[2]);
    if (i >= 0 && j >= i) return ORDEN.slice(i, j + 1).map((_, k) => i + k);
  }
  return t
    .split(/\s*(?:,|\sy\s)\s*/)
    .map((d) => ORDEN.indexOf(d.trim()))
    .filter((i) => i >= 0);
}

/** Nombres en inglés para schema.org (dayOfWeek). */
export function diasSchema(texto: string): string[] {
  return indicesDia(texto).map((i) => INGLES[i]);
}

/** "9:30–14:00 y 17:00–20:30" → [["09:30","14:00"],["17:00","20:30"]]. "Cerrado" → []. */
export function tramos(horas: string): [string, string][] {
  const out: [string, string][] = [];
  const re = /(\d{1,2})[:.](\d{2})\s*[–-]\s*(\d{1,2})[:.](\d{2})/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(horas)) !== null) {
    out.push([`${m[1].padStart(2, '0')}:${m[2]}`, `${m[3].padStart(2, '0')}:${m[4]}`]);
  }
  return out;
}
