import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { LoanService } from "../services/loan.service";
import { LogService } from '../helpers/logging/log.service';
import { AlertService } from '../services/alert-service.service';

import { LoanPaymentComponent } from "./loan-payment.component";

import { Party } from '../models/sale-model';
import { PartyTypeID } from '../models/party-model';
import { LoanAdd, LoanPayment, LoanPaymentAdd, LoanStatus, PayType} from '../models/loan.model';

@Component({
    selector : 'app-loan-add',
    templateUrl : './loan-add.component.html',
    styleUrls : []
})
export class LoanAddComponent implements OnInit {
    private loanForm : FormGroup;
    private model : LoanAdd;
    private borrowerList : Party[];
    private showChildComp : boolean = false;
    private loanStatus : LoanStatus;
    @ViewChild('payment') loanPayComp : LoanPaymentComponent;

    constructor(private injector : Injector, 
        private route : ActivatedRoute,
        private fb : FormBuilder,
        private router : Router,
        private loanService : LoanService,
        private alertService : AlertService){
        this.createForm();
    }

    ngOnInit() {
        this.loadPartyTypes();
        this.loadModel();
    }

    get startDate() { return this.loanForm.get('startDate'); }
    get endDate() { return this.loanForm.get('endDate'); }
    get borrowerID() { return this.loanForm.get('borrowerID'); }
    get principalAmount() { return this.loanForm.get('principalAmount'); }
    get monthlyInterest() { return this.loanForm.get('monthlyInterest'); }
    get comments() { return this.loanForm.get('comments'); }

    private createForm() : void {
        this.loanForm = this.fb.group({
            loanID : [0],
            startDate : ['', Validators.required],
            endDate : [''],
            borrowerID : ['', Validators.required],
            principalAmount : ['', Validators.required],
            monthlyInterest : ['', Validators.required],
            comments : ['', Validators.required]
        });
    }
    private loadPartyTypes() : void {
        this.loanService.getBorrowerList(PartyTypeID.loanBorrower).subscribe(
            data => {
                this.borrowerList = data;
            }
        );
    }

    private loadModel() : void {
        let loanID : 0;
        this.route.params.subscribe( params => {
            loanID = params['id'];
            if(loanID > 0){
                this.showChildComp = true;
                this.loanService.getLoan(loanID).subscribe(data => {
                    this.model = data;
                    this.loanForm.patchValue(this.model);
                    this.setDateToDP();
                    this.loanPayComp.init(this.model);
                    if(this.model.status == LoanStatus.closed){
                        this.loanForm.disable();
                    }
                    this.loanStatus = this.model.status;
                });
            }else {
                this.model = new LoanAdd();
                this.model.loanID = 0;
            }
        });
    }

    private onBack() : void {
        this.router.navigate(['/loan']);
    }
    
    private onReset() : void {
        this.loanForm.reset(this.model);
        this.setDateToDP();
    }
    private onSubmit() : void {
        this.model = this.loanForm.value;
        this.model.startDate = this.getDateFromDP(this.startDate.value);
        this.model.endDate = this.getDateFromDP(this.endDate.value);
        this.loanService.add(this.model).subscribe(loanID => {
            if(loanID > 0) {
                this.alertService.success(`Sale details saved successfully.`,true);
                this.router.navigate(['/loan/edit', loanID]);
            }
        });
    }
    private onClose() : void {
        this.loanService.close(this.model.loanID).subscribe(loanID => {
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
        if(this.model.startDate != null && this.model.startDate != ''){
            let dtParts = this.model.startDate.split("/");
            if(dtParts.length == 3){
                dt = {
                    year : +dtParts[2],
                    month : +dtParts[0],
                    day : +dtParts[1]
                };
                this.loanForm.patchValue({startDate : dt});
            }
        }
        if(this.model.endDate != null && this.model.endDate != ''){
            let dtParts = this.model.endDate.split("/");
            if(dtParts.length == 3){
                dt = {
                    year : +dtParts[2],
                    month : +dtParts[0],
                    day : +dtParts[1]
                };
                this.loanForm.patchValue({endDate : dt});
            }
        }
    }
    
    private log(message : any) :void {
        const _logService = this.injector.get(LogService);
        _logService.info('LoanAddComponent: ' + message);
    }

}