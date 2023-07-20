import { NgModule } from "@angular/core";
import { NbMenuModule } from "@nebular/theme";

import { ThemeModule } from "../@theme/theme.module";
import { PagesComponent } from "./pages.component";
import { DashboardModule } from "./dashboard/dashboard.module";
import { PagesRoutingModule } from "./pages-routing.module";
import { MiscellaneousModule } from "./miscellaneous/miscellaneous.module";
import { AddUserModule } from "./addUser/adduser.module";
import { AllUserModule } from "./allUser/alluser.module";
import { AllSettingsModule } from "./allSettings/all-settings.module";
import { AddCategoryModule } from "./addcategory/addcategory.module";
import { AllCategoriesModule } from "./allcategories/allcategories.module";
import { AddCouponModule } from "./addcoupon/addcoupon.module";
import { AllCouponsModule } from "./allcoupons/allcoupons.module";
import { DeletePromptModule } from "./allcoupons/delete-prompt/delete-prompt.module";
import { SortCouponsModule } from "./sortcoupons/sort-coupons.module";
import { SortablejsModule } from "ngx-sortablejs";
import { AddStoreModule } from "./addstore/addstore.module";
import { EditStoreModule } from "./editstore/editstore.module";
import { AddBlogModule } from "./addblog/addblog.module";
import { AllBlogsModule } from "./allblogs/allblogs.module";
import { EmailListModule } from "./emaillist/email-list.module";
import { SliderModule } from "./slider/slider.module";
import { AddBannerModule } from "./addbanner/addbanner.module";
import { AddPostImageModule } from "./addpostimage/addpostimage.module";
import { SortStoresModule } from "./sortstores/sort-stores.module";

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    SortablejsModule.forRoot({ animation: 200 }),
    DashboardModule,
    AddUserModule,
    AllUserModule,
    AllSettingsModule,
    AddCategoryModule,
    AllCategoriesModule,
    AddCouponModule,
    AllCouponsModule,
    DeletePromptModule,
    SortCouponsModule,
    AddStoreModule,
    EditStoreModule,
    SortStoresModule,
    AddBannerModule,
    AddPostImageModule,
    AddBlogModule,
    AllBlogsModule,
    SliderModule,
    EmailListModule,
    MiscellaneousModule,
  ],
  declarations: [PagesComponent],
})
export class PagesModule {}
