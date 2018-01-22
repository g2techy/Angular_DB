import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { SaleService } from "../services/sale.service";
import { LogService } from '../helpers/logging/log.service';
import { AlertService } from '../services/alert-service.service';

import { SalePaymentComponent } from "./sale-payment.component";
import { SaleBrokerageComponent } from "./sale-brokerage.component";

import { SaleAdd, Party, SalePayment, SalePaymentAdd, SaleStatus } from '../models/sale-model';
import { PartyTypeID } from '../models/party-model';

@Component({
    selector : 'app-sale-add',
    templateUrl : './sale-add.component.html'
})
export class SaleAddComponent implements OnInit {
    private saleForm : FormGroup;
    private model : SaleAdd;
    private buyerList : Party[];
    private sallerList : Party[];
    private showChildComp : boolean = false;
    private saleStatus : SaleStatus;
    @ViewChild('payment') salePayComp : SalePaymentComponent;
    @ViewChild('brokerage') saleBrokComp : SaleBrokerageComponent;

    constructor(private injector : Injector, 
                private route : ActivatedRoute,
                private fb : FormBuilder,
                private router : Router,
                private saleService : SaleService,
                private alertService : AlertService){
        this.createForm();
    }

    get buyerID() { return this.saleForm.get('buyerID'); }
    get sallerID() { return this.saleForm.get('sallerID'); }
    get rejectionWeight() { return this.saleForm.get('rejectionWeight'); }
    get selectionWeight() { return this.saleForm.get('selectionWeight'); }
    get unitPrice() { return this.saleForm.get('unitPrice'); }
    get lessPer() { return this.saleForm.get('lessPer'); }
    get dueDays() { return this.saleForm.get('dueDays'); }
    get saleDate() { return this.saleForm.get('saleDate'); }
    get totalWeight() { return this.saleForm.get('totalWeight'); }
    get netSaleAmount() { return this.saleForm.get('netSaleAmount'); }

    ngOnInit(){
        this.loadPartyTypes();
        this.loadModel();
    }

    private createForm() : void {
        this.saleForm = this.fb.group({
            saleID : [0],
            saleDate : ['', Validators.required],
            buyerID : ['', Validators.required],
            sallerID : ['', Validators.required],
            totalWeight : ['', Validators.required],
            rejectionWeight : ['', Validators.required],
            selectionWeight : [''],
            unitPrice : ['', Validators.required],
            dueDays : ['', Validators.required],
            lessPer : ['', [Validators.required, Validators.max(99)]],
            netSaleAmount : ['']
        });
    }
    private loadPartyTypes() : void {
        this.saleService.getPartyList(PartyTypeID.buyer).subscribe(
            data => {
                this.buyerList = data;
            }
        );
        this.saleService.getPartyList(PartyTypeID.saller).subscribe(
            data => {
                this.sallerList = data;
            }
        );
    }

    private loadModel() : void {
        let saleID : 0;
        this.route.params.subscribe( params => {
            saleID = params['id'];
            if(saleID > 0){
                this.showChildComp = true;
                this.saleService.getSale(saleID).subscribe(data => {
                    this.model = data;
                    this.saleForm.patchValue(this.model);
                    this.setDateToDP();
                    this.calcNetSalAmt();
                    this.salePayComp.init(this.model);
                    this.saleBrokComp.init(this.model);
                    if(this.model.status == SaleStatus.closed){
                        this.saleForm.disable();
                    }
                    this.saleStatus = this.model.status;
                });
            }else {
                this.model = new SaleAdd();
                this.model.saleID = 0;
            }
        });
    }

    private onBack() : void {
        this.router.navigate(['/sale']);
    }
    
    private onReset() : void {
        this.saleForm.reset(this.model);
        this.calcNetSalAmt();
        this.setDateToDP();
    }
    private onSubmit() : void {
        this.model = this.saleForm.value;
        this.model.saleDate = this.getDateFromDP(this.saleDate.value);
        this.saleService.add(this.model).subscribe(saleID => {
            if(saleID > 0) {
                this.alertService.success(`Sale details saved successfully.`,true);
                this.router.navigate(['/sale/edit', saleID]);
            }
        });
    }
    private onClose() : void {
        this.saleService.close(this.model.saleID).subscribe(saleID => {
            this.loadModel();
        });
    }
    private onPayUpdate(data : any) : void {
        this.loadModel();
    }
    private getDateFromDP(dp : any) : string {
        let date = '';
        if(dp !== undefined && dp != null && dp.year){
            date = dp.month + '/' + dp.day + '/' + dp.year;
        }
        return date;
    }
    private setDateToDP():void {
        let dt : any;
        if(this.model.saleDate == null || this.model.saleDate == ''){
            return;
        }
        let dtParts = this.model.saleDate.split("/");
        if(dtParts.length == 3){
            dt = {
                year : +dtParts[2],
                month : +dtParts[0],
                day : +dtParts[1]
            };
            this.saleForm.patchValue({saleDate : dt});
        }
    }
    private calcNetSalAmt(){
        let _totalWt = +this.totalWeight.value;
        let _rejWt = +this.rejectionWeight.value;
        let _selWt = _totalWt - _rejWt;
        this.selectionWeight.setValue(_selWt); 
        let _uPrice = +this.unitPrice.value;
        let _lPer = +this.lessPer.value;
        let _netSaleAmt = (_uPrice * _selWt) - ((_uPrice * _selWt)* _lPer/100);
        this.netSaleAmount.setValue(_netSaleAmt.toFixed(2));

        this.model.selectionWeight = _selWt;
        this.model.netSaleAmount = _netSaleAmt;
    }
    private log(message : any) :void {
        const _logService = this.injector.get(LogService);
        _logService.info('SaleAddComponent: ' + message);
    }
}