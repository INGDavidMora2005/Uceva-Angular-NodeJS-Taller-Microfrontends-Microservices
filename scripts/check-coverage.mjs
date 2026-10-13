#!/usr/bin/env node
/**
 * Verificación de cobertura de los microfrontends del Taller 5.
 *
 * Ejecuta `npm run test:coverage` en cada proyecto Angular, extrae la fila
 * "All files" de la tabla de cobertura de Jest y muestra un resumen.
 *
 * Uso:
 *   node scripts/check-coverage.mjs            Ejecuta los tests de cobertura.
 *   node scripts/check-coverage.mjs --install  Ejecuta `npm ci` donde falte node_modules.
 *   node scripts/check-coverage.mjs --md       Imprime además la tabla en Markdown.
 *
 * Requiere Node 20 o superior. Solo usa módulos nativos de Node.
 */

import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/** Raíz del repo, calculada desde la ubicación de este script. */
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** Proyectos a verificar, relativos a la raíz del repo. */
const PROJECTS = [
  'Microfrontend-Users-Angular',
  'Microfrontend-Products-Angular',
  'Microfrontend-Orders-Angular',
  'Microfrontend-Courses-Angular',
  'Microfrontend-Events-Angular',
  'Client-Host-Angular',
];

/** Porcentaje mínimo exigido en cada métrica. */
const THRESHOLD = 90;

const args = process.argv.slice(2);
const INSTALL = args.includes('--install');
const MARKDOWN = args.includes('--md');

/**
 * @typedef {Object} Result
 * @property {string} name Nombre del proyecto.
 * @property {number|null} stmts % Stmts.
 * @property {number|null} branch % Branch.
 * @property {number|null} funcs % Funcs.
 * @property {number|null} lines % Lines.
 * @property {string} tests Resumen de tests (p. ej. "12/12").
 * @property {string} status Estado final del proyecto.
 * @property {boolean} failed Indica si el proyecto cuenta como fallido.
 */

/**
 * Ejecuta un comando npm en una carpeta y devuelve su salida combinada.
 * @param {string} command Comando completo a ejecutar.
 * @param {string} cwd Carpeta de trabajo.
 * @returns {{ code: number, output: string }} Código de salida y salida (stdout + stderr).
 */
