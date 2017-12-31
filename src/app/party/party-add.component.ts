import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { PartyService } from "../services/patry.service";
import { AlertService } from '../services/alert-service.service';
import { LogService } from "../helpers/logging/log.service";
import { Party, PartyType } from '../models/party-model';

@Component({
    selector : 'app-party-add',
    templateUrl : './party-add.component.html',
    styleUrls : [ './party-add.component.css']
})
export class PartyAddComponent implements OnInit {
    partyForm : FormGroup;
    partyTypeList : PartyType[];
    private model : Party;
    constructor(private injector : Injector, 
                private route : ActivatedRoute,
                private fb : FormBuilder,
                private router : Router,
                private partyService : PartyService,
                private alertService : AlertService) {
        this.createForm();
    }
    ngOnInit(){
        this.loadPartyTypes();
        this.loadModel();       
    }

    private createForm() : void {
        this.partyForm = this.fb.group({
            partyID : ['0'],
            partyCode : ['',Validators.required],
            firstName : ['', Validators.required],
            lastName : ['', Validators.required],
            phoneNo : [''],
            mobileNo : [''],
            selectedPartyTypes : this.fb.group([])
        });
    }
 
    private loadModel() : void {
        let partyID = 0;
        this.route.params.subscribe( params => {
            partyID = params['id'];
            if(partyID > 0){
                this.partyService.getParty(partyID).subscribe(data => {
                    this.model = data;
                    this.partyForm.patchValue(this.model);
                    this.addControlsToForm(this.model.selectedPartyTypes);
                });
            }else {
                this.model = new Party();
            }
        });
    }

    private onBack() : void {
        const _location = this.injector.get(Location);
        _location.back();
    }
    private onReset() : void {
        this.partyForm.reset(this.model);
        this.addControlsToForm(this.model.selectedPartyTypes);
    }
    private addControlsToForm(selPT : string[]) : void {
        let chkListCtrl = {};  
        this.partyTypeList.map(pt =>{
            chkListCtrl[`chk_${pt.partyTypeID}`] = [selPT.findIndex(p => +p == pt.partyTypeID) > -1];
        });
        this.partyForm.setControl('selectedPartyTypes', this.fb.group(chkListCtrl));
    }
    private onSubmit(data : Party) : void {
        let obj = <any>data.selectedPartyTypes;
        let selPT = [];
        let selPTCnt = 0;
        for(let key in obj){
            let val = obj[key];
            if(val == true){
                selPT.push(key.replace('chk_',''));
                selPTCnt++;
            }
        }
        if(selPTCnt == 0){
            this.alertService.error(`Please select at least one party type.`);
            return;
        }
        data.selectedPartyTypes = selPT;
        this.log(`-onSubmit-data : ${JSON.stringify(data)}`);
        this.partyService.add(data).subscribe( partyID => {
            if(partyID > 0){
                this.alertService.success(`Party details saved successfully.`,true);
                this.onBack();
            }
        });
    }
    private loadPartyTypes() : void {
        this.partyService.getPartyTypes().subscribe(data => {
            this.partyTypeList = data;  
            this.addControlsToForm([]);       
        });
    }
    
    private log(message : any) :void {
        const _logService = this.injector.get(LogService);
        _logService.info('PartyAddComponent: ' + message);
    }

}