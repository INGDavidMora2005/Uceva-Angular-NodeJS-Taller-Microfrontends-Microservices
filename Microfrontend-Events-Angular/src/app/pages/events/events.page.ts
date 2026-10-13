import { Component, inject, OnInit } from '@angular/core';
import { EventsTableComponent } from '../../components/events-table/events-table.component';
import { AlertComponent } from '../../components/alert/alert.component';
import { CampusEvent } from '../../interfaces/events.interface';
import { State } from '../../interfaces/state.interface';
import { EventsService } from '../../services/events/events.service';

/**
 * Componente página de eventos.
 *
 * @description
 * Gestiona la carga y visualización de la lista de eventos del campus.
 *
 * @remarks
 * Consume `EventsService` para obtener los datos y utiliza
 * `EventsTableComponent` para mostrarlos en una tabla. Mientras carga
 * o si ocurre un error, muestra un `AlertComponent` con el mensaje
 * correspondiente. Es el componente que se expone al Host como `./EventsPage`.
 */
@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  imports: [EventsTableComponent, AlertComponent],
})
export class EventsPage implements OnInit {
  /**
   * Listado de eventos a mostrar.
   */
  events: CampusEvent[] = [];

  /**
   * Estado actual del componente.
   * @default 'init'
   */
  state: State = 'init';

  /**
   * Servicio para obtener eventos.
   */
  private eventsService = inject(EventsService);

  /**
   * Cantidad de eventos a solicitar.
   */
  private readonly eventsCount = 10;

  /**
   * Inicializa la carga de eventos.
   *
   * @remarks
   * Cambia el estado a `loading`, solicita los eventos al servicio y
   * pasa a `success` o `error` según la respuesta.
   */
  ngOnInit(): void {
    this.state = 'loading';
    this.eventsService.getAllEvents(this.eventsCount).subscribe({
      next: (events) => {
        this.events = events;
        this.state = 'success';
      },
      error: (error) => {
        console.error(error);
        this.state = 'error';
      },
    });
  }
}
