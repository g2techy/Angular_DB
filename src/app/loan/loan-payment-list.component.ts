import { Component, OnInit, Input, Output, Injector, EventEmitter } from '@angular/core'

import { LoanService } from '../services/loan.service';
import { AlertService } from '../services/alert-service.service';
import { LogService } from '../helpers/logging/log.service';

import { AppConstants } from '../models/constants';
import { LoanAdd, LoanPayment, LoanPaymentAdd, LoanStatus } from '../models/loan.model';

@Component({
    selector : 'app-loan-payment-list',
    templateUrl : './loan-payment-list.component.html'
})
export class LoanPaymentListComponent implements OnInit {
    @Input() paymentList : LoanPayment[];
    @Input() loanStatus : LoanStatus;
    @Output() deletePayment : EventEmitter<LoanPayment>;
    @Output() editPayment : EventEmitter<LoanPayment>;
    private loanAddModel : LoanAdd;
    private dateDispalyFormat = AppConstants.dateDisplayFormat;
    private numericDisplayFormat = AppConstants.numericDisplayFormat;

    constructor(private injector : Injector, 
        private loanService : LoanService,
        private alertService : AlertService){
        this.deletePayment = new EventEmitter<LoanPayment>();
        this.editPayment = new EventEmitter<LoanPayment>();
    }
    ngOnInit(){}

    public init(model : LoanPayment[], loanAddModel : LoanAdd) : void {
        this.paymentList = model;
        this.loanAddModel = loanAddModel;
        let _princAmt = this.loanAddModel.principalAmount;
        let _princPaid = 0;
        let _intPaid = 0;
        if(this.paymentList != null){
            this.paymentList.forEach((val, inx) => {
                if(val.payType == 1){
                    _princPaid += val.payAmount;
                    _princAmt -= val.payAmount;
                    
                }else if(val.payType == 2){
                    _intPaid += val.payAmount;
                }
                val.outstandingPrincipal = _princAmt;
                val.principalPaid = _princPaid;
                val.interestPaid = _intPaid;
            });
        }
        this.loanStatus = loanAddModel.status;
    }

    private onEdit(payment : LoanPayment) : void {
        this.editPayment.emit(payment);
    }

    private onDelete(payment : LoanPayment) : void {
        this.deletePayment.emit(payment);
    }
}