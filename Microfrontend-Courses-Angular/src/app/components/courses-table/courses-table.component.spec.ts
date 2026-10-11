import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesTableComponent } from './courses-table.component';
import { By } from '@angular/platform-browser';
import { COURSES_MOCK } from '../../mocks/courses.mocks';
import { BadgeAtom } from '@brejcha13320/design-system-bootstrap';

describe('CoursesTableComponent', () => {
  let component: CoursesTableComponent;
  let fixture: ComponentFixture<CoursesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesTableComponent, BadgeAtom],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesTableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render table', () => {
    fixture.detectChanges();
    const tableEl = fixture.debugElement.query(By.css('table'));
    expect(tableEl).toBeTruthy();
  });

  it('with empty courses list should render 0 rows in tbody', () => {
    component.courses = [];
    fixture.detectChanges();
    const tbodyRows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(tbodyRows.length).toBe(0);
  });

  it('with COURSES_MOCK should render a row per course', () => {
    component.courses = COURSES_MOCK;
    fixture.detectChanges();
    const tbodyRows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(tbodyRows.length).toBe(COURSES_MOCK.length);
  });

  it('should display data in each column for each course', () => {
    component.courses = COURSES_MOCK;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));

    rows.forEach((row, index) => {
      const course = COURSES_MOCK[index];

      // Id
      const idCell = row.query(By.css('th')).nativeElement.textContent.trim();
      expect(idCell).toBe(course.id.toString());

      // Name
      const nameCell = row.queryAll(By.css('td'))[0].nativeElement.textContent.trim();
      expect(nameCell).toBe(course.name);

      // Teacher
      const teacherCell = row.queryAll(By.css('td'))[1].nativeElement.textContent.trim();
      expect(teacherCell).toBe(course.teacher);

      // Credits
      const creditsCell = row.queryAll(By.css('td'))[2].nativeElement.textContent.trim();
      expect(creditsCell).toBe(course.credits.toString());

      // Semester
      const semesterCell = row.queryAll(By.css('td'))[3].nativeElement.textContent.trim();
      expect(semesterCell).toBe(course.semester.toString());

      // BadgeAtom
      const badgeEl = row.query(By.directive(BadgeAtom));
      expect(badgeEl).toBeTruthy();
    });
  });

  it('modalityMap should map each modality to the correct BadgeType', () => {
    expect(component.modalityMap['Presencial']).toBe('primary');
    expect(component.modalityMap['Virtual']).toBe('success');
    expect(component.modalityMap['Hibrido']).toBe('warning');
  });

  it('each row should render a dsb-badge-atom with the modality text', () => {
    component.courses = COURSES_MOCK;
    fixture.detectChanges();

    COURSES_MOCK.forEach((course, index) => {
      const row = fixture.debugElement.queryAll(By.css('tbody tr'))[index];
      const badgeEl = row.query(By.directive(BadgeAtom));
      const badgeText = badgeEl.nativeElement.textContent.trim();
      expect(badgeText).toBe(course.modality);
    });
  });

  it('should render a badge for each course', () => {
    component.courses = COURSES_MOCK;
    fixture.detectChanges();
    const badges = fixture.debugElement.queryAll(By.directive(BadgeAtom));
    expect(badges.length).toBe(COURSES_MOCK.length);
  });
});