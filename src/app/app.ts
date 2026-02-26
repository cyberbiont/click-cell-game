import { Component } from '@angular/core';
import { ErrorNotificationComponent } from './core/error-handler/error-notification.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ErrorNotificationComponent],
  template: `
    <app-error-notification />
    <router-outlet />
  `,
  styles: '',
})
export class App {}
