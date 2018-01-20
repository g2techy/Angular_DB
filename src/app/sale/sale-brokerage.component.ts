import { Component, OnInit, Injector, Input, ViewChild } from "@angular/core";
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';

import { SaleService } from '../services/sale.service';
import { AlertService } from '../services/alert-service.service';
import { LogService } from '../helpers/logging/log.service';

import { SaleBrokerageListComponent } from './sale-brokerage-list.component';

import { SaleBrokerage, SaleBrokerageAdd, SaleBrokPayment, SaleAdd, Party, SaleStatus } from '../models/sale-model';
import { PartyTypeID } from '../models/party-model';

@Component({
    selector : 'app-sale-brok',
    templateUrl : './sale-brokerage.component.html'
})
export class SaleBrokerageComponent implements OnInit {
    @Input() saleAddModel : SaleAdd;
    private brokerageForm : FormGroup;
    private model : SaleBrokerageAdd;
    private brokerageList : SaleBrokerage[];
    private brokerList : Party[];
    @ViewChild('brokerageList') brokerageListComp : SaleBrokerageListComponent; 

    constructor(private injector : Injector, 
        private fb : FormBuilder,
        private saleService : SaleService,
        private logService : LogService,
        private alertService : AlertService) {
        this.createForm();
    }

    ngOnInit() : void {

    }

    public init(model : SaleAdd) : void {
        this.saleAddModel = model;
        this.loadModel();
    }

    private createForm() : void {
        this.brokerageForm = this.fb.group({
            bdid : [0],
            brokerID : [0, Validators.required],
            brokerage : ['', Validators.required]
        });   
    }

    private loadModel() : void {
        if(this.saleAddModel.saleID > 0){
            this.saleService.getPartyList(PartyTypeID.broker).subscribe(data => {
                this.brokerList = data;
            });
            this.saleService.brokerage(this.saleAddModel.saleID).subscribe(data => {
                this.brokerageList = data;
                this.brokerageListComp.init(this.brokerageList, this.saleAddModel.status);
            });
            if(this.saleAddModel.status == SaleStatus.closed){
                this.brokerageForm.disable();
            }
        }
    }

    private onSubmit() : void {
        this.model = <SaleBrokerageAdd> this.brokerageForm.value;
        this.model.saleID = this.saleAddModel.saleID;
        this.saleService.addBrokerage(this.model).subscribe(bdid => {
            if(bdid > 0){
                this.alertService.success('Brokerage details saved successfully.');
                this.loadModel();
                this.onReset();
            }
        });
    }

    private onEdit(model : SaleBrokerageAdd) : void {
        this.brokerageForm.patchValue(model);
    }

    private onPayAckw(model : SaleBrokPayment) : void {
        this.loadModel();
    }

    private onReset() : void {
        this.brokerageForm.reset({
            bdid : 0
        });
    }
    
    private onDelete(event : SaleBrokerage) : void {
        this.alertService.confirm("Are you sure you want to delete this brokerage?", false, 
        () => {
        },
        () => {
            this.saleService.deleteBrokerage(event.bdid).subscribe(bdID => {
                this.alertService.success(`Brokerage deleted successfully.`);
                this.init(this.saleAddModel);
            });
        });
    }

    private Log(message : string) : void {
        this.logService.info(` SaleBrokerageComponent : ${message}`);
    }
}