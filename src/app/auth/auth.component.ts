import { Component, OnInit } from "@angular/core";
import { DataService } from "../@core/utils/data.service";
import { UtilityService } from "../@core/utils/utility.service";
import { Router } from "@angular/router";

@Component({
  selector: "ngx-auth",
  styleUrls: ["auth.component.scss"],
  templateUrl: "./auth.component.html",
})
export class AuthComponent {
  userData: any = {};

  constructor(
    private _dataService: DataService,
    private _utlityService: UtilityService,
    private router: Router
  ) {}

  ngOnInit() {
    var checkAuth = this._utlityService.getToken();
    if (checkAuth) {
      this._dataService
        .postAPI("/api/verifyUserToken", { token: checkAuth })
        .subscribe((res) => {
          if (res.data) this.router.navigateByUrl("pages/dashboard");
        });
    }
  }

  authUser(userInfo: any) {
    this._dataService.postAPI("/api/login", userInfo).subscribe((res) => {
      if (res.data) {
        this._utlityService.setToken(res.data);
        this._dataService.showSuccessToast("Logged In");
        this.router.navigateByUrl("pages/dashboard");
      } else {
        this._dataService.showErrorToast(res["message"]);
      }
    });
  }
}
