import { CampusEvent } from '../interfaces/events.interface';

/**
 * Listado de eventos de prueba.
 *
 * @remarks
 * Contiene un evento por cada categoría (`EventCategory`) y fechas ISO fijas,
 * para que las pruebas unitarias sean deterministas.
 *
 * @example
 * ```ts
 * component.events = EVENTS_MOCK;
 * fixture.detectChanges();
 * ```
 */
export const EVENTS_MOCK: CampusEvent[] = [
  {
    id: 1,
    title: 'Congreso de Investigación',
    location: 'Auditorio Principal',
    date: '2026-04-06T09:00:00.000Z',
    capacity: 300,
    category: 'Academico'
  },
  {
    id: 2,
    title: 'Festival de Música Andina',
    location: 'Plazoleta Central',
    date: '2026-04-10T17:30:00.000Z',
    capacity: 500,
    category: 'Cultural'
  },
  {
    id: 3,
    title: 'Torneo Interfacultades de Fútbol',
    location: 'Cancha Sintética',
    date: '2026-04-15T14:00:00.000Z',
    capacity: 150,
    category: 'Deportivo'
  },
  {
    id: 4,
    title: 'Hackathon de Inteligencia Artificial',
    location: 'Laboratorio de Sistemas',
    date: '2026-04-20T08:15:00.000Z',
    capacity: 80,
    category: 'Tecnologico'
  }
];
