/**
 * Tipo que define las categorías posibles de un evento del campus.
 *
 * @remarks
 * Se utiliza para clasificar los eventos según su naturaleza
 * (académica, cultural, deportiva o tecnológica).
 */
export type EventCategory = 'Academico' | 'Cultural' | 'Deportivo' | 'Tecnologico';

/**
 * Interfaz que representa un evento del campus universitario.
 *
 * Contiene la información básica del evento: título, lugar,
 * fecha, capacidad y categoría.
 *
 * @remarks
 * Cada evento debe tener un identificador único y la fecha
 * de realización en formato ISO.
 *
 * @example
 * ```ts
 * const evento: CampusEvent = {
 *   id: 1,
 *   title: 'Semana de la ingeniería',
 *   location: 'Auditorio Principal',
 *   date: new Date().toISOString(),
 *   capacity: 200,
 *   category: 'Academico'
 * };
 * ```
 */
export interface CampusEvent {
  /** Identificador único del evento */
  id: number;
  /** Título del evento */
  title: string;
  /** Lugar donde se realiza el evento */
  location: string;
  /** Fecha del evento en formato ISO string */
  date: string;
  /** Cantidad máxima de asistentes */
  capacity: number;
  /** Categoría del evento */
  category: EventCategory;
}
