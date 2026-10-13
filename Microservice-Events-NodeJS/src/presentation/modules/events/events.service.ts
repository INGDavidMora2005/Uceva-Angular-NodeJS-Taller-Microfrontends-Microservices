import { faker } from '@faker-js/faker';
import { CampusEvent, EventCategory } from '../../../domain/interfaces/campus-event.interface';

/**
 * Lugares del campus donde se pueden realizar los eventos.
 */
const LOCATIONS: string[] = [
  'Auditorio Principal',
  'Bloque A - Sala 201',
  'Coliseo',
  'Biblioteca',
  'Laboratorio de Sistemas',
  'Cafetería Central',
];

/**
 * Categorías disponibles para los eventos.
 */
const CATEGORIES: EventCategory[] = ['Academico', 'Cultural', 'Deportivo', 'Tecnologico'];

/**
 * Servicio encargado de la generación y gestión de eventos del campus.
 *
 * @remarks
 * Este servicio utiliza la librería `faker` para generar eventos
 * ficticios, principalmente con fines de prueba o demostración.
 */
export class EventsService {

  /**
   * Obtiene un listado de eventos generados dinámicamente.
   *
   * @param countEvents Cantidad de eventos a generar
   * @returns Promesa que resuelve un arreglo de eventos
   *
   * @example
   * ```ts
   * const events = await eventsService.getAllEvents(10);
   * ```
   */
  public async getAllEvents(countEvents: number): Promise<CampusEvent[]> {
    const events: CampusEvent[] = [];

    for (let i = 1; i <= countEvents; i++) {
      events.push(this.generateEvent(i));
    }

    return Promise.resolve(events);
  }

  /**
   * Genera un evento ficticio.
   *
   * @param id Identificador único del evento
   * @returns Evento generado
   */
  private generateEvent(id: number): CampusEvent {
    const words = faker.lorem.words(3);

    return {
      id,
      title: words.charAt(0).toUpperCase() + words.slice(1),
      location: faker.helpers.arrayElement(LOCATIONS),
      date: faker.date.soon({ days: 60 }).toISOString(),
      capacity: faker.number.int({ min: 20, max: 500 }),
      category: faker.helpers.arrayElement(CATEGORIES),
    };
  }
}
