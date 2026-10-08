/**
 * Representa el estado de un pedido en el sistema.
 *
 * @remarks
 * Este tipo restringe los estados posibles de un pedido a:
 * - 'Pendiente'
 * - 'Enviado'
 * - 'Entregado'
 * - 'Cancelado'
 *
 * Se utiliza para gestionar el flujo de vida de un pedido.
 *
 * @example
 * ```ts
 * const estado: OrderStatus = 'Pendiente';
 * ```
 */
export type OrderStatus = 'Pendiente' | 'Enviado' | 'Entregado' | 'Cancelado';

/**
 * Interfaz que representa un pedido del sistema.
 *
 * Contiene la información básica necesaria para mostrar un pedido
 * en la tabla o en cualquier componente de listado.
 *
 * @remarks
 * Cada pedido debe tener un `id` único, un `customer`, un `product`,
 * la `quantity`, el `total`, el `status` actual y la fecha de creación.
 *
 * @example
 * ```ts
 * const pedido: Order = {
 *   id: 1,
 *   customer: 'Juan Pérez',
 *   product: 'Laptop',
 *   quantity: 1,
 *   total: 1500000,
 *   status: 'Pendiente',
 *   createdAt: new Date().toISOString()
 * };
 * ```
 */
export interface Order {
  /** Identificador único del pedido */
  id: number;

  /** Nombre del cliente que realiza el pedido */
  customer: string;

  /** Nombre del producto pedido */
  product: string;

  /** Cantidad de productos pedidos */
  quantity: number;

  /** Total del pedido */
  total: number;

  /** Estado actual del pedido */
  status: OrderStatus;

  /** Fecha de creación del pedido */
  createdAt: string;
}
