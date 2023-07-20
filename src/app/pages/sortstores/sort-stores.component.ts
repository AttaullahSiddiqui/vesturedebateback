import { Component, OnDestroy, Input } from "@angular/core";
import { DataService } from "../../@core/utils/data.service";
import { Options } from "sortablejs";

@Component({
  selector: "ngx-sort-stores",
  styleUrls: ["./sort-stores.component.scss"],
  templateUrl: "./sort-stores.component.html",
})
export class SortStoresComponent implements OnDestroy {
  private alive = true;
  selectedStore = "";
  stores = null;
  reArranging: Boolean = false;

  constructor(private _dataService: DataService) {}

  ngOnInit() {
    this.loadStores();
  }
  options: Options = {
    onUpdate: (ev: any) => {
      var localArr = [];
      if (ev.newIndex > ev.oldIndex) {
        var rootSortNo = this.stores[ev.newIndex].sortNo;
        for (var a = ev.newIndex; a >= ev.oldIndex; a--) {
          if (a == ev.oldIndex) {
            this.stores[a].sortNo = rootSortNo;
            localArr.push(this.stores[a]);
          } else {
            this.stores[a].sortNo = this.stores[a - 1].sortNo;
            localArr.push(this.stores[a]);
          }
        }
      } else if (ev.oldIndex > ev.newIndex) {
        var rootSortNo = this.stores[ev.newIndex].sortNo;
        for (var x = ev.newIndex; x <= ev.oldIndex; x++) {
          if (x == ev.oldIndex) {
            this.stores[x].sortNo = rootSortNo;
            localArr.push(this.stores[x]);
          } else {
            this.stores[x].sortNo = this.stores[x + 1].sortNo;
            localArr.push(this.stores[x]);
          }
        }
      }
      this.sortStoreFunc(localArr);
    },
  };
  loadStores() {
    this._dataService.fetchAPI("/api/fetchTopStores").subscribe((res) => {
      if (res.data) {
        this.stores = [];
        this.stores = res.data.sort(
          (a, b) => parseFloat(a.sortNo) - parseFloat(b.sortNo)
        );
      } else {
        this.stores = [];
        this._dataService.showErrorToast(res.message);
      }
    });
  }
  sortStoreFunc(updatedArr) {
    this._dataService
      .sortAPI("/api/sortStores", updatedArr)
      .subscribe((res) => {
        if (res.data) {
        } else this._dataService.showErrorToast(res.message);
      });
  }
  reSort() {
    this.reArranging = true;
    this._dataService
      .postAPI("/api/reArrangeStores", { storeId: "kjg" })
      .subscribe((res) => {
        if (res.data) {
          this.loadStores();
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
