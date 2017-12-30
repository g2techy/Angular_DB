import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from '../services/auth-guard.service';

const dashboardRoutes : Routes = [
    { path : 'dashboard', component : DashboardComponent, canActivate : [AuthGuard] },
];

@NgModule({
    imports: [
      RouterModule.forChild(dashboardRoutes)
    ],
    exports: [
      RouterModule
    ]
})
export class DashboardRoutingModule {}