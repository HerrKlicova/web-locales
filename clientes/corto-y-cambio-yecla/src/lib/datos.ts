import fichaJson from '../../ficha.json';
import type { Ficha, Servicio } from '@plantilla/lib/ficha';
import { indicesDia, tramos } from '@plantilla/lib/horario';

export interface FichaCorto extends Ficha {
  /** Valoración y número de reseñas de su ficha de Google (23/09/2026). */
  valoracion: number;
  num_resenas: number;
  demo_token: string;
}

export const ficha = fichaJson as unknown as FichaCorto;

/** Su Instagram (ficha.notas). Se enlaza para pedir cita por mensaje, como dicen ellos. */
export const INSTAGRAM = 'https://www.instagram.com/cortoycambioyecla/';

/** Dominio del Worker de las demos: las etiquetas og:image de WhatsApp necesitan una URL absoluta. */
export const ORIGEN_DEMO = 'https://webs-locales-demo.webs-locales.workers.dev';

/** "+34 688 91 05 51" → "688 91 05 51", como se escribe un móvil en España. */
export function telefonoVisible(valor: string): string {
  return valor.replace(/^\+34\s*/, '');
}

/**
 * La carta en cuatro grupos (Color, Corte, Novias y eventos, Tratamientos y estética).
 * Cada servicio se busca por su nombre exacto en ficha.json: si se cambia allí y no aquí,
 * el build falla en vez de publicar un grupo a medias.
 */
const GRUPOS_BASE = [
  {
    id: 'color',
    titulo: 'Color',
    nota: 'Luz y dimensión, respetando siempre tu base natural.',
    servicios: ['Mechas: babylight, balayage, melting', 'Color y baño de color', 'Corrección de color'],
  },
  {
    id: 'corte',
    titulo: 'Corte',
    nota: 'Mujer, hombre y niños.',
    servicios: ['Corte de mujer', 'Corte de hombre', 'Corte infantil'],
  },
  {
    id: 'novias',
    titulo: 'Novias y eventos',
    nota: 'Peinado, maquillaje, mantilla y tocado.',
    servicios: ['Peinados y recogidos de evento', 'Novias: peinado y maquillaje', 'Mantillas y tocados'],
  },
  {
    id: 'tratamientos',
    titulo: 'Tratamientos y estética',
    nota: 'Keratina, reconstrucción y cuidado del pelo.',
    servicios: ['Keratina y alisado con reconstrucción', 'Tratamientos capilares', 'Estética'],
  },
] as const;

export interface Grupo {
  id: string;
  titulo: string;
  nota: string;
  servicios: Servicio[];
}

export const GRUPOS: Grupo[] = GRUPOS_BASE.map((g) => ({
  id: g.id,
  titulo: g.titulo,
  nota: g.nota,
  servicios: g.servicios.map((nombre) => {
    const s = ficha.servicios.find((x) => x.nombre === nombre);
    if (!s) throw new Error(`Servicio «${nombre}» no está en ficha.json`);
    return s;
  }),
}));

const sueltos = ficha.servicios.filter((s) => !GRUPOS.some((g) => g.servicios.includes(s)));
if (sueltos.length) {
  throw new Error(`Servicios de ficha.json sin grupo: ${sueltos.map((s) => s.nombre).join(', ')}`);
}

/**
 * Horario por día de la semana (0 = lunes) con sus tramos, para marcar «hoy» en el navegador.
 * Sale de ficha.horario: "Martes a jueves" → días 1, 2 y 3.
 */
export function horarioPorDia(): { fila: number; tramos: [string, string][] }[] {
  const dias = Array.from({ length: 7 }, () => ({ fila: -1, tramos: [] as [string, string][] }));
  ficha.horario.forEach((h, fila) => {
    for (const d of indicesDia(h.dias)) dias[d] = { fila, tramos: tramos(h.horas) };
  });
  return dias;
}
