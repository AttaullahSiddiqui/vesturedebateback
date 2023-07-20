import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from "@nebular/theme";
import { UtilityService } from "../../../@core/utils/utility.service";
import { LayoutService } from "../../../@core/utils";
import { filter, map, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "ngx-header",
  styleUrls: ["./header.component.scss"],
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user = {
    name: "-",
    picture: "assets/img/user.png",
  };

  userMenu = [{ title: "Log out" }];

  constructor(
    private sidebarService: NbSidebarService,
    private themeService: NbThemeService,
    private _utilityService: UtilityService,
    private layoutService: LayoutService,
    private menuService: NbMenuService,
    private breakpointService: NbMediaBreakpointsService,
    private router: Router
  ) {}

  ngOnInit() {
    var authorName = this._utilityService.getAuthor() || "User";
    this.user.name = authorName.charAt(0).toUpperCase() + authorName.slice(1);

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService
      .onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (isLessThanXl: boolean) => (this.userPictureOnly = isLessThanXl)
      );

    // this.themeService.onThemeChange()
    //   .pipe(
    //     map(({ name }) => name),
    //     takeUntil(this.destroy$),
    //   )
    //   .subscribe(themeName => this.currentTheme = themeName);
    this.menuService.onItemClick().subscribe((event) => {
      this.onContecxtItemSelection(event);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // changeTheme(themeName: string) {
  //   this.themeService.changeTheme(themeName);
  // }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, "menu-sidebar");
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.router.navigateByUrl("pages/dashboard");
    return false;
  }

  onContecxtItemSelection(event) {
    // console.log("click", event);
    if (event.item.title == "Log out") {
      this._utilityService.removeToken();
      this.router.navigateByUrl("/auth");
    }
  }
}
