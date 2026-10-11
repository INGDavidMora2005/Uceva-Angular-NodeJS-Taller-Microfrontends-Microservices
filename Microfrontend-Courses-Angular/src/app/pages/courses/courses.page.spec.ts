import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesPage } from './courses.page';
import { CoursesTableComponent } from '../../components/courses-table/courses-table.component';
import { AlertComponent } from '../../components/alert/alert.component';
import { CoursesService } from '../../services/courses/courses.service';
import { By } from '@angular/platform-browser';
import { COURSES_MOCK } from '../../mocks/courses.mocks';
import { Course } from '../../interfaces/courses.interface';
import { of, Subject, throwError } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('CoursesPage', () => {
  let component: CoursesPage;
  let fixture: ComponentFixture<CoursesPage>;
  let coursesServiceMock: Partial<CoursesService>;

  beforeEach(async () => {
    coursesServiceMock = {
      getAllCourses: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [CoursesPage, CoursesTableComponent, AlertComponent],
      providers: [
        { provide: CoursesService, useValue: coursesServiceMock },
        provideHttpClientTesting()
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initial state should be init before detectChanges', () => {
    expect(component.state).toBe('init');
  });

  it('init state renders nothing', () => {
    expect(component.state).toBe('init');
    expect(fixture.nativeElement.querySelector('app-alert')).toBeNull();
    expect(fixture.nativeElement.querySelector('app-courses-table')).toBeNull();
  });

  it('calls getAllCourses with 10 on ngOnInit', () => {
    coursesServiceMock.getAllCourses!.mockReturnValue(of([]));
    fixture.detectChanges();
    expect(coursesServiceMock.getAllCourses).toHaveBeenCalledWith(10);
  });

  it('on success, assigns courses and state success', () => {
    coursesServiceMock.getAllCourses!.mockReturnValue(of(COURSES_MOCK));
    fixture.detectChanges();
    expect(component.courses).toEqual(COURSES_MOCK);
    expect(component.state).toBe('success');
  });

  it('renders app-courses-table with courses on success', () => {
    coursesServiceMock.getAllCourses!.mockReturnValue(of(COURSES_MOCK));
    fixture.detectChanges();
    const tableEl = fixture.debugElement.query(By.directive(CoursesTableComponent));
    expect(tableEl).toBeTruthy();
    const instance = tableEl.componentInstance;
    expect(instance.courses).toEqual(COURSES_MOCK);
    expect(fixture.debugElement.query(By.directive(AlertComponent))).toBeFalsy();
  });

  it('loading state renders alert correctly', () => {
    const subject = new Subject<Course[]>();
    coursesServiceMock.getAllCourses!.mockReturnValue(subject);
    fixture.detectChanges();
    expect(component.state).toBe('loading');
    const alertEl = fixture.debugElement.query(By.directive(AlertComponent));
    expect(alertEl).toBeTruthy();
    const alertInstance = alertEl.componentInstance;
    expect(alertInstance.alertState).toBe('loading');
    expect(alertInstance.text).toBe('Cargando cursos...');
    expect(fixture.debugElement.query(By.directive(CoursesTableComponent))).toBeFalsy();
    subject.next(COURSES_MOCK);
    subject.complete();
    fixture.detectChanges();
    expect(component.state).toBe('success');
  });

  it('error state renders alert correctly', () => {
    const error = new Error('timeout');
    coursesServiceMock.getAllCourses!.mockReturnValue(throwError(() => error));
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    fixture.detectChanges();
    expect(consoleSpy).toHaveBeenCalledWith(error);
    expect(component.state).toBe('error');
    expect(component.courses).toEqual([]);
    const alertEl = fixture.debugElement.query(By.directive(AlertComponent));
    expect(alertEl).toBeTruthy();
    const alertInstance = alertEl.componentInstance;
    expect(alertInstance.alertState).toBe('error');
    expect(alertInstance.text).toBe('Error al cargar los cursos');
    expect(fixture.debugElement.query(By.directive(CoursesTableComponent))).toBeFalsy();
    consoleSpy.mockRestore();
  });
});
