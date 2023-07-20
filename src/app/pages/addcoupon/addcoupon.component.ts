import { Component, OnDestroy } from "@angular/core";
import { DataService } from "../../@core/utils/data.service";
import { UtilityService } from "../../@core/utils/utility.service";

@Component({
  selector: "ngx-addcoupon",
  styleUrls: ["./addcoupon.component.scss"],
  templateUrl: "./addcoupon.component.html",
})
export class AddCouponComponent implements OnDestroy {
  private alive = true;
  stores: any = {};
  couponInfo: any = { activeStatus: true };
  isBusy = false;

  constructor(
    private _dataService: DataService,
    private _utlityService: UtilityService
  ) {}

  ngOnInit() {
    this._dataService.fetchAPI("/api/fetchStoresOnlyId").subscribe((res) => {
      if (res.data) {
        this.stores = res.data;
      } else this._dataService.showErrorToast(res.message);
    });
  }

  addCoupon(couponData) {
    var dateBackup = couponData.expDate;
    if (this.isBusy) return;
    this.isBusy = true;
    couponData.expDate = new Date(couponData.expDate).getTime();
    var today = Date.now();
    if (today > couponData.expDate) {
      this._dataService.showErrorToast("Wrong Date selected");
      return;
    }
    if (!couponData.trending) couponData.trending = false;
    if (!couponData.featuredForHome) couponData.featuredForHome = false;
    if (!couponData.newArrival) couponData.newArrival = false;
    if (!couponData.forEvent) couponData.forEvent = false;
    if (couponData.activeStatus) couponData.code = "";

    this._dataService.postAPI("/api/addCoupon", couponData).subscribe((res) => {
      if (res.data) {
        this._dataService.showSuccessToast(res.message);
        this.couponInfo["featuredForHome"] = false;
        this.couponInfo["trending"] = false;
        this.couponInfo["newArrival"] = false;
        this.couponInfo["forEvent"] = false;
        this.couponInfo["code"] = "";
        this.couponInfo["expDate"] = dateBackup;
        window.scrollTo(0, 0);
        this.isBusy = false;
      } else this._dataService.showErrorToast(res.message);
    });
  }
  fetchTrackingLink(_id) {
    this._dataService
      .fetchAPIUsingId("/api/fetchStoreByIdDuplicate", _id)
      .subscribe((res) => {
        if (res.data) {
          this.couponInfo["trackingLink"] = res.data.trackUrl;
        } else this._dataService.showErrorToast(res.message);
      });
  }
  ngOnDestroy() {
    this.alive = false;
  }
}
