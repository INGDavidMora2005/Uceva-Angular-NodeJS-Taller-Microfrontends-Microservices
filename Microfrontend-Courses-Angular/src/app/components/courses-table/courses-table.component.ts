import { Component, Input } from '@angular/core';
import { Order, OrderStatus } from '../../interfaces/orders.interface';
import { BadgeAtom, BadgeType } from '@brejcha13320/design-system-bootstrap';
import { CurrencyPipe, DatePipe } from '@angular/common';

/**
 * Tabla de pedidos reutilizable.
 *
 * @description
 * Muestra una tabla con la información de una lista de pedidos.
 * La tabla se adapta a los motores de Bootstrap y se mantiene en sincronía con
 * el diseño de la base.
 *
 * @remarks
 * El componente es *standalone* y no requiere que el módulo consumidor lo
 * declare. Solo necesita que se importen las dependencias del Design
 * System correspondientes (BadgeAtom), junto a los pipes que se usarán
 * en la plantilla.
 *
 * @example
 * ```ts
 * const appComp = TestBed.createComponent(OrdersTableComponent);
 * const component = appComp.componentInstance;
 * component.orders = [
 *   {
 *     id: 1,
 *     customer: 'Cliente A',
 *     product: 'Producto X',
 *     quantity: 2,
 *     total: 200000,
 *     status: 'Pendiente',
 *     createdAt: '2024-10-07T10:00:00Z'
 *   }
 * ];
 * fixture.detectChanges();
 * ```
 *
 * @type "standalone"
 */
@Component({
  selector: 'app-orders-table',
  standalone: true,
  imports: [BadgeAtom, CurrencyPipe, DatePipe],
  templateUrl: './orders-table.component.html'
})
export class OrdersTableComponent {
  /**
   * Lista de pedidos a mostrar.
   *
   * @remarks
   * Si se pasa una lista vacía el cuerpo de la tabla mostrará 0 filas. El
   * componente no hace ninguna validación extra.
   */
  @Input() orders: Order[] = [];

  /**
   * Mapa de colores de Badge según el estado del pedido.
   *
   * @internal
   */
  statusMap: Record<OrderStatus, BadgeType> = {
    'Pendiente': 'warning' as BadgeType,
    'Enviado': 'primary' as BadgeType,
    'Entregado': 'success' as BadgeType,
    'Cancelado': 'danger' as BadgeType
  };
}
