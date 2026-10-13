# Scripts

## check-coverage.mjs

Verifica la cobertura de tests de los microfrontends y del host. En cada proyecto ejecuta `npm run test:coverage`, lee la fila `All files` de la tabla de Jest y comprueba que **% Stmts, % Branch, % Funcs y % Lines sean ≥ 90** y que no haya tests fallidos.

Proyectos revisados:

- Microfrontend-Users-Angular
- Microfrontend-Products-Angular
- Microfrontend-Orders-Angular
- Microfrontend-Courses-Angular
- Microfrontend-Events-Angular
- Client-Host-Angular

### Requisitos

- Node 20 o superior (no necesita dependencias propias, solo módulos nativos de Node).
- Dependencias instaladas en cada proyecto: ejecuta `npm ci` en cada carpeta o usa la opción `--install`.

### Uso

Desde la raíz del repo (funciona desde cualquier carpeta, en Windows y en Mac):

```bash
# Ejecuta la cobertura en los proyectos que ya tienen node_modules
node scripts/check-coverage.mjs

# Ejecuta npm ci en los proyectos que no tienen node_modules y luego los tests
node scripts/check-coverage.mjs --install

# Imprime además la tabla en Markdown para pegarla en el README o en un PR
node scripts/check-coverage.mjs --md

# Ambas opciones a la vez
node scripts/check-coverage.mjs --install --md
```

El script termina con código de salida `1` si algún proyecto existente tiene estado `FALLA`, y con `0` en caso contrario.

### Estados

| Estado | Significado |
| --- | --- |
| `OK` | Los tests pasaron y las 4 métricas son ≥ 90 %. |
| `FALLA (...)` | Hay tests fallidos, alguna métrica es < 90 %, no se encontró la tabla de cobertura o falló `npm ci`. El motivo aparece entre paréntesis. Hace que el script termine con código `1`. |
| `NO EXISTE` | La carpeta del proyecto no está en el repo (por ejemplo, todavía no se ha integrado en la rama). Se omite. |
| `SIN package.json` | La carpeta existe pero no contiene un proyecto (por ejemplo, restos locales de otra rama). Se omite. |
| `SIN node_modules (ejecuta npm ci)` | El proyecto no tiene dependencias instaladas y no se pasó `--install`. Se omite. |

### Ejemplo de salida

```text
Verificando cobertura (mínimo 90% en cada métrica)

Probando Microfrontend-Users-Angular...
Probando Microfrontend-Products-Angular...
Probando Microfrontend-Orders-Angular...
Probando Client-Host-Angular...

Resumen de cobertura

Proyecto                       | Stmts | Branch | Funcs | Lines | Tests | Estado
-------------------------------|-------|--------|-------|-------|-------|----------
Microfrontend-Users-Angular    | 100%  | 95.45% | 100%  | 100%  | 24/24 | OK
Microfrontend-Products-Angular | 98.5% | 92.3%  | 100%  | 98.4% | 20/20 | OK
Microfrontend-Orders-Angular   | 97.1% | 90.9%  | 96.2% | 97%   | 18/18 | OK
Microfrontend-Courses-Angular  | -     | -      | -     | -     | -     | NO EXISTE
Microfrontend-Events-Angular   | -     | -      | -     | -     | -     | NO EXISTE
Client-Host-Angular            | 100%  | 100%   | 100%  | 100%  | 6/6   | OK

Todos los proyectos existentes cumplen la cobertura mínima.
```

Con `--md` se agrega la misma tabla en Markdown:

```markdown
| Proyecto | Stmts | Branch | Funcs | Lines | Tests | Estado |
| --- | --- | --- | --- | --- | --- | --- |
| Microfrontend-Users-Angular | 100% | 95.45% | 100% | 100% | 24/24 | OK |
| Client-Host-Angular | 100% | 100% | 100% | 100% | 6/6 | OK |
```

> Los valores del ejemplo son ilustrativos.
