import { Injectable, signal } from '@angular/core';

export interface ErrorNotification {
  message: string;
  timestamp: number;
}

@Injectable({ providedIn: 'root' })
export class ErrorNotificationService {
  readonly currentError = signal<ErrorNotification | null>(null);

  showError(message: string): void {
    this.currentError.set({ message, timestamp: Date.now() });
    setTimeout(() => this.clearError(), 5000);
  }

  clearError(): void {
    this.currentError.set(null);
  }
}
