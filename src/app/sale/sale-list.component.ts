import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Router } from '@angular/router';

import { AppConstants } from "../models/constants";
import { Sale, SaleSearchResult } from "../models/sale-model";

@Component({
    selector : 'app-sale-list',
    styleUrls : ['./sale-list.component.css'],
    templateUrl : './sale-list.component.html'
})
export class SaleListComponent implements OnInit {
    @Input() searchResult : SaleSearchResult;
    @Output() deleteParty : EventEmitter<Sale>;
    private dateDisplayFormat = AppConstants.dateDisplayFormat;
    private numbericDisplayFormat = AppConstants.numericDisplayFormat;
    
    constructor(private router : Router ){
        this.deleteParty = new EventEmitter<Sale>();
    }

    ngOnInit () {        
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
    private onDelete(sale : Sale) : void {
        this.deleteParty.emit(sale);
    }

    private getStatusClass(sale : Sale) : string {
        if(sale.dueDate < (new Date()) && !(sale.status == 'Paid' || sale.status == 'Closed')){
            return 'status-over-due';
        }
        return `status-${sale.status.replace(' ','-').toLowerCase()}`;
    }
}