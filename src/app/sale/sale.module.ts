import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { MyDatePickerModule } from "../my-date-picker/my-date-picker.module";
import { SaleRoutingModule } from './sale-routing.module';
import { SharedModule } from "../shared/shared.module";
import { SaleService } from '../services/sale.service';

import { SaleComponent } from './sale.component';
import { SaleSearchComponent } from './sale-search.component';
import { SaleListComponent } from './sale-list.component';
import { SaleAddComponent } from './sale-add.component';

@NgModule({
    declarations : [ SaleComponent, SaleSearchComponent, SaleListComponent, SaleAddComponent ],
    imports : [ CommonModule, ReactiveFormsModule, MyDatePickerModule, SaleRoutingModule, SharedModule ],
    providers : [ SaleService ]
})
export class SaleModule {}