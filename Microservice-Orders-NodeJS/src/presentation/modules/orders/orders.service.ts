import { faker } from '@faker-js/faker';
import { Product, ProductCategory } from '../../../domain/interfaces/product.interface';

/**
 * Servicio encargado de la generación y gestión de pedidos.
 *
 * @remarks
 * Este servicio utiliza la librería `faker` para generar pedidos
 * ficticios, principalmente con fines de prueba o demostración.
 */
export class OrdersService {

  /**
   * Categorías disponibles para los productos.
   *
   * @remarks
   * Se utilizan para asignar aleatoriamente una categoría
   * a cada producto generado.
   */
  private categories: ProductCategory[] = [
    'Lacteos',
    'Frutas',
    'Carnes',
    'Verduras'
  ];

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
  public async getAllOrders(countOrders: number): Promise<any[]> {
    const orders: Promise<any>[] = [];

    for (let i = 1; i <= countOrders; i++) {
      orders.push(this.generateOrder(i));
    }

    return Promise.all(orders);
  }

  /**
   * Genera un pedido ficticio.
   *
   * @param id Identificador único del pedido
   * @returns Promesa que resuelve un pedido generado
   */
  private generateOrder(id: number): Promise<any> {
    // TODO(orders): reemplazar por modelo Order
    const productCount = faker.number.int({ min: 1, max: 5 });
    const products: Product[] = [];

    for (let j = 1; j <= productCount; j++) {
      products.push({
        id: j,
        name: faker.commerce.productName(),
        price: Number(
          faker.commerce.price({ min: 1, max: 100, dec: 2 })
        ),
        category: faker.helpers.arrayElement(this.categories),
      });
    }

    const total = products.reduce((sum, p) => sum + p.price, 0);

    return Promise.resolve({
      id,
      userId: faker.number.int({ min: 100, max: 200 }),
      total,
      products,
      createdAt: faker.date.recent().toISOString(),
    });
  }
}