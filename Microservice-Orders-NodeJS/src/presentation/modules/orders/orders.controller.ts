import { Request, Response } from "express";
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
   * parámetros de la ruta.
   *
   * @param req Objeto de petición de Express
   * @param res Objeto de respuesta de Express
   *
   * @example
   * ```http
   * GET /orders/10
   * ```
   */
  getAllOrders = (req: Request, res: Response): void => {
    const { countOrders } = req.params;

    setTimeout(() => {
      this.ordersService
      .getAllOrders(Number(countOrders))
      .then((orders) => res.status(201).json(orders))
      .catch((error) => HandleError.error(error, res));
    }, 1000);
  };
}