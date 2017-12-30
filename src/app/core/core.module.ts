import { NgModule, ModuleWithProviders, Optional, SkipSelf, 
         ErrorHandler } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { CustomInterceptor } from "../helpers/Custom.Interceptor";
import { GlobalErrorHandler } from '../helpers/Global.ErrorHandler';
import { LogService } from "../helpers/logging/log.service";
import { LogPublishersService } from '../helpers/logging/log-publishers.service';

import { AuthGuard }            from '../services/auth-guard.service';
import { AuthService }          from '../services/auth.service';
import { AlertService }         from '../services/alert-service.service';

@NgModule({
  imports : [ HttpClientModule ]
})
export class CoreModule { 

  constructor(@Optional() @SkipSelf() parentModule: CoreModule){
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot () : ModuleWithProviders {
    return {
      ngModule : CoreModule,
      providers : [ AuthService, AuthGuard, AlertService,
         { provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true },
         { provide : ErrorHandler, useClass : GlobalErrorHandler },
         LogService, LogPublishersService
      ]
    }
  }
}
