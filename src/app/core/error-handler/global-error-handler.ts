import { ErrorHandler, Injectable, inject, isDevMode } from '@angular/core';

import { ErrorNotificationService } from './error-notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private readonly notificationService = inject(ErrorNotificationService);

  handleError(error: Error): void {
    const message = this.getErrorMessage(error);

    if (isDevMode()) {
      console.error('[GlobalErrorHandler]', error);
    }

    this.notificationService.showError(message);
  }

  private getErrorMessage(error: Error): string {
    return error.message ?? 'An unexpected error occurred. Please try again.';
  }
}
