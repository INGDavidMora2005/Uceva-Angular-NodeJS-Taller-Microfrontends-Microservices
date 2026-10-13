import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { By } from '@angular/platform-browser';
import { BadgeAtom } from '@brejcha13320/design-system-bootstrap';
import { EVENTS_MOCK } from '../../mocks/events.mocks';
import { EventsTableComponent } from './events-table.component';

describe('EventsTableComponent', () => {
  let component: EventsTableComponent;
  let fixture: ComponentFixture<EventsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsTableComponent, BadgeAtom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsTableComponent);
    component = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería renderizar la tabla', () => {
    fixture.detectChanges();
    const tableEl = fixture.debugElement.query(By.css('table'));
    expect(tableEl).toBeTruthy();
  });

  it('con la lista vacía debería renderizar 0 filas en el tbody', () => {
    component.events = [];
    fixture.detectChanges();
    const tbodyRows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(tbodyRows.length).toBe(0);
  });

  it('con EVENTS_MOCK debería renderizar una fila por evento', () => {
    component.events = EVENTS_MOCK;
    fixture.detectChanges();
    const tbodyRows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(tbodyRows.length).toBe(EVENTS_MOCK.length);
  });

  it('debería mostrar los datos de cada columna para cada evento', () => {
    component.events = EVENTS_MOCK;
    fixture.detectChanges();

    const datePipe = new DatePipe('en-US');
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));

    rows.forEach((row, index) => {
      const event = EVENTS_MOCK[index];
      const cells = row.queryAll(By.css('td'));
      const cellText = (position: number): string =>
        (cells[position].nativeElement as HTMLElement).textContent?.trim() ?? '';

      // Id
      const idCell = (row.query(By.css('th')).nativeElement as HTMLElement).textContent?.trim();
      expect(idCell).toBe(event.id.toString());

      // Título
      expect(cellText(0)).toBe(event.title);

      // Lugar
      expect(cellText(1)).toBe(event.location);

      // Fecha (con pipe date)
      const expectedDate = datePipe.transform(event.date, 'dd/MM/yyyy HH:mm');
      expect(cellText(2)).toBe(expectedDate ?? '');

      // Capacidad
      expect(cellText(3)).toBe(event.capacity.toString());

      // Categoría (BadgeAtom)
      const badgeEl = row.query(By.directive(BadgeAtom));
      expect(badgeEl).toBeTruthy();
      expect(cellText(4)).toBe(event.category);
    });
  });

  it('categoryMap debería mapear cada categoría al BadgeType correcto', () => {
    expect(component.categoryMap['Academico']).toBe('primary');
    expect(component.categoryMap['Cultural']).toBe('warning');
    expect(component.categoryMap['Deportivo']).toBe('success');
    expect(component.categoryMap['Tecnologico']).toBe('info');
  });

  it('cada fila debería renderizar un dsb-badge-atom', () => {
    component.events = EVENTS_MOCK;
    fixture.detectChanges();
    const badges = fixture.debugElement.queryAll(By.directive(BadgeAtom));
    expect(badges.length).toBe(EVENTS_MOCK.length);
  });
});
