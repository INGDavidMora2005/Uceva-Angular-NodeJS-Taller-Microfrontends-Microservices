/**
 * @openapi
 * components:
 *   schemas:
 *     OrderStatus:
 *       type: string
 *       description: Estado actual del pedido
 *       enum:
 *         - Pendiente
 *         - Enviado
 *         - Entregado
 *         - Cancelado
 *       example: Pendiente
 *     Order:
 *       type: object
 *       description: Representa un pedido del sistema
 *       required:
 *         - id
 *         - customer
 *         - product
 *         - quantity
 *         - total
 *         - status
 *         - createdAt
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         customer:
 *           type: string
 *           example: Juan Pérez
 *         product:
 *           type: string
 *           example: Laptop Gamer
 *         quantity:
 *           type: integer
 *           example: 2
 *         total:
 *           type: number
 *           example: 5000.50
 *         status:
 *           $ref: '#/components/schemas/OrderStatus'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: '2024-01-15T10:30:00Z'
 *     Error:
 *       type: object
 *       description: Objeto de error estandarizado
 *       properties:
 *         error:
 *           type: string
 *           example: 'Mensaje de error descriptivo'
 */
export {};
