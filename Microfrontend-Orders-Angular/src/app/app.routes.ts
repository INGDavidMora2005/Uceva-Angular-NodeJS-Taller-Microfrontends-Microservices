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
 * @see {@link OrdersPage}
 */
export const routes: Routes = [
  /**
   * Ruta de pedidos.
   *
   * @remarks
   * Renderiza el componente `OrdersPage`, encargado
   * de mostrar y gestionar el listado de pedidos.
   */
  { path: '', loadComponent: () => import('./pages/orders/orders.page').then((m) => m.OrdersPage)},
];
