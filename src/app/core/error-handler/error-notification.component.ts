import { Component, inject } from '@angular/core';
import { ErrorNotificationService } from './error-notification.service';

@Component({
  selector: 'app-error-notification',
  template: `
    @if (errorService.currentError()) {
      <div class="error-notification" role="alert">
        <span>{{ errorService.currentError()?.message }}</span>
        <button type="button" (click)="errorService.clearError()" aria-label="Close error">×</button>
      </div>
    }
  `,
  styles: `
    .error-notification {
      position: fixed;
      top: 1rem;
      right: 1rem;
      background: #ef4444;
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      display: flex;
      align-items: center;
      gap: 1rem;
      z-index: 1000;
      animation: slideIn 0.3s ease-out;

      button {
        background: transparent;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
        opacity: 0.8;

        &:hover {
          opacity: 1;
        }
      }
    }

    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `,
})
export class ErrorNotificationComponent {
  protected readonly errorService = inject(ErrorNotificationService);
}
