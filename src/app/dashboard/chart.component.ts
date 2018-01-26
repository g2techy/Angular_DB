import { Component, OnInit, Injector, Input, Output, ViewChild, ElementRef } from '@angular/core';

import { DashboardService } from '../services/dashboard.service';
import { LogService } from '../helpers/logging/log.service';
import { AlertService } from '../services/alert-service.service';

import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
    @Input() chartModel : any;
    @ViewChild('chartContainer') chartContainer : ElementRef;
    private chart : Chart;
    private headerText : string;
    constructor(private injector : Injector,
                private dashboardService : DashboardService,
                private logService : LogService,
                private alertService : AlertService
    ) {         
    }

    ngOnInit() {
        this.loadChart();
    }

    public init(model : any) : void {
        this.chartModel = model;
        this.headerText = this.chartModel.headerText;
        this.loadChart();
    }

    private loadChart() : void {
        
        if(this.chartModel === undefined || this.chartModel.chartOptions === undefined){
            this.chartContainer.nativeElement.innerHTML = "Info : Please provide chart options.";
            return;
        }
        let _chartContDiv = this.chartContainer.nativeElement;
        this.dashboardService.chartData(this.chartModel.chartTypeID).subscribe(data => {
            if(data.errorCode !== undefined && data.errorCode == 1){
                _chartContDiv.innerHTML = "Info : " + data.errorMessage;
            } else {
                if(this.chartModel.chartOptions.series !== undefined && data.series !== undefined){
                    this.chartModel.chartOptions.series = data.series;
                }
                if(this.chartModel.chartOptions.xAxis !== undefined && data.categories !== undefined){
                    this.chartModel.chartOptions.xAxis.categories = data.categories;
                }
            }
            this.chart = new Chart(<any>this.chartModel.chartOptions);
        });
    }

}
