// Servidor estático de pruebas para dist/: gzip para texto (como Cloudflare) y peticiones parciales para
// vídeo. Medir Lighthouse sin compresión infla el LCP.   node scripts/servir.mjs <carpeta> <puerto>
import http from 'node:http';
import { createReadStream, existsSync, statSync, readFileSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import zlib from 'node:zlib';

const [, , raiz = '.', puerto = '4341'] = process.argv;
const TIPOS = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.avif': 'image/avif', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png',
  '.woff2': 'font/woff2', '.mp4': 'video/mp4', '.txt': 'text/plain',
};
const TEXTO = new Set(['.html', '.css', '.js', '.json', '.svg', '.txt']);

http.createServer((req, res) => {
  let ruta = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let fichero = normalize(join(raiz, ruta));
  if (existsSync(fichero) && statSync(fichero).isDirectory()) fichero = join(fichero, 'index.html');
  if (!existsSync(fichero)) { res.writeHead(404); res.end('404'); return; }
  const ext = extname(fichero).toLowerCase();
  const tipo = TIPOS[ext] ?? 'application/octet-stream';
  const tam = statSync(fichero).size;
  const cabeceras = { 'Content-Type': tipo, 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' };
  if (ext === '.mp4') {
    cabeceras['Accept-Ranges'] = 'bytes';
    const m = /bytes=(\d*)-(\d*)/.exec(req.headers.range ?? '');
    if (m) {
      const ini = m[1] === '' ? tam - Number(m[2]) : Number(m[1]);
      const fin = m[1] !== '' && m[2] !== '' ? Math.min(Number(m[2]), tam - 1) : tam - 1;
      res.writeHead(206, { ...cabeceras, 'Content-Range': `bytes ${ini}-${fin}/${tam}`, 'Content-Length': fin - ini + 1 });
      createReadStream(fichero, { start: ini, end: fin }).pipe(res);
      return;
    }
  }
  if (TEXTO.has(ext) && /gzip/.test(req.headers['accept-encoding'] ?? '')) {
    const cuerpo = zlib.gzipSync(readFileSync(fichero), { level: 9 });
    res.writeHead(200, { ...cabeceras, 'Content-Encoding': 'gzip', 'Content-Length': cuerpo.length, Vary: 'Accept-Encoding' });
    res.end(cuerpo);
    return;
  }
  res.writeHead(200, { ...cabeceras, 'Content-Length': tam });
  createReadStream(fichero).pipe(res);
}).listen(Number(puerto), () => console.log(`Sirviendo ${raiz} en http://localhost:${puerto}`));
