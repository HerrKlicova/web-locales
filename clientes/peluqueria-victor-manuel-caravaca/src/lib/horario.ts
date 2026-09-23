import { indicesDia, tramos } from '@plantilla/lib/horario';
import type { Ficha } from '@plantilla/lib/ficha';

/** "09:30" → 570 */
const aMinutos = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};
/** "09:30" → "9:30" */
export const hora = (hhmm: string) => hhmm.replace(/^0/, '');

/**
 * La semana en minutos, para calcular en el navegador si está abierto: siete listas (0 = lunes)
 * con los tramos [abre, cierra]. Sale tal cual del horario de la ficha.
 */
export function semanaEnMinutos(ficha: Ficha): [number, number][][] {
  const semana: [number, number][][] = Array.from({ length: 7 }, () => []);
  for (const h of ficha.horario) {
    const t = tramos(h.horas).map(([a, c]) => [aMinutos(a), aMinutos(c)] as [number, number]);
    for (const d of indicesDia(h.dias)) semana[d].push(...t);
  }
  return semana;
}

export interface Fila { dias: string; indices: number[]; manana: string | null; tarde: string | null }

/** Cada fila de la ficha partida en mañana y tarde, como el vinilo de la puerta de verdad. */
export function filasManianaTarde(ficha: Ficha): Fila[] {
  return ficha.horario.map((h) => {
    const t = tramos(h.horas);
    const manana = t.find(([a]) => aMinutos(a) < 14 * 60);
    const tarde = t.find(([a]) => aMinutos(a) >= 14 * 60);
    return {
      dias: h.dias,
      indices: indicesDia(h.dias),
      manana: manana ? `${hora(manana[0])} a ${hora(manana[1])}` : null,
      tarde: tarde ? `${hora(tarde[0])} a ${hora(tarde[1])}` : null,
    };
  });
}

/** Para el vinilo de la puerta: el día en una línea y las horas en la siguiente. */
export function horarioPuerta(ficha: Ficha): { dias: string; horas: string }[] {
  return ficha.horario.map((h) => {
    const t = tramos(h.horas);
    return { dias: h.dias, horas: t.length ? t.map(([a, c]) => `${hora(a)} a ${hora(c)}`).join(' y ') : 'Cerrado' };
  });
}
