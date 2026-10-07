/**
 * Interfaz que representa un pedido.
 *
 * Contiene la información básica necesaria para mostrar un pedido
 * en la tabla o en cualquier componente de listado.
 *
 * @remarks
 * Cada pedido debe tener un `id` único, un `userId` del usuario,
 * un `total` en pesos colombianos, opcionalmente lista de productos
 * y fecha de creación.
 *
 * @example
 * ```ts
 * const pedido: Order = {
 *   id: 1,
 *   userId: 101,
 *   total: 150000,
 *   products: [
 *     { id: 1, name: 'Leche entera', category: 'Lacteos', price: 4500 },
 *     { id: 2, name: 'Carne', category: 'Carnes', price: 25000 }
 *   ],
 *   createdAt: new Date().toISOString()
 * };
 * ```
 */
export interface Order {
    /** Identificador único del pedido */
    id: number;

    /** ID del usuario que realizó el pedido */
    userId: number;

    /** Total del pedido en pesos */
    total: number;

    /** Lista de productos en el pedido (usa schema Product de Swagger) */
    products?: Array<{
        id: number;
        name: string;
        category: string;
        price: number;
    }>;

    /** Fecha de creación del pedido */
    createdAt: string;
}

// TODO(orders): reemplazar por modelo Order completo con tipado estricto
// Por ahora usa Product temporalmente para compatibilidad con Faker
import { Product, ProductCategory } from './product.interface';