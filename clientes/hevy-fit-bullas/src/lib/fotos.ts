import type { ImageMetadata } from 'astro';
import type { Actividad } from './datos';

/* Fotos de cada sala. Las dos primeras salen en la portada; todas, en la página de la sala.
   Cuando lleguen más fotos, basta con añadirlas aquí. */
import heroReformer from '../../fotos/hero-reformer.jpg';
import cadillac from '../../fotos/cadillac.jpg';
import reformers from '../../fotos/reformers.jpg';
import pilatesDetalle2 from '../../fotos/pilates-detalle2.jpg';
import pilatesDetalle from '../../fotos/pilates-detalle.jpg';
import pilatesGrupo from '../../fotos/pilates-grupo.jpg';
import trainingSala from '../../fotos/training-sala.jpg'; // misma foto que fuerza-sala.jpg: va en Training Club por decisión del cliente
import recepcionIzquierda from '../../fotos/recepcion-izquierda.jpg';
import barreEstudio from '../../fotos/barre-estudio.jpg';
import lounge from '../../fotos/lounge.jpg';
import barreSala from '../../fotos/barre-sala.jpg';
import barreClase from '../../fotos/barre-clase.jpg';
import fachadaBarre from '../../fotos/fachada-barre.jpg';
import zonaFuerza from '../../fotos/zona-fuerza.jpg';
import gimnasio from '../../fotos/gimnasio.jpg';
import cardio from '../../fotos/cardio.jpg';
import fuerzaMujer from '../../fotos/fuerza-mujer.jpg';

export interface Foto { src: ImageMetadata; alt: string }

export const FOTOS: Record<Actividad['id'], Foto[]> = {
  pilates: [
    { src: heroReformer, alt: 'Fila de reformers de madera y cuero negro bajo lámparas cálidas en la sala de Pilates' },
    { src: cadillac, alt: 'Cadillac y wunda chair de madera junto a fotos antiguas de Joseph Pilates' },
    { src: reformers, alt: 'Reformers alineados frente al ventanal, con lámparas de madera encendidas' },
    { src: pilatesDetalle2, alt: 'Ejercicio sobre el spine corrector frente a la pared de listones con la silueta iluminada' },
    { src: pilatesDetalle, alt: 'Estiramiento en el reformer con las manos en la barra' },
    { src: pilatesGrupo, alt: 'Clase de Pilates en grupo sobre los reformers, con los brazos en alto' },
  ],
  training: [
    { src: trainingSala, alt: 'Sala de Training Club con barras y discos de colores, jardín vertical con el neón verde y tira LED azul' },
    { src: recepcionIzquierda, alt: 'Pizarra del Training Club con la rutina de la semana, kettlebells y sacos sobre el césped' },
  ],
  barre: [
    { src: barreEstudio, alt: 'Estudio de Barre con arcos iluminados en rosa y barras de madera' },
    { src: lounge, alt: 'Rincón de descanso con sillones claros bajo los arcos de luz violeta' },
    { src: barreSala, alt: 'Sala de Barre con luz violeta, barras y material de clase en el suelo' },
    { src: barreClase, alt: 'Clase de Barre frente al espejo, con la luz rosa de los arcos' },
    { src: fachadaBarre, alt: 'Fachada del estudio de Barre de noche, con el rótulo iluminado' },
  ],
  fuerza: [
    { src: zonaFuerza, alt: 'Barra olímpica con discos de colores sobre la plataforma de la sala de fuerza' },
    { src: gimnasio, alt: 'Mancuernas y máquinas de la sala de fuerza bajo el neón azul' },
    { src: cardio, alt: 'Cintas y bicicletas de la zona de cardio con luz azul' },
    { src: fuerzaMujer, alt: 'Sentadilla con barra en la plataforma, junto al jardín vertical' },
  ],
};