function run(command, cwd) {
  const res = spawnSync(command, {
    cwd,
    shell: true,
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
    env: { ...process.env, CI: 'true', FORCE_COLOR: '0', NO_COLOR: '1' },
  });
  const output = `${res.stdout ?? ''}\n${res.stderr ?? ''}`.replace(/\x1b\[[0-9;]*m/g, '');
  return { code: res.status ?? 1, output };
}

/**
 * Extrae los porcentajes de la fila "All files" de la tabla de Jest.
 * @param {string} output Salida de Jest.
 * @returns {{ stmts: number, branch: number, funcs: number, lines: number } | null}
 */
function parseCoverage(output) {
  const row = output.split(/\r?\n/).find((l) => /^\s*All files\s*\|/.test(l));
  if (!row) return null;
  const [stmts, branch, funcs, lines] = row.split('|').slice(1, 5).map((c) => parseFloat(c.trim()));
  if ([stmts, branch, funcs, lines].some(Number.isNaN)) return null;
  return { stmts, branch, funcs, lines };
}

/**
 * Extrae el resumen "Tests: X passed, Y total" de la salida de Jest.
 * @param {string} output Salida de Jest.
 * @returns {{ passed: number, failed: number, total: number } | null}
 */
function parseTests(output) {
  const line = output.split(/\r?\n/).find((l) => /^\s*Tests:/.test(l));
  if (!line) return null;
  const num = (re) => Number(line.match(re)?.[1] ?? 0);
  return { passed: num(/(\d+) passed/), failed: num(/(\d+) failed/), total: num(/(\d+) total/) };
}

/**
 * Crea un resultado sin métricas (proyecto no ejecutado o con error previo).
 * @param {string} name Nombre del proyecto.
 * @param {string} status Estado a mostrar.
 * @param {boolean} failed Si cuenta como fallo.
 * @returns {Result}
 */
function emptyResult(name, status, failed) {
  return { name, stmts: null, branch: null, funcs: null, lines: null, tests: '-', status, failed };
}

/**
 * Verifica un proyecto: instala dependencias si corresponde y ejecuta la cobertura.
 * @param {string} name Nombre de la carpeta del proyecto.
 * @returns {Result}
 */
function checkProject(name) {
  const dir = join(ROOT, name);
  if (!existsSync(dir)) return emptyResult(name, 'NO EXISTE', false);
  if (!existsSync(join(dir, 'package.json'))) return emptyResult(name, 'SIN package.json', false);

  if (!existsSync(join(dir, 'node_modules'))) {
    if (!INSTALL) return emptyResult(name, 'SIN node_modules (ejecuta npm ci)', false);
    console.log(`  Instalando dependencias de ${name} (npm ci)...`);
    const install = run('npm ci', dir);
    if (install.code !== 0) {
      console.log(install.output.trim().split(/\r?\n/).slice(-15).join('\n'));
      return emptyResult(name, 'FALLA (npm ci)', true);
    }
  }

  console.log(`Probando ${name}...`);
  const { code, output } = run('npm run test:coverage', dir);
  const cov = parseCoverage(output);
  const tests = parseTests(output);

  const testsText = tests
    ? `${tests.passed}/${tests.total}${tests.failed ? ` (${tests.failed} fallidos)` : ''}`
    : '-';
  const metricsOk = cov !== null && Object.values(cov).every((v) => v >= THRESHOLD);
  const ok = code === 0 && metricsOk;

  let status = 'OK';
  if (!ok) {
    const reasons = [];
    if (code !== 0) reasons.push('tests fallidos');
    if (cov === null) reasons.push('sin tabla de cobertura');
    else if (!metricsOk) reasons.push(`cobertura < ${THRESHOLD}%`);
    status = `FALLA (${reasons.join(', ')})`;
  }

  return { name, ...(cov ?? { stmts: null, branch: null, funcs: null, lines: null }), tests: testsText, status, failed: !ok };
}

/**
 * Formatea un porcentaje para la tabla.
 * @param {number|null} value Porcentaje o null.
 * @returns {string}
 */
function pct(value) {
  return value === null ? '-' : `${value}%`;
}

/**
 * Convierte los resultados en filas de texto.
 * @param {Result[]} results Resultados de los proyectos.
 * @returns {string[][]} Encabezado + filas.
 */
function toRows(results) {
  return [
    ['Proyecto', 'Stmts', 'Branch', 'Funcs', 'Lines', 'Tests', 'Estado'],
    ...results.map((r) => [r.name, pct(r.stmts), pct(r.branch), pct(r.funcs), pct(r.lines), r.tests, r.status]),
  ];
}

/**
 * Imprime la tabla resumen alineada para la consola.
 * @param {string[][]} rows Encabezado + filas.
 */
function printTable(rows) {
  const widths = rows[0].map((_, i) => Math.max(...rows.map((r) => r[i].length)));
  const line = (r) => r.map((c, i) => c.padEnd(widths[i])).join(' | ');
  console.log(line(rows[0]));
  console.log(widths.map((w) => '-'.repeat(w)).join('-|-'));
  rows.slice(1).forEach((r) => console.log(line(r)));
}

/**
 * Imprime la tabla resumen en formato Markdown.
 * @param {string[][]} rows Encabezado + filas.
 */
function printMarkdown(rows) {
  const line = (r) => `| ${r.join(' | ')} |`;
  console.log(line(rows[0]));
  console.log(line(rows[0].map(() => '---')));
  rows.slice(1).forEach((r) => console.log(line(r)));
}

/** Punto de entrada. */
function main() {
  console.log(`Verificando cobertura (mínimo ${THRESHOLD}% en cada métrica)\n`);
  const results = PROJECTS.map(checkProject);
  const rows = toRows(results);

  console.log('\nResumen de cobertura\n');
  printTable(rows);

  if (MARKDOWN) {
    console.log('\nMarkdown\n');
    printMarkdown(rows);
  }

  const failed = results.filter((r) => r.failed);
  if (failed.length > 0) {
    console.log(`\n${failed.length} proyecto(s) con FALLA: ${failed.map((r) => r.name).join(', ')}`);
    process.exit(1);
  }
  console.log('\nTodos los proyectos existentes cumplen la cobertura mínima.');
}

main();
