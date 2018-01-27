import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Router } from '@angular/router';

import { AppConstants, GlobalLib } from "../models/constants";
import { Loan, LoanSearchResult } from "../models/loan.model";

@Component({
    selector : 'app-loan-list',
    templateUrl : './loan-list.component.html',
    styleUrls : ['./loan-list.component.css']
})
export class LoanListComponent implements OnInit {
    @Input() searchResult : LoanSearchResult;
    @Output() deleteItem : EventEmitter<Loan>;
    private dateDisplayFormat = AppConstants.dateDisplayFormat;
    private numbericDisplayFormat = AppConstants.numericDisplayFormat;
    
    constructor(private router : Router ){
        this.deleteItem = new EventEmitter<Loan>();
    }

    ngOnInit () {        
    }
    
    private getStatusClass(model : Loan) : string {
        if(model.payDate < (new Date()) && !(model.statusName == 'Paid' || model.statusName == 'Closed')){
            return 'status-over-due';
        }
        return `status-${model.statusName.replace(' ','-').toLowerCase()}`;
    }

    private onDelete(model : Loan) : void {
        this.deleteItem.emit(model);
    }

    private displayDate(dt : Date) : string {
        return GlobalLib.displayDate(dt);
    }
}