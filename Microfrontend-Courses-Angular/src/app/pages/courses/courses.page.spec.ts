import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersPage } from './orders.page';
import { OrdersTableComponent } from '../../components/orders-table/orders-table.component';
import { AlertComponent } from '../../components/alert/alert.component';
import { OrdersService } from '../../services/orders/orders.service';
import { By } from '@angular/platform-browser';
import { ORDERS_MOCK } from '../../mocks/orders.mocks';
import { of, Subject, throwError } from 'rxjs';
import { Order } from '../../interfaces/orders.interface';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('OrdersPage', () => {
  let component: OrdersPage;
  let fixture: ComponentFixture<OrdersPage>;
  let ordersServiceMock: any;

  beforeEach(async () => {
    ordersServiceMock = {
      getAllOrders: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [OrdersPage, OrdersTableComponent, AlertComponent],
      providers: [
        { provide: OrdersService, useValue: ordersServiceMock },
        provideHttpClientTesting()
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initial state should be init before detectChanges', () => {
    expect(component.state).toBe('init');
  });

  it('calls getAllOrders with 10 on ngOnInit', () => {
    ordersServiceMock.getAllOrders.mockReturnValue(of([]));
    fixture.detectChanges();
    expect(ordersServiceMock.getAllOrders).toHaveBeenCalledWith(10);
  });

  it('on success, assigns orders and state success', () => {
    ordersServiceMock.getAllOrders.mockReturnValue(of(ORDERS_MOCK));
    fixture.detectChanges();
    expect(component.orders).toEqual(ORDERS_MOCK);
    expect(component.state).toBe('success');
  });

  it('renders app-orders-table with orders on success', () => {
    ordersServiceMock.getAllOrders.mockReturnValue(of(ORDERS_MOCK));
    fixture.detectChanges();
    const tableEl = fixture.debugElement.query(By.directive(OrdersTableComponent));
    expect(tableEl).toBeTruthy();
    const instance = tableEl.componentInstance;
    expect(instance.orders).toEqual(ORDERS_MOCK);
    expect(fixture.debugElement.query(By.directive(AlertComponent))).toBeFalsy();
  });

  it('loading state renders alert correctly', () => {
    const subject = new Subject<Order[]>();
    ordersServiceMock.getAllOrders.mockReturnValue(subject);
    fixture.detectChanges();
    expect(component.state).toBe('loading');
    const alertEl = fixture.debugElement.query(By.directive(AlertComponent));
    expect(alertEl).toBeTruthy();
    const alertInstance = alertEl.componentInstance;
    expect(alertInstance.alertState).toBe('loading');
    expect(alertInstance.text).toBe('Cargando pedidos...');
    expect(fixture.debugElement.query(By.directive(OrdersTableComponent))).toBeFalsy();
    subject.next(ORDERS_MOCK);
    subject.complete();
    fixture.detectChanges();
    expect(component.state).toBe('success');
  });

  it('error state renders alert correctly', () => {
    const error = new Error('timeout');
    ordersServiceMock.getAllOrders.mockReturnValue(throwError(() => error));
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    fixture.detectChanges();
    expect(consoleSpy).toHaveBeenCalledWith(error);
    expect(component.state).toBe('error');
    expect(component.orders).toEqual([]);
    const alertEl = fixture.debugElement.query(By.directive(AlertComponent));
    expect(alertEl).toBeTruthy();
    const alertInstance = alertEl.componentInstance;
    expect(alertInstance.alertState).toBe('error');
    expect(alertInstance.text).toBe('Error al cargar los pedidos');
    expect(fixture.debugElement.query(By.directive(OrdersTableComponent))).toBeFalsy();
    consoleSpy.mockRestore();
  });
});
