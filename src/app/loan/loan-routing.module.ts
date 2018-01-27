import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoanComponent } from './loan.component';
import { LoanSearchComponent } from './loan-search.component';
import { LoanAddComponent } from './loan-add.component';
import { LoanReportComponent } from './report/loan-report.component';

const loanRoutes : Routes = [
    {
        path : '',
        component : LoanComponent,
        children : [
            {
                path: '',
                component : LoanSearchComponent
            },
            {
                path: 'add',
                component : LoanAddComponent
            },
            {
                path: 'edit/:id',
                component : LoanAddComponent
            },
            {
                path: 'report',
                component : LoanReportComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(loanRoutes)
      ],
      exports: [
        RouterModule
      ],
})
export class LoanRoutingModule { }