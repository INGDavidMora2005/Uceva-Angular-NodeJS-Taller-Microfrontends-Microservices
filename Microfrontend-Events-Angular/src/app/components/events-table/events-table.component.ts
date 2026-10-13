import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BadgeAtom, BadgeType } from '@brejcha13320/design-system-bootstrap';
import { CampusEvent, EventCategory } from '../../interfaces/events.interface';

/**
 * Tabla de eventos reutilizable.
 *
 * @description
 * Muestra una tabla con la información de una lista de eventos del campus:
 * id, título, lugar, fecha, capacidad y categoría.
 *
 * @remarks
 * El componente es *standalone* y no requiere que el módulo consumidor lo
 * declare. Usa `BadgeAtom` del Design System para pintar la categoría y
 * `DatePipe` de `@angular/common` para formatear la fecha.
 *
 * @example
 * ```html
 * <app-events-table [events]="events"></app-events-table>
 * ```
 */
@Component({
  selector: 'app-events-table',
  standalone: true,
  imports: [BadgeAtom, DatePipe],
  templateUrl: './events-table.component.html'
})
export class EventsTableComponent {
  /**
   * Lista de eventos a mostrar.
   *
   * @remarks
   * Si se pasa una lista vacía el cuerpo de la tabla mostrará 0 filas. El
   * componente no hace ninguna validación extra.
   */
  @Input() events: CampusEvent[] = [];

  /**
   * Mapa de colores del badge según la categoría del evento.
   *
   * @remarks
   * Relaciona cada `EventCategory` con un `BadgeType` del Design System.
   */
  categoryMap: Record<EventCategory, BadgeType> = {
    Academico: 'primary',
    Cultural: 'warning',
    Deportivo: 'success',
    Tecnologico: 'info'
  };
}
