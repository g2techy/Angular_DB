import { Component, OnInit, Injector, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { LoanService } from "../services/loan.service";
import { LogService } from '../helpers/logging/log.service';
import { AlertService } from '../services/alert-service.service';

import { AppConstants, GlobalLib } from '../models/constants';
import { LoanAdd, LoanCalcInterest, LoanStatus, Loan} from '../models/loan.model';

@Component({
    selector : 'app-loan-calc-interest',
    templateUrl : './loan-calc-interest.component.html',
    styleUrls : ['./loan-calc-interest.component.css']
})
export class LoanCalcInterestComponent implements OnInit {
    @Input() loanAddModel : LoanAdd;
    private intAsOn : any;
    private interestList : LoanCalcInterest[]; 
    private loanStatus : number;
    private totalInterestPaid : number = 0;
    private totalCalcInterest : number = 0;
    private interestToBePaid : number = 0;
    private lastPayDate : Date;
    private numericDisplayFormat = AppConstants.numericDisplayFormat;
    private dateDisplayFormat = AppConstants.dateDisplayFormat;
    private numericDisplayFormat4 = AppConstants.numericDisplayFormat4;

    constructor(private injector : Injector, 
        private router : Router,
        private loanService : LoanService,
        private alertService : AlertService){
    }

    ngOnInit(){}

    public init(model : LoanAdd, lastPayDate : Date) : void {
        this.loanAddModel = model;
        this.loanStatus = model.status;
        this.lastPayDate = lastPayDate;
        this.loadModel();
    }

    private loadModel() : void {
        this.totalInterestPaid = 0;
        this.totalCalcInterest = 0;
        let _intAsOn = new Date();
        if(this.lastPayDate !== undefined){
            _intAsOn = this.lastPayDate;
        }
        this.calcInterest(_intAsOn);        
    }

    private calcInterest(dt : Date) : void {
        if(this.loanAddModel.loanID > 0){
            this.intAsOn = { year: dt.getFullYear(), month: (dt.getMonth() + 1), day: dt.getDate() };
            this.loanService.calcInterest(this.loanAddModel.loanID, GlobalLib.dateToString(dt)).subscribe(data => {
                this.interestList = data;
                this.interestList.forEach((val, idx) => {
                    this.totalCalcInterest += val.calcIntAmount;
                });
                if(this.interestList.length > 0){
                    this.totalInterestPaid = this.interestList[0].totalIntPaid;
                }
                this.interestToBePaid = this.totalCalcInterest - this.totalInterestPaid;
            });
        }
    }

    private onCalcInterest() : void {
        var _dt = GlobalLib.getDateFromDatePicker(this.intAsOn);
        this.calcInterest(_dt);
    }

}