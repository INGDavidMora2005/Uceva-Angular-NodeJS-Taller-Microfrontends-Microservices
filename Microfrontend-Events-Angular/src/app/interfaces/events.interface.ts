/**
 * Representa la categoría de un evento del campus.
 *
 * @remarks
 * Este tipo restringe las categorías posibles de un evento a:
 * - 'Academico'
 * - 'Cultural'
 * - 'Deportivo'
 * - 'Tecnologico'
 *
 * Se utiliza para clasificar los eventos y asignarles un color en la tabla.
 *
 * @example
 * ```ts
 * const categoria: EventCategory = 'Cultural';
 * ```
 */
export type EventCategory = 'Academico' | 'Cultural' | 'Deportivo' | 'Tecnologico';

/**
 * Interfaz que representa un evento del campus.
 *
 * Contiene la información básica necesaria para mostrar un evento
 * en la tabla o en cualquier componente de listado.
 *
 * @remarks
 * Cada evento debe tener un `id` único, un `title`, el `location` donde
 * se realiza, la fecha (`date`) en formato ISO, la `capacity` máxima de
 * asistentes y su `category`.
 *
 * @example
 * ```ts
 * const evento: CampusEvent = {
 *   id: 1,
 *   title: 'Feria de Ciencias',
 *   location: 'Auditorio Principal',
 *   date: '2026-05-10T09:00:00.000Z',
 *   capacity: 200,
 *   category: 'Academico'
 * };
 * ```
 */
export interface CampusEvent {
  /** Identificador único del evento */
  id: number;

  /** Título o nombre del evento */
  title: string;

  /** Lugar donde se realiza el evento */
  location: string;

  /** Fecha y hora del evento en formato ISO 8601 */
  date: string;

  /** Capacidad máxima de asistentes */
  capacity: number;

  /** Categoría a la que pertenece el evento */
  category: EventCategory;
}
