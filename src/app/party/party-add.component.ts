import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
    private selPartyList : any[];
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
            partyID : [''],
            partyCode : ['',Validators.required],
            firstName : ['', Validators.required],
            lastName : ['', Validators.required],
            phoneNo : [''],
            mobileNo : [''],
            selectedPartyTypes : ['']
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
                    this.selPartyList = [];
                    for(let pt of this.partyTypeList){
                        this.selPartyList.push({
                            id : pt.partyTypeID,
                            name : pt.partyTypeName,
                            selected : this.model.selectedPartyTypes.indexOf(pt.partyTypeID.toString()) > -1
                        });
                    }
                });
            }else {
                this.model = new Party();                
            }
        });
    }

    private onSearch() : void {
        this.router.navigate(['/party']);
    }
    private onSubmit(data : Party) : void {
        this.log(`data : ${JSON.stringify(data)}`);
    }
    private loadPartyTypes() : void {
        this.partyService.getPartyTypes().subscribe(data => {
            this.partyTypeList = data;
            this.selPartyList = [];
            for(let pt of this.partyTypeList){
                this.selPartyList.push({
                    id : pt.partyTypeID,
                    name : pt.partyTypeName,
                    selected : false
                });
            }
        });
    }
    
    private log(message : any) :void {
        const _logService = this.injector.get(LogService);
        _logService.info(message);
    }

}