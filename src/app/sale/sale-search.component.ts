import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { SaleService } from '../services/sale.service';
import { AlertService } from '../services/alert-service.service';
import { LogService } from '../helpers/logging/log.service';
import { PagerComponent } from "../shared/pager/pager.component";

import { Sale, SaleSearch, SaleSearchResult, Party } from '../models/sale-model';
import { PartyTypeID } from '../models/party-model';
import { environment } from '../../environments/environment';

@Component({
    selector : 'app-sale-search',
    templateUrl : './sale-search.component.html'
})
export class SaleSearchComponent implements OnInit {
    searchForm : FormGroup; 
    searchResult : SaleSearchResult;
    currentSearchModel : SaleSearch;
    @ViewChild('pager') pager : PagerComponent;
    pageSize : number;
    buyerList : Party[];
    sallerList : Party[];

    constructor(private fb : FormBuilder, 
        private saleService : SaleService,
        private alertService : AlertService,
        private logService : LogService,
        private router : Router) { 
            this.creatForm();
            this.pageSize = environment.appSetting.pageSize;   
    }

    ngOnInit () {
        this.loadPartyTypes();
    }

    private creatForm() : void {
        this.searchForm = this.fb.group({
            startDate : [''],
            endDate : [''],
            buyerID : [0],
            sallerID : [0],
            refNo : ['']
        });
    }
    private loadPartyTypes() : void {
        this.saleService.getPartyList(PartyTypeID.buyer).subscribe( list => {
            this.buyerList = list;
        });
        this.saleService.getPartyList(PartyTypeID.saller).subscribe( list => {
            this.sallerList = list;
        });
    }
    private onSubmit() : void {
        this.searchResult = null;
        this.currentSearchModel = <SaleSearch> this.searchForm.value;
        this.currentSearchModel.startDate = this.getDateFromDP(this.searchForm.value.startDate);
        this.currentSearchModel.endDate = this.getDateFromDP(this.searchForm.value.endDate);
        this.currentSearchModel.pageSize = this.pageSize;
        this.onPageChange(1);
    }

    private onAdd() : void {
        this.router.navigate(['/sale/add']);
    }

    private onReset() : void {
        this.searchForm.reset({
            buyerID : 0,
            sallerID : 0
        });
        this.searchResult = null;
        this.pager.init(this.pageSize, 1, 0);
    }

    private getDateFromDP(dp : any) : string {
        let date = '';
        if(dp !== undefined && dp != null && dp.year){
            date = dp.month + '/' + dp.day + '/' + dp.year;
        }
        return date;
    }
    onPageChange(event : number) {
        this.currentSearchModel.startIndex = event;
        this.saleService.search(this.currentSearchModel).subscribe(result => {
            this.searchResult = result;
            this.pager.init(this.currentSearchModel.pageSize, this.currentSearchModel.startIndex, 
                            this.searchResult.recordCount);
        });
    }
    
    onDeleteParty(event : Sale) : void {
        this.alertService.confirm("Are you sure you want to delete this sale item?", false, () => {
        }, () => {
            this.saleService.delete(event.saleID).subscribe( partyID => {
                this.alertService.success(`Sale '${event.refNo}' deleted successfully.`);
                this.onSubmit();
            });
        });
    }
}