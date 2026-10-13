import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of, Subject, throwError } from 'rxjs';
import { AlertComponent } from '../../components/alert/alert.component';
import { EventsTableComponent } from '../../components/events-table/events-table.component';
import { CampusEvent } from '../../interfaces/events.interface';
import { EVENTS_MOCK } from '../../mocks/events.mocks';
import { EventsService } from '../../services/events/events.service';
import { EventsPage } from './events.page';

describe('EventsPage', () => {
  let component: EventsPage;
  let fixture: ComponentFixture<EventsPage>;
  let eventsServiceMock: jest.Mocked<Pick<EventsService, 'getAllEvents'>>;

  beforeEach(async () => {
    eventsServiceMock = {
      getAllEvents: jest.fn<ReturnType<EventsService['getAllEvents']>, [number]>()
    };

    await TestBed.configureTestingModule({
      imports: [EventsPage],
      providers: [
        { provide: EventsService, useValue: eventsServiceMock }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsPage);
    component = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('el estado inicial debería ser init y no renderizar nada antes de detectChanges', () => {
    expect(component.state).toBe('init');
    expect(component.events).toEqual([]);
    expect(eventsServiceMock.getAllEvents).not.toHaveBeenCalled();
    expect(fixture.debugElement.query(By.directive(AlertComponent))).toBeFalsy();
    expect(fixture.debugElement.query(By.directive(EventsTableComponent))).toBeFalsy();
  });

  it('debería llamar a getAllEvents con 10 en ngOnInit', () => {
    eventsServiceMock.getAllEvents.mockReturnValue(of([]));
    fixture.detectChanges();
    expect(eventsServiceMock.getAllEvents).toHaveBeenCalledTimes(1);
    expect(eventsServiceMock.getAllEvents).toHaveBeenCalledWith(10);
  });

  it('en caso de éxito debería asignar los eventos y el estado success', () => {
    eventsServiceMock.getAllEvents.mockReturnValue(of(EVENTS_MOCK));
    fixture.detectChanges();
    expect(component.events).toEqual(EVENTS_MOCK);
    expect(component.state).toBe('success');
  });

  it('en caso de éxito debería renderizar app-events-table con los eventos', () => {
    eventsServiceMock.getAllEvents.mockReturnValue(of(EVENTS_MOCK));
    fixture.detectChanges();
    const tableEl = fixture.debugElement.query(By.directive(EventsTableComponent));
    expect(tableEl).toBeTruthy();
    const instance = tableEl.componentInstance as EventsTableComponent;
    expect(instance.events).toEqual(EVENTS_MOCK);
    expect(fixture.debugElement.query(By.directive(AlertComponent))).toBeFalsy();
  });

  it('en estado loading debería renderizar la alerta de carga', () => {
    const subject = new Subject<CampusEvent[]>();
    eventsServiceMock.getAllEvents.mockReturnValue(subject.asObservable());
    fixture.detectChanges();

    expect(component.state).toBe('loading');
    const alertEl = fixture.debugElement.query(By.directive(AlertComponent));
    expect(alertEl).toBeTruthy();
    const alertInstance = alertEl.componentInstance as AlertComponent;
    expect(alertInstance.alertState).toBe('loading');
    expect(alertInstance.text).toBe('Cargando eventos...');
    expect(fixture.debugElement.query(By.directive(EventsTableComponent))).toBeFalsy();

    subject.next(EVENTS_MOCK);
    subject.complete();
    fixture.detectChanges();
    expect(component.state).toBe('success');
  });

  it('en estado error debería renderizar la alerta de error', () => {
    const error = new Error('timeout');
    eventsServiceMock.getAllEvents.mockReturnValue(throwError(() => error));
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    fixture.detectChanges();

    expect(consoleSpy).toHaveBeenCalledWith(error);
    expect(component.state).toBe('error');
    expect(component.events).toEqual([]);
    const alertEl = fixture.debugElement.query(By.directive(AlertComponent));
    expect(alertEl).toBeTruthy();
    const alertInstance = alertEl.componentInstance as AlertComponent;
    expect(alertInstance.alertState).toBe('error');
    expect(alertInstance.text).toBe('Error al cargar los eventos');
    expect(fixture.debugElement.query(By.directive(EventsTableComponent))).toBeFalsy();
    consoleSpy.mockRestore();
  });
});
