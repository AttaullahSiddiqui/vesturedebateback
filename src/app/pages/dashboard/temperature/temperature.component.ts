import { Component, OnDestroy } from "@angular/core";
import { NbThemeService } from "@nebular/theme";
import {
  Temperature,
  TemperatureHumidityData,
} from "../../../@core/data/temperature-humidity";
import { takeWhile } from "rxjs/operators";
import { forkJoin } from "rxjs";
import { DataService } from "../../../@core/utils/data.service";
import { UtilityService } from "../../../@core/utils/utility.service";

@Component({
  selector: "ngx-temperature",
  styleUrls: ["./temperature.component.scss"],
  templateUrl: "./temperature.component.html",
})
export class TemperatureComponent implements OnDestroy {
  private alive = true;

  temperatureData: Temperature;
  users: number;
  stores: number;
  coupons: number;
  blogs: number;
  userIcon = "person-outline";
  storeIcon = "home-outline";
  couponIcon = "gift-outline";
  blogIcon = "clipboard-outline";
  temperatureMode = "cool";

  humidityData: Temperature;
  humidity: number;
  humidityOff = false;
  humidityMode = "heat";

  theme: any;
  themeSubscription: any;

  constructor(
    private themeService: NbThemeService,
    private temperatureHumidityService: TemperatureHumidityData,
    private _dataService: DataService,
    private _utlityService: UtilityService
  ) {
    this.themeService
      .getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe((config) => {
        this.theme = config.variables.temperature;
        // console.log("hahha");
        // console.log(this.theme)
      });
  }

  ngOnInit() {
    this._dataService.fetchAPI("/api/countCoupons").subscribe((res) => {
      if (res.data) this.coupons = res.data;
      else this.errorHandler(res.message);
    });
    this._dataService.fetchAPI("/api/countBlogs").subscribe((res) => {
      if (res.data) this.blogs = res.data;
      else this.errorHandler(res.message);
    });
    this._dataService.fetchAPI("/api/countStores").subscribe((res) => {
      if (res.data) this.stores = res.data;
      else this.errorHandler(res.message);
    });
    this._dataService.fetchAPI("/api/countUsers").subscribe((res) => {
      if (res.data) this.users = res.data;
      else this.errorHandler(res.message);
    });
  }

  errorHandler(err) {
    console.log("Can't load " + err + " at the moment", "Error");
  }
  ngOnDestroy() {
    this.alive = false;
  }
}
