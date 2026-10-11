# Microservice Courses NodeJS

Microservicio de **Courses** construido con Express y documentado con Swagger (OpenAPI). Es el backend de la vertical Courses y lo consume el Microfrontend Courses Angular (`Microfrontend-Courses-Angular`).

## Datos rápidos

| Concepto | Valor |
|---|---|
| Puerto | `3004` |
| Endpoint principal | `GET /api/courses/{countCourses}` |
| Documentación (Swagger) | `http://localhost:3004/api/docs` |
| Datos simulados | Faker.js |
| Modelo de dominio | `Course` |

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

## Scripts disponibles

```bash
# Levanta el microservicio en el puerto 3004
npm start
```

## Endpoint: GET /api/courses/{countCourses}

Genera una lista de cursos ficticios según la cantidad solicitada.

- **Parámetro `countCourses` (path, integer, obligatorio):** cantidad de cursos a generar. Debe ser un número entero mayor o igual a 1.
- **Respuestas:**
  - `200` — Lista de cursos generados (array de `Course`).
  - `400` — Parámetro inválido (`0`, `-5`, `abc`, `2.5`, etc.).
  - `500` — Error interno del servidor.

### Ejemplos de verificación (PowerShell)

```powershell
# 200 OK
curl.exe -s http://localhost:3004/api/courses/5

# 400 Bad Request
curl.exe -s http://localhost:3004/api/courses/abc
```

Esperado: `200` para un entero >= 1; `400` para `0`, `-5`, `abc`, `2.5`.

### Swagger

Abre `http://localhost:3004/api/docs` y verifica que aparece el schema `Course` y el endpoint `/api/courses/{countCourses}` (tag `Courses`), y que **no** aparecen schemas de otra vertical (Orders, Users, Products, Events).

## Arquitectura (Clean Architecture)

- `src/domain/interfaces/course.interface.ts` — modelo `Course` y `CourseModality`.
- `src/domain/services/courses.service.ts` — genera los datos con Faker.
- `src/presentation/courses/courses.controller.ts` — valida el parámetro y responde `200`/`400`.
- `src/presentation/courses/courses.routes.ts` — define el endpoint y la documentación Swagger.
- `src/config/swagger.schemas.ts` — schemas de Swagger (`Course`, `Error`).
- `src/config/swagger.ts` — configuración de Swagger (URL del server: `http://localhost:3004`).
- `src/presentation/server.ts` — servidor Express (CORS, JSON, carpeta pública, `/api/docs`, SPA).

## Cómo probarlo en el Host

1. Levanta este microservicio (puerto 3004):
   ```bash
   npm start
   ```

2. Levanta el Microfrontend Courses (puerto 4204):
   ```bash
   cd ../Microfrontend-Courses-Angular
   npm start
   ```

3. Levanta el Host (puerto 4200):
   ```bash
   cd ../Client-Host-Angular
   npm start
   ```

4. Abre `http://localhost:4200/courses` con la consula (F12) abierta. Debes ver «Cargando cursos…» y luego la tabla con los datos y los badges, sin errores rojos atribuibles a este microservicio.

**Prueba de error:** detén este microservicio (`Ctrl + C`), recarga en el Host y verifica que aparece el mensaje de error de la página. Vuelve a levantarlo.

## Mensajes conocidos en consola del Host

- `Cannot use 'import.meta' outside a module` en `styles.js`: viene del `publicPath` automático de webpack en el Host original; la página funciona.
- Aviso «depends on '@angular-architects/module-federation'. CommonJS or AMD dependencies…»: de la base, es solo un warning.
- `ERR_CONNECTION_REFUSED … :4201/remoteEntry.js`: el Host redirige `/` a `/users`; si el MF de Users no está levantado, falla. Para una prueba limpia, levanta todos los servicios o entra directo a la ruta de tu vertical.