import { esHueco, type Ficha } from './ficha';
import { diasSchema, tramos } from './horario';

/**
 * Schema LocalBusiness (o subtipo: BarberShop, Restaurant, AutoRepair…) a partir de la ficha.
 * Los huecos "[…]" no se incluyen: nunca se publica un dato inventado.
 */
export function schemaLocalBusiness(ficha: Ficha, url?: string, imagenes: string[] = []) {
  const openingHoursSpecification = ficha.horario.flatMap((h) => {
    const dias = diasSchema(h.dias);
    const t = tramos(h.horas);
    if (!dias.length || !t.length) return [];
    return t.map(([opens, closes]) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: dias,
      opens,
      closes,
    }));
  });

  const address: Record<string, string> = {
    '@type': 'PostalAddress',
    postalCode: ficha.cp,
    addressLocality: ficha.pueblo,
    addressRegion: 'Región de Murcia',
    addressCountry: 'ES',
  };
  if (!esHueco(ficha.direccion)) address.streetAddress = ficha.direccion;

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ficha.tipo || 'LocalBusiness',
    name: ficha.nombre,
    address,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: ficha.coordenadas[0],
      longitude: ficha.coordenadas[1],
    },
    areaServed: { '@type': 'City', name: ficha.pueblo },
    openingHoursSpecification,
    priceRange: '€',
  };
  if (url) schema.url = url;
  if (!esHueco(ficha.telefono)) schema.telephone = ficha.telefono;
  if (!esHueco(ficha.maps_url)) schema.hasMap = ficha.maps_url;
  if (imagenes.length) schema.image = imagenes;
  if (ficha.anio_apertura) schema.foundingDate = String(ficha.anio_apertura);
  return schema;
}
