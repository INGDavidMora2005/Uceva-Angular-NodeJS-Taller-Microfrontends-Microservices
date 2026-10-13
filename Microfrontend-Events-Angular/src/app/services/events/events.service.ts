import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CampusEvent } from '../../interfaces/events.interface';

/**
 * Servicio encargado de la gestión de eventos del campus.
 *
 * Proporciona métodos para obtener información de eventos
 * desde la API REST del microservicio de eventos.
 *
 * @remarks
 * Consume el microservicio que corre en `http://localhost:3005`.
 *
 * @example
 * ```ts
 * private eventsService = inject(EventsService);
 *
 * this.eventsService.getAllEvents(10).subscribe(events => {
 *   console.log(events);
 * });
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class EventsService {

  /**
   * Cliente HTTP de Angular para realizar peticiones a la API.
   * Se inyecta usando la función `inject`.
   */
  private httpClient = inject(HttpClient);

  /**
   * Obtiene una lista de eventos desde el backend.
   *
   * @param countEvents Número de eventos a obtener.
   * @returns Observable que emite un array de eventos.
   *
   * @example
   * ```ts
   * this.eventsService.getAllEvents(5).subscribe(events => {
   *   console.log(events);
   * });
   * ```
   */
  getAllEvents(countEvents: number): Observable<CampusEvent[]> {
    return this.httpClient.get<CampusEvent[]>(`http://localhost:3005/api/events/${countEvents}`);
  }
}
