import { ErrorHandler, Injectable, Injector } from '@angular/core';

import { AlertService } from "../services/alert-service.service";
import { LogService } from "../helpers/logging/log.service";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) { }

  handleError(error : any) : void {
    const alertService = this.injector.get(AlertService);
    const message = error.error ? error.error.message : error.message;
    alertService.error(message);
    //console.log(`GlobalErrorHandler.handleError error : ${message}`);
    const logService = this.injector.get(LogService);
    logService.error(message);
  }
  
}