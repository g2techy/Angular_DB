import { Component, OnInit, Input, Output, Injector, EventEmitter } from '@angular/core'

import { SaleService } from '../services/sale.service';
import { AlertService } from '../services/alert-service.service';
import { LogService } from '../helpers/logging/log.service';

import { AppConstants } from '../models/constants';
import { SaleAdd, SalePayment, SalePaymentAdd, SaleStatus } from '../models/sale-model';

@Component({
    selector : 'app-sale-payment-list',
    templateUrl : './sale-payment-list.component.html'
})
export class SalePaymentListComponent implements OnInit {
    @Input() paymentList : SalePaymentAdd[];
    @Input() saleStatus : SaleStatus;
    @Output() deletePayment : EventEmitter<SalePaymentAdd>;
    @Output() editPayment : EventEmitter<SalePaymentAdd>;
    private dateDispalyFormat = AppConstants.dateDisplayFormat;
    private numericDisplayFormat = AppConstants.numericDisplayFormat;

    constructor(private injector : Injector, 
        private saleService : SaleService,
        private alertService : AlertService){
        this.deletePayment = new EventEmitter<SalePaymentAdd>();
        this.editPayment = new EventEmitter<SalePaymentAdd>();
    }
    ngOnInit(){}

    public init(model : SalePaymentAdd[], saleStatus : SaleStatus) : void {
        this.paymentList = model;
        this.saleStatus = saleStatus;
    }

    private onEdit(payment : SalePaymentAdd) : void {
        this.editPayment.emit(payment);
    }

    private onDelete(payment : SalePaymentAdd) : void {
        this.deletePayment.emit(payment);
    }
}