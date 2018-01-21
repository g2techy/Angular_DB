import { Injectable, Injector} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse,
         HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { AppConstants } from "../models/constants";
import { AuthService } from '../services/auth.service';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
    constructor(private injector : Injector){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = this.authToken();
        if(req.method !== 'OPTIONS'){
            if(token !== undefined){
                req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
            }
        }
        if (!req.headers.has('Content-Type')) {
            let contentType = 'application/json';
            if(req.url.indexOf('/token') > -1){
                contentType = 'application/x-www-form-urlencoded';
            }
            req = req.clone({ headers: req.headers.set('Content-Type', contentType) });
        }
        if(req.headers.has(AppConstants.downloadFileHeaderKey)){
            req = req.clone({ headers: req.headers.set('Accept', 'application/json'), responseType : 'blob' });
        }else {
            req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
        }
        return next.handle(req);
    }

    private authToken() : string {
        let authService = this.injector.get(AuthService);
        return authService.getToken();
    };
}