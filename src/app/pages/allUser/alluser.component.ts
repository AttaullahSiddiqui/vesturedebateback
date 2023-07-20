import { Component, OnDestroy } from "@angular/core";
import { DataService } from "../../@core/utils/data.service";
import { UtilityService } from "../../@core/utils/utility.service";
import { LocalDataSource } from "ng2-smart-table";
import { CustomRenderComponent } from "./customaction.component";

@Component({
  selector: "ngx-alluser",
  styleUrls: ["./alluser.component.scss"],
  templateUrl: "./alluser.component.html",
})
export class AllUserComponent {
  dltIndex: any;
  editObject: any = "";
  editKey = "";
  notAdmin: Boolean = false;
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      sno: {
        title: "sNo",
        type: "number",
        valuePrepareFunction: (value, row, cell) => {
          return cell.row.index + 1;
        },
        editable: false,
      },
      userName: {
        title: "Username",
        type: "string",
      },
      userPass: {
        title: "Password",
        type: "boolean",
      },
      admin: {
        title: "Status",
        type: "custom",
        renderComponent: CustomRenderComponent,
      },
    },
    actions: {
      add: false,
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private _dataService: DataService,
    private _utlityService: UtilityService
  ) {}

  ngOnInit() {
    this._dataService.fetchAPI("/api/fetchUsers").subscribe((res) => {
      if (res.data) {
        const data = res.data;
        this.source.load(data);
      } else {
        this._dataService.showErrorToast(res.message);
      }
    });
    var isAdmin = this._utlityService.isAdmin();
    if (!isAdmin) {
      this.notAdmin = true;
      this._dataService.showErrorToast(
        "You are not allowed to Edit/Delete Users. Ask your Admin"
      );
      return;
    }
  }

  onSaveConfirm(event): void {
    this._dataService
      .postAPI("/api/editUser", event.newData)
      .subscribe((res) => {
        if (res.data) {
          this._dataService.showSuccessToast(res.message);
          event.confirm.resolve();
        } else {
          this._dataService.showErrorToast(res.message);
          event.confirm.reject();
        }
      });
  }
  onDeleteConfirm(event): void {
    console.log(event.data);
    if (window.confirm("Are you sure you want to delete?")) {
      this._dataService
        .postAPI("/api/deleteUser", { _id: event.data._id })
        .subscribe((res) => {
          if (res.data) {
            this._dataService.showSuccessToast(
              "User deleted successfully"
            );
            event.confirm.resolve();
          } else {
            this._dataService.showErrorToast(res.message);
            event.confirm.reject();
          }
        });
    } else {
      event.confirm.reject();
    }
  }
}
