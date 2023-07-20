import { Component, OnDestroy, TemplateRef, ViewChild } from "@angular/core";
import { DataService } from "../../@core/utils/data.service";
import * as customBuild from "../ckEditorCustomBuild/build/ckeditor.js";
import { ImageCroppedEvent, base64ToFile } from "ngx-image-cropper";
import { NbDialogService, NbWindowService } from "@nebular/theme";
import { DeletePromptComponent } from "../allcoupons/delete-prompt/delete-prompt.component";

@Component({
  selector: "ngx-addpostimage",
  styleUrls: ["./addpostimage.component.scss"],
  templateUrl: "./addpostimage.component.html",
})
export class AddPostImageComponent implements OnDestroy {
  @ViewChild("postImageAddModal", { static: true })
  postImageAddModal: TemplateRef<any>;
  @ViewChild("postImageEditModal", { static: true })
  postImageEditModal: TemplateRef<any>;
  private alive = true;
  storeArray: {} = null;
  catArray: {} = null;
  selectedStoreId: String = null;
  selectedStore = "";
  postImages = [];
  isBusy = false;
  dataLoaded = false;
  editObject = {};
  addObject = { sortNo: 1, catId: "", trackingLink: "", about: "" };
  editKey = "";
  dltIndex: any;

  noDataFoundForStore: Boolean = false;
  imgModel = "";
  croppedImage: any = "";
  selectedImage: any = null;
  imageChangedEvent: any = "";
  htmlContent: any;
  windowRef: any;

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
  loadPostImagesFunc(storeId) {
    this.addObject["storeId"] = storeId;
    this._dataService
      .fetchAPIUsingId("/api/fetchPostImagesById", storeId)
      .subscribe((res) => {
        if (res.data) {
          this.postImages = [];
          this.dataLoaded = true;
          this.postImages = res.data;
          this.addObject["sortNo"] = this.postImages.length + 1;
        } else {
          this.postImages = [];
          this._dataService.showErrorToast(res.message);
          if (res.message == "No Post Image found in this Store")
            this.noDataFoundForStore = true;
        }
      });
  }
  publishPostImage(addObj: any) {
    if (this.isBusy) return;
    if (addObj.sortNo == 0) {
      this._dataService.showErrorToast("Position number can not be 0");
      return;
    }
    this.isBusy = true;
    var self = this;
    var filePath = `postImages/_${new Date().getTime()}`;
    this._dataService
      .storeImage(filePath, this.selectedImage, function (error, data) {
        if (error) {
          this.errorHandler("Can't upload image to the Server");
          return;
        }
        if (data) {
          addObj.img = data;
          self.savePostImageToDB(addObj);
        }
      })
      .subscribe();
  }
  savePostImageToDB(addObj: any) {
    this._dataService.postAPI("/api/addPostImage", addObj).subscribe((res) => {
      if (res.data) {
        this.postImages.push(res.data);
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
      .postAPI("/api/deletePostImage", {
        _id: this.postImages[this.dltIndex]._id,
      })
      .subscribe((res) => {
        if (res.data) {
          this._dataService.showSuccessToast(res.message);
          this._dataService.deleteMedia(this.postImages[this.dltIndex].img);
          this.postImages.splice(this.dltIndex, 1);
          this.addObject["sortNo"] = this.addObject["sortNo"] - 1;
        } else this._dataService.showErrorToast(res.message);
      });
  }
  showAddModal(addModal: TemplateRef<any>) {
    this.windowRef = this.windowService.open(addModal, {
      title: `Add Post Image Form`,
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
      title: `Edit Post Image Form`,
    });
  }
  saveEditedPostImage(editObj: any) {
    if (this.isBusy) return;
    if (editObj.sortNo == 0) {
      this._dataService.showErrorToast("Position number can not be 0");
      return;
    }
    this.isBusy = true;
    var self = this;
    var filePath = `postImages/_${new Date().getTime()}`;
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
            self.updatePostImageToDB(editObj);
          }
        })
        .subscribe();
    } else self.updatePostImageToDB(editObj);
  }
  updatePostImageToDB(editObj: any) {
    this._dataService
      .postAPI("/api/updatePostImage", editObj)
      .subscribe((res) => {
        if (res.data) {
          this._dataService.showSuccessToast(res.message);
          this.editObject = {};
          this.postImages[this.editKey] = res.data;
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
