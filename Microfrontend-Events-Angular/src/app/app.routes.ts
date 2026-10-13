import { Routes } from '@angular/router';

/**
 * Definición de las rutas principales de la aplicación.
 *
 * @remarks
 * Este archivo contiene la configuración de enrutamiento
 * utilizada por Angular Router para mapear las URLs
 * a los componentes del microfrontend de eventos (Events).
 *
 * Incluye:
 * - Rutas de navegación principales del listado de eventos
 *
 * @see {@link EventsPage}
 */
export const routes: Routes = [
  /**
   * Ruta de eventos.
   *
   * @remarks
   * Renderiza el componente `EventsPage`, encargado
   * de mostrar y gestionar el listado de eventos.
   */
  { path: '', loadComponent: () => import('./pages/events/events.page').then((m) => m.EventsPage)},
];
