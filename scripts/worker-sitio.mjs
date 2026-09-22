// Worker de una web en producción. Sirve dist/<cliente>/ como estáticos y, para los vídeos,
// atiende peticiones parciales (cabecera Range): sin ellas Chrome trata el vídeo como no
// desplazable y los recorridos con scroll dejan de funcionar. Los clips pesan pocos MB,
// así que se cortan en memoria.
// Es el gemelo de worker-demo.mjs; la única diferencia es que aquí no se marca noindex.
const ES_VIDEO = /\.(mp4|webm)$/i;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Un solo dominio manda (env.CANONICO): el resto redirige ahí, para no tener la
    // misma web en www y sin www. Se conservan la ruta y los parámetros.
    if (env.CANONICO && url.hostname !== env.CANONICO) {
      url.hostname = env.CANONICO;
      return Response.redirect(url.toString(), 301);
    }

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
    cabeceras.set('Cache-Control', 'public, max-age=86400');

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
