import { NgModule } from "@angular/core";
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbMenuModule,
  NbLayoutModule,
  NbInputModule,
  NbSpinnerModule,
  NbCheckboxModule,
} from "@nebular/theme";
import { ThemeModule } from "../../@theme/theme.module";
import { AddCategoryComponent } from "./addcategory.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
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
  ],
  declarations: [AddCategoryComponent],
})
export class AddCategoryModule {}
