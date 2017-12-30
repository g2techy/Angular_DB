import { Component, OnInit, Input, Output, EventEmitter, Injector } from "@angular/core";
import { Inject } from "@angular/compiler/src/core";

import { LogService } from "../../helpers/logging/log.service";

@Component({
    selector : 'app-pager',
    templateUrl : './pager.component.html',
    styleUrls : ['./pager.component.css']
})
export class PagerComponent implements OnInit {
    @Output() onPageChange : EventEmitter<number>;
    @Input() pageSize : number;
    private recordCount : number = 0;
    private startIndex : number = 1
    private previousIndex : number;
    private nextIndex : number;
    private showNextBtn : boolean = false;

    constructor(private injector : Injector){
        this.onPageChange = new EventEmitter<number>();
        this.init(this.pageSize, 1, 0);
    }

    public init(ps : number, si : number, rc : number){
        this.pageSize = ps;
        this.startIndex = si;
        this.recordCount = rc;

        this.previousIndex = this.startIndex - this.pageSize;
        if(this.previousIndex < 1){
            this.previousIndex = 1;
        }
        this.showNextBtn = false;
        if(this.startIndex < this.recordCount){
            this.nextIndex = this.startIndex + this.pageSize;
            this.showNextBtn = true;
            if(this.recordCount < this.nextIndex){
                this.showNextBtn = false;
                this.nextIndex = this.recordCount - this.pageSize;
            }
        }
        
    }

    ngOnInit(){}

    onPageIndexChanging(startIndex : number) : void {
        this.onPageChange.emit(startIndex);
    }

    private log(message : any){
        this.injector.get(LogService).log(message);
    }
}