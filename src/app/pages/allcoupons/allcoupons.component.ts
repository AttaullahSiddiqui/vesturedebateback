import {
  Component,
  ViewChild,
  TemplateRef,
  Optional,
  ChangeDetectorRef,
  ViewEncapsulation,
} from "@angular/core";
import { DataService } from "../../@core/utils/data.service";
import { LocalDataSource } from "ng2-smart-table";
import { CustomRenderComponent } from "./customaction.component";
import { NbWindowService, NbDialogService } from "@nebular/theme";
import { DeletePromptComponent } from "./delete-prompt/delete-prompt.component";

@Component({
  selector: "ngx-allcoupons",
  styleUrls: ["./allcoupons.component.scss"],
  templateUrl: "./allcoupons.component.html",
})
export class AllCouponsComponent {
  @ViewChild("couponEditModal", { static: true })
  couponEditModal: TemplateRef<any>;
  storeArray: {} = null;
  selectedStoreName = "";
  selectedStore = null;
  coupons = [];
  couponCount;
  isBusy = false;
  dataLoaded = false;
  editObject = {};
  editKey: any;
  dltIndex: any;
  skipNo = 0;
  searchField = "";
  overallDate: any = null;
  overBusy = false;
  backupArr: any;
  windowRef: any;
  settings = {
    mode: "external",
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
        width: "15%",
        filter: false,
      },
      offerBox: {
        title: "Offer Text",
        type: "string",
      },
      expDate: {
        title: "Expiry Date",
        type: "string",
        filter: false,
      },
      activeStatus: {
        title: "Feature",
        type: "custom",
        renderComponent: CustomRenderComponent,
        filter: false,
      },
    },
    actions: {
      add: false,
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private _dataService: DataService,
    private windowService: NbWindowService,
    private dialogService: NbDialogService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this._dataService.fetchAPI("/api/fetchStoresOnlyId").subscribe((res) => {
      if (res.data) {
        this.storeArray = res.data;
      } else this._dataService.showErrorToast(res.message);
    });
    this._dataService.fetchAPI("/api/countCoupons").subscribe((res) => {
      if (res.data) this.couponCount = res.data;
      else return;
    });
  }
  loadCoupons(storeId) {
    for (var k in this.storeArray) {
      if (this.storeArray.hasOwnProperty(k)) {
        if (this.storeArray[k].storeURL == storeId)
          this.selectedStoreName = this.storeArray[k].name;
      }
    }
    this.loadCouponFunc(storeId);
  }
  loadCouponFunc(id) {
    this._dataService
      .fetchAPIUsingId("/api/fetchCouponsById", id)
      .subscribe((res) => {
        if (res.data) {
          this.backupArr = res.data;
          this.source.load(this.backupArr);
          this.dataLoaded = true;
        } else {
          if (res.status == 404) {
            if (this.coupons.length) {
              this._dataService.showErrorToast("No more data in this store");
              return;
            }
          }
          this._dataService.showErrorToast(res.message);
        }
      });
  }
  fetchTrackingLink(id) {
    this._dataService
      .fetchAPIUsingId("/api/fetchStoreByIdDuplicate", id)
      .subscribe((res) => {
        if (res.data) {
          this.editObject["trackingLink"] = res.data.trackUrl;
        } else this._dataService.showErrorToast(res.message);
      });
  }
  changeOverallDate() {
    if (this.overBusy) return;
    this.overBusy = true;
    var dateToSave = new Date(this.overallDate).getTime();
    this._dataService
      .postAPI("/api/changeallCouponsDate", {
        dateToSave: dateToSave,
        storeId: this.selectedStore,
      })
      .subscribe((res) => {
        this.overBusy = false;
        if (res.data) {
          this._dataService.showSuccessToast(res.message);
          this.overallDate = null;
          window.scrollTo(0, 0);
        } else {
          this._dataService.showErrorToast(res.message);
        }
      });
  }
  saveEditedCoupon(editNode: any): void {
    if (this.isBusy) return;
    this.isBusy = true;
    if (editNode.activeStatus) editNode.code = "";
    this._dataService.postAPI("/api/editCoupon", editNode).subscribe((res) => {
      if (res.data) {
        this._dataService.showSuccessToast(res.message);
        this.isBusy = false;
        this.backupArr[this.editKey] = res.data;
        this.source.refresh();
        this.editObject = {};
      } else {
        this.windowRef.close();
        this._dataService.showErrorToast(res.message);
        this.isBusy = false;
      }
    });
  }
  onDeleteConfirm(event): void {
    this._dataService
      .postAPI("/api/deleteCoupon", {
        _id: event.data._id,
        storeId: this.selectedStore,
        sortNo: event.data.sortNo,
      })
      .subscribe((res) => {
        if (res.data) {
          this.backupArr.splice(event.index, 1);
          this.source.refresh();
          this._dataService.showSuccessToast(res.message);
        } else {
          this._dataService.showErrorToast(res.message);
        }
      });
  }
  openEditForm(event: any, editModal: TemplateRef<any>) {
    this.editObject = null;
    event.data.expDate = event.data.expDate.substr(0, 10);
    this.editObject = { ...event.data };
    this.editKey = event.index;
    this.windowRef = this.windowService.open(editModal, {
      title: `Edit Coupon Form`,
    });
  }
  openDeletePrompt(event: any) {
    this.dialogService
      .open(DeletePromptComponent)
      .onClose.subscribe((dltVal) => {
        if (dltVal) this.onDeleteConfirm(event);
      });
  }
}
