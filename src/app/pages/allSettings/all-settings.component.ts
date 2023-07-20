import { Component, OnDestroy } from "@angular/core";
import { DataService } from "../../@core/utils/data.service";
import { UtilityService } from "../../@core/utils/utility.service";

@Component({
  selector: "ngx-allsettings",
  styleUrls: ["./all-settings.component.scss"],
  templateUrl: "./all-settings.component.html",
})
export class AllSettingsComponent implements OnDestroy {
  private alive = true;
  dummyArr: [] = null;
  isBusy: Boolean = false;
  mainObject = {
    tags: "",
    eventName: "",
    eventBarText: "",
  };

  constructor(
    private _dataService: DataService,
    private _utlityService: UtilityService
  ) {}

  ngOnInit() {
    this._dataService.fetchAPI("/api/fetchSettingsData").subscribe((res) => {
      if (res.data) {
        this.mainObject = res.data;
      } else this._dataService.showErrorToast(res.message);
    });
  }

  submitChanges(mainObj) {
    if (this.isBusy) return;
    this.isBusy = true;

    this._dataService
      .postAPI("/api/updateSettings", mainObj)
      .subscribe((res) => {
        if (res.data) {
          this._dataService.showSuccessToast(res.message);
          window.scrollTo(0, 0);
          this.isBusy = false;
        } else this._dataService.showErrorToast(res.message);
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
