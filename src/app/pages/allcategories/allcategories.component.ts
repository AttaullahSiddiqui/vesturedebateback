import { Component, OnDestroy } from "@angular/core";
import { DataService } from "../../@core/utils/data.service";
import { UtilityService } from "../../@core/utils/utility.service";
import { LocalDataSource } from "ng2-smart-table";
import { CustomRenderComponent } from "./customaction.component";

@Component({
  selector: "ngx-allcategories",
  styleUrls: ["./allcategories.component.scss"],
  templateUrl: "./allcategories.component.html",
})
export class AllCategoriesComponent {
  catArray = [];
  isBusy = false;
  deleteObject = "";

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
      name: {
        title: "Username",
        type: "string",
      },
      slug: {
        title: "Slug",
        type: "string",
      },
      featuredForHome: {
        title: "Featured for Home",
        type: "custom",
        renderComponent: CustomRenderComponent,
      },
      forBlogs: {
        title: "For Blogs",
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
    this.getCategoriesFunc();
  }
  getCategoriesFunc() {
    if (this.isBusy) return;
    this.isBusy = true;
    this._dataService
      .fetchAPIWithLimit("/api/fetchCategories", 0, 100)
      .subscribe((res) => {
        if (res.data) {
          const data = res.data;
          this.source.load(data);
        } else {
          this._dataService.showErrorToast(res.message);
        }
      });
  }

  onSaveConfirm(event): void {
    this._dataService
      .postAPI("/api/editCategory", event.newData)
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
    if (window.confirm("Are you sure you want to delete?")) {
      this._dataService
        .postAPI("/api/deleteCategory", {
          _id: event.data._id,
        })
        .subscribe((res) => {
          if (res.data) {
            this._dataService.showSuccessToast(res.message);
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
