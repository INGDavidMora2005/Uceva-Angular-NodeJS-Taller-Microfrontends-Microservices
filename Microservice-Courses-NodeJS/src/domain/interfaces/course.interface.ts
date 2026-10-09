/**
 * Tipo que define los estados posibles de un curso.
 *
 * @remarks
 * Se utiliza para rastrear el ciclo de vida del curso desde su creación hasta la entrega o cancelación.
 */
export type CourseStatus = 'Pendiente' | 'Enviado' | 'Entregado' | 'Cancelado';

/**
 * Interfaz que representa un curso en el sistema.
 *
 * Contiene la información básica de la transacción, el cliente, el producto
 * y el estado actual del envío.
 *
 * @remarks
 * Cada curso debe tener un identificador único, la información del cliente,
 * la cantidad solicitada, el monto total y la fecha de creación en formato ISO.
 *
 * @example
 * ```ts
 * const curso: Course = {
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
export interface Course {
  /** Identificador único del curso */
  id: number;
  /** Nombre completo del cliente que realizó el curso */
  customer: string;
  /** Nombre del producto solicitado */
  product: string;
  /** Cantidad de unidades del producto */
  quantity: number;
  /** Monto total del curso (cantidad x precio unitario) */
  total: number;
  /** Estado actual del curso */
  status: CourseStatus;
  /** Fecha de creación del curso en formato ISO string */
  createdAt: string;
}
