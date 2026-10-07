import { Request, Response } from "express";
import { CustomError } from "../../../domain/erros/custom.error";
import { HandleError } from "../../../domain/erros/handle.error";
import { OrdersService } from "./orders.service";

/**
 * Controlador de pedidos.
 *
 * @remarks
 * Esta clase maneja las peticiones HTTP relacionadas con pedidos,
 * delegando la lógica de negocio al `OrdersService`.
 */
export class OrdersController {

  /**
   * Servicio de pedidos.
   */
  private readonly ordersService = new OrdersService();

  /**
   * Maneja la petición HTTP para obtener un listado de pedidos.
   *
   * @remarks
   * El número de pedidos a generar se obtiene desde los
   * parámetros de la ruta y se valida que sea un número entero mayor o igual a 1.
   *
   * @param req Objeto de petición de Express
   * @param res Objeto de respuesta de Express
   *
   * @example
   * ```http
   * GET /api/orders/10
   * ```
   */
  getAllOrders = (req: Request, res: Response): void => {
    const { countOrders } = req.params;

    try {
      const count = Number(countOrders);

      if (isNaN(count) || !Number.isInteger(count) || count < 1) {
        throw CustomError.badRequest(
          "El parámetro countOrders debe ser un número entero mayor o igual a 1"
        );
      }

      setTimeout(() => {
        this.ordersService
          .getAllOrders(count)
          .then((orders) => res.status(200).json(orders))
          .catch((error) => HandleError.error(error, res));
      }, 1000);
    } catch (error) {
      HandleError.error(error, res);
    }
  };
}
