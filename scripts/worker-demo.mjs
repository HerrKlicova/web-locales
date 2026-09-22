// Worker de las demos. Sirve dist/demo/ como estáticos y, para los vídeos, atiende peticiones parciales
// (cabecera Range): sin ellas, Chrome trata el vídeo como no desplazable y no deja moverse por él
// (los recorridos con scroll dependen de eso). Los clips pesan pocos MB, así que se cortan en memoria.
const ES_VIDEO = /\.(mp4|webm)$/i;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (!ES_VIDEO.test(url.pathname) || (request.method !== 'GET' && request.method !== 'HEAD')) {
      return env.ASSETS.fetch(request);
    }

    const origen = await env.ASSETS.fetch(new Request(url, { method: 'GET' }));
    if (!origen.ok) return origen;
    const datos = await origen.arrayBuffer();
    const total = datos.byteLength;

    const cabeceras = new Headers();
    cabeceras.set('Content-Type', url.pathname.endsWith('.webm') ? 'video/webm' : 'video/mp4');
    cabeceras.set('Accept-Ranges', 'bytes');
    cabeceras.set('Cache-Control', 'public, max-age=3600');
    cabeceras.set('X-Robots-Tag', 'noindex, nofollow');

    const rango = request.headers.get('Range');
    const m = rango && /^bytes=(\d*)-(\d*)$/.exec(rango.trim());
    if (!m) {
      cabeceras.set('Content-Length', String(total));
      return new Response(request.method === 'HEAD' ? null : datos, { status: 200, headers: cabeceras });
    }

    let inicio;
    let fin;
    if (m[1] === '') {
      // bytes=-N: los últimos N bytes
      inicio = Math.max(0, total - Number(m[2]));
      fin = total - 1;
    } else {
      inicio = Number(m[1]);
      fin = m[2] === '' ? total - 1 : Math.min(Number(m[2]), total - 1);
    }
    if (inicio >= total || inicio > fin) {
      cabeceras.set('Content-Range', `bytes */${total}`);
      return new Response(null, { status: 416, headers: cabeceras });
    }
    cabeceras.set('Content-Range', `bytes ${inicio}-${fin}/${total}`);
    cabeceras.set('Content-Length', String(fin - inicio + 1));
    return new Response(request.method === 'HEAD' ? null : datos.slice(inicio, fin + 1), { status: 206, headers: cabeceras });
  },
};
