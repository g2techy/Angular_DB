import { Component, OnInit, Input, Output, Injector, EventEmitter, ViewChild } from '@angular/core'

import { SaleService } from '../services/sale.service';
import { AlertService } from '../services/alert-service.service';
import { LogService } from '../helpers/logging/log.service';

import { SaleBrokeragePaymentComponent } from "./sale-brokerage-payment.component";

import { SaleAdd, SaleBrokerage, SaleBrokPayment, SaleStatus } from '../models/sale-model';

@Component({
    selector : 'app-sale-brok-list',
    templateUrl : './sale-brokerage-list.component.html'
})
export class SaleBrokerageListComponent implements OnInit {
    @Input() brokerageList : SaleBrokerage[];
    @Input() saleStatus : SaleStatus;
    @Output() deleteBrokerage : EventEmitter<SaleBrokerage>;
    @Output() editBrokerage : EventEmitter<SaleBrokerage>;
    @Output() brokPayment : EventEmitter<SaleBrokPayment>;
    @ViewChild('brokPayment') brokPayComp : SaleBrokeragePaymentComponent;

    constructor(private injector : Injector, 
        private saleService : SaleService,
        private alertService : AlertService){
        this.deleteBrokerage = new EventEmitter<SaleBrokerage>();
        this.editBrokerage = new EventEmitter<SaleBrokerage>();
        this.brokPayment = new EventEmitter<SaleBrokPayment>();
    }
    ngOnInit(){}

    public init(model : SaleBrokerage[], saleStatus : SaleStatus) : void {
        this.brokerageList = model;
        this.saleStatus = saleStatus;
    }

    private onEdit(model : SaleBrokerage) : void {
        this.editBrokerage.emit(model);
    }

    private onDelete(model : SaleBrokerage) : void {
        this.deleteBrokerage.emit(model);
    }

    private onPay(model : SaleBrokerage) : void {
        this.brokPayComp.init(model);
    }

    private onPayAckw(model : SaleBrokPayment) : void {
        this.brokPayment.emit(model);
    }

    private displayDate(dt : Date) : string {
        let newDt = new Date(dt);
        if(newDt.getFullYear() == 1900){
            return '';
        }
        return newDt.getDate() + '/' + (newDt.getMonth() + 1) + '/' + newDt.getFullYear();
    }
}