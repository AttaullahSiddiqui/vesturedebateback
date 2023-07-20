import { NgModule } from "@angular/core";
import { NgSelectModule } from "@ng-select/ng-select";
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbMenuModule,
  NbLayoutModule,
  NbInputModule,
  NbCheckboxModule,
  NbRadioModule,
  NbDatepickerModule,
  NbSpinnerModule,
  NbDialogModule,
  NbWindowModule,
} from "@nebular/theme";
import { ThemeModule } from "../../@theme/theme.module";
import { AllCouponsComponent } from "./allcoupons.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Ng2SmartTableModule } from "ng2-smart-table";

@NgModule({
  imports: [
    NgSelectModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    NbLayoutModule,
    NbCardModule,
    NbActionsModule,
    NbButtonModule,
    NbInputModule,
    ThemeModule,
    NbMenuModule,
    NbActionsModule,
    Ng2SmartTableModule,
    NbCheckboxModule,
    NbSpinnerModule,
    NbRadioModule,
    NbDatepickerModule,
  ],
  declarations: [AllCouponsComponent],
})
export class AllCouponsModule {}
