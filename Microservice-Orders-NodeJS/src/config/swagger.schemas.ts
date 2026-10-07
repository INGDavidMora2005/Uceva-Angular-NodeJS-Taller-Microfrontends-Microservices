/**
 * @openapi
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       description: Representa un pedido del sistema
 *       required:
 *         - id
 *         - userId
 *         - total
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         userId:
 *           type: number
 *           example: 101
 *         total:
 *           type: number
 *           example: 150000
 *         products:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Product'
 *           description: Lista de productos en el pedido (uses Product schema)
 *       createdAt:
 *         type: string
 *         format: date-time
 *         example: '2024-01-15T10:30:00Z'
 *     Product:
 *       type: object
 *       description: Representa un producto del sistema
 *       required:
 *         - id
 *         - name
 *         - category
 *         - price
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         name:
 *           type: string
 *           example: Leche entera
 *         category:
 *           type: string
 *           enum:
 *             - Lacteos
 *             - Carnes
 *             - Frutas
 *             - Verduras
 *           example: Lacteos
 *         price:
 *           type: number
 *           example: 4500
 */
export {};