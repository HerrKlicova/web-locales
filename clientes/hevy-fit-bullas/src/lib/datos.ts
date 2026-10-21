import type { Ficha, Resena, Servicio } from '@plantilla/lib/ficha';

/** Ficha de Hevy Fit: la ficha común más los datos propios de un gimnasio con varias actividades. */
export type Luz = 'ambar' | 'magenta' | 'azul' | 'verde';

export interface Actividad {
  id: 'pilates' | 'barre' | 'training' | 'fuerza';
  nombre: string;
  sala: string;
  luz: Luz;
  texto: string;
  tarifas: Servicio[];
}

/** Reseña de Google copiada tal cual; `idioma` si no está en español (para el atributo lang). */
export interface ResenaHevy extends Resena {
  idioma?: string;
}

export interface FichaHevy extends Ficha {
  resenas: ResenaHevy[];
  marca: string;
  telefono2: string;
  email: string;
  instagram: string;
  web_reservas: string;
  valoracion: number;
  num_resenas: number;
  matricula: string;
  titular: string;
  nif: string;
  apertura: string;
  experiencia_anios: number;
  superficie_m2: number;
  actividades: Actividad[];
}

/** Conector de Hevy Fit con Trainingym (Worker hevyfit-trainingym-mcp): formulario de inscripción y plazas de Pilates. */
export const CONECTOR = 'https://hevyfit-trainingym-mcp.webs-locales.workers.dev';

/* Horarios de clases. Índice de día: 0 = lunes … 4 = viernes.
   Cada fila es una franja; cada celda es null (no hay clase) o un grupo.
   Un grupo puede estar activo (punto verde: se entrena, puedes entrar) o inactivo
   (punto rojo: no está en marcha, pero se abre si hay gente interesada). */
export type Estado = 'activo' | 'inactivo';
/** `duracion` en minutos, si la clase no dura los 50 de siempre (Pilates Flash: 30). */
export type Celda = null | { nota?: string; estado?: Estado; duracion?: number };

export interface HorarioActividad {
  id: Actividad['id'];
  nombre: string;
  luz: Luz;
  aviso?: string;
  filas: { hora: string; dias: [Celda, Celda, Celda, Celda, Celda] }[];
}

/** Leyenda común de los tres horarios: el punto de cada clase dice si el grupo está en marcha. */
export const LEYENDA = {
  activo: 'Grupo activo: entrenando ahora mismo',
  inactivo: 'Grupo inactivo: si hay interés, lo abrimos',
} as const;

const si: Celda = {};
const no: Celda = null;
/** Grupo parado: se puede abrir si se apunta gente. */
const off: Celda = { estado: 'inactivo' };
const flexOff: Celda = { nota: 'Pilates Flex', estado: 'inactivo' };
const sueloOff: Celda = { nota: 'Pilates suelo', estado: 'inactivo' };
/** Pilates Flash (novedad de octubre de 2026): clases de media hora, 7 plazas. */
const flash: Celda = { nota: 'Pilates Flash', duracion: 30 };

/** Novedad destacada en la portada. Se quita dejando `NOVEDAD = null`. */
export const NOVEDAD: null | {
  etiqueta: string;
  titulo: string;
  texto: string;
  detalles: string[];
  actividad: Actividad['id'];
  mensaje: string;
} = {
  etiqueta: 'Novedad',
  titulo: 'Pilates Flash',
  texto: 'Pilates en clases de media hora: todo el trabajo del método, en menos tiempo y a un precio más accesible.',
  detalles: ['Clases de 30 minutos', '2 días a la semana: 60 €/mes', 'Matrícula: 10 €', '7 plazas por grupo', 'Lunes y miércoles, 10:10', 'Martes y jueves, 16:00', 'Miércoles 20:30 y viernes 19:30'],
  actividad: 'pilates',
  mensaje: 'Hola, me interesa Pilates Flash. ¿Queda plaza?',
};

export const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'] as const;
export const DIAS_CORTOS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'] as const;

export const HORARIOS: HorarioActividad[] = [
  {
    id: 'pilates',
    nombre: 'Pilates',
    luz: 'ambar',
    filas: [
      { hora: '7:00', dias: [off, si, off, si, no] },
      { hora: '8:10', dias: [si, si, si, si, no] },
      { hora: '9:10', dias: [si, no, si, no, no] },
      { hora: '9:20', dias: [no, si, no, si, no] },
      { hora: '10:10', dias: [flash, no, flash, no, no] },
      { hora: '10:20', dias: [sueloOff, no, sueloOff, no, no] },
      { hora: '16:00', dias: [no, flash, no, flash, no] },
      { hora: '16:10', dias: [si, no, si, no, sueloOff] },
      { hora: '17:10', dias: [si, no, si, no, no] },
      { hora: '17:30', dias: [no, flexOff, no, flexOff, off] },
      { hora: '18:30', dias: [si, si, si, si, si] },
      { hora: '19:30', dias: [si, si, si, si, flash] },
      { hora: '20:30', dias: [si, si, flash, si, si] },
    ],
  },
  {
    id: 'barre',
    nombre: 'Barre',
    luz: 'magenta',
    filas: [
      { hora: '8:10', dias: [no, si, no, si, no] },
      { hora: '10:20', dias: [off, no, off, no, no] },
      { hora: '17:30', dias: [no, no, no, si, off] },
      { hora: '18:10', dias: [si, no, si, no, no] },
      { hora: '18:30', dias: [no, si, no, si, no] },
      { hora: '19:10', dias: [off, no, no, no, no] },
      { hora: '20:30', dias: [no, si, si, si, no] },
    ],
  },
  {
    id: 'training',
    nombre: 'Training Club',
    luz: 'azul',
    filas: [
      { hora: '7:05', dias: [si, no, si, no, no] },
      { hora: '8:05', dias: [off, si, off, si, no] },
      { hora: '9:20', dias: [no, si, no, si, no] },
      { hora: '16:30', dias: [no, no, no, no, off] },
      { hora: '17:30', dias: [no, no, no, no, off] },
      { hora: '18:30', dias: [si, no, si, no, si] },
      { hora: '19:30', dias: [si, si, si, si, no] },
      { hora: '20:30', dias: [si, si, si, si, no] },
    ],
  },
];
