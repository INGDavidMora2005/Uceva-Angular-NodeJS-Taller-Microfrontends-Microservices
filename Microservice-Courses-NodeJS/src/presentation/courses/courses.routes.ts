import { Router } from "express";
import { CoursesController } from "./courses.controller";

export class CoursesRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new CoursesController();

    /**
     * @openapi
     * /api/courses/{countCourses}:
     *   get:
     *     summary: Obtener listado de cursos
     *     description: Retorna una lista de cursos generados dinámicamente según la cantidad solicitada.
     *     tags:
     *       - Courses
     *     parameters:
     *       - in: path
     *         name: countCourses
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *           example: 5
     *         description: Cantidad de cursos a generar
     *     responses:
     *       200:
     *         description: Lista de cursos generados
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Course'
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
    router.get("/:countCourses", controller.getAllCourses);

    return router;
  }
}
