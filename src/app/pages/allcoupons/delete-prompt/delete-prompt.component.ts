import { Component } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";
import { NbWindowRef } from "@nebular/theme";

@Component({
  selector: "ngx-delete-prompt",
  templateUrl: "delete-prompt.component.html",
  styleUrls: ["delete-prompt.component.scss"],
})
export class DeletePromptComponent {
  constructor(protected ref: NbDialogRef<DeletePromptComponent>) {}

  cancel() {
    this.ref.close(false);
  }

  submit() {
    this.ref.close(true);
  }
}
