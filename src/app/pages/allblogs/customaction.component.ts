import { Component, Input, OnInit } from "@angular/core";
import { ViewCell } from "ng2-smart-table";

@Component({
  template: `
    <span
      style="background-color: rgb(90, 146, 90);color: white;padding: 5px 8px; border-radius: 5px;margin-left:10%"
      >{{ renderValue }}</span
    >
  `,
})
export class CustomRenderComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: any;
  @Input() rowData: any;

  ngOnInit() {
    this.renderValue = this.value ? "Featured" : "-";
  }
}

@Component({
  template: ` <img [src]="renderValue" width="200" height="110" /> `,
})
export class showImageComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: any;
  @Input() rowData: any;

  ngOnInit() {
    this.renderValue = this.value;
  }
}
