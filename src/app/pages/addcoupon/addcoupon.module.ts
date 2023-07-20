import { NgModule } from "@angular/core";
import { NgSelectModule } from "@ng-select/ng-select";
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbMenuModule,
  NbLayoutModule,
  NbInputModule,
  NbSpinnerModule,
  NbCheckboxModule,
  NbRadioModule,
  NbDatepickerModule,
} from "@nebular/theme";
import { ThemeModule } from "../../@theme/theme.module";
import { AddCouponComponent } from "./addcoupon.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    NgSelectModule,
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
    NbSpinnerModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
  ],
  declarations: [AddCouponComponent],
})
export class AddCouponModule {}
