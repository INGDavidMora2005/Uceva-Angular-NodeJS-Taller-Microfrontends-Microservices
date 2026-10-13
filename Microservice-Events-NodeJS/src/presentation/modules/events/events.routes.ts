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
     *     summary: Obtener listado de eventos del campus
     *     description: Retorna una lista de eventos del campus generados dinámicamente según la cantidad solicitada.
     *     tags:
     *       - Events
     *     parameters:
     *       - in: path
     *         name: countEvents
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *           example: 5
     *         description: Cantidad de eventos a generar
     *     responses:
     *       200:
     *         description: Lista de eventos generados
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/CampusEvent'
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
