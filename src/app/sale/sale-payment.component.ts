import { Component, OnInit, Injector, Input, ViewChild, Output, EventEmitter } from "@angular/core";
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';

import { SaleService } from '../services/sale.service';
import { AlertService } from '../services/alert-service.service';
import { LogService } from '../helpers/logging/log.service';

import { SalePaymentListComponent } from './sale-payment-list.component';

import { SaleAdd, SalePayment, SalePaymentAdd, SaleStatus } from '../models/sale-model';

@Component({
    selector : 'app-sale-payment',
    templateUrl : './sale-payment.component.html'
})
export class SalePaymentComponent implements OnInit {
    @Input() saleAddModel : SaleAdd;
    @Output() onPaymentUpdate : EventEmitter<any>;
    private paymentForm : FormGroup;
    private model : SalePayment;
    private netSaleAmt : number;
    private totalPayment : number;
    private outPayment : number;
    @ViewChild('payList') payListComp : SalePaymentListComponent;    

    constructor(private injector : Injector, 
                private fb : FormBuilder,
                private saleService : SaleService,
                private logService : LogService,
                private alertService : AlertService) {
        this.onPaymentUpdate = new EventEmitter<any>();
        this.createForm();
    }
    
    ngOnInit() : void {
        
    }

    public init(model : SaleAdd) : void {
        this.saleAddModel = model;
        this.loadModel();
    }

    private createForm() : void {
        this.paymentForm = this.fb.group({
            payID : [0],
            payDate : ['', Validators.required],
            payAmount : ['', Validators.required],
            courierFrom : ['', Validators.required],
            courierTo : ['', Validators.required]
        });
    }

    private loadModel() : void {
        if(this.saleAddModel.saleID > 0){
            this.saleService.payment(this.saleAddModel.saleID).subscribe(data => {
                this.model = data;
                this.netSaleAmt = this.saleAddModel.netSaleAmount;
                this.totalPayment = 0;
                if(this.model.paymentList != null){
                    this.model.paymentList.forEach((val, index) => {
                        this.totalPayment += val.payAmount;
                    })
                }
                this.outPayment = this.netSaleAmt - this.totalPayment;
                this.payListComp.init(this.model.paymentList, this.saleAddModel.status);
            });
            if(this.saleAddModel.status == SaleStatus.closed){
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
        this.model.payment = <SalePaymentAdd> this.paymentForm.value;
        this.model.payment.saleID = this.saleAddModel.saleID;
        this.model.payment.payDate = this.getDateFromDP(this.paymentForm.get('payDate').value);
        this.saleService.addPayment(this.model.payment).subscribe(payID => {
            if(payID > 0){
                this.alertService.success('Payment details saved successfully.');
                this.onReset();
                this.onPaymentUpdate.emit(payID);
                // this.loadModel();                
            }
        });
    }

    private onEdit(model : SalePaymentAdd) : void {
        this.paymentForm.patchValue(model);
        this.setDateToDP(model.payDate);
    }

    private onReset() : void {
        this.paymentForm.reset({
            payID : 0
        });
    }

    private onDelete(event : SalePaymentAdd) : void {
        this.alertService.confirm("Are you sure you want to delete this payment?", false, 
        () => {
        },
        () => {
            this.saleService.deletePayment(event.payID).subscribe(payID => {
                this.alertService.success(`Payment deleted successfully.`);
                //this.init(this.saleAddModel);
                this.onPaymentUpdate.emit(payID);
            });
        });
    }

    private Log(message : string) : void {
        this.logService.info(` SalePaymentComponent : ${message}`);
    }
}