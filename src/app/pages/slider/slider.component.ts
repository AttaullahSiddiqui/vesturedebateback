import { Component, OnDestroy } from "@angular/core";
import { DataService } from "../../@core/utils/data.service";
import { ImageCroppedEvent, base64ToFile } from "ngx-image-cropper";

@Component({
  selector: "ngx-slider",
  styleUrls: ["./slider.component.scss"],
  templateUrl: "./slider.component.html",
})
export class SliderComponent implements OnDestroy {
  private alive = true;
  stores = {};
  slides: any;
  firstSlide: any = {};
  secondSlide: any = {};
  thirdSlide: any = {};
  fourthSlide: any = {};
  fifthSlide: any = {};
  trickyArr = ["", false, false, false, false, false];
  selectedImage: any = null;
  imageChangedEvent: any = "";
  imgModel = "";
  imgModel2 = "";
  imgModel3 = "";
  imgModel4 = "";
  imgModel5 = "";
  htmlContent: any;
  croppedImage: any = "";

  constructor(private _dataService: DataService) {}

  ngOnInit() {
    this._dataService.fetchAPI("/api/fetchStoresOnlyId").subscribe((res) => {
      if (res.data) this.stores = res.data;
      else this._dataService.showErrorToast(res.message);
    });
    this._dataService.fetchAPI("/api/fetchSlides").subscribe((res) => {
      if (res.data) this.slides = res.data;
      else this._dataService.showErrorToast(res.message);
    });
  }
  changeTab() {
    this.imgModel = "";
    this.croppedImage = "";
    this.imageChangedEvent = "";
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    var imgFile = base64ToFile(event.base64);
    this.selectedImage = imgFile;
    var reader = new FileReader();
    reader.readAsDataURL(imgFile);
    reader.onloadend = () => {
      this.croppedImage = reader.result;
    };
  }
  uploadImageFirst(sliderNode, indName) {
    if (this.trickyArr[indName]) return;
    this.trickyArr[indName] = true;
    var self = this;
    var filePath = `sliderImages/_${new Date().getTime()}`;
    this._dataService
      .storeImage(filePath, this.selectedImage, function (err, data) {
        if (err) {
          self._dataService.showErrorToast("Can't upload image to the Server");
          this.trickyArr[indName] = false;
          window.scrollTo(0, 0);
          return;
        }
        if (data) {
          sliderNode.img = data;
          sliderNode.arrIndex = indName;
          self.slides.forEach((element) => {
            if (element.arrIndex == indName)
              self._dataService.deleteMedia(element.img);
          });
          self.uploadSlide(sliderNode);
        }
      })
      .subscribe();
  }
  uploadSlide(dataNode) {
    this._dataService.postAPI("/api/addSlide", dataNode).subscribe((res) => {
      if (res.data) {
        this._dataService.showSuccessToast(res.message);
        this.trickyArr[dataNode.arrIndex] = false;
        this.firstSlide = {};
        this.secondSlide = {};
        this.thirdSlide = {};
        this.fourthSlide = {};
        this.fifthSlide = {};
        this.imgModel = "";
        this.imgModel2 = "";
        this.imgModel3 = "";
        this.imgModel4 = "";
        this.imgModel5 = "";
        this.croppedImage = "";
        this.imageChangedEvent = "";
        window.scrollTo(0, 0);
      } else {
        this._dataService.showErrorToast(res.message);
        this.trickyArr[dataNode.arrIndex] = false;
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
