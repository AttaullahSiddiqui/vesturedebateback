import { Component, OnDestroy } from "@angular/core";
import { DataService } from "../../@core/utils/data.service";
import { UtilityService } from "../../@core/utils/utility.service";

@Component({
  selector: "ngx-adduser",
  styleUrls: ["./adduser.component.scss"],
  templateUrl: "./adduser.component.html",
})
export class AddUserComponent implements OnDestroy {
  private alive = true;
  userData: any = {
    admin: false,
  };

  constructor(
    private _dataService: DataService,
    private _utlityService: UtilityService
  ) {}

  ngOnInit() {}

  addUser(userInfo: any) {
    var isAdmin = this._utlityService.isAdmin();
    if (!isAdmin) {
      this._dataService.showErrorToast(
        "You are not allowed to add User. Ask your Admin"
      );
      return;
    }

    this._dataService.addUser(userInfo).subscribe((res) => {
      if (res.data) {
        this.userData = { admin: false };
        this._dataService.showSuccessToast("New user added");
      } else {
        this._dataService.showErrorToast(res.message);
      }
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
