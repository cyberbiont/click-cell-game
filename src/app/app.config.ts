import { ApplicationConfig, ErrorHandler, provideBrowserGlobalErrorListeners } from '@angular/core';

import { GlobalErrorHandler } from './core/error-handler/global-error-handler';
import { provideRouter } from '@angular/router';
import routes from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), // uses DefaultErrorHandler which only does console.error()
    { provide: ErrorHandler, useClass: GlobalErrorHandler }, // custom error handler to show errors to user
    provideRouter(routes),
  ],
};
