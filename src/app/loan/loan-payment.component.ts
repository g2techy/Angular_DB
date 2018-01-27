import { Component, OnInit, Injector, Input, ViewChild, Output, EventEmitter } from "@angular/core";
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';

import { LoanService } from '../services/loan.service';
import { AlertService } from '../services/alert-service.service';
import { LogService } from '../helpers/logging/log.service';

import { LoanPaymentListComponent } from './loan-payment-list.component';
import { LoanCalcInterestComponent } from './loan-calc-interest.component';

import { LoanAdd, LoanPayment, LoanPaymentAdd, LoanStatus, PayType } from '../models/loan.model';

@Component({
    selector : 'app-loan-payment',
    templateUrl : './loan-payment.component.html',
    styleUrls : []
})
export class LoanPaymentComponent implements OnInit {
    @Input() loanAddModel : LoanAdd;
    @Output() onPaymentUpdate : EventEmitter<any>;
    private paymentForm : FormGroup;
    private model : LoanPaymentAdd;   
    private paymentList : LoanPayment[]; 
    private loadStatus : number;
    @ViewChild('payList') payListComp : LoanPaymentListComponent;
    @ViewChild('calcInterest') calcInterestComp : LoanCalcInterestComponent;   

    constructor(private injector : Injector, 
        private fb : FormBuilder,
        private loanService : LoanService,
        private logService : LogService,
        private alertService : AlertService) {
        this.onPaymentUpdate = new EventEmitter<any>();
        this.createForm();
    }

    ngOnInit(){
        
    }

    public init(model : LoanAdd) : void {
        this.loanAddModel = model;
        this.loadStatus = model.status;
        this.loadModel();
    }

    private createForm() : void {
        this.paymentForm = this.fb.group({
            loanPayID : [0],
            payDate : ['', Validators.required],
            payAmount : ['', Validators.required],
            payType : ['', Validators.required],
            payComments : ['', Validators.required]
        });
    }

    private loadModel() : void {
        if(this.loanAddModel.loanID > 0){
            this.loanService.payment(this.loanAddModel.loanID).subscribe(data => {
                this.paymentList = data;
                this.payListComp.init(this.paymentList, this.loanAddModel);
                let _lastPayDt = new Date();

                if(this.loanAddModel.status == LoanStatus.closed && this.paymentList != null && this.paymentList.length > 0){
                    let _l = this.paymentList.filter(p => p.payType == PayType.Principal).map(p => p.payDate).sort().reverse();
                    if(_l.length > 0){
                        _lastPayDt = new Date(_l[0]);
                    }
                }
                this.calcInterestComp.init(this.loanAddModel, _lastPayDt);
            });
            if(this.loanAddModel.status == LoanStatus.closed){
                this.paymentForm.disable();
            }
        }
    }

    private getDateFromDP(dp : any) : Date {
        let date : any;
        if(dp !== undefined && dp != null && dp.year){
            date = new Date(dp.year, dp.month-1, dp.day+1);
        }
        return date;
    }
    private setDateToDP(payDt : Date):void {
        payDt = new Date(payDt);
        let dt = {
            year : payDt.getFullYear(),
            month : payDt.getMonth() + 1,
            day : payDt.getDate()
        };
        this.paymentForm.patchValue({payDate : dt});
    }

    private onSubmit() : void {
        this.model = <LoanPaymentAdd> this.paymentForm.value;
        this.model.loanID = this.loanAddModel.loanID;
        this.model.payDate = this.getDateFromDP(this.paymentForm.get('payDate').value);
        this.loanService.addPayment(this.model).subscribe(payID => {
            if(payID > 0){
                this.alertService.success('Payment details saved successfully.');
                this.onReset();
                this.onPaymentUpdate.emit(payID);
            }
        });
    }

    private onEdit(model : LoanPayment) : void {
        this.paymentForm.patchValue(model);
        this.setDateToDP(model.payDate);
    }

    private onReset() : void {
        this.paymentForm.reset({
            loanPayID : 0
        });
    }

    private onDelete(event : LoanPayment) : void {
        this.alertService.confirm("Are you sure you want to delete this payment?", false, 
        () => {
        },
        () => {
            this.loanService.deletePayment(event.loanPayID).subscribe(payID => {
                this.alertService.success(`Payment deleted successfully.`);
                this.onPaymentUpdate.emit(payID);
            });
        });
    }

    private Log(message : string) : void {
        this.logService.info(` LoanPaymentComponent : ${message}`);
    }
}