import { NgModule } from "@angular/core";
import { NgSelectModule } from "@ng-select/ng-select";
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
  NbTabsetModule,
} from "@nebular/theme";
import { ThemeModule } from "../../@theme/theme.module";
import { SliderComponent } from "./slider.component";
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
    ImageCropperModule,
    NbTabsetModule,
  ],
  declarations: [SliderComponent],
})
export class SliderModule {}
