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
  NbDialogModule,
  NbWindowModule,
} from "@nebular/theme";
import { ThemeModule } from "../../@theme/theme.module";
import { AddPostImageComponent } from "./addpostimage.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

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
    NbSelectModule,
    ThemeModule,
    NbMenuModule,
    NbSpinnerModule,
    ImageCropperModule,
  ],
  declarations: [AddPostImageComponent],
})
export class AddPostImageModule {}
