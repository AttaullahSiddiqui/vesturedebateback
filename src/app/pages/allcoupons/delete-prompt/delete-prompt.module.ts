import { NgModule } from "@angular/core";
import { NbCardModule, NbButtonModule } from "@nebular/theme";
import { DeletePromptComponent } from "./delete-prompt.component";

@NgModule({
  imports: [NbCardModule, NbButtonModule],
  declarations: [DeletePromptComponent],
})
export class DeletePromptModule {}
