import { Component, OnDestroy, Input } from "@angular/core";
import { DataService } from "../../@core/utils/data.service";
import { LocalDataSource } from "ng2-smart-table";

@Component({
  selector: "ngx-email-list",
  styleUrls: ["./email-list.component.scss"],
  templateUrl: "./email-list.component.html",
})
export class EmailListComponent implements OnDestroy {
  private alive = true;
  emailArray: any;
  settings = {
    columns: {
      sno: {
        title: "sNo",
        type: "number",
        valuePrepareFunction: (value, row, cell) => {
          return cell.row.index + 1;
        },
        width: "15%",
        filter: false,
      },
      email: {
        title: "Email",
        type: "string",
        width: "85%",
      },
    },
    actions: {
      add: false,
      delete: false,
      edit: false,
    },
  };
  source: LocalDataSource = new LocalDataSource();

  constructor(private _dataService: DataService) {}

  ngOnInit() {
    this._dataService.fetchAPI("/api/fetchEmails").subscribe((res) => {
      if (res.data) {
        this.emailArray = res.data;
        this.source.load(this.emailArray);
      } else this._dataService.showErrorToast(res.message);
    });
  }
  ngOnDestroy() {
    this.alive = false;
  }
}
