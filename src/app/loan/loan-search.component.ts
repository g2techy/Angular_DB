import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { LoanService } from '../services/loan.service';
import { AlertService } from '../services/alert-service.service';
import { LogService } from '../helpers/logging/log.service';
import { PagerComponent } from "../shared/pager/pager.component";

import { Party } from '../models/sale-model';
import { PartyTypeID } from '../models/party-model';
import { Loan, LoanSearch, LoanSearchResult } from '../models/loan.model';
import { environment } from '../../environments/environment';

@Component({
    selector : 'app-loan-search',
    templateUrl : './loan-search.component.html',
    styleUrls : []
})
export class LoanSearchComponent implements OnInit {
    searchForm : FormGroup; 
    searchResult : LoanSearchResult;
    currentSearchModel : LoanSearch;
    @ViewChild('pager') pager : PagerComponent;
    pageSize : number;
    borrowerList : Party[];

    constructor(private fb : FormBuilder, 
        private loanService : LoanService,
        private alertService : AlertService,
        private logService : LogService,
        private router : Router) { 
            this.creatForm();
            this.pageSize = environment.appSetting.pageSize;   
    }

    ngOnInit(){
        this.loadPartyTypes();
    }

    private creatForm() : void {
        this.searchForm = this.fb.group({
            startDate : [''],
            endDate : [''],
            borrowerID : [0],
            refNo : ['']
        });
    }
    private loadPartyTypes() : void {
        this.loanService.getBorrowerList(PartyTypeID.loanBorrower).subscribe( list => {
            this.borrowerList = list;
        });
    }
    private onSubmit() : void {
        this.searchResult = null;
        this.currentSearchModel = <LoanSearch> this.searchForm.value;
        this.currentSearchModel.startDate = this.getDateFromDP(this.searchForm.value.startDate);
        this.currentSearchModel.endDate = this.getDateFromDP(this.searchForm.value.endDate);
        this.currentSearchModel.pageSize = this.pageSize;
        this.onPageChange(1);
    }

    private onAdd() : void {
        this.router.navigate(['/loan/add']);
    }

    private onReset() : void {
        this.searchForm.reset({
            borrowerID : 0
        });
        this.searchResult = null;
        this.pager.init(this.pageSize, 1, 0);
    }

    private getDateFromDP(dp : any) : string {
        let date = '';
        if(dp !== undefined && dp != null && dp.year){
            date = dp.month + '/' + dp.day + '/' + dp.year;
        }
        return date;
    }
    onPageChange(event : number) {
        this.currentSearchModel.startIndex = event;
        this.loanService.search(this.currentSearchModel).subscribe(result => {
            this.searchResult = result;
            this.pager.init(this.currentSearchModel.pageSize, this.currentSearchModel.startIndex, 
                            this.searchResult.recordCount);
        });
    }
    
    onDelete(event : Loan) : void {
        this.alertService.confirm("Are you sure you want to delete this loan item?", false, () => {
        }, () => {
            this.loanService.delete(event.loanID).subscribe( loanID => {
                this.alertService.success(`Loan '${event.refNo}' deleted successfully.`);
                this.onSubmit();
            });
        });
    }
}