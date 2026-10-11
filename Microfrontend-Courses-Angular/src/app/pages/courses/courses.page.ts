import { Component, inject, OnInit } from '@angular/core';
import { OrdersTableComponent } from '../../components/orders-table/orders-table.component';
import { AlertComponent } from '../../components/alert/alert.component';
import { Order } from '../../interfaces/orders.interface';
import { State } from '../../interfaces/state.interface';
import { OrdersService } from '../../services/orders/orders.service';

/**
 * Componente página de pedidos.
 *
 * @description
 * Gestiona la carga y visualización de la lista de pedidos.
 *
 * @remarks
 * Consume `OrdersService` para obtener los datos y utiliza
 * `OrdersTableComponent` para mostrarlos en una tabla.
 */
@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  imports: [OrdersTableComponent, AlertComponent],
})
export class OrdersPage implements OnInit {
  /**
   * Listado de pedidos a mostrar.
   */
  orders: Order[] = [];

  /**
   * Estado actual del componente.
   * @default 'init'
   */
  state: State = 'init';

  /**
   * Servicio para obtener pedidos.
   */
  private ordersService = inject(OrdersService);

  /**
   * Cantidad de pedidos a solicitar.
   */
  private readonly ordersCount = 10;

  /**
   * Inicializa la carga de pedidos.
   */
  ngOnInit(): void {
    this.state = 'loading';
    this.ordersService.getAllOrders(this.ordersCount).subscribe({
      next: (orders) => {
        this.orders = orders;
        this.state = 'success';
      },
      error: (error) => {
        console.error(error);
        this.state = 'error';
      },
    });
  }
}
