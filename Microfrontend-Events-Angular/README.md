# Microfrontend Events Angular

Microfrontend de **eventos del campus** del Taller 5. Muestra en una tabla el listado de eventos (id, título, lugar, fecha, capacidad y categoría) que entrega el microservicio de eventos, con estados de carga y error.

Se integra en el Host (`Client-Host-Angular`) mediante **Webpack Module Federation**.

## Datos del microfrontend

| Dato | Valor |
| --- | --- |
| Puerto | `4205` |
| Nombre del remote | `mf-events` |
| Remote entry | `http://localhost:4205/remoteEntry.js` |
| Módulo expuesto | `./EventsPage` → `src/app/pages/events/events.page.ts` |
| Microservicio que consume | `http://localhost:3005/api/events/:count` (puerto `3005`) |
| Angular | `20.3.14` |

La página solicita **10 eventos** al iniciar.

## Estructura

```
src/app/
├── components/
│   ├── alert/          # AlertComponent: alertas de carga y error
│   └── events-table/   # EventsTableComponent (app-events-table): tabla con badges por categoría
├── interfaces/
│   ├── events.interface.ts  # CampusEvent y EventCategory
│   └── state.interface.ts   # State y AlertState
├── mocks/
│   └── events.mocks.ts      # EVENTS_MOCK para las pruebas
├── pages/
│   └── events/         # EventsPage (app-events): estados init, loading, success y error
└── services/
    └── events/         # EventsService: getAllEvents(countEvents)
```

Colores de las categorías: `Academico` → primary, `Cultural` → warning, `Deportivo` → success, `Tecnologico` → info.

## Instalación

```bash
npm ci
```

## Scripts

| Script | Descripción |
| --- | --- |
| `npm start` | Levanta el servidor de desarrollo en `http://localhost:4205`. |
| `npm test` | Ejecuta las pruebas unitarias con Jest. |
| `npm run test:coverage` | Ejecuta las pruebas y genera el reporte de cobertura en `coverage/`. |
| `npm run compodoc` | Genera la documentación TSDoc en `documentation/`. |

## Cómo probarlo en el Host

1. Levanta el microservicio de eventos en el puerto `3005`.
2. Levanta este microfrontend:

   ```bash
   npm start
   ```

3. Verifica que `http://localhost:4205/remoteEntry.js` responda.
4. Levanta el Host (`Client-Host-Angular`) y abre la ruta **`/events`** (opción "Eventos" del menú).

También se puede abrir directamente `http://localhost:4205/` para ver la página de forma aislada.
