import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SaleComponent } from './sale.component';
import { SaleSearchComponent } from './sale-search.component';
import { SaleAddComponent } from './sale-add.component';

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