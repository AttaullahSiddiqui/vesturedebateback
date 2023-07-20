import { Component, OnDestroy, Input } from "@angular/core";
import { DataService } from "../../@core/utils/data.service";
import { Options } from "sortablejs";

@Component({
  selector: "ngx-sort-coupons",
  styleUrls: ["./sort-coupons.component.scss"],
  templateUrl: "./sort-coupons.component.html",
})
export class SortCouponsComponent implements OnDestroy {
  private alive = true;
  storeArray: {} = null;
  selectedStore = null;
  coupons = null;
  reArranging: Boolean = false;

  constructor(private _dataService: DataService) {}

  ngOnInit() {
    this._dataService.fetchAPI("/api/fetchStoresOnlyId").subscribe((res) => {
      if (res.data) {
        this.storeArray = res.data;
      } else this._dataService.showErrorToast(res.message);
    });
  }
  options: Options = {
    onUpdate: (ev: any) => {
      var localArr = [];
      if (ev.newIndex > ev.oldIndex) {
        var rootSortNo = this.coupons[ev.newIndex].sortNo;
        for (var a = ev.newIndex; a >= ev.oldIndex; a--) {
          if (a == ev.oldIndex) {
            this.coupons[a].sortNo = rootSortNo;
            localArr.push(this.coupons[a]);
          } else {
            this.coupons[a].sortNo = this.coupons[a - 1].sortNo;
            localArr.push(this.coupons[a]);
          }
        }
      } else if (ev.oldIndex > ev.newIndex) {
        var rootSortNo = this.coupons[ev.newIndex].sortNo;
        for (var x = ev.newIndex; x <= ev.oldIndex; x++) {
          if (x == ev.oldIndex) {
            this.coupons[x].sortNo = rootSortNo;
            localArr.push(this.coupons[x]);
          } else {
            this.coupons[x].sortNo = this.coupons[x + 1].sortNo;
            localArr.push(this.coupons[x]);
          }
        }
      }
      this.sortCouponFunc(localArr);
    },
  };
  loadCoupons(storeId) {
    this._dataService
      .fetchAPIUsingId("/api/fetchCouponsForSorting", storeId)
      .subscribe((res) => {
        if (res.data) {
          this.coupons = [];
          this.coupons = res.data;
        } else {
          this.coupons = [];
          this._dataService.showErrorToast(res.message);
        }
      });
  }
  sortCouponFunc(updatedArr) {
    this._dataService
      .sortAPI("/api/sortCoupons", updatedArr)
      .subscribe((res) => {
        if (res.data) {
        } else this._dataService.showErrorToast(res.message);
      });
  }
  reSort() {
    this.reArranging = true;
    this._dataService
      .postAPI("/api/reArrangeCoupons", { storeId: this.selectedStore })
      .subscribe((res) => {
        if (res.data) {
          this.loadCoupons(this.selectedStore);
          this._dataService.showSuccessToast(res.message);
          window.scrollTo(0, 0);
          this.reArranging = false;
        } else this._dataService.showErrorToast(res.message);
      });
  }
  trackByFunc(index, item) {
    if (!item) return null;
    return item.sortNo;
  }
  ngOnDestroy() {
    this.alive = false;
  }
}
