import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from "@angular/core";
import { Router } from '@angular/router';

import { AppConstants, GlobalLib } from "../models/constants";
import { Pager } from '../models/base.model';
import { Sale, SaleSearchResult } from "../models/sale-model";

import { DashboardService } from '../services/dashboard.service';

import { PagerComponent } from "../shared/pager/pager.component";
import { environment } from '../../environments/environment';

@Component({
    selector : 'app-dashboard-payment',
    styleUrls : ['./dashboard-payment.component.css'],
    templateUrl : './dashboard-payment.component.html'
})
export class DashboardPaymentComponent implements OnInit {
    private model : Pager;
    private searchResult : SaleSearchResult;
    @ViewChild('pager') pager : PagerComponent;
    private pageSize : number;

    private dateDisplayFormat = AppConstants.dateDisplayFormat;
    private numbericDisplayFormat = AppConstants.numericDisplayFormat;
    
    constructor(private router : Router, private dbService : DashboardService){
        this.pageSize = environment.appSetting.pageSize;
        this.model = new Pager();
        this.model.pageSize = this.pageSize;
    }

    ngOnInit () {
    }

    public init(){
        this.onPageChange(1);
    }

    onPageChange(event : number) {
        this.model.startIndex = event;
        this.dbService.duePayments(this.model).subscribe(result => {
            this.searchResult = result;
            this.pager.init(this.model.pageSize, this.model.startIndex, 
                            this.searchResult.recordCount);
        });
    }

    private onMouseOver(target: HTMLElement) : void {
        $(target).popover({
            trigger: 'hover',
            placement: 'left',
            html: true,
            content: function () {
                return $(this).parent().find(".pop-content").html();
            }
        });
    }

    private getStatusClass(sale : Sale) : string {
        if(sale.dueDate < (new Date()) && !(sale.status == 'Paid' || sale.status == 'Closed')){
            return 'status-over-due';
        }
        return `status-${sale.status.replace(' ','-').toLowerCase()}`;
    }
    private displayDate(dt : Date) : string {
        return GlobalLib.displayDate(dt);
    }
}