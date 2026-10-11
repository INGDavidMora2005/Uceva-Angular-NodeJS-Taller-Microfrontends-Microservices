/**
 * Tipo que define las modalidades posibles de un curso.
 *
 * @remarks
 * Este tipo restringe las modalidades de un curso a:
 * - 'Presencial'
 * - 'Virtual'
 * - 'Hibrido'
 *
 * Se utiliza para clasificar la forma de entrega del curso.
 *
 * @example
 * ```ts
 * const modalidad: CourseModality = 'Presencial';
 * ```
 */
export type CourseModality = 'Presencial' | 'Virtual' | 'Hibrido';

/**
 * Interfaz que representa un curso del sistema.
 *
 * Contiene la información básica necesaria para mostrar un curso
 * en la tabla o en cualquier componente de listado.
 *
 * @remarks
 * Cada curso debe tener un `id` único, un `name`, un `teacher`,
 * la cantidad de `credits`, el `semester` y la `modality` actual.
 *
 * @example
 * ```ts
 * const curso: Course = {
 *   id: 1,
 *   name: 'Matemáticas',
 *   teacher: 'Juan Pérez',
 *   credits: 4,
 *   semester: 3,
 *   modality: 'Presencial'
 * };
 * ```
 */
export interface Course {
  /** Identificador único del curso */
  id: number;

  /** Nombre del curso */
  name: string;

  /** Nombre del profesor a cargo */
  teacher: string;

  /** Créditos del curso (1 a 5) */
  credits: number;

  /** Semestre del curso (1 a 10) */
  semester: number;

  /** Modalidad del curso */
  modality: CourseModality;
}