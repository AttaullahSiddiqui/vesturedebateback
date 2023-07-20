import { NgModule } from "@angular/core";
import { NgSelectModule } from "@ng-select/ng-select";
import { SortablejsModule } from "ngx-sortablejs";
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbMenuModule,
  NbLayoutModule,
  NbInputModule
} from "@nebular/theme";
import { ThemeModule } from "../../@theme/theme.module";
import { SortStoresComponent } from "./sort-stores.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    NgSelectModule,
    SortablejsModule,
    FormsModule,
    ReactiveFormsModule,
    NbLayoutModule,
    NbCardModule,
    NbActionsModule,
    NbButtonModule,
    NbInputModule,
    ThemeModule,
    NbMenuModule,
    NbActionsModule
  ],
  declarations: [SortStoresComponent],
})
export class SortStoresModule {}
