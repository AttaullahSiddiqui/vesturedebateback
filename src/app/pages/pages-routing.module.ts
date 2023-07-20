import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NotFoundComponent } from "./miscellaneous/not-found/not-found.component";
import { AddUserComponent } from "./addUser/adduser.component";
import { UtilityService } from "../@core/utils/utility.service";
import { AllUserComponent } from "./allUser/alluser.component";
import { AllSettingsComponent } from "./allSettings/all-settings.component";
import { AddCategoryComponent } from "./addcategory/addcategory.component";
import { AllCategoriesComponent } from "./allcategories/allcategories.component";
import { AddCouponComponent } from "./addcoupon/addcoupon.component";
import { AllCouponsComponent } from "./allcoupons/allcoupons.component";
import { SortCouponsComponent } from "./sortcoupons/sort-coupons.component";
import { AddStoreComponent } from "./addstore/addstore.component";
import { EditStoreComponent } from "./editstore/editstore.component";
import { AddBlogComponent } from "./addblog/addblog.component";
import { AllBlogsComponent } from "./allblogs/allblogs.component";
import { EmailListComponent } from "./emaillist/email-list.component";
import { SliderComponent } from "./slider/slider.component";
import { AddBannerComponent } from "./addbanner/addbanner.component";
import { AddPostImageComponent } from "./addpostimage/addpostimage.component";
import { SortStoresComponent } from "./sortstores/sort-stores.component";

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [UtilityService],
      },
      {
        path: "adduser",
        component: AddUserComponent,
        canActivate: [UtilityService],
      },
      {
        path: "alluser",
        component: AllUserComponent,
        canActivate: [UtilityService],
      },
      {
        path: "settings",
        component: AllSettingsComponent,
        canActivate: [UtilityService],
      },
      {
        path: "addcategory",
        component: AddCategoryComponent,
        canActivate: [UtilityService],
      },
      {
        path: "allcategories",
        component: AllCategoriesComponent,
        canActivate: [UtilityService],
      },
      {
        path: "addcoupon",
        component: AddCouponComponent,
        canActivate: [UtilityService],
      },
      {
        path: "allcoupons",
        component: AllCouponsComponent,
        canActivate: [UtilityService],
      },
      {
        path: "sortcoupons",
        component: SortCouponsComponent,
        canActivate: [UtilityService],
      },
      {
        path: "addstore",
        component: AddStoreComponent,
        canActivate: [UtilityService],
      },
      {
        path: "editstore",
        component: EditStoreComponent,
        canActivate: [UtilityService],
      },
      {
        path: "sortstores",
        component: SortStoresComponent,
        canActivate: [UtilityService],
      },
      {
        path: "addblog",
        component: AddBlogComponent,
        canActivate: [UtilityService],
      },
      {
        path: "allblogs",
        component: AllBlogsComponent,
        canActivate: [UtilityService],
      },
      {
        path: "slider",
        component: SliderComponent,
        canActivate: [UtilityService],
      },
      {
        path: "emaillist",
        component: EmailListComponent,
        canActivate: [UtilityService],
      },
      {
        path: "addbanner",
        component: AddBannerComponent,
        canActivate: [UtilityService],
      },
      {
        path: "addpostimage",
        component: AddPostImageComponent,
        canActivate: [UtilityService],
      },
      {
        path: "",
        redirectTo: "/pages/dashboard",
        pathMatch: "full",
      },
      {
        path: "**",
        component: NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
