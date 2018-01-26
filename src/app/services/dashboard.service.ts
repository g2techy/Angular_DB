import { Injectable, Injector } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { environment } from "../../environments/environment";
import { LogService } from "../helpers/logging/log.service";

import { Pager } from '../models/base.model';
import { SaleSearchResult } from '../models/sale-model';

@Injectable()
export class DashboardService {
    private apiUrl : string = '';

    constructor(private http : HttpClient, 
                private injector : Injector){
        this.apiUrl = environment.appSetting.apiBasePath + 'dashboard/';
    }

    private log(message : any) :void {
        const _logService = this.injector.get(LogService);
        _logService.info('DashboardService : ' + message);
    }

    chartData(chartTypeID : number) : Observable<any> {
        return this.http.get<any>(this.apiUrl + 'chartData?chartType=' + chartTypeID).map(
            data => {
                return data;
            }
        );
    }

    duePayments(model : Pager) : Observable<SaleSearchResult> {
        return this.http.post<SaleSearchResult>(this.apiUrl + 'duePayments', model).map(
            data => {
                return data;
            }
        );
    }

}