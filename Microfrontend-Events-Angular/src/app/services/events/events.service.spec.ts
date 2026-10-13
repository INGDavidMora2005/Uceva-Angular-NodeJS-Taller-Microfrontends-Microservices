import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CampusEvent } from '../../interfaces/events.interface';
import { EVENTS_MOCK } from '../../mocks/events.mocks';
import { EventsService } from './events.service';

describe('EventsService', () => {
  let service: EventsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EventsService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(EventsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería obtener la lista de eventos exitosamente (GET)', () => {
    let actualEvents: CampusEvent[] | undefined;

    service.getAllEvents(4).subscribe((events) => {
      actualEvents = events;
    });

    const req = httpMock.expectOne('http://localhost:3005/api/events/4');
    expect(req.request.method).toBe('GET');

    req.flush(EVENTS_MOCK);

    expect(actualEvents).toEqual(EVENTS_MOCK);
  });

  it('debería manejar errores de la API (HTTP 500)', () => {
    let actualEvents: CampusEvent[] | undefined;
    let actualError: HttpErrorResponse | undefined;

    service.getAllEvents(4).subscribe({
      next: (events) => {
        actualEvents = events;
      },
      error: (error: HttpErrorResponse) => {
        actualError = error;
      },
    });

    const req = httpMock.expectOne('http://localhost:3005/api/events/4');
    expect(req.request.method).toBe('GET');

    req.flush('Error interno del servidor', {
      status: 500,
      statusText: 'Internal Server Error',
    });

    expect(actualEvents).toBeUndefined();
    expect(actualError).toBeDefined();
    expect(actualError?.status).toBe(500);
    expect(actualError?.statusText).toBe('Internal Server Error');
  });

  it('debería llamar a la URL con un valor diferente de count', () => {
    let actualEvents: CampusEvent[] | undefined;

    service.getAllEvents(1).subscribe((events) => {
      actualEvents = events;
    });

    const req = httpMock.expectOne('http://localhost:3005/api/events/1');
    expect(req.request.method).toBe('GET');

    req.flush([EVENTS_MOCK[0]]);

    expect(actualEvents).toEqual([EVENTS_MOCK[0]]);
  });
});
