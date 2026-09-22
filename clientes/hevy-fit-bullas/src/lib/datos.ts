import type { Ficha, Servicio } from '@plantilla/lib/ficha';

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

export interface FichaHevy extends Ficha {
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

/* Horarios de clases. Índice de día: 0 = lunes … 4 = viernes.
   Cada fila es una franja; cada celda es null (no hay clase) o una etiqueta corta.
   '' = clase sin nota. Las notas son las de los carteles del centro. */
export type Celda = null | { nota?: string; estado?: 'activo' | 'formacion' };

export interface HorarioActividad {
  id: Actividad['id'];
  nombre: string;
  luz: Luz;
  aviso?: string;
  leyenda?: { activo: string; formacion: string };
  filas: { hora: string; dias: [Celda, Celda, Celda, Celda, Celda] }[];
}

const si: Celda = {};
const no: Celda = null;
const ok: Celda = { estado: 'activo' };
const nuevo: Celda = { estado: 'formacion' };
const flex: Celda = { nota: 'Pilates Flex' };

export const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'] as const;
export const DIAS_CORTOS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'] as const;

export const HORARIOS: HorarioActividad[] = [
  {
    id: 'pilates',
    nombre: 'Pilates',
    luz: 'ambar',
    aviso: 'Pilates Flex es la modalidad nueva de este curso.',
    filas: [
      { hora: '7:00', dias: [si, si, si, si, no] },
      { hora: '8:10', dias: [si, si, si, si, no] },
      { hora: '9:10', dias: [si, si, si, si, no] },
      { hora: '10:20', dias: [flex, no, flex, no, no] },
      { hora: '16:10', dias: [si, si, si, si, si] },
      { hora: '17:30', dias: [si, flex, si, flex, si] },
      { hora: '18:30', dias: [si, si, si, si, si] },
      { hora: '19:30', dias: [si, si, si, si, si] },
      { hora: '20:30', dias: [si, si, si, si, si] },
    ],
  },
  {
    id: 'barre',
    nombre: 'Barre',
    luz: 'magenta',
    aviso: undefined,
    filas: [
      { hora: '8:00', dias: [no, si, no, si, no] },
      { hora: '10:20', dias: [si, no, si, no, no] },
      { hora: '17:10', dias: [{ nota: 'Junior' }, no, { nota: 'Junior' }, no, no] },
      { hora: '17:30', dias: [no, si, no, si, si] },
      { hora: '18:10', dias: [si, no, si, no, no] },
      { hora: '18:30', dias: [no, si, no, si, no] },
      { hora: '19:10', dias: [si, no, no, no, no] },
      { hora: '20:30', dias: [no, si, si, si, no] },
    ],
  },
  {
    id: 'training',
    nombre: 'Training Club',
    luz: 'azul',
    aviso: 'Temporada 26/27.',
    leyenda: { activo: 'Grupo en marcha, ya puedes venir', formacion: 'Grupo nuevo, se está llenando' },
    filas: [
      { hora: '7:05', dias: [ok, no, ok, no, no] },
      { hora: '8:05', dias: [nuevo, ok, nuevo, ok, no] },
      { hora: '9:20', dias: [ok, ok, nuevo, ok, no] },
      { hora: '16:30', dias: [no, no, no, no, nuevo] },
      { hora: '17:30', dias: [no, no, no, no, nuevo] },
      { hora: '18:30', dias: [ok, no, ok, no, ok] },
      { hora: '19:30', dias: [ok, ok, ok, ok, no] },
      { hora: '20:30', dias: [ok, ok, ok, ok, no] },
    ],
  },
];
