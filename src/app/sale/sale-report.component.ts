import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from "rxjs/Observable";

import { SaleService } from '../services/sale.service';
import { AlertService } from '../services/alert-service.service';
import { LogService } from '../helpers/logging/log.service';

import { DataGridComponent } from "../shared/datagrid/datagrid.component";
import { SaleReport, Party, Status } from '../models/sale-model';
import { PartyTypeID } from "../models/party-model";

@Component({
    selector : 'app-sale-report',
    templateUrl : './sale-report.component.html'
})
export class SaleReportComponent implements OnInit {
    private reportForm : FormGroup;
    private reportResult : any;
    private sallerList : Party[];
    private buyerList : Party[];
    private statusList : Status[];
    @ViewChild('dataGrid') dataGridComp : DataGridComponent;

    constructor(private fb : FormBuilder, 
        private saleService : SaleService,
        private alertService : AlertService,
        private logService : LogService,
        private router : Router) { 
            this.createForm();
    }
    ngOnInit(){
        this.loadModel();
    }

    private createForm() : void {
        this.reportForm = this.fb.group({
            startDate : [''],
            endDate : [''],
            sallerID : [''],
            buyerID : [''],
            status : [''],
            dueDays : ['']
        });
    }
    private loadModel() : void {
        this.saleService.getPartyList(PartyTypeID.saller).subscribe(data => {
            this.sallerList = data;
        });
        this.saleService.getPartyList(PartyTypeID.buyer).subscribe(data => {
            this.buyerList = data;
        });
        this.saleService.getStatusList().subscribe(data => {
            this.statusList = data;
        });
    }
    private onSubmit() : void {
        let model = <SaleReport> this.reportForm.value;
        model.startDate = this.getDateFromDP(this.reportForm.get('startDate').value);
        model.endDate = this.getDateFromDP(this.reportForm.get('endDate').value);
        this.saleService.report(model).subscribe(data => {
            this.reportResult = data;
            this.dataGridComp.dataBind(this.reportResult);
        });
    }
    private onDownload() : void {
        let model = <SaleReport> this.reportForm.value;
        this.saleService.downloadReport(model).subscribe(data => {
            if(data){
               
            }
        });
    }
    private getDateFromDP(dp : any) : string {
        let date = '';
        if(dp !== undefined && dp != null && dp.year){
            date = dp.month + '/' + dp.day + '/' + dp.year;
        }
        return date;
    }
}