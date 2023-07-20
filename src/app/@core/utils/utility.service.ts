import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { DataService } from "./data.service";

@Injectable()
export class UtilityService {
  userVar: string = null;
  userData: any = null;
  constructor(private _http: HttpClient, private _dataService: DataService) {}

  public setToken(data: any) {
    this.userVar = data.token;
    this.userData = data;
    localStorage.setItem("VestureDebateAuthorization", data.token);
  }
  public getToken(): string {
    return localStorage.getItem("VestureDebateAuthorization");
  }
  public removeToken() {
    localStorage.removeItem("VestureDebateAuthorization");
    this.userVar = "";
    this.userData = null;
  }
  public isAdmin() {
    return this.userData.admin;
  }
  public getAuthor() {
    return this.userData.userName;
  }
  public canActivate() {
    if (this.userVar) return true;
    var xyz = localStorage.getItem("VestureDebateAuthorization");
    if (xyz) return this.authCallBack(xyz);
    else return false;
  }
  private authCallBack(xyz) {
    return new Promise((resolve, reject) => {
      this._dataService
        .postAPI("/api/verifyUserToken", { token: xyz })
        .subscribe((res) => {
          if (res.data) {
            this.userVar = xyz;
            this.userData = res.data;
            resolve(true);
          } else resolve(false);
        });
    });
  }
}
