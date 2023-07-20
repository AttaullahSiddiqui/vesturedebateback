import { NgModule } from "@angular/core";
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbSelectModule,
  NbMenuModule,
  NbLayoutModule,
  NbInputModule,
} from "@nebular/theme";
import { ThemeModule } from "../../@theme/theme.module";
import { AddUserComponent } from "./adduser.component";
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
    NbSelectModule,
  ],
  declarations: [AddUserComponent],
})
export class AddUserModule {}
