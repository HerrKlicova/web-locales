#!/usr/bin/env node
// Construye la demo de un cliente y la despliega en Cloudflare (Workers con estáticos, §9).
//   node scripts/demo.mjs <slug>            → construye y despliega
//   node scripts/demo.mjs <slug> --solo-build
//
// Un solo Worker de estáticos (wrangler.jsonc, nombre PROYECTO) sirve todas las demos bajo
// /<slug>-<token>/. Cada despliegue sube dist/demo/ entero, así que se reconstruyen todas las
// demos que tengan demo_token en su ficha para no borrar las anteriores.

import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';

const PROYECTO = 'webs-locales-demo';
const [slug, ...flags] = process.argv.slice(2);
const soloBuild = flags.includes('--solo-build');

if (!slug) {
  console.error('Uso: node scripts/demo.mjs <slug> [--solo-build]');
  process.exit(1);
}

function ficha(s) {
  return JSON.parse(readFileSync(`clientes/${s}/ficha.json`, 'utf8'));
}

const clientes = readdirSync('clientes', { withFileTypes: true })
  .filter((d) => d.isDirectory() && existsSync(`clientes/${d.name}/ficha.json`))
  .map((d) => d.name)
  .filter((s) => ficha(s).demo_token);

if (!clientes.includes(slug)) {
  console.error(`clientes/${slug}/ficha.json no existe o no tiene demo_token.`);
  process.exit(1);
}

rmSync('dist/demo', { recursive: true, force: true });
mkdirSync('dist/demo', { recursive: true });

for (const s of clientes) {
  console.log(`\n▶ Construyendo demo de ${s}`);
  execSync('npx astro build', { stdio: 'inherit', env: { ...process.env, CLIENTE: s, DEMO: 'true', PRODUCCION: '' } });
}

// Cabecera noindex para todo el proyecto de demos y sin listado en la raíz.
writeFileSync('dist/demo/_headers', '/*\n  X-Robots-Tag: noindex, nofollow\n  Cache-Control: no-store\n');
writeFileSync('dist/demo/index.html', '<!doctype html><meta charset="utf-8"><title>Demo</title>');

const rutas = clientes.map((s) => `/${s}-${ficha(s).demo_token}/`);
console.log('\nRutas de demo:', rutas.join('  '));

if (soloBuild) process.exit(0);

console.log(`\n▶ Desplegando dist/demo como Worker ${PROYECTO}`);
const salida = execSync('npx wrangler deploy', { encoding: 'utf8', stdio: ['inherit', 'pipe', 'inherit'] });
process.stdout.write(salida);
const dominio = salida.match(/https:\/\/\S+workers\.dev/)?.[0] ?? `https://${PROYECTO}.<subdominio>.workers.dev`;

console.log(`\nDemo de ${slug}: ${dominio}/${slug}-${ficha(slug).demo_token}/`);
