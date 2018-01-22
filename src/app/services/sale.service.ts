import { Injectable, Injector } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { environment } from "../../environments/environment";
import { AuthService } from './auth.service';
import { LogService } from "../helpers/logging/log.service";

import { AppConstants } from "../models/constants";
import { SaleSearch, SaleSearchResult, Sale, Party, SaleAdd, SalePayment, SalePaymentAdd,
         SaleBrokerage, SaleBrokerageAdd, SaleBrokPayment, SaleReport, Status, SaleBrokerageReport } from '../models/sale-model';

const reqOptions = {
    headers : new HttpHeaders().set(AppConstants.downloadFileHeaderKey,"")
};

@Injectable()
export class SaleService {
    private apiUrl : string = '';

    constructor(private http : HttpClient, private injector : Injector){
        this.apiUrl = environment.appSetting.apiBasePath + 'sale/';
    }

    private log(message : any) :void {
        const _logService = this.injector.get(LogService);
        _logService.info('SaleService : ' + message);
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

    getStatusList() : Observable<Status[]> {
        return this.http.get<Status[]>(this.apiUrl + 'statusList')
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

    report(model : SaleReport) : Observable<any> {
        return this.http.post<any>(this.apiUrl + 'report', model)
            .map(data =>{
                return data;
            }
        );
    }

    downloadReport(model : SaleReport) : Observable<boolean> {
        return this.http.post<Blob>(this.apiUrl + 'downloadReport', model, reqOptions)
            .map((buffer ) => {
                this.openReportWin(buffer);
                return true;
            }
        );
    }

    brokerageReport(model : SaleBrokerageReport) : Observable<any> {
        return this.http.post<any>(this.apiUrl + 'brokerageReport', model)
            .map(data =>{
                return data;
            }
        );
    }

    downloadBrokerageReport(model : SaleBrokerageReport) : Observable<boolean> {
        return this.http.post<Blob>(this.apiUrl + 'downloadBrokerageReport', model, reqOptions)
            .map((buffer ) => {
                this.openReportWin(buffer);
                return true;
            }
        );
    }

    private openReportWin(data : any) : void {
        let blob = new Blob([data], { type: AppConstants.excelContentType });
        window.open(window.URL.createObjectURL(blob)); 
    }
    
}