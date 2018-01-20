import { Injectable, Injector } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { environment } from "../../environments/environment";
import { AuthService } from './auth.service';
import { LogService } from "../helpers/logging/log.service";

import { SaleSearch, SaleSearchResult, Sale, Party, SaleAdd, SalePayment, SalePaymentAdd,
         SaleBrokerage, SaleBrokerageAdd, SaleBrokPayment } from '../models/sale-model';

@Injectable()
export class SaleService {
    private apiUrl : string = '';

    constructor(private http : HttpClient, private injector : Injector){
        this.apiUrl = environment.appSetting.apiBasePath + 'sale/';
    }

    private log(message : any) :void {
        const _logService = this.injector.get(LogService);
        _logService.info('partyServie : ' + message);
    }

    search(model : SaleSearch) : Observable<SaleSearchResult> {
        return this.http.post<SaleSearchResult>(this.apiUrl + 'search',model).map(
            data => {
                return data;
            }
        );
    }

    getPartyList(partyTypeID : number) : Observable<Party[]> {
        return this.http.get<Party[]>(this.apiUrl + 'partyList?partyTypeID=' + partyTypeID)
            .map(data => {
                return data;
            }
        );
    }
    getSale(saleID : number) : Observable<SaleAdd> {
        return this.http.get<SaleAdd>(this.apiUrl + 'sale?saleID=' + saleID)
            .map( sale => {
                return sale;
            }
        );
    }

    add(model : SaleAdd) : Observable<number> {
        return this.http.post<number>(this.apiUrl + 'add', model)
            .map(saleID =>{
                return saleID;
            }
        );
    }

    delete(saleID : number) : Observable<number> {
        return this.http.post<number>(this.apiUrl + 'delete?saleID=' + saleID, {})
            .map(saleID =>{
                return saleID;
            }
        );
    }

    close(saleID : number) : Observable<number> {
        return this.http.post<number>(this.apiUrl + 'close?saleID=' + saleID, {})
            .map(saleID =>{
                return saleID;
            }
        );
    }

    payment(saleID : number) : Observable<SalePayment> {
        return this.http.get<SalePayment>(this.apiUrl + 'payment?saleID=' + saleID, {}).
            map(data => {
                return data;
            }
        );
    }

    addPayment(model : SalePaymentAdd) : Observable<number> {
        return this.http.post<number>(this.apiUrl + 'addPayment', model)
            .map(payID =>{
                return payID;
            }
        );
    }

    deletePayment(payID : number) : Observable<number> {
        return this.http.post<number>(this.apiUrl + 'deletePayment?payID=' + payID, {})
            .map(id =>{
                console.log(` payID: ${id}`);
                return id;
            }
        );
    }

    brokerage(saleID : number) : Observable<SaleBrokerage[]> {
        return this.http.get<SaleBrokerage[]>(this.apiUrl + 'brokerage?saleID=' + saleID, {}).
            map(data => {
                return data;
            }
        );
    }
    
    addBrokerage(model : SaleBrokerageAdd) : Observable<number> {
        return this.http.post<number>(this.apiUrl + 'addBrokerage', model)
            .map(bdID =>{
                return bdID;
            }
        );
    }

    deleteBrokerage(bdID : number) : Observable<number> {
        return this.http.post<number>(this.apiUrl + 'deleteBrokerage?bDID=' + bdID, {})
            .map(id =>{
                return id;
            }
        );
    }

    brokeragePayment(model : SaleBrokPayment) : Observable<number> {
        return this.http.post<number>(this.apiUrl + 'brokPayment', model)
            .map(bdID =>{
                return bdID;
            }
        );
    }
}