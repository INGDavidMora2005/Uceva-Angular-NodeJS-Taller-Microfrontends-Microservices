/**
 * @openapi
 * components:
 *   schemas:
 *     CourseStatus:
 *       type: string
 *       description: Estado actual del curso
 *       enum:
 *         - Pendiente
 *         - Enviado
 *         - Entregado
 *         - Cancelado
 *       example: Pendiente
 *     Course:
 *       type: object
 *       description: Representa un curso del sistema
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
 *           $ref: '#/components/schemas/CourseStatus'
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
 *           example: 'mensaje de error descriptivo'
 */
export {};
