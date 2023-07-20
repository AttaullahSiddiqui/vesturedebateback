import { Component, OnDestroy } from "@angular/core";
import { DataService } from "../../@core/utils/data.service";
import { UtilityService } from "../../@core/utils/utility.service";

@Component({
  selector: "ngx-addcategory",
  styleUrls: ["./addcategory.component.scss"],
  templateUrl: "./addcategory.component.html",
})
export class AddCategoryComponent implements OnDestroy {
  private alive = true;
  catData: any = {};
  isBusy = false;

  constructor(
    private _dataService: DataService,
    private _utlityService: UtilityService
  ) {}

  ngOnInit() {}

  createCategory(catInfo: any) {
    if (this.isBusy) return;
    if (!catInfo.forBlogs) catInfo.forBlogs = false;
    if (!catInfo.catFeatured) catInfo.catFeatured = false;
    catInfo.categoryURL = catInfo.catName.replace(/ /g, "-").toLowerCase();
    this.isBusy = true;
    this._dataService
      .postAPI("/api/createCategory", catInfo)
      .subscribe((res) => {
        if (res.data) {
          this._dataService.showSuccessToast(res.message);
          this.isBusy = false;
          this.catData = {};
        } else {
          this._dataService.showErrorToast(res.message);
          this.isBusy = false;
        }
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
