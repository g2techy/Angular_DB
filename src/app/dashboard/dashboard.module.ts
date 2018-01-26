import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { ChartComponent } from './chart.component';
import { DashboardPaymentComponent } from './dashboard-payment.component';

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { ChartModule } from 'angular-highcharts';
import { SharedModule } from "../shared/shared.module";

import { DashboardService } from '../services/dashboard.service';

@NgModule({
    declarations: [
        DashboardComponent, ChartComponent, DashboardPaymentComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ChartModule,
        SharedModule
    ],
    providers : [ DashboardService ]
})
export class DashboardModule { }