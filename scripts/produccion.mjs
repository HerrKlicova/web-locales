#!/usr/bin/env node
// Construye la web de un cliente para producción y la despliega en su dominio (§9).
//   node scripts/produccion.mjs <slug>              → construye y despliega
//   node scripts/produccion.mjs <slug> --solo-build
//
// A diferencia de la demo: sin noindex, con sitemap y robots.txt, y en el dominio del cliente.
// Cada cliente tiene su propio Worker, declarado en clientes/<slug>/wrangler.jsonc.

import { execSync } from 'node:child_process';
import { existsSync, readFileSync, rmSync } from 'node:fs';

const [slug, ...flags] = process.argv.slice(2);
const soloBuild = flags.includes('--solo-build');

if (!slug) {
  console.error('Uso: node scripts/produccion.mjs <slug> [--solo-build]');
  process.exit(1);
}
if (!existsSync(`clientes/${slug}/ficha.json`)) {
  console.error(`clientes/${slug}/ficha.json no existe.`);
  process.exit(1);
}

const ficha = JSON.parse(readFileSync(`clientes/${slug}/ficha.json`, 'utf8'));
if (!ficha.dominio) {
  console.error(`Falta "dominio" en clientes/${slug}/ficha.json (por ejemplo "https://ejemplo.es").`);
  process.exit(1);
}
if (!existsSync(`clientes/${slug}/wrangler.jsonc`)) {
  console.error(`Falta clientes/${slug}/wrangler.jsonc con el Worker y el dominio del cliente.`);
  process.exit(1);
}

console.log(`\n▶ Construyendo ${slug} para producción (${ficha.dominio})`);
rmSync(`dist/${slug}`, { recursive: true, force: true });
execSync('npx astro build', {
  stdio: 'inherit',
  env: { ...process.env, CLIENTE: slug, DEMO: '', PRODUCCION: 'true' },
});

// Las páginas de trabajo interno no se publican.
for (const pagina of ficha.paginas_internas ?? []) {
  rmSync(`dist/${slug}/${pagina}`, { recursive: true, force: true });
  console.log(`  fuera dist/${slug}/${pagina}/ (página interna)`);
}

// Comprobaciones antes de publicar: nada de noindex y sitemap presente (§9 y §11).
const portada = readFileSync(`dist/${slug}/index.html`, 'utf8');
if (/name="robots"[^>]*noindex/.test(portada)) {
  console.error('\n✗ La portada sigue con noindex. No se despliega.');
  process.exit(1);
}
for (const f of ['sitemap-index.xml', 'robots.txt']) {
  if (!existsSync(`dist/${slug}/${f}`)) {
    console.error(`\n✗ Falta ${f} en dist/${slug}. No se despliega.`);
    process.exit(1);
  }
}
console.log('\n✓ Sin noindex, con sitemap y robots.txt.');

if (soloBuild) {
  console.log(`\nConstruido en dist/${slug}/. Sin desplegar (--solo-build).`);
  process.exit(0);
}

execSync(`npx wrangler deploy --config clientes/${slug}/wrangler.jsonc`, { stdio: 'inherit' });
console.log(`\n${ficha.nombre} en producción: ${ficha.dominio}`);
