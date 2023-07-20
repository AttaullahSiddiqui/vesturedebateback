import { Component, OnDestroy } from "@angular/core";
import { DataService } from "../../@core/utils/data.service";
import * as customBuild from "../ckEditorCustomBuild/build/ckeditor.js";
import { ImageCroppedEvent, base64ToFile } from "ngx-image-cropper";

@Component({
  selector: "ngx-addstore",
  styleUrls: ["./addstore.component.scss"],
  templateUrl: "./addstore.component.html",
})
export class AddStoreComponent implements OnDestroy {
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
  storeInfo: any = { shortDes: "", longDes: "" };
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

  constructor(private _dataService: DataService) {}

  ngOnInit() {
    this._dataService.fetchAPI("/api/fetchCategories").subscribe((res) => {
      if (res.data) {
        this.categories = res.data;
      } else this._dataService.showErrorToast(res.message);
    });
  }
  addStore(storeInfo) {
    if (this.isBusy) return;
    this.isBusy = true;
    var self = this;
    var filePath = `storeImages/_${new Date().getTime()}`;
    this._dataService
      .storeImage(filePath, this.selectedImage, function (error, data) {
        if (error) {
          this._dataService.showErrorToast("Can't upload image to the Server");
          return;
        }
        if (data) {
          storeInfo.img = data;
          if (self.croppedImage2) self.upoloadThumbImg(storeInfo);
          else self.saveStoreToDB(storeInfo);
        }
      })
      .subscribe();
  }
  upoloadThumbImg(storeInfo) {
    var self = this;
    var filePath2 = `storeThumbImages/_${new Date().getTime()}`;
    this._dataService
      .storeImage(filePath2, this.selectedImage2, function (error, data) {
        if (error) {
          this._dataService.showErrorToast("Can't upload image to the Server");
          return;
        }
        if (data) {
          storeInfo.thumbImg = data;
          self.saveStoreToDB(storeInfo);
        }
      })
      .subscribe();
  }

  saveStoreToDB(storeNode) {
    if (!storeNode.editorChoice) storeNode.editorChoice = false;
    if (!storeNode.topStore) storeNode.topStore = false;
    storeNode.storeURL = storeNode.name.replace(/ /g, "-").toLowerCase();
    this._dataService.postAPI("/api/addStore", storeNode).subscribe((res) => {
      if (res.data) {
        this._dataService.showSuccessToast(res.message);
        this.storeInfo = { shortDes: "", longDes: "" };
        this.imgModel = "";
        this.imgModel2 = "";
        this.croppedImage = "";
        this.croppedImage2 = "";
        this.selectedImage = "";
        this.selectedImage2 = "";
        this.imageChangedEvent = "";
        this.imageChangedEvent2 = "";
        window.scrollTo(0, 0);
        this.isBusy = false;
      } else this._dataService.showErrorToast(res.message);
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

  ngOnDestroy() {
    this.alive = false;
  }
}
