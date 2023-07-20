import { Component, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
  goToRoute: string;
}

@Component({
  selector: "ngx-dashboard",
  styleUrls: ["./dashboard.component.scss"],
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent implements OnDestroy {
  private alive = true;

  solarValue: number;
  lightCard: CardSettings = {
    title: "Add Category",
    iconClass: "nb-lightbulb",
    type: "primary",
    goToRoute: "pages/addcategory",
  };
  rollerShadesCard: CardSettings = {
    title: "Add Store",
    iconClass: "nb-roller-shades",
    type: "success",
    goToRoute: "pages/addstore",
  };
  wirelessAudioCard: CardSettings = {
    title: "Add Coupon",
    iconClass: "nb-audio",
    type: "info",
    goToRoute: "pages/addcoupon",
  };
  coffeeMakerCard: CardSettings = {
    title: "Add Blog",
    iconClass: "nb-coffee-maker",
    type: "warning",
    goToRoute: "pages/addblog",
  };

  statusCards = [
    {
      ...this.lightCard,
      type: "warning",
    },
    {
      ...this.rollerShadesCard,
      type: "primary",
    },
    {
      ...this.wirelessAudioCard,
      type: "danger",
    },
    {
      ...this.coffeeMakerCard,
      type: "info",
    },
  ];

  constructor(private router: Router) {}

  ngOnDestroy() {
    this.alive = false;
  }
  changeRoute(url: string) {
    this.router.navigateByUrl(url);
  }
}
