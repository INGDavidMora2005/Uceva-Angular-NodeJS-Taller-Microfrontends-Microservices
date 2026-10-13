import { Request, Response } from "express";
import { CustomError } from "../../../domain/erros/custom.error";
import { HandleError } from "../../../domain/erros/handle.error";
import { EventsService } from "./events.service";

/**
 * Controlador de eventos del campus.
 *
 * @remarks
 * Esta clase maneja las peticiones HTTP relacionadas con eventos,
 * delegando la lógica de negocio al `EventsService`.
 */
export class EventsController {

  /**
   * Servicio de eventos.
   */
  private readonly eventsService = new EventsService();

  /**
   * Maneja la petición HTTP para obtener un listado de eventos.
   *
   * @remarks
   * El número de eventos a generar se obtiene desde los
   * parámetros de la ruta y se valida que sea un número entero mayor o igual a 1.
   * Responde 200 con la lista de eventos o 400 si el parámetro es inválido.
   *
   * @param req Objeto de petición de Express
   * @param res Objeto de respuesta de Express
   *
   * @example
   * ```http
   * GET /api/events/10
   * ```
   */
  getAllEvents = (req: Request, res: Response): void => {
    const { countEvents } = req.params;

    try {
      const count = Number(countEvents);

      if (isNaN(count) || !Number.isInteger(count) || count < 1) {
        throw CustomError.badRequest(
          "El parámetro countEvents debe ser un número entero mayor o igual a 1"
        );
      }

      setTimeout(() => {
        this.eventsService
          .getAllEvents(count)
          .then((events) => res.status(200).json(events))
          .catch((error) => HandleError.error(error, res));
      }, 1000);
    } catch (error) {
      HandleError.error(error, res);
    }
  };
}
