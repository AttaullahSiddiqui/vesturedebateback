import { Component, OnDestroy, TemplateRef, ViewChild } from "@angular/core";
import { DataService } from "../../@core/utils/data.service";
import * as customBuild from "../ckEditorCustomBuild/build/ckeditor.js";
import { ImageCroppedEvent, base64ToFile } from "ngx-image-cropper";
import { NbDialogService, NbWindowService } from "@nebular/theme";
import { DeletePromptComponent } from "../allcoupons/delete-prompt/delete-prompt.component";

@Component({
  selector: "ngx-addbanner",
  styleUrls: ["./addbanner.component.scss"],
  templateUrl: "./addbanner.component.html",
})
export class AddBannerComponent implements OnDestroy {
  @ViewChild("bannerAddModal", { static: true })
  bannerAddModal: TemplateRef<any>;
  @ViewChild("bannerEditModal", { static: true })
  bannerEditModal: TemplateRef<any>;
  private alive = true;
  storeArray: {} = null;
  catArray: {} = null;
  selectedStoreId: String = null;
  selectedStore = "";
  banners = [];
  couponCount;
  isBusy = false;
  dataLoaded = false;
  editObject = {};
  addObject = { sortNo: 1, catId: "", trackingLink: "", about: "" };
  editKey = "";
  dltIndex: any;
  skipNo = 0;
  searchField = "";
  windowRef: any;
  noDataFoundForStore: Boolean = false;
  imgModel = "";
  croppedImage: any = "";
  selectedImage: any = null;
  imageChangedEvent: any = "";
  htmlContent: any;

  constructor(
    private _dataService: DataService,
    private dialogService: NbDialogService,
    private windowService: NbWindowService
  ) {}

