import { Router } from "express";
import { EventsController } from "./events.controller";

export class EventsRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new EventsController();

    /**
     * @openapi
     * /api/events/{countEvents}:
     *   get:
     *     summary: Obtener listado de pedidos
     *     description: Retorna una lista de pedidos generados dinámicamente según la cantidad solicitada.
     *     tags:
     *       - Orders
     *     parameters:
     *       - in: path
     *         name: countEvents
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *           example: 5
     *         description: Cantidad de pedidos a generar
     *     responses:
     *       200:
     *         description: Lista de pedidos generados
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Order'
     *       400:
     *         description: Parámetro inválido
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     *       500:
     *         description: Error interno del servidor
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    router.get("/:countEvents", controller.getAllEvents);

    return router;
  }
}
