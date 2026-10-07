/**
 * Tipo que define los estados posibles de un pedido.
 *
 * @remarks
 * Se utiliza para rastrear el ciclo de vida de la orden desde su creación hasta la entrega o cancelación.
 */
export type OrderStatus = 'Pendiente' | 'Enviado' | 'Entregado' | 'Cancelado';

/**
 * Interfaz que representa un pedido en el sistema.
 *
 * Contiene la información básica de la transacción, el cliente, el producto
 * y el estado actual del envío.
 *
 * @remarks
 * Cada pedido debe tener un identificador único, la información del cliente,
 * la cantidad solicitada, el monto total y la fecha de creación en formato ISO.
 *
 * @example
 * ```ts
 * const orden: Order = {
 *   id: 1,
 *   customer: 'Juan Pérez',
 *   product: 'Laptop Gamer',
 *   quantity: 1,
 *   total: 2500.50,
 *   status: 'Pendiente',
 *   createdAt: new Date().toISOString()
 * };
 * ```
 */
export interface Order {
  /** Identificador único del pedido */
  id: number;
  /** Nombre completo del cliente que realizó el pedido */
  customer: string;
  /** Nombre del producto solicitado */
  product: string;
  /** Cantidad de unidades del producto */
  quantity: number;
  /** Monto total del pedido (cantidad x precio unitario) */
  total: number;
  /** Estado actual del pedido */
  status: OrderStatus;
  /** Fecha de creación del pedido en formato ISO string */
  createdAt: string;
}
