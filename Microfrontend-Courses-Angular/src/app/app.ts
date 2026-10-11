import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Componente raíz de la aplicación.
 *
 * @remarks
 * Este componente actúa como punto de entrada principal
 * del microfrontend de pedidos (Orders). Define la estructura base
 * y renderiza las vistas según el sistema de rutas.
 *
 * Es responsable de:
 * - Inicializar el layout general
 * - Renderizar las vistas según el sistema de rutas
 */
@Component({
  selector: 'app-root',
  template: '<router-outlet />',
  styleUrl: './app.scss',
  imports: [RouterOutlet],
})
export class App { }
