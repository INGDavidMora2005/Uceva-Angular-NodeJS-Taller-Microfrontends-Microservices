import { faker } from '@faker-js/faker';
import { Order, OrderStatus } from '../../../domain/interfaces/order.interface';

/**
 * Servicio encargado de la generación y gestión de pedidos.
 *
 * @remarks
 * Este servicio utiliza la librería `faker` para generar pedidos
 * ficticios, principalmente con fines de prueba o demostración.
 */
export class OrdersService {

  /**
   * Obtiene un listado de pedidos generados dinámicamente.
   *
   * @param countOrders Cantidad de pedidos a generar
   * @returns Promesa que resuelve un arreglo de pedidos
   *
   * @example
   * ```ts
   * const orders = await ordersService.getAllOrders(10);
   * ```
   */
  public async getAllOrders(countOrders: number): Promise<Order[]> {
    const orders: Order[] = [];

    for (let i = 1; i <= countOrders; i++) {
      orders.push(this.generateOrder(i));
    }

    return Promise.resolve(orders);
  }

  /**
   * Genera un pedido ficticio.
   *
   * @param id Identificador único del pedido
   * @returns Pedido generado
   */
  private generateOrder(id: number): Order {
    const quantity = faker.number.int({ min: 1, max: 10 });
    const unitPrice = Number(faker.commerce.price({ min: 10, max: 500, dec: 2 }));
    const total = Number((quantity * unitPrice).toFixed(2));
    const status = faker.helpers.arrayElement<OrderStatus>([
      'Pendiente',
      'Enviado',
      'Entregado',
      'Cancelado',
    ]);

    return {
      id,
      customer: faker.person.fullName(),
      product: faker.commerce.productName(),
      quantity,
      total,
      status,
      createdAt: faker.date.recent({ days: 60 }).toISOString(),
    };
  }
}