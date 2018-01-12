import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { SaleService } from "../services/sale.service";

import { SaleAdd, Party } from '../models/sale-model';
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
    constructor(private injector : Injector, 
                private route : ActivatedRoute,
                private fb : FormBuilder,
                private router : Router,
                private saleService : SaleService ){
        this.createForm();
    }

    ngOnInit(){
        this.loadPartyTypes();
        this.loadModel();
    }

    private createForm() : void {
        this.saleForm = this.fb.group({
            saleID : [0],
            saleDate : ['', Validators.required],
            buyer : [0, Validators.required],
            saller : [0, Validators.required],
            totalWeight : [0, Validators.required],
            rejectionWt : [0],
            unitPrice : [0],
            dueDays : [0],
            lessPer : [0]
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
                this.saleService.getSale(saleID).subscribe(data => {
                    this.model = data;
                    this.saleForm.patchValue(this.model);
                });
            }else {
                this.model = new SaleAdd();
            }
        });
    }

}