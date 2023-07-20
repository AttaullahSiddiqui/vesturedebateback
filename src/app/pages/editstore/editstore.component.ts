import { Component, OnDestroy } from "@angular/core";
import { DataService } from "../../@core/utils/data.service";
import * as customBuild from "../ckEditorCustomBuild/build/ckeditor.js";
import { ImageCroppedEvent, base64ToFile } from "ngx-image-cropper";
import { NbDialogService } from "@nebular/theme";
import { DeletePromptComponent } from "../allcoupons/delete-prompt/delete-prompt.component";

@Component({
  selector: "ngx-editstore",
  styleUrls: ["./editstore.component.scss"],
  templateUrl: "./editstore.component.html",
})
export class EditStoreComponent implements OnDestroy {
  private alive = true;
  public Editor = customBuild;
  public ckConfig = {
    toolbar: {
      items: [
        "heading",
        "|",
        "fontFamily",
        "fontSize",
        "|",
        "bold",
        "italic",
        "underline",
        "superscript",
        "subscript",
        "strikeThrough",
        "|",
        "link",
        "|",
        "outdent",
        "indent",
        "|",
        "fontBackgroundColor",
        "fontColor",
        "highlight",
        "alignment",
        "horizontalLine",
        "sourceEditing",
        "undo",
        "redo",
      ],
      shouldNotGroupWhenFull: true,
      viewportTopOffset: 60,
    },
    heading: {
      options: [
        {
          model: "paragraph",
          title: "Paragraph",
          class: "ck-heading_paragraph",
        },
        {
          model: "heading1",
          view: "h1",
          title: "Heading 1",
          class: "ck-heading_heading1",
        },
        {
          model: "heading2",
          view: "h2",
          title: "Heading 2",
          class: "ck-heading_heading2",
        },
        {
          model: "heading3",
          view: "h3",
          title: "Heading 3",
          class: "ck-heading_heading3",
        },
        {
          model: "heading4",
          view: "h4",
          title: "Heading 4",
          class: "ck-heading_heading4",
        },
        {
          model: "heading5",
          view: "h5",
          title: "Heading 5",
          class: "ck-heading_heading5",
        },
        {
          model: "heading6",
          view: "h6",
          title: "Heading 6",
          class: "ck-heading_heading6",
        },
      ],
    },
    fontSize: {
      options: [
        8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
        26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
      ],
      supportAllValues: true,
    },
    removeFormatAttributes: "",
    language: "en",
    placeholder: "Type the content here!",
  };
  showList: boolean;
  dataLoaded = null;
  storeInfo: any = null;
  categories: any;
  isBusy = false;
  selectedImage: any = null;
  selectedImage2: any = null;
  imageChangedEvent: any = "";
  imageChangedEvent2: any = "";
  imgModel = "";
  imgModel2 = "";
  htmlContent: any;
  htmlContent2: any;
  croppedImage: any = "";
  croppedImage2: any = "";
  _self = this;
  loadedStoreIndex: any;
  loadedStoreId: Number;
  oldStoreTrackUrl: string;
  updatingStore = false;

  constructor(
    private _dataService: DataService,
    private dialogService: NbDialogService
  ) {}

