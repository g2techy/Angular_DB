import { Component, OnInit, Injector, ViewChild } from '@angular/core';

import { DashboardService } from '../services/dashboard.service';
import { LogService } from '../helpers/logging/log.service';
import { AlertService } from '../services/alert-service.service';

import { Chart } from 'angular-highcharts';
import { ChartComponent } from './chart.component';
import { DashboardPaymentComponent } from './dashboard-payment.component';

import { DashboardChartOptions } from '../models/dashboard.molel';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private chartModels : any[];
  @ViewChild('saleChart') saleChartComp : ChartComponent;
  @ViewChild('brokChart') brokChartComp : ChartComponent;
  @ViewChild('brokPieChart') brokPieChartComp : ChartComponent;
  @ViewChild('loanChart') loanChartComp : ChartComponent;
  @ViewChild('loanChart2') loanChartComp2 : ChartComponent;
  @ViewChild('duePayComp') duePayComp : DashboardPaymentComponent;
  private childCtrlLoaded : boolean[];

  constructor(private injector : Injector,
              private dashboardService : DashboardService,
              private logService : LogService,
              private alertService : AlertService) {
      this.childCtrlLoaded = [false, false, false, false];
  }

  ngOnInit() {
    this.chartModels = DashboardChartOptions;
    this.onTabActive(0);
  }

  private onTabActive(tabIndex : number) : void {
    if(this.childCtrlLoaded[tabIndex]){
      return;
    }
    if(tabIndex == 0){
      this.saleChartComp.init(this.chartModels[0]);
    }else if(tabIndex == 1) {
      this.duePayComp.init();      
    }else if(tabIndex == 2) {
      this.brokChartComp.init(this.chartModels[1]);
      this.brokPieChartComp.init(this.chartModels[2]);
    }else if(tabIndex == 3){
      this.loanChartComp.init(this.chartModels[3]);
      this.loanChartComp2.init(this.chartModels[4]);
    }
    this.childCtrlLoaded[tabIndex] = true;
  }

}
