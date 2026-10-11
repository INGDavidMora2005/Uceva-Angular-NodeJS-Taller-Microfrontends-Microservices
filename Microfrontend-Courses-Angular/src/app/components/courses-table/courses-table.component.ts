import { Component, Input } from '@angular/core';
import { BadgeAtom, BadgeType } from '@brejcha13320/design-system-bootstrap';
import { Course, CourseModality } from '../../interfaces/courses.interface';

/**
 * Tabla de cursos reutilizable.
 *
 * @description
 * Muestra una tabla con la información de una lista de cursos.
 * La tabla se adapta a los motores de Bootstrap y se mantiene en sincronía con
 * el diseño de la base.
 *
 * @remarks
 * El componente es *standalone* y no requiere que el módulo consumidor lo
 * declare. Solo necesita que se importen las dependencias del Design
 * System correspondientes (BadgeAtom).
 *
 * @example
 * ```ts
 * const appComp = TestBed.createComponent(CoursesTableComponent);
 * const component = appComp.componentInstance;
 * component.courses = [
 *   {
 *     id: 1,
 *     name: 'Matemáticas',
 *     teacher: 'Juan Pérez',
 *     credits: 4,
 *     semester: 3,
 *     modality: 'Presencial'
 *   }
 * ];
 * fixture.detectChanges();
 * ```
 *
 * @type "standalone"
 */
@Component({
  selector: 'app-courses-table',
  standalone: true,
  imports: [BadgeAtom],
  templateUrl: './courses-table.component.html'
})
export class CoursesTableComponent {
  /**
   * Lista de cursos a mostrar.
   *
   * @remarks
   * Si se pasa una lista vacía el cuerpo de la tabla mostrará 0 filas. El
   * componente no hace ninguna validación extra.
   */
  @Input() courses: Course[] = [];

  /**
   * Mapa de colores de Badge según la modalidad del curso.
   *
   * @internal
   */
  modalityMap: Record<CourseModality, BadgeType> = {
    'Presencial': 'primary' as BadgeType,
    'Virtual': 'success' as BadgeType,
    'Hibrido': 'warning' as BadgeType
  };
}