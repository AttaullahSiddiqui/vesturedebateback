import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  NbMenuModule,
  NbLayoutModule,
  NbCardModule,
  NbActionsModule,
  NbButtonModule,
  NbInputModule,
} from "@nebular/theme";

import { ThemeModule } from "../@theme/theme.module";
import { AuthComponent } from "./auth.component";
import { AuthRoutingModule } from "./auth-routing";

@NgModule({
  imports: [
    AuthRoutingModule,
    FormsModule,
    NbLayoutModule,
    NbCardModule,
    NbActionsModule,
    NbButtonModule,
    NbInputModule,
    ThemeModule,
    NbMenuModule,
  ],
  declarations: [AuthComponent],
})
export class AuthModule {}
