import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersTableComponent } from './orders-table.component';
import { By } from '@angular/platform-browser';
import { ORDERS_MOCK } from '../../mocks/orders.mocks';
import { BadgeAtom } from '@brejcha13320/design-system-bootstrap';
import { CurrencyPipe, DatePipe } from '@angular/common';

describe('OrdersTableComponent', () => {
  let component: OrdersTableComponent;
  let fixture: ComponentFixture<OrdersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersTableComponent, BadgeAtom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersTableComponent);
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

  it('with empty orders list should render 0 rows in tbody', () => {
    component.orders = [];
    fixture.detectChanges();
    const tbodyRows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(tbodyRows.length).toBe(0);
  });

  it('with ORDERS_MOCK should render a row per order', () => {
    component.orders = ORDERS_MOCK;
    fixture.detectChanges();
    const tbodyRows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(tbodyRows.length).toBe(ORDERS_MOCK.length);
  });

  it('should display data in each column for each order', () => {
    component.orders = ORDERS_MOCK;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));

    rows.forEach((row, index) => {
      const order = ORDERS_MOCK[index];

      // Id
      const idCell = row.query(By.css('th')).nativeElement.textContent.trim();
      expect(idCell).toBe(order.id.toString());

      // Cliente
      const customerCell = row.queryAll(By.css('td'))[0].nativeElement.textContent.trim();
      expect(customerCell).toBe(order.customer);

      // Producto
      const productCell = row.queryAll(By.css('td'))[1].nativeElement.textContent.trim();
      expect(productCell).toBe(order.product);

      // Cantidad
      const quantityCell = row.queryAll(By.css('td'))[2].nativeElement.textContent.trim();
      expect(quantityCell).toBe(order.quantity.toString());

      // Total (con pipe currency)
      const totalCell = row.queryAll(By.css('td'))[3].nativeElement.textContent.trim();
      const currencyPipe = new CurrencyPipe('en-US');
      const expectedTotal = currencyPipe.transform(order.total, 'USD');
      const normalizedTotal = totalCell.replace(/\s/g, ' ');
      expect(normalizedTotal).toBe(expectedTotal ?? '');

      // Fecha (con pipe date)
      const dateCell = row.queryAll(By.css('td'))[4].nativeElement.textContent.trim();
      const datePipe = new DatePipe('en-US');
      const expectedDate = datePipe.transform(order.createdAt, 'dd/MM/yyyy');
      expect(dateCell).toBe(expectedDate ?? '');

      // Estado (BadgeAtom)
      const badgeEl = row.query(By.directive(BadgeAtom));
      expect(badgeEl).toBeTruthy();
    });
  });

  it('statusMap should map each status to the correct BadgeType', () => {
    expect(component.statusMap['Pendiente']).toBe('warning');
    expect(component.statusMap['Enviado']).toBe('primary');
    expect(component.statusMap['Entregado']).toBe('success');
    expect(component.statusMap['Cancelado']).toBe('danger');
  });

  it('each row should render a dsb-badge-atom', () => {
    component.orders = ORDERS_MOCK;
    fixture.detectChanges();
    const badges = fixture.debugElement.queryAll(By.directive(BadgeAtom));
    expect(badges.length).toBe(ORDERS_MOCK.length);
  });
});
