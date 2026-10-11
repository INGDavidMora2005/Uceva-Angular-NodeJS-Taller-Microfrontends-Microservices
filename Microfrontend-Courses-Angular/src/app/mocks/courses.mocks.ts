import { Course, CourseModality } from "../interfaces/courses.interface";

/**
 * Datos simulados de cursos para fines de demostración y pruebas.
 *
 * @remarks
 * Arbol de 4 cursos que cubre las 3 modalidades (`CourseModality`):
 * Presencial, Virtual e Hibrido. Se utiliza como fuente estática
 * mientras no se consume el microservicio real.
 *
 * @example
 * ```ts
 * import { COURSES_MOCK } from './courses.mocks';
 *
 * const cursos = COURSES_MOCK;
 * ```
 */
export const COURSES_MOCK: Course[] = [
  {
    id: 1,
    name: 'Matemáticas',
    teacher: 'Juan Pérez',
    credits: 4,
    semester: 3,
    modality: 'Presencial',
  },
  {
    id: 2,
    name: 'Programación',
    teacher: 'María Gómez',
    credits: 5,
    semester: 2,
    modality: 'Virtual',
  },
  {
    id: 3,
    name: 'Base de Datos',
    teacher: 'Carlos López',
    credits: 3,
    semester: 4,
    modality: 'Hibrido',
  },
  {
    id: 4,
    name: 'Redes',
    teacher: 'Laura Torres',
    credits: 2,
    semester: 5,
    modality: 'Presencial',
  },
];