# Microfrontend Courses Angular

Microfrontend de **Courses** construido con Angular y Module Federation. Forma parte del sistema de microfrontends del taller UCEVA y se carga en el Host (`Client-Host-Angular`) desde la ruta `/courses`.

## Datos rÃ¡pidos

| Concepto | Valor |
|---|---|
| Remote name | `mf-courses` |
| MÃ³dulo expuesto | `./CoursesPage` |
| Puerto del MF | `4204` |
| Microservicio asociado | `Microservice-Courses-NodeJS` (puerto `3004`) |
| Endpoint consumido | `GET http://localhost:3004/api/courses/{n}` |
| Ruta en el Host | `http://localhost:4200/courses` |

## Modelo de dominio (`Course`)

```ts
export type CourseModality = 'Presencial' | 'Virtual' | 'Hibrido';

export interface Course {
  id: number;
  name: string;
  teacher: string;
  credits: number;
  semester: number;
  modality: CourseModality;
}
```

La tabla muestra las columnas `id`, `name`, `teacher`, `credits`, `semester` y la `modality` como badge:
`Presencial` â†’ `primary`, `Virtual` â†’ `success`, `Hibrido` â†’ `warning`.

## Scripts disponibles

```bash
# Levanta el microfrontend en el puerto 4204 (mf-dev-server)
npm start

# Ejecuta los tests unitarios
npm run test

# Ejecuta los tests con cobertura (objetivo >= 90%)
npm run test:coverage

# Construye el proyecto (sin errores ni warnings)
npx ng build

# Genera la documentaciÃ³n con Compodoc
npm run compodoc
```

## CÃ³mo probarlo en el Host

1. Levanta el microservicio de cursos (puerto 3004):
   ```bash
   cd ../Microservice-Courses-NodeJS
   npm start
   ```

2. Levanta este microfrontend (puerto 4204):
   ```bash
   npm start
   ```

3. Levanta el Host (puerto 4200):
   ```bash
   cd ../Client-Host-Angular
   npm start
   ```

4. Abre `http://localhost:4200/courses` con la consola (F12) abierta. Debes ver Â«Cargando cursosâ€¦Â» y luego la tabla con los datos y los badges, sin errores rojos atribuibles a este MF.

**Prueba de error:** detÃ©n el microservicio (`Ctrl + C`), recarga y verifica que aparece el mensaje de error de la pÃ¡gina. Vuelve a levantarlo.

## VerificaciÃ³n rÃ¡pida

```bash
# remoteEntry.js debe contener mf-courses y ./CoursesPage
curl.exe -s http://localhost:4204/remoteEntry.js | Select-String -Pattern 'mf-courses|CoursesPage'

# Cobertura
npm run test:coverage

# Build
npx ng build

# Compodoc
npm run compodoc
```

## Arquitectura

- `src/app/interfaces/courses.interface.ts` â€” modelo `Course` y `CourseModality`.
- `src/app/mocks/courses.mocks.ts` â€” datos simulados de cursos.
- `src/app/services/courses/courses.service.ts` â€” consume `http://localhost:3004/api/courses/{n}`.
- `src/app/components/courses-table/courses-table.component.ts` â€” tabla reutilizable con badges por modalidad.
- `src/app/pages/courses/courses.page.ts` â€” pÃ¡gina con estados `init`, `loading`, `success` y `error`.
- `webpack.config.js` â€” expone `./CoursesPage` como remote `mf-courses`.

## Mensajes conocidos en consola del Host

- `Cannot use 'import.meta' outside a module` en `styles.js`: viene del `publicPath` automÃ¡tico de webpack en el Host original; la pÃ¡gina funciona.
- Aviso Â«depends on '@angular-architects/module-federation'. CommonJS or AMD dependenciesâ€¦Â»: de la base, es solo un warning.
- `ERR_CONNECTION_REFUSED â€¦ :4201/remoteEntry.js`: el Host redirige `/` a `/users`; si el MF de Users no estÃ¡ levantado, falla. Para una prueba limpia, levanta todos los servicios o entra directo a la ruta de tu vertical.