  ngOnInit() {
    this._dataService.fetchAPI("/api/fetchStoresOnlyId").subscribe((res) => {
      if (res.data) {
        this.dataLoaded = res.data;
      } else this._dataService.showErrorToast(res.message);
    });
  }
  loadStoreDetails(storeId) {
    this._dataService
      .fetchAPIUsingId("/api/fetchStoreByIdDuplicate", storeId)
      .subscribe((res) => {
        if (res.data) {
          this.storeInfo = res.data;
          this.oldStoreTrackUrl = res.data.trackUrl;
          this.loadedStoreId = storeId;
          for (var i = 0; i < this.dataLoaded.length; i++) {
            if (this.dataLoaded[i]._id == storeId) this.loadedStoreIndex = i;
          }
        } else this._dataService.showErrorToast(res.message);
      });
  }
  confirmDelete() {
    var self = this;
    this._dataService
      .postAPI("/api/deleteStore", { _id: this.loadedStoreId })
      .subscribe((res) => {
        if (res.data) {
          self._dataService.showSuccessToast(res.message);
          self._dataService.deleteMedia(this.storeInfo.img);
          self._dataService.deleteMedia(this.storeInfo.thumbImg);
          self.storeInfo = {};
          self.dataLoaded.splice(this.loadedStoreIndex, 1);
          self.storeInfo = null;
          window.scrollTo(0, 0);
        } else self._dataService.showErrorToast(res.message);
      });
  }
  saveEditStoreToDB(storeNode) {
    if (this.updatingStore) return;
    this.updatingStore = true;
    var self = this;
    storeNode.storeURL = storeNode.name.replace(/ /g, "-").toLowerCase();
    if (this.croppedImage) {
      var filePath = `storeImages/_${new Date().getTime()}`;
      this._dataService
        .storeImage(filePath, this.selectedImage, function (error, data) {
          if (error) {
            self._dataService.showErrorToast(
              "Can't upload image to the Server"
            );
            self.updatingStore = false;
            return;
          }
          if (data) {
            self._dataService.deleteMedia(storeNode.img);
            storeNode.img = data;
            self.clearCroppedImage();
            if (self.croppedImage2) self.uploadNewThumbnail(storeNode);
            else self.saveCallbackFunc(storeNode);
          }
        })
        .subscribe();
    } else {
      if (self.croppedImage2) self.uploadNewThumbnail(storeNode);
      else self.saveCallbackFunc(storeNode);
    }
  }
  uploadNewThumbnail(storeNode) {
    var self = this;
    var filePath2 = `storeThumbImages/_${new Date().getTime()}`;
    this._dataService
      .storeImage(filePath2, this.selectedImage2, function (error, data) {
        if (error) {
          self._dataService.showErrorToast("Can't upload image to the Server");
          self.updatingStore = false;
          return;
        }
        if (data) {
          if (storeNode.thumbImg)
            self._dataService.deleteMedia(storeNode.thumbImg);
          storeNode.thumbImg = data;
          self.saveCallbackFunc(storeNode);
          self.clearCroppedImage2();
        }
      })
      .subscribe();
  }
  saveCallbackFunc(storeData) {
    var self = this;
    if (storeData.trackUrl != this.oldStoreTrackUrl)
      storeData.updateCoupons = true;
    this._dataService.postAPI("/api/editStore", storeData).subscribe((res) => {
      if (res.data) {
        self._dataService.showSuccessToast(res.message);
        self.dataLoaded[this.loadedStoreIndex].name = res.data.name;
        self.dataLoaded[this.loadedStoreIndex]._id = res.data._id;
        self.storeInfo = res.data;
        window.scrollTo(0, 0);
        self.updatingStore = false;
      } else {
        self._dataService.showErrorToast(res.message);
        self.updatingStore = false;
      }
    });
  }
  openDeletePrompt() {
    this.dialogService
      .open(DeletePromptComponent)
      .onClose.subscribe((dltVal) => {
        if (dltVal) this.confirmDelete();
      });
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  fileChangeEvent2(event: any): void {
    this.imageChangedEvent2 = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.selectedImage = base64ToFile(event.base64);
    var reader = new FileReader();
    reader.readAsDataURL(this.selectedImage);
    reader.onloadend = () => {
      this.croppedImage = reader.result;
    };
  }
  imageCropped2(event: ImageCroppedEvent) {
    this.selectedImage2 = base64ToFile(event.base64);
    var reader = new FileReader();
    reader.readAsDataURL(this.selectedImage);
    reader.onloadend = () => {
      this.croppedImage2 = reader.result;
    };
  }
  clearCroppedImage() {
    this.imgModel = "";
    this.selectedImage = "";
    this.imageChangedEvent = "";
    this.croppedImage = "";
  }
  clearCroppedImage2() {
    this.imgModel2 = "";
    this.selectedImage2 = "";
    this.imageChangedEvent2 = "";
    this.croppedImage2 = "";
  }
  ngOnDestroy() {
    this.alive = false;
  }
}
