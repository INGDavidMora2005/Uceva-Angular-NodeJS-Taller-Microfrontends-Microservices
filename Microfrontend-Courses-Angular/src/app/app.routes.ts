import { Routes } from '@angular/router';

/**
 * Definición de las rutas principales de la aplicación.
 *
 * @remarks
 * Este archivo contiene la configuración de enrutamiento
 * utilizada por Angular Router para mapear las URLs
 * a los componentes correspondientes.
 *
 * Incluye:
 * - Rutas de navegación principales
 * - Redirección por defecto para rutas no existentes
 *
 * @see {@link CoursesPage}
 */
export const routes: Routes = [
  /**
   * Ruta de cursos.
   *
   * @remarks
   * Renderiza el componente `CoursesPage`, encargado
   * de mostrar y gestionar el listado de cursos.
   */
  { path: '', loadComponent: () => import('./pages/courses/courses.page').then((m) => m.CoursesPage)},
];