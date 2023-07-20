import { NgModule } from "@angular/core";
import { NgSelectModule } from "@ng-select/ng-select";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { ImageCropperModule } from "ngx-image-cropper";
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbMenuModule,
  NbLayoutModule,
  NbSelectModule,
  NbInputModule,
  NbSpinnerModule,
  NbCheckboxModule,
  NbRadioModule,
  NbDatepickerModule,
} from "@nebular/theme";
import { ThemeModule } from "../../@theme/theme.module";
import { AddStoreComponent } from "./addstore.component";
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
    NbSelectModule,
    ThemeModule,
    NbMenuModule,
    NbActionsModule,
    NbSpinnerModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    CKEditorModule,
    ImageCropperModule,
  ],
  declarations: [AddStoreComponent],
})
export class AddStoreModule {}
