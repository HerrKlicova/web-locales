import fichaJson from '../../ficha.json';
import type { Ficha } from '@plantilla/lib/ficha';

/** Una especialidad de la columna. Sin precio: en este sector no se publican (DISEÑO §5). */
export interface Especialidad {
  nombre: string;
  /** Familia a la que pertenece: agrupa las once en seis bloques legibles. */
  zona: string;
  texto: string;
}

export interface ResenaGoogle {
  texto: string;
  autor: string;
  estrellas: number;
  fecha: string;
}

/** Un miembro del equipo. Vacío hasta que la clínica confirme nombres y papeles. */
export interface Miembro {
  nombre: string;
  papel: string;
  titulo?: string;
}

export interface FichaSalutem extends Omit<Ficha, 'servicios' | 'resenas'> {
  /** Nombre tal y como figura en su ficha de Google; va como alternateName en el schema (§7). */
  nombre_google: string;
  email: string;
  valoracion: number;
  num_resenas: number;
  experiencia_texto: string;
  servicios: Especialidad[];
  resenas: ResenaGoogle[];
  equipo: Miembro[];
  pendiente: string[];
}

export const ficha = fichaJson as unknown as FichaSalutem;

/** Las once vértebras, medidas sobre su logotipo. viewBox 0 0 120 280. No se redibujan. */
export const VERTEBRAS: [number, number, number][] = [
  [74, 21, 8.4],
  [50, 32, 10.4],
  [35, 53, 12.1],
  [29, 80, 11.6],
  [36, 110, 14.4],
  [60, 138, 20.4],
  [90, 163, 14.5],
  [97, 192, 11.8],
  [90, 220, 12.3],
  [69, 239, 10.7],
  [46, 252, 8.5],
];
