import { Component, OnInit, Input, Output, EventEmitter, ViewChild, Injector} from '@angular/core';
import { TitleCasePipe } from '@angular/common';

@Component({
    selector : 'app-datagrid',
    templateUrl : './datagrid.component.html'
})
export class DataGridComponent implements OnInit {
    @Input() dataSource : any[];
    @Input() private dataColumns : string[];
    constructor(private injector : Injector,
                private tcPipe : TitleCasePipe){
        this.dataColumns = [];
    }
    ngOnInit(){}

    public dataBind(model? : any[]) : void {
        if(model !== undefined){
            this.dataSource = model;
        }
        if(this.dataColumns.length == 0){
            let _obj = this.dataSource[0];
            Object.keys(_obj).forEach(key => {
                this.dataColumns.push(key);
            });
        }
    }
}