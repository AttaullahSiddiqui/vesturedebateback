import { NgModule } from "@angular/core";
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbMenuModule,
  NbLayoutModule,
} from "@nebular/theme";
import { ThemeModule } from "../../@theme/theme.module";
import { EmailListComponent } from "./email-list.component";
import { Ng2SmartTableModule } from "ng2-smart-table";

@NgModule({
  imports: [
    NbLayoutModule,
    NbCardModule,
    NbActionsModule,
    NbButtonModule,
    ThemeModule,
    NbMenuModule,
    NbActionsModule,
    Ng2SmartTableModule,
  ],
  declarations: [EmailListComponent],
})
export class EmailListModule {}
