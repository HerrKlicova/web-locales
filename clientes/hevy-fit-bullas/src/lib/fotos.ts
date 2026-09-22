import type { ImageMetadata } from 'astro';
import type { Actividad } from './datos';

/* Fotos de cada sala. Las dos primeras salen en la portada; todas, en la página de la sala.
   Las carpetas fotos/<tema>/ vienen del material enviado el 22/09/2026 (selección; los originales
   HEIC y los vídeos están en material/, fuera de git). Para añadir fotos, basta con sumarlas aquí. */
import heroReformer from '../../fotos/hero-reformer.jpg';
import cadillac from '../../fotos/cadillac.jpg';
import reformers from '../../fotos/reformers.jpg';
import pilatesDetalle2 from '../../fotos/pilates-detalle2.jpg';
import pilatesDetalle from '../../fotos/pilates-detalle.jpg';
import pilatesGrupo from '../../fotos/pilates-grupo.jpg';
import pilates02 from '../../fotos/pilates/pilates-02.jpg';
import pilates03 from '../../fotos/pilates/pilates-03.jpg';
import pilates05 from '../../fotos/pilates/pilates-05.jpg';
import pilates06 from '../../fotos/pilates/pilates-06.jpg';
import pilates07 from '../../fotos/pilates/pilates-07.jpg';
import pilates08 from '../../fotos/pilates/pilates-08.jpg';
import pilates10 from '../../fotos/pilates/pilates-10.jpg';
import pilates11 from '../../fotos/pilates/pilates-11.jpg';

import trainingSala from '../../fotos/training-sala.jpg'; // misma foto que fuerza-sala.jpg: va en Training Club por decisión del cliente
import recepcionIzquierda from '../../fotos/recepcion-izquierda.jpg';
import fuerza04 from '../../fotos/fuerza/fuerza-04.jpg';
import fuerza05 from '../../fotos/fuerza/fuerza-05.jpg';
import fuerza07 from '../../fotos/fuerza/fuerza-07.jpg';
import fuerza12 from '../../fotos/fuerza/fuerza-12.jpg';

import barreEstudio from '../../fotos/barre-estudio.jpg';
import lounge from '../../fotos/lounge.jpg';
import barreSala from '../../fotos/barre-sala.jpg';
import barreClase from '../../fotos/barre-clase.jpg';
import fachadaBarre from '../../fotos/fachada-barre.jpg';
import barre11 from '../../fotos/barre/barre-11.jpg';
import barre13 from '../../fotos/barre/barre-13.jpg';
import barre18 from '../../fotos/barre/barre-18.jpg';
import barre23 from '../../fotos/barre/barre-23.jpg';
import barre36 from '../../fotos/barre/barre-36.jpg';
import barre37 from '../../fotos/barre/barre-37.jpg';
import barre38 from '../../fotos/barre/barre-38.jpg';
import barre39 from '../../fotos/barre/barre-39.jpg';
import barre41 from '../../fotos/barre/barre-41.jpg';
import barre42 from '../../fotos/barre/barre-42.jpg';
import barre44 from '../../fotos/barre/barre-44.jpg';
import barre46 from '../../fotos/barre/barre-46.jpg';

import zonaFuerza from '../../fotos/zona-fuerza.jpg';
import gimnasio from '../../fotos/gimnasio.jpg';
import cardio from '../../fotos/cardio.jpg';
import fuerzaMujer from '../../fotos/fuerza-mujer.jpg';
import fuerza02 from '../../fotos/fuerza/fuerza-02.jpg';
import fuerza03 from '../../fotos/fuerza/fuerza-03.jpg';
import fuerza06 from '../../fotos/fuerza/fuerza-06.jpg';
import fuerza08 from '../../fotos/fuerza/fuerza-08.jpg';
import fuerza09 from '../../fotos/fuerza/fuerza-09.jpg';
import fuerza10 from '../../fotos/fuerza/fuerza-10.jpg';
import fuerza14 from '../../fotos/fuerza/fuerza-14.jpg';
import fuerza15 from '../../fotos/fuerza/fuerza-15.jpg';

import eventos01 from '../../fotos/eventos/eventos-01.jpg';
import eventos02 from '../../fotos/eventos/eventos-02.jpg';
import eventos03 from '../../fotos/eventos/eventos-03.jpg';
import eventos04 from '../../fotos/eventos/eventos-04.jpg';
import eventos05 from '../../fotos/eventos/eventos-05.jpg';
import eventos06 from '../../fotos/eventos/eventos-06.jpg';
import eventos07 from '../../fotos/eventos/eventos-07.jpg';
import eventos08 from '../../fotos/eventos/eventos-08.jpg';
import eventos09 from '../../fotos/eventos/eventos-09.jpg';
import eventos10 from '../../fotos/eventos/eventos-10.jpg';
import eventos11 from '../../fotos/eventos/eventos-11.jpg';
import eventos12 from '../../fotos/eventos/eventos-12.jpg';
import eventos13 from '../../fotos/eventos/eventos-13.jpg';
import eventos14 from '../../fotos/eventos/eventos-14.jpg';

