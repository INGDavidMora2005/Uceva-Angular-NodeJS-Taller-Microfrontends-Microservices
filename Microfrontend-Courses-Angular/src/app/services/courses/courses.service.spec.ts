import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Course } from '../../interfaces/courses.interface';
import { COURSES_MOCK } from '../../mocks/courses.mocks';
import { CoursesService } from './courses.service';

describe('CoursesService', () => {
  let service: CoursesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CoursesService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(CoursesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería obtener la lista de cursos exitosamente (GET)', () => {
    const count = 4;
    let actualCourses: Course[] | undefined;

    service.getAllCourses(count).subscribe((courses) => {
      actualCourses = courses;
    });

    const req = httpMock.expectOne(`http://localhost:3004/api/courses/${count}`);
    expect(req.request.method).toBe('GET');

    req.flush(COURSES_MOCK);

    expect(actualCourses).toEqual(COURSES_MOCK);
  });

  it('debería manejar errores de la API (HTTP 500)', () => {
    const count = 4;
    let actualError: HttpErrorResponse | undefined;

    service.getAllCourses(count).subscribe({
      next: () => {},
      error: (error: HttpErrorResponse) => {
        actualError = error;
      },
    });

    const req = httpMock.expectOne(`http://localhost:3004/api/courses/${count}`);
    expect(req.request.method).toBe('GET');

    req.flush('Error interno del servidor', {
      status: 500,
      statusText: 'Internal Server Error',
    });

    expect(actualError).toBeDefined();
    expect(actualError?.status).toBe(500);
  });

  it('debería llamar a la URL con un valor diferente de count', () => {
    const count = 1;

    service.getAllCourses(count).subscribe();

    const req = httpMock.expectOne(`http://localhost:3004/api/courses/${count}`);
    expect(req.request.method).toBe('GET');

    req.flush([]);
  });
});