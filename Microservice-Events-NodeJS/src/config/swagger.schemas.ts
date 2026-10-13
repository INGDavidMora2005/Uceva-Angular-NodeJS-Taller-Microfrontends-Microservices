/**
 * @openapi
 * components:
 *   schemas:
 *     EventCategory:
 *       type: string
 *       description: Categoría del evento del campus
 *       enum:
 *         - Academico
 *         - Cultural
 *         - Deportivo
 *         - Tecnologico
 *       example: Academico
 *     CampusEvent:
 *       type: object
 *       description: Representa un evento del campus universitario
 *       required:
 *         - id
 *         - title
 *         - location
 *         - date
 *         - capacity
 *         - category
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: Semana de la ingeniería
 *         location:
 *           type: string
 *           example: Auditorio Principal
 *         date:
 *           type: string
 *           format: date-time
 *           example: '2026-11-15T10:30:00Z'
 *         capacity:
 *           type: integer
 *           minimum: 20
 *           maximum: 500
 *           example: 200
 *         category:
 *           $ref: '#/components/schemas/EventCategory'
 *     Error:
 *       type: object
 *       description: Objeto de error estandarizado
 *       properties:
 *         error:
 *           type: string
 *           example: 'Mensaje de error descriptivo'
 */
export {};
