import { Component, OnDestroy, ViewEncapsulation } from "@angular/core";
import { DataService } from "../../@core/utils/data.service";
import { UtilityService } from "../../@core/utils/utility.service";
import * as customBuild from "../ckEditorCustomBuild/build/ckeditor.js";
import { ImageCroppedEvent, base64ToFile } from "ngx-image-cropper";

@Component({
  selector: "ngx-addblog",
  styleUrls: ["./addblog.component.scss"],
  templateUrl: "./addblog.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class AddBlogComponent implements OnDestroy {
  private alive = true;
  public Editor = customBuild;
  categories: any;
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
        "bulletedList",
        "numberedList",
        "|",
        "outdent",
        "indent",
        "|",
        "ImageInsert",
        "ImageCaption",
        "mediaEmbed",
        "blockQuote",
        "insertTable",
        "fontBackgroundColor",
        "fontColor",
        "highlight",
        "alignment",
        "code",
        "codeBlock",
        "htmlEmbed",
        "horizontalLine",
        "sourceEditing",
        "undo",
        "redo",
      ],
      shouldNotGroupWhenFull: true,
      viewportTopOffset: 60,
    },
    image: {
      toolbar: [
        "imageStyle:inline",
        "imageStyle:block",
        "imageStyle:side",
        "imageStyle:alignLeft",
        "imageStyle:alignRight",
        "imageStyle:alignCenter",
        "|",
        "imageResize",
        "imageTextAlternative",
        "toggleImageCaption",
      ],
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
    table: {
      contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
    },
    allowedContent:
      "h1 h2 h3 p blockquote strong em button;" +
      "a[!href];" +
      "div[class,id]" +
      "span[class,id]" +
      "br" +
      "hr" +
      "iframe[src,style,marginwidth,marginheight,scrolling]" +
      "img(left,right)[!src,alt,width,height];",
    extraAllowedContent:
      "span;ul;li;button;table;td;class;style;*[id];*(*);*{*}",
    removeFormatAttributes: "",
    fullPage: true,
    language: "en",
    placeholder: "Type the content here!",
  };
  stores = null;
  blogInfo: any = {
    shortDes: null,
    longDesFirst: null,
    longDesMiddle1: null,
    longDesMiddle2: null,
    longDesMiddle3: null,
    longDesMiddle4: null,
    longDesMiddle5: null,
    longDesMiddle6: null,
    longDesMiddle7: null,
    longDesMiddle8: null,
    longDesMiddle9: null,
    longDesMiddle10: null,
    longDesLast: null,
  };
  dummyArr: [] = null;
  isBusy = false;
  selectedImage: any = null;
  imageChangedEvent: any = "";
  croppedImage: any = "";
  imgModel = "";
  htmlContent: any;

  imageChangedEvent1: any = "";
  imageChangedEvent2: any = "";
  imageChangedEvent3: any = "";
  imageChangedEvent4: any = "";
  imageChangedEvent5: any = "";
  imageChangedEvent6: any = "";
  imageChangedEvent7: any = "";
  imageChangedEvent8: any = "";
  imageChangedEvent9: any = "";
  imageChangedEvent10: any = "";

  imgModel1: any = "";
  imgModel2: any = "";
  imgModel3: any = "";
  imgModel4: any = "";
  imgModel5: any = "";
  imgModel6: any = "";
  imgModel7: any = "";
  imgModel8: any = "";
  imgModel9: any = "";
  imgModel10: any = "";

  croppedImage1: any = "";
  croppedImage2: any = "";
  croppedImage3: any = "";
  croppedImage4: any = "";
  croppedImage5: any = "";
  croppedImage6: any = "";
  croppedImage7: any = "";
  croppedImage8: any = "";
  croppedImage9: any = "";
  croppedImage10: any = "";

  selectedImage1: any = "";
  selectedImage2: any = "";
  selectedImage3: any = "";
  selectedImage4: any = "";
  selectedImage5: any = "";
  selectedImage6: any = "";
  selectedImage7: any = "";
  selectedImage8: any = "";
  selectedImage9: any = "";
  selectedImage10: any = "";
  author: string;
  ngForImgInd: number;

  constructor(
    private _dataService: DataService,
    private _utlityService: UtilityService
  ) {}

  ngOnInit() {
    this._dataService.fetchAPI("/api/fetchCategories").subscribe((res) => {
      if (res.data) {
        this.categories = res.data;
      } else this._dataService.showErrorToast(res.message);
    });
    this._dataService.fetchAPI("/api/fetchStoresOnlyId").subscribe((res) => {
      if (res.data) {
        this.stores = res.data;
      } else this._dataService.showErrorToast(res.message);
    });
    this.author = this._utlityService.getAuthor();
  }
  uploadImageFirst(blogNode) {
    if (this.isBusy) return;
    this.isBusy = true;
    var self = this;
    var filePath = `blogImages/_${new Date().getTime()}`;
    this._dataService
      .storeImage(filePath, this.selectedImage, function (error, data) {
        if (error) {
          self._dataService.showErrorToast("Can't upload image to the Server");
          return;
        }
        if (data) {
          if (!blogNode.featuredForHome) blogNode.featuredForHome = false;
          if (!blogNode.showVertically) blogNode.showVertically = false;
          blogNode.img = data;
          blogNode.blogURL = blogNode.title.replace("?", "").toLowerCase();
          blogNode.blogURL = blogNode.blogURL.replace(/ /g, "-").toLowerCase();
          if (self.selectedImage1) self.funcForMiddle1(blogNode);
          else self.saveBlogToDB(blogNode);
        }
      })
      .subscribe();
  }
  funcForMiddle1(blogNode) {
    var self = this;
    var filePath = `blogImages/_${new Date().getTime()}`;
    this._dataService
      .storeImage(filePath, this.selectedImage1, function (error, data) {
        if (error) {
          self._dataService.showErrorToast("Can't upload image to the Server");
          return;
        }
        if (data) {
          blogNode.imgGrid1 = data;
          if (self.selectedImage2) self.funcForMiddle2(blogNode);
          else self.saveBlogToDB(blogNode);
        }
      })
      .subscribe();
  }
  funcForMiddle2(blogNode) {
    var self = this;
    var filePath = `blogImages/_${new Date().getTime()}`;
    this._dataService
      .storeImage(filePath, this.selectedImage2, function (error, data) {
        if (error) {
          self._dataService.showErrorToast("Can't upload image to the Server");
          return;
        }
        if (data) {
          blogNode.imgGrid2 = data;
          if (self.selectedImage3) self.funcForMiddle3(blogNode);
          else self.saveBlogToDB(blogNode);
        }
      })
      .subscribe();
  }
  funcForMiddle3(blogNode) {
    var self = this;
    var filePath = `blogImages/_${new Date().getTime()}`;
    this._dataService
      .storeImage(filePath, this.selectedImage3, function (error, data) {
        if (error) {
          self._dataService.showErrorToast("Can't upload image to the Server");
          return;
        }
        if (data) {
          blogNode.imgGrid3 = data;
          if (self.selectedImage4) self.funcForMiddle4(blogNode);
          else self.saveBlogToDB(blogNode);
        }
      })
      .subscribe();
  }
  funcForMiddle4(blogNode) {
    var self = this;
    var filePath = `blogImages/_${new Date().getTime()}`;
    this._dataService
      .storeImage(filePath, this.selectedImage4, function (error, data) {
        if (error) {
          self._dataService.showErrorToast("Can't upload image to the Server");
          return;
        }
        if (data) {
          blogNode.imgGrid4 = data;
          if (self.selectedImage5) self.funcForMiddle5(blogNode);
          else self.saveBlogToDB(blogNode);
        }
      })
      .subscribe();
  }
  funcForMiddle5(blogNode) {
    var self = this;
    var filePath = `blogImages/_${new Date().getTime()}`;
    this._dataService
      .storeImage(filePath, this.selectedImage5, function (error, data) {
        if (error) {
          self._dataService.showErrorToast("Can't upload image to the Server");
          return;
        }
        if (data) {
          blogNode.imgGrid5 = data;
          if (self.selectedImage6) self.funcForMiddle6(blogNode);
          else self.saveBlogToDB(blogNode);
        }
      })
      .subscribe();
  }
  funcForMiddle6(blogNode) {
    var self = this;
    var filePath = `blogImages/_${new Date().getTime()}`;
    this._dataService
      .storeImage(filePath, this.selectedImage6, function (error, data) {
        if (error) {
          self._dataService.showErrorToast("Can't upload image to the Server");
          return;
        }
        if (data) {
          blogNode.imgGrid6 = data;
          if (self.selectedImage7) self.funcForMiddle7(blogNode);
          else self.saveBlogToDB(blogNode);
        }
      })
      .subscribe();
  }
  funcForMiddle7(blogNode) {
    var self = this;
    var filePath = `blogImages/_${new Date().getTime()}`;
    this._dataService
      .storeImage(filePath, this.selectedImage7, function (error, data) {
        if (error) {
          self._dataService.showErrorToast("Can't upload image to the Server");
          return;
        }
        if (data) {
          blogNode.imgGrid7 = data;
          if (self.selectedImage8) self.funcForMiddle8(blogNode);
          else self.saveBlogToDB(blogNode);
        }
      })
      .subscribe();
  }
  funcForMiddle8(blogNode) {
    var self = this;
    var filePath = `blogImages/_${new Date().getTime()}`;
    this._dataService
      .storeImage(filePath, this.selectedImage8, function (error, data) {
        if (error) {
          self._dataService.showErrorToast("Can't upload image to the Server");
          return;
        }
        if (data) {
          blogNode.imgGrid8 = data;
          if (self.selectedImage9) self.funcForMiddle9(blogNode);
          else self.saveBlogToDB(blogNode);
        }
      })
      .subscribe();
  }
  funcForMiddle9(blogNode) {
    var self = this;
    var filePath = `blogImages/_${new Date().getTime()}`;
    this._dataService
      .storeImage(filePath, this.selectedImage9, function (error, data) {
        if (error) {
          self._dataService.showErrorToast("Can't upload image to the Server");
          return;
        }
        if (data) {
          blogNode.imgGrid9 = data;
          if (self.selectedImage10) self.funcForMiddle10(blogNode);
          else self.saveBlogToDB(blogNode);
        }
      })
      .subscribe();
  }
  funcForMiddle10(blogNode) {
    var self = this;
    var filePath = `blogImages/_${new Date().getTime()}`;
    this._dataService
      .storeImage(filePath, this.selectedImage10, function (error, data) {
        if (error) {
          self._dataService.showErrorToast("Can't upload image to the Server");
          return;
        }
        if (data) {
          blogNode.imgGrid10 = data;
          self.saveBlogToDB(blogNode);
        }
      })
      .subscribe();
  }

  saveBlogToDB(blogData) {
    blogData.views = 0;
    blogData.author = this.author;
    this._dataService.postAPI("/api/addBlog", blogData).subscribe((res) => {
      if (res.data) {
        this._dataService.showSuccessToast(res.message);
        this.blogInfo = {
          shortDes: null,
          longDesFirst: null,
          longDesMiddle1: null,
          longDesMiddle2: null,
          longDesMiddle3: null,
          longDesMiddle4: null,
          longDesMiddle5: null,
          longDesMiddle6: null,
          longDesMiddle7: null,
          longDesMiddle8: null,
          longDesMiddle9: null,
          longDesMiddle10: null,
          longDesLast: null,
        };
        this.imgModel = "";
        this.croppedImage = "";
        this.selectedImage = "";
        this.imageChangedEvent = "";
        this.imgModel1 = "";
        this.imgModel2 = "";
        this.imgModel3 = "";
        this.imgModel4 = "";
        this.imgModel5 = "";
        this.imgModel6 = "";
        this.imgModel7 = "";
        this.imgModel8 = "";
        this.imgModel9 = "";
        this.imgModel10 = "";
        this.croppedImage1 = "";
        this.croppedImage2 = "";
        this.croppedImage3 = "";
        this.croppedImage4 = "";
        this.croppedImage5 = "";
        this.croppedImage6 = "";
        this.croppedImage7 = "";
        this.croppedImage8 = "";
        this.croppedImage9 = "";
        this.croppedImage10 = "";
        this.selectedImage1 = "";
        this.selectedImage2 = "";
        this.selectedImage3 = "";
        this.selectedImage4 = "";
        this.selectedImage5 = "";
        this.selectedImage6 = "";
        this.selectedImage7 = "";
        this.selectedImage8 = "";
        this.selectedImage9 = "";
        this.selectedImage10 = "";
        this.imageChangedEvent1 = "";
        this.imageChangedEvent2 = "";
        this.imageChangedEvent3 = "";
        this.imageChangedEvent4 = "";
        this.imageChangedEvent5 = "";
        this.imageChangedEvent6 = "";
        this.imageChangedEvent7 = "";
        this.imageChangedEvent8 = "";
        this.imageChangedEvent9 = "";
        this.imageChangedEvent10 = "";
        this.isBusy = false;
        window.scrollTo(0, 0);
      } else this._dataService.showErrorToast(res.message);
    });
  }

  fileChangeEvent(event: any, ind?): void {
    this.ngForImgInd = ind;
    if (ind) this.setChangedEvent(ind, event);
    else this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent, scndInd?) {
    var imgFile = base64ToFile(event.base64);
    var abcd = this.ngForImgInd || scndInd;
    abcd
      ? this.setSelectedImage(abcd, imgFile)
      : (this.selectedImage = imgFile);
    var reader = new FileReader();
    reader.readAsDataURL(imgFile);
    reader.onloadend = () => {
      abcd
        ? this.setCroppedImage(abcd, reader.result)
        : (this.croppedImage = reader.result);
    };
  }
  setChangedEvent(ind, eventFile: any) {
    switch (ind) {
      case 1: {
        this.imageChangedEvent1 = eventFile;
        break;
      }
      case 2: {
        this.imageChangedEvent2 = eventFile;
        break;
      }
      case 3: {
        this.imageChangedEvent3 = eventFile;
        break;
      }
      case 4: {
        this.imageChangedEvent4 = eventFile;
        break;
      }
      case 5: {
        this.imageChangedEvent5 = eventFile;
        break;
      }
      case 6: {
        this.imageChangedEvent6 = eventFile;
        break;
      }
      case 7: {
        this.imageChangedEvent7 = eventFile;
        break;
      }
      case 8: {
        this.imageChangedEvent8 = eventFile;
        break;
      }
      case 9: {
        this.imageChangedEvent9 = eventFile;
        break;
      }
      case 10: {
        this.imageChangedEvent10 = eventFile;
        break;
      }
    }
  }
  setSelectedImage(ind, eventFile: any) {
    switch (ind) {
      case 1: {
        this.selectedImage1 = eventFile;
        break;
      }
      case 2: {
        this.selectedImage2 = eventFile;
        break;
      }
      case 3: {
        this.selectedImage3 = eventFile;
        break;
      }
      case 4: {
        this.selectedImage4 = eventFile;
        break;
      }
      case 5: {
        this.selectedImage5 = eventFile;
        break;
      }
      case 6: {
        this.selectedImage6 = eventFile;
        break;
      }
      case 7: {
        this.selectedImage7 = eventFile;
        break;
      }
      case 8: {
        this.selectedImage8 = eventFile;
        break;
      }
      case 9: {
        this.selectedImage9 = eventFile;
        break;
      }
      case 10: {
        this.selectedImage10 = eventFile;
        break;
      }
    }
  }
  setCroppedImage(ind, eventFile: any) {
    switch (ind) {
      case 1: {
        this.croppedImage1 = eventFile;
        break;
      }
      case 2: {
        this.croppedImage2 = eventFile;
        break;
      }
      case 3: {
        this.croppedImage3 = eventFile;
        break;
      }
      case 4: {
        this.croppedImage4 = eventFile;
        break;
      }
      case 5: {
        this.croppedImage5 = eventFile;
        break;
      }
      case 6: {
        this.croppedImage6 = eventFile;
        break;
      }
      case 7: {
        this.croppedImage7 = eventFile;
        break;
      }
      case 8: {
        this.croppedImage8 = eventFile;
        break;
      }
      case 9: {
        this.croppedImage9 = eventFile;
        break;
      }
      case 10: {
        this.croppedImage10 = eventFile;
        break;
      }
    }
    this.ngForImgInd = null;
  }
  ngOnDestroy() {
    this.alive = false;
  }
}
