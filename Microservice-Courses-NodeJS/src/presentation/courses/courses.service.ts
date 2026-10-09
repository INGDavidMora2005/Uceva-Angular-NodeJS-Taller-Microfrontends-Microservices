import { faker } from '@faker-js/faker';
import { Course, CourseStatus } from '../../../domain/interfaces/course.interface';

/**
 * Servicio encargado de la generación y gestión de cursos.
 *
 * @remarks
 * Este servicio utiliza la librería `faker` para generar cursos
 * ficticios, principalmente con fines de prueba o demostración.
 */
export class CoursesService {

  /**
   * Obtiene un listado de cursos generados dinámicamente.
   *
   * @param countCourses Cantidad de cursos a generar
   * @returns Promesa que resuelve un arreglo de cursos
   *
   * @example
   * ```ts
   * const courses = await coursesService.getAllCourses(10);
   * ```
   */
  public async getAllCourses(countCourses: number): Promise<Course[]> {
    const courses: Course[] = [];

    for (let i = 1; i <= countCourses; i++) {
      courses.push(this.generateCourse(i));
    }

    return Promise.resolve(courses);
  }

  /**
   * Genera un curso ficticio.
   *
   * @param id Identificador único del curso
   * @returns Course generado
   */
  private generateCourse(id: number): Course {
    const quantity = faker.number.int({ min: 1, max: 10 });
    const unitPrice = Number(faker.commerce.price({ min: 10, max: 500, dec: 2 }));
    const total = Number((quantity * unitPrice).toFixed(2));
    const status = faker.helpers.arrayElement<CourseStatus>([
      'Pendiente',
      'Enviado',
      'Entregado',
      'Cancelado',
    ]);

    return {
      id,
      customer: faker.person.fullName(),
      product: faker.commerce.productName(),
      quantity,
      total,
      status,
      createdAt: faker.date.recent({ days: 60 }).toISOString(),
    };
  }
}