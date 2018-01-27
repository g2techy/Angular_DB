import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { MyDatePickerModule } from "../my-date-picker/my-date-picker.module";
import { LoanRoutingModule } from './loan-routing.module';
import { SharedModule } from "../shared/shared.module";
import { LoanService } from '../services/loan.service';

import { LoanComponent } from './loan.component';
import { LoanSearchComponent } from './loan-search.component';
import { LoanListComponent } from './loan-list.component';
import { LoanAddComponent } from './loan-add.component';
import { LoanPaymentComponent } from './loan-payment.component';
import { LoanPaymentListComponent } from './loan-payment-list.component';
import { LoanReportComponent } from './report/loan-report.component';
import { LoanCalcInterestComponent } from './loan-calc-interest.component';

@NgModule({
    declarations : [ LoanComponent, LoanSearchComponent, LoanListComponent, LoanAddComponent,
        LoanPaymentComponent, LoanPaymentListComponent, LoanReportComponent, LoanCalcInterestComponent
    ],
    imports : [ CommonModule, ReactiveFormsModule, FormsModule, MyDatePickerModule, LoanRoutingModule, SharedModule ],
    providers : [ LoanService ]
})
export class LoanModule {}