export interface Foto { src: ImageMetadata; alt: string }

export const FOTOS: Record<Actividad['id'], Foto[]> = {
  pilates: [
    { src: heroReformer, alt: 'Fila de reformers de madera y cuero negro bajo lámparas cálidas en la sala de Pilates' },
    { src: cadillac, alt: 'Cadillac y wunda chair de madera junto a fotos antiguas de Joseph Pilates' },
    { src: pilates03, alt: 'Ejercicio invertido colgada del cadillac, con las piernas en alto' },
    { src: pilates07, alt: 'Ejercicio de brazos con pesas en el reformer, de perfil' },
    { src: pilates11, alt: 'Dos alumnas subiendo a las wunda chairs frente a la pared de listones' },
    { src: pilates05, alt: 'Alumnas tumbadas en los reformers durante una clase' },
    { src: pilates06, alt: 'Zancada sobre el reformer, vista desde atrás' },
    { src: pilates02, alt: 'Cadillac y reformer de madera con la pared de fotos antiguas al fondo' },
    { src: pilates08, alt: 'Lámparas de madera y reformers vistos entre las hojas de una palmera' },
    { src: pilatesDetalle2, alt: 'Ejercicio sobre el spine corrector frente a la pared de listones con la silueta iluminada' },
    { src: reformers, alt: 'Reformers alineados frente al ventanal, con lámparas de madera encendidas' },
    { src: pilatesDetalle, alt: 'Estiramiento en el reformer con las manos en la barra' },
    { src: pilates10, alt: 'Profesor de pie junto a los reformers durante una clase' },
    { src: pilatesGrupo, alt: 'Clase de Pilates en grupo sobre los reformers, con los brazos en alto' },
  ],
  training: [
    { src: trainingSala, alt: 'Sala de Training Club con barras y discos de colores, jardín vertical con el neón verde y tira LED azul' },
    { src: recepcionIzquierda, alt: 'Pizarra del Training Club con la rutina de la semana, kettlebells y sacos sobre el césped' },
    { src: fuerza12, alt: 'Clase en grupo con fitballs y mancuernas frente al jardín vertical' },
    { src: fuerza05, alt: 'Zancada con kettlebell sobre el césped, junto a los espejos redondos' },
    { src: fuerza04, alt: 'Grupo de entrenamiento chocando las manos al terminar la sesión' },
    { src: fuerza07, alt: 'Kettlebell amarilla en el suelo con el grupo en fila sobre el césped' },
  ],
  barre: [
    { src: barreEstudio, alt: 'Estudio de Barre con arcos iluminados en rosa y barras de madera' },
    { src: lounge, alt: 'Rincón de descanso con sillones claros bajo los arcos de luz violeta' },
    { src: barre39, alt: 'Clase de Barre en la barra frente a los arcos, con la luz blanca' },
    { src: barre44, alt: 'Alumna en la barra con el brazo en alto, con luz cálida' },
    { src: barre46, alt: 'Clase de Barre frente al espejo, con la luz rosa de los arcos' },
    { src: barre41, alt: 'Estiramiento en la barra bajo la luz magenta' },
    { src: barre18, alt: 'Estudio de Barre iluminado en magenta, con la barra y la palmera' },
    { src: barre23, alt: 'Estudio de Barre en violeta, vista desde la entrada' },
    { src: barre11, alt: 'Estudio de Barre con luz cálida, arcos y telas del techo' },
    { src: barre13, alt: 'Arcos del estudio de Barre con la luz ámbar' },
    { src: barre36, alt: 'Pared con las pelotas de Barre colgadas' },
    { src: barre37, alt: 'Cuadros de bailarinas en la pared del estudio' },
    { src: barre38, alt: 'Escalera y flores en el rincón de descanso del estudio' },
    { src: barre42, alt: 'Grupo de alumnas de Barre frente a los arcos al terminar la clase' },
    { src: barreSala, alt: 'Sala de Barre con luz violeta, barras y material de clase en el suelo' },
    { src: barreClase, alt: 'Clase de Barre frente al espejo, con la luz rosa de los arcos' },
    { src: fachadaBarre, alt: 'Fachada del estudio de Barre de noche, con el rótulo iluminado' },
  ],
  fuerza: [
    { src: zonaFuerza, alt: 'Barra olímpica con discos de colores sobre la plataforma de la sala de fuerza' },
    { src: fuerza02, alt: 'Sentadilla con barra en la plataforma, junto a las mancuernas' },
    { src: fuerza06, alt: 'Peso muerto con barra y discos verdes' },
    { src: fuerza14, alt: 'Sentadilla con kettlebell delante de la fila de kettlebells de colores' },
    { src: fuerza03, alt: 'Ejercicio de cadera en la polea' },
    { src: fuerza15, alt: 'Kettlebells de colores ordenadas en el suelo de la sala de fuerza' },
    { src: fuerza09, alt: 'Mancuernas y máquinas bajo la tira LED azul' },
    { src: fuerza10, alt: 'Máquinas de fuerza con la pantalla y el neón al fondo' },
    { src: fuerza08, alt: 'Máquina de piernas junto al césped' },
    { src: gimnasio, alt: 'Mancuernas y máquinas de la sala de fuerza bajo el neón azul' },
    { src: cardio, alt: 'Cintas y bicicletas de la zona de cardio con luz azul' },
    { src: fuerzaMujer, alt: 'Sentadilla con barra en la plataforma, junto al jardín vertical' },
  ],
};

