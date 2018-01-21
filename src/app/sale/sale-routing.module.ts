import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SaleComponent } from './sale.component';
import { SaleSearchComponent } from './sale-search.component';
import { SaleAddComponent } from './sale-add.component';
import { SaleReportComponent } from './sale-report.component';

const saleRoutes : Routes = [
    {
        path : '',
        component : SaleComponent,
        children : [
            {
                path: '',
                component : SaleSearchComponent
            },
            {
                path: 'add',
                component : SaleAddComponent
            },
            {
                path: 'edit/:id',
                component : SaleAddComponent
            },
            {
                path: 'report',
                component : SaleReportComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(saleRoutes)
      ],
      exports: [
        RouterModule
      ],
})
export class SaleRoutingModule { }