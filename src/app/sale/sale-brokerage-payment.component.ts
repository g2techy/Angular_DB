import { Component, OnInit, Input, Output, Injector, EventEmitter } from '@angular/core'
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';

import { SaleService } from '../services/sale.service';
import { AlertService } from '../services/alert-service.service';
import { LogService } from '../helpers/logging/log.service';

import { SaleBrokerage, SaleBrokPayment } from '../models/sale-model';

@Component({
    selector : 'app-sale-brok-payment',
    templateUrl : './sale-brokerage-payment.component.html',
    styleUrls : ['./sale-brokerage-payment.component.css']
})
export class SaleBrokeragePaymentComponent implements OnInit {
    private payForm : FormGroup;
    @Output() onPayAckw : EventEmitter<SaleBrokPayment>;
    constructor(private injector : Injector, 
        private fb : FormBuilder,
        private saleService : SaleService,
        private alertService : AlertService){
            this.onPayAckw = new EventEmitter<SaleBrokPayment>();
            this.createForm();
    }
    ngOnInit(){}

    public init(model : SaleBrokerage) : void {
        this.payForm.patchValue({
            bDID : model.bdid
        });
        $("#modelBrokPayment").modal("show");
    }

    private createForm() : void {
        this.payForm = this.fb.group({
            bDID : [0],
            payDate : ['', Validators.required],
            payComments : ['', Validators.required]
        });
    }

    private onSubmit() : void {
        let model = <SaleBrokPayment>this.payForm.value;
        model.payDate = this.getDateFromDP(this.payForm.get('payDate').value);
        this.saleService.brokeragePayment(model).subscribe(bdID => {
            if(bdID > 0){
                this.alertService.success("Brokerage payment details saved successfully.");
                this.onPayAckw.emit(model);
                $("#modelBrokPayment").modal("hide");
                this.onReset();
            }
        });
    }

    private onReset() : void {
        this.payForm.reset({
            bDID : 0
        });
    }

    private getDateFromDP(dp : any) : Date {
        let date : any;
        if(dp !== undefined && dp != null && dp.year){
            date = new Date(dp.year, dp.month-1, dp.day+1);
        }
        return date;
    }
    
}