export interface Horario { dias: string; horas: string }
export interface Servicio { nombre: string; precio: string; nota?: string }
export interface Resena { texto: string; autor: string; estrellas: number }

export interface Ficha {
  slug: string;
  nombre: string;
  tipo: string;
  pueblo: string;
  direccion: string;
  cp: string;
  telefono: string;
  whatsapp: string;
  maps_url: string;
  coordenadas: [number, number];
  horario: Horario[];
  servicios: Servicio[];
  resenas: Resena[];
  anio_apertura: number | null;
  fotos_cedidas: boolean;
  direccion_visual?: string;
  notas?: string;
}

/** true si el dato es un hueco pendiente tipo "[TELÉFONO]" o está vacío. */
export function esHueco(valor: string | null | undefined): boolean {
  if (!valor) return true;
  return /^\[.*\]$/.test(valor.trim());
}

/** Solo dígitos, con prefijo 34 si falta, para enlaces wa.me y tel:. */
export function numeroInternacional(valor: string): string {
  const digitos = valor.replace(/\D/g, '');
  return digitos.startsWith('34') ? digitos : `34${digitos}`;
}

export function enlaceWhatsapp(ficha: Ficha, mensaje?: string): string {
  if (esHueco(ficha.whatsapp)) return '#contacto';
  const texto = mensaje ?? `Hola, quiero pedir cita en ${ficha.nombre}.`;
  return `https://wa.me/${numeroInternacional(ficha.whatsapp)}?text=${encodeURIComponent(texto)}`;
}

export function enlaceTelefono(ficha: Ficha): string {
  if (esHueco(ficha.telefono)) return '#contacto';
  return `tel:+${numeroInternacional(ficha.telefono)}`;
}

export function enlaceComoLlegar(ficha: Ficha): string {
  if (!esHueco(ficha.maps_url)) return ficha.maps_url;
  const [lat, lng] = ficha.coordenadas;
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

export function direccionCompleta(ficha: Ficha): string {
  const calle = esHueco(ficha.direccion) ? '[DIRECCIÓN]' : ficha.direccion;
  return `${calle}, ${ficha.cp} ${ficha.pueblo}`;
}