  ngOnInit() {
    this._dataService.fetchAPI("/api/fetchStoresOnlyId").subscribe((res) => {
      if (res.data) {
        this.storeArray = res.data;
      } else this._dataService.showErrorToast(res.message);
    });
    this._dataService.fetchAPI("/api/fetchCategories").subscribe((res) => {
      if (res.data) {
        this.catArray = res.data;
      } else this._dataService.showErrorToast(res.message);
    });
  }
  loadBannersFunc(storeId) {
    this.addObject["storeId"] = storeId;
    this._dataService
      .fetchAPIUsingId("/api/fetchBannersById", storeId)
      .subscribe((res) => {
        // this.banners = [
        //   {
        //     about: "Web Hosting! Enjoy 90% Off",
        //     trackingLink: "https://ir3.xyz/602b591cc2d4f",
        //     sortNo: 2,
        //     catId: "fkljklf",
        //     trigger: false,
        //     img: "https://firebasestorage.googleapis.com/v0/b/codesarrival-d575c.appspot.com/o/bannerImages%2F_1615898059426?alt=media&token=71bb5963-d897-48d7-bd9a-8e79e6258e67",
        //   },
        // ];
        // this.dataLoaded = true;
        if (res.data) {
          this.banners = [];
          this.dataLoaded = true;
          this.banners = res.data;
          this.addObject["sortNo"] = this.banners.length + 1;
        } else {
          this.banners = [];
          this._dataService.showErrorToast(res.message);
          if (res.message == "No Banner found in this Store")
            this.noDataFoundForStore = true;
        }
      });
  }
  publishBanner(addObj: any) {
    if (this.isBusy) return;
    if (addObj.sortNo == 0) {
      this._dataService.showErrorToast("Position number can not be 0");
      return;
    }
    this.isBusy = true;
    var self = this;
    var filePath = `bannerImages/_${new Date().getTime()}`;
    this._dataService
      .storeImage(filePath, this.selectedImage, function (error, data) {
        if (error) {
          this.errorHandler("Can't upload image to the Server");
          return;
        }
        if (data) {
          addObj.img = data;
          self.saveBannerToDB(addObj);
        }
      })
      .subscribe();
  }
  saveBannerToDB(addObj: any) {
    this._dataService.postAPI("/api/addBanner", addObj).subscribe((res) => {
      if (res.data) {
        this.banners.push(res.data);
        this._dataService.showSuccessToast(res.message);
        this.imgModel = "";
        this.croppedImage = "";
        this.selectedImage = "";
        this.imageChangedEvent = "";
        window.scrollTo(0, 0);
        this.isBusy = false;
        this.addObject["sortNo"] = this.addObject["sortNo"] + 1;
        this.clearAddObject();
        this.windowRef.close();
      } else this._dataService.showErrorToast(res.message);
    });
  }
  showDltModal(key) {
    this.dltIndex = key;
    this.dialogService
      .open(DeletePromptComponent)
      .onClose.subscribe((dltVal) => {
        if (dltVal) this.onDeleteConfirm(event);
      });
  }
  onDeleteConfirm(event): void {
    this._dataService
      .postAPI("/api/deleteBanner", { _id: this.banners[this.dltIndex]._id })
      .subscribe((res) => {
        if (res.data) {
          this._dataService.showSuccessToast(res.message);
          this._dataService.deleteMedia(this.banners[this.dltIndex].img);
          this.banners.splice(this.dltIndex, 1);
          this.addObject["sortNo"] = this.addObject["sortNo"] - 1;
        } else this._dataService.showErrorToast(res.message);
      });
  }
  showAddModal(addModal: TemplateRef<any>) {
    this.windowRef = this.windowService.open(addModal, {
      title: `Add Banner Form`,
    });
  }
  showEditModal(key, bannnerNode, editModal: TemplateRef<any>) {
    this.editObject = null;
    this.imgModel = "";
    this.croppedImage = "";
    this.selectedImage = null;
    this.imageChangedEvent = "";
    this.editObject = { ...bannnerNode };
    this.editKey = key;
    this.windowRef = this.windowService.open(editModal, {
      title: `Edit Banner Form`,
    });
  }
  saveEditedBanner(editObj: any) {
    if (this.isBusy) return;
    if (editObj.sortNo == 0) {
      this._dataService.showErrorToast("Position number can not be 0");
      return;
    }
    this.isBusy = true;
    var self = this;
    var filePath = `bannerImages/_${new Date().getTime()}`;
    if (this.selectedImage) {
      this._dataService
        .storeImage(filePath, this.selectedImage, function (error, data) {
          if (error) {
            this.errorHandler("Can't upload image to the Server");
            return;
          }
          if (data) {
            this._dataService.deleteMedia(editObj.img);
            editObj.img = data;
            self.updateBannerToDB(editObj);
          }
        })
        .subscribe();
    } else self.updateBannerToDB(editObj);
  }
  updateBannerToDB(editObj: any) {
    this._dataService.postAPI("/api/updateBanner", editObj).subscribe((res) => {
      if (res.data) {
        this._dataService.showSuccessToast(res.message);
        this.editObject = {};
        this.banners[this.editKey] = res.data;
        this.imgModel = "";
        this.croppedImage = "";
        this.selectedImage = "";
        this.imageChangedEvent = "";
        window.scrollTo(0, 0);
        this.isBusy = false;
        this.windowRef.close();
      } else this._dataService.showErrorToast(res.message);
    });
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.selectedImage = base64ToFile(event.base64);
    var reader = new FileReader();
    reader.readAsDataURL(this.selectedImage);
    reader.onloadend = () => {
      this.croppedImage = reader.result;
    };
  }
  clearCroppedImage() {
    this.imgModel = "";
    this.selectedImage = "";
    this.imageChangedEvent = "";
    this.croppedImage = "";
  }
  clearAddObject() {
    this.addObject["img"] = "";
    this.addObject["about"] = "";
    this.addObject["trackingLink"] = "";
  }
  ngOnDestroy() {
    this.alive = false;
  }
}
