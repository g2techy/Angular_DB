import { Injectable, Injector } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { environment } from "../../environments/environment";
import { AuthService } from './auth.service';
import { LogService } from "../helpers/logging/log.service";

import { AppConstants } from "../models/constants";
import { Party } from "../models/sale-model";
import { LoanAdd, Loan, LoanSearch, LoanSearchResult, LoanPaymentAdd, LoanPayment, LoanCalcInterest } from '../models/loan.model';

const reqOptions = {
    headers : new HttpHeaders().set(AppConstants.downloadFileHeaderKey,"")
};

@Injectable()
export class LoanService {
    private apiUrl : string = '';

    constructor(private http : HttpClient, private injector : Injector){
        this.apiUrl = environment.appSetting.apiBasePath + 'loan/';
    }

    private log(message : any) :void {
        const _logService = this.injector.get(LogService);
        _logService.info('LoanService : ' + message);
    }

    search(model : LoanSearch) : Observable<LoanSearchResult> {
        return this.http.post<LoanSearchResult>(this.apiUrl + 'search',model).map(
            data => {
                return data;
            }
        );
    }

    getBorrowerList(partyTypeID : number) : Observable<Party[]> {
        return this.http.get<Party[]>(this.apiUrl + 'borrowerList?partyTypeID=' + partyTypeID)
            .map(data => {
                return data;
            }
        );
    }

    /*
    getStatusList() : Observable<Status[]> {
        return this.http.get<Status[]>(this.apiUrl + 'statusList')
            .map(data => {
                return data;
            }
        );
    }
    */

    getLoan(loanID : number) : Observable<LoanAdd> {
        return this.http.get<LoanAdd>(this.apiUrl + 'loan?loanID=' + loanID)
            .map(data => {
                return data;
            }
        );
    }

    add(model : LoanAdd) : Observable<number> {
        return this.http.post<number>(this.apiUrl + 'add', model)
            .map(loanID =>{
                return loanID;
            }
        );
    }

    delete(loanID : number) : Observable<number> {
        return this.http.post<number>(this.apiUrl + 'delete?loanID=' + loanID, {})
            .map(loanID =>{
                return loanID;
            }
        );
    }

    close(loanID : number) : Observable<number> {
        return this.http.post<number>(this.apiUrl + 'close?loanID=' + loanID, {})
            .map(loanID =>{
                return loanID;
            }
        );
    }

    payment(loanID : number) : Observable<LoanPayment[]> {
        return this.http.get<LoanPayment[]>(this.apiUrl + 'payment?loanID=' + loanID, {}).
            map(data => {
                return data;
            }
        );
    }

    addPayment(model : LoanPaymentAdd) : Observable<number> {
        return this.http.post<number>(this.apiUrl + 'addPayment', model)
            .map(payID =>{
                return payID;
            }
        );
    }

    deletePayment(payID : number) : Observable<number> {
        return this.http.post<number>(this.apiUrl + 'deletePayment?payID=' + payID, {})
            .map(id =>{
                return id;
            }
        );
    }

    calcInterest(loanID : number, intAsOn : string) : Observable<LoanCalcInterest[]> {
        return this.http.post<LoanCalcInterest[]>(this.apiUrl + 'calcInterest?loanID=' + loanID + '&intAsOn=' + intAsOn, { })
            .map(data =>{
                return data;
            }
        );
    }

    /*
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
    */

    private openReportWin(data : any) : void {
        let blob = new Blob([data], { type: AppConstants.excelContentType });
        window.open(window.URL.createObjectURL(blob)); 
    }
    
}