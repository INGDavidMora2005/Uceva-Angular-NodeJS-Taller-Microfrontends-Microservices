/**
 * @openapi
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       description: Representa un curso del sistema
 *       required:
 *         - id
 *         - name
 *         - teacher
 *         - credits
 *         - semester
 *         - modality
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Matemáticas
 *         teacher:
 *           type: string
 *           example: Juan Pérez
 *         credits:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *           example: 4
 *         semester:
 *           type: integer
 *           minimum: 1
 *           maximum: 10
 *           example: 3
 *         modality:
 *           type: string
 *           enum:
 *             - Presencial
 *             - Virtual
 *             - Hibrido
 *           example: Presencial
 *     Error:
 *       type: object
 *       description: Objeto de error estandarizado
 *       properties:
 *         error:
 *           type: string
 *           example: 'mensaje de error descriptivo'
 */
export {};