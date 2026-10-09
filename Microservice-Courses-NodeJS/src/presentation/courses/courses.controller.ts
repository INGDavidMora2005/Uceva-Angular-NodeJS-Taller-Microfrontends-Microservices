import { Request, Response } from "express";
import { CustomError } from "../../domain/erros/custom.error";
import { HandleError } from "../../domain/erros/handle.error";
import { CoursesService } from "./courses.service";

/**
 * Controlador de cursos.
 *
 * @remarks
 * Esta clase maneja las peticiones HTTP relacionadas con cursos,
 * delegando la lógica de negocio al `CoursesService`.
 */
export class CoursesController {

  /**
   * Servicio de cursos.
   */
  private readonly coursesService = new CoursesService();

  /**
   * Maneja la petición HTTP para obtener un listado de cursos.
   *
   * @remarks
   * El número de cursos a generar se obtiene desde los
   * parámetros de la ruta y se valida que sea un número entero mayor o igual a 1.
   *
   * @param req Objeto de petición de Express
   * @param res Objeto de respuesta de Express
   *
   * @example
   * ```http
   * GET /api/courses/10
   * ```
   */
  getAllCourses = (req: Request, res: Response): void => {
    const { countCourses } = req.params;

    try {
      const count = Number(countCourses);

      if (isNaN(count) || !Number.isInteger(count) || count < 1) {
        throw CustomError.badRequest(
          "El parámetro countCourses debe ser un número entero mayor o igual a 1"
        );
      }

      setTimeout(() => {
        this.coursesService
          .getAllCourses(count)
          .then((courses) => res.status(200).json(courses))
          .catch((error) => HandleError.error(error, res));
      }, 1000);
    } catch (error) {
      HandleError.error(error, res);
    }
  };
}