/* Fotos de eventos: sin agrupar por evento hasta tener nombres y fechas. */
export const FOTOS_EVENTOS: Foto[] = [
  { src: eventos01, alt: 'Grupo de socios en una salida al campo, con flores y velas junto a una cruz' },
  { src: eventos03, alt: 'Mesa de la cena de socios con el grupo posando' },
  { src: eventos04, alt: 'Foto de grupo de la cena bajo las lámparas y las plantas colgantes' },
  { src: eventos02, alt: 'Mesa puesta en la cena, con copas y centros de flores' },
  { src: eventos08, alt: 'Taller en el estudio de Barre, con las mesas preparadas y las alumnas trabajando' },
  { src: eventos09, alt: 'Manos haciendo pulseras en el taller' },
  { src: eventos10, alt: 'Detalle de las manos con abalorios y flores en el taller' },
  { src: eventos05, alt: 'Materiales del taller sobre la mesa: abalorios, hilo y tijeras' },
  { src: eventos06, alt: 'Pizarra y flores en la mesa del taller del estudio de Barre' },
  { src: eventos07, alt: 'Desayuno del evento: bizcocho, zumos y fruta' },
  { src: eventos11, alt: 'Mesa de desayuno con fruta, bizcochos y zumos en el gimnasio' },
  { src: eventos13, alt: 'Entrenamiento en grupo al aire libre en una pista cubierta' },
  { src: eventos12, alt: 'Material de entrenamiento preparado sobre la pista al aire libre' },
  { src: eventos14, alt: 'Botellas y folletos de Hevy Fit preparados para un evento' },
];

/* Vídeos. `VIDEOS`: clip del marco izquierdo de cada sala (se reproduce `segundos` y luego el marco pasa a fotos).
   `BANDAS`: banda a todo el ancho al principio de la sala; con dos clips, el segundo se funde sobre el primero
   según se hace scroll (la luz se enciende). Rutas relativas a la base, en public/video/. */
export interface Clip { mp4: string; mp4Movil: string; poster: string; alt: string; segundos?: number }
export const VIDEOS: Partial<Record<Actividad['id'], Clip>> = {
  pilates: { mp4: 'video/pilates-clase-1080.mp4', mp4Movil: 'video/pilates-clase-720.mp4', poster: 'video/pilates-clase-poster.jpg', alt: 'Clase de Pilates en los reformers, vista lateral', segundos: 10 },
  barre: { mp4: 'video/barre-magenta-1080.mp4', mp4Movil: 'video/barre-magenta-720.mp4', poster: 'video/barre-magenta-poster.jpg', alt: 'Recorrido por el estudio de Barre con la luz magenta encendida', segundos: 12 },
};
export const BANDAS: Partial<Record<Actividad['id'], [Clip, Clip]>> = {
  barre: [
    { mp4: 'video/barre-calido-1080.mp4', mp4Movil: 'video/barre-calido-720.mp4', poster: 'video/barre-calido-poster.jpg', alt: 'Recorrido por el estudio de Barre con luz cálida' },
    { mp4: 'video/barre-magenta-1080.mp4', mp4Movil: 'video/barre-magenta-720.mp4', poster: 'video/barre-magenta-poster.jpg', alt: 'El mismo recorrido con la luz magenta encendida' },
  ],
};
