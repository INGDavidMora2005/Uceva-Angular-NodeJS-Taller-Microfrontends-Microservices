import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ORDERS_MOCK } from '../../mocks/orders.mocks';
import { OrdersService } from './orders.service';

describe('OrdersService', () => {
  let service: OrdersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrdersService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(OrdersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería obtener la lista de pedidos exitosamente (GET)', () => {
    const count = 4;
    let actualOrders;

    service.getAllOrders(count).subscribe((orders) => {
      actualOrders = orders;
    });

    const req = httpMock.expectOne(`http://localhost:3003/api/orders/${count}`);
    expect(req.request.method).toBe('GET');

    req.flush(ORDERS_MOCK);

    expect(actualOrders).toEqual(ORDERS_MOCK);
  });

  it('debería manejar errores de la API (HTTP 500)', () => {
    const count = 4;
    let actualError: HttpErrorResponse | undefined;

    service.getAllOrders(count).subscribe({
      next: () => {},
      error: (error: HttpErrorResponse) => {
        actualError = error;
      },
    });

    const req = httpMock.expectOne(`http://localhost:3003/api/orders/${count}`);
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

    service.getAllOrders(count).subscribe();

    const req = httpMock.expectOne(`http://localhost:3003/api/orders/${count}`);
    expect(req.request.method).toBe('GET');

    req.flush([]);
  });
});
