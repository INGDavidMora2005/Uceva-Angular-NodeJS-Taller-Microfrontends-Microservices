import { Component, inject, OnInit } from '@angular/core';
import { CoursesTableComponent } from '../../components/courses-table/courses-table.component';
import { AlertComponent } from '../../components/alert/alert.component';
import { Course } from '../../interfaces/courses.interface';
import { State } from '../../interfaces/state.interface';
import { CoursesService } from '../../services/courses/courses.service';

/**
 * Componente página de cursos.
 *
 * @description
 * Gestiona la carga y visualización de la lista de cursos.
 *
 * @remarks
 * Consume `CoursesService` para obtener los datos y utiliza
 * `CoursesTableComponent` para mostrarlos en una tabla.
 */
@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  imports: [CoursesTableComponent, AlertComponent],
})
export class CoursesPage implements OnInit {
  /**
   * Listado de cursos a mostrar.
   */
  courses: Course[] = [];

  /**
   * Estado actual del componente.
   * @default 'init'
   */
  state: State = 'init';

  /**
   * Servicio para obtener cursos.
   */
  private coursesService = inject(CoursesService);

  /**
   * Cantidad de cursos a solicitar.
   */
  private readonly coursesCount = 10;

  /**
   * Inicializa la carga de cursos.
   */
  ngOnInit(): void {
    this.state = 'loading';
    this.coursesService.getAllCourses(this.coursesCount).subscribe({
      next: (courses) => {
        this.courses = courses;
        this.state = 'success';
      },
      error: (error) => {
        console.error(error);
        this.state = 'error';
      },
    });
  }
}