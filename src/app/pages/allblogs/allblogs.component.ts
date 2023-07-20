import {
  Component,
  ViewChild,
  TemplateRef,
  ViewEncapsulation,
} from "@angular/core";
import { DataService } from "../../@core/utils/data.service";
import { LocalDataSource } from "ng2-smart-table";
import {
  CustomRenderComponent,
  showImageComponent,
} from "./customaction.component";
import { NbWindowService, NbDialogService } from "@nebular/theme";
import { DeletePromptComponent } from "../allcoupons/delete-prompt/delete-prompt.component";
import { UtilityService } from "../../@core/utils/utility.service";
import * as customBuild from "../ckEditorCustomBuild/build/ckeditor.js";
import { ImageCroppedEvent, base64ToFile } from "ngx-image-cropper";

@Component({
  selector: "ngx-allblogs",
  styleUrls: ["./allblogs.component.scss"],
  templateUrl: "./allblogs.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class AllBlogsComponent {
  @ViewChild("blogEditModal", { static: true })
  contentTemplate: TemplateRef<any>;
  tempBeforeEdit: any;
  categories: any;
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
  windowRef: any;
  blogArray = [];
  dummyArr: [] = null;
  deleteObject = "";
  editObject: any = {
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
  editKey = "";
  blogsCount;
  dltIndex: any;
  isLoading = false;
  isUpdating = false;
  skipNo = 0;
  stores = null;
  selectedImage: any = null;
  imageChangedEvent: any = "";
  imgModel = "";
  croppedImage: any = "";

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

  htmlContent: any;

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

  ngForImgInd: number;
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
        editable: false,
      },
      title: {
        title: "Title",
        type: "string",
      },
      shortDes: {
        title: "Short Description",
        type: "html",
      },
      featuredForHome: {
        title: "Featured",
        type: "custom",
        renderComponent: CustomRenderComponent,
      },
      img: {
        title: "Image",
        type: "custom",
        renderComponent: showImageComponent,
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
    private _utlityService: UtilityService
  ) {
    this.getBlogsFunc();
  }

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
    this._dataService.fetchAPI("/api/countBlogs").subscribe((res) => {
      if (res.data) this.blogsCount = res.data;
    });
  }

  getBlogsFunc() {
    this.isLoading = true;
    this._dataService
      .fetchAPIWithLimit("/api/fetchBlogs", this.skipNo, 30)
      .subscribe((res) => {
        if (res.data) {
          this.blogArray = [];
          this.blogArray = res.data;
          this.isLoading = false;
          this.source.load(this.blogArray);
        } else {
          if (this.skipNo) this.skipNo -= 8;
          this._dataService.showErrorToast(res.message);
        }
      });
  }
  async loopForProsCons() {
    if (this.tempBeforeEdit.pros1) {
      for (var i = 0; i < this.tempBeforeEdit.pros1.length; i++) {
        console.log(this.tempBeforeEdit.pros1[0]);
      }
    }
  }

  saveEditedBlog(editNode) {
    if (this.isUpdating) return;
    this.isUpdating = true;
    var self = this;
    if (this.croppedImage) {
      var filePath = `blogImages/_${new Date().getTime()}`;
      this._dataService
        .storeImage(filePath, this.selectedImage, function (error, data) {
          if (error) {
            this._dataService.showErrorToast(
              "Can't upload image to the Server"
            );
            return;
          }
          if (data) {
            self._dataService.deleteMedia(editNode.img);
            editNode.img = data;
            self.funcForMiddle1(editNode);
          }
        })
        .subscribe();
    } else self.funcForMiddle1(editNode);
  }
  funcForMiddle1(editNode) {
    if (!this.selectedImage1) {
      this.funcForMiddle2(editNode);
      return;
    }
    var self = this;
    var filePath = `blogImages/_${new Date().getTime()}`;
    this._dataService
      .storeImage(filePath, this.selectedImage1, function (error, data) {
        if (error) {
          self._dataService.showErrorToast("Can't upload image to the Server");
          return;
        }
        if (data) {
          editNode.imgGrid1 = data;
          self.funcForMiddle2(editNode);
        }
      })
      .subscribe();
  }
  funcForMiddle2(editNode) {
    if (!this.selectedImage2) {
      this.funcForMiddle3(editNode);
      return;
    }
    var self = this;
    var filePath = `blogImages/_${new Date().getTime()}`;
    this._dataService
      .storeImage(filePath, this.selectedImage2, function (error, data) {
        if (error) {
          self._dataService.showErrorToast("Can't upload image to the Server");
          return;
        }
        if (data) {
          editNode.imgGrid2 = data;
          self.funcForMiddle3(editNode);
        }
      })
      .subscribe();
  }
  funcForMiddle3(editNode) {
    if (!this.selectedImage3) {
      this.funcForMiddle4(editNode);
      return;
    }
    var self = this;
    var filePath = `blogImages/_${new Date().getTime()}`;
    this._dataService
      .storeImage(filePath, this.selectedImage3, function (error, data) {
        if (error) {
          self._dataService.showErrorToast("Can't upload image to the Server");
          return;
        }
        if (data) {
          editNode.imgGrid3 = data;
          self.funcForMiddle4(editNode);
        }
      })
      .subscribe();
  }
  funcForMiddle4(editNode) {
    if (!this.selectedImage4) {
      this.funcForMiddle5(editNode);
      return;
    }
    var self = this;
    var filePath = `blogImages/_${new Date().getTime()}`;
    this._dataService
      .storeImage(filePath, this.selectedImage4, function (error, data) {
        if (error) {
          self._dataService.showErrorToast("Can't upload image to the Server");
          return;
        }
        if (data) {
          editNode.imgGrid4 = data;
          self.funcForMiddle5(editNode);
        }
      })
      .subscribe();
  }
  funcForMiddle5(editNode) {
    if (!this.selectedImage5) {
      this.funcForMiddle6(editNode);
      return;
    }
    var self = this;
    var filePath = `blogImages/_${new Date().getTime()}`;
    this._dataService
      .storeImage(filePath, this.selectedImage5, function (error, data) {
        if (error) {
          self._dataService.showErrorToast("Can't upload image to the Server");
          return;
        }
        if (data) {
          editNode.imgGrid5 = data;
          self.funcForMiddle6(editNode);
        }
      })
      .subscribe();
  }
  funcForMiddle6(editNode) {
    if (!this.selectedImage6) {
      this.funcForMiddle7(editNode);
      return;
    }
    var self = this;
    var filePath = `blogImages/_${new Date().getTime()}`;
    this._dataService
      .storeImage(filePath, this.selectedImage6, function (error, data) {
        if (error) {
          self._dataService.showErrorToast("Can't upload image to the Server");
          return;
        }
        if (data) {
          editNode.imgGrid6 = data;
          self.funcForMiddle7(editNode);
        }
      })
      .subscribe();
  }
  funcForMiddle7(editNode) {
    if (!this.selectedImage7) {
      this.funcForMiddle8(editNode);
      return;
    }
    var self = this;
    var filePath = `blogImages/_${new Date().getTime()}`;
    this._dataService
      .storeImage(filePath, this.selectedImage7, function (error, data) {
        if (error) {
          self._dataService.showErrorToast("Can't upload image to the Server");
          return;
        }
        if (data) {
          editNode.imgGrid7 = data;
          self.funcForMiddle8(editNode);
        }
      })
      .subscribe();
  }
  funcForMiddle8(editNode) {
    if (!this.selectedImage8) {
      this.funcForMiddle9(editNode);
      return;
    }
    var self = this;
    var filePath = `blogImages/_${new Date().getTime()}`;
    this._dataService
      .storeImage(filePath, this.selectedImage8, function (error, data) {
        if (error) {
          self._dataService.showErrorToast("Can't upload image to the Server");
          return;
        }
        if (data) {
          editNode.imgGrid8 = data;
          self.funcForMiddle9(editNode);
        }
      })
      .subscribe();
  }
  funcForMiddle9(editNode) {
    if (!this.selectedImage9) {
      this.funcForMiddle10(editNode);
      return;
    }
    var self = this;
    var filePath = `blogImages/_${new Date().getTime()}`;
    this._dataService
      .storeImage(filePath, this.selectedImage9, function (error, data) {
        if (error) {
          self._dataService.showErrorToast("Can't upload image to the Server");
          return;
        }
        if (data) {
          editNode.imgGrid9 = data;
          self.funcForMiddle10(editNode);
        }
      })
      .subscribe();
  }
  funcForMiddle10(editNode) {
    if (!this.selectedImage10) {
      this.editCallbackFunc(editNode);
      return;
    }
    var self = this;
    var filePath = `blogImages/_${new Date().getTime()}`;
    this._dataService
      .storeImage(filePath, this.selectedImage10, function (error, data) {
        if (error) {
          self._dataService.showErrorToast("Can't upload image to the Server");
          return;
        }
        if (data) {
          editNode.imgGrid10 = data;
          self.editCallbackFunc(editNode);
        }
      })
      .subscribe();
  }
  editCallbackFunc(editData) {
    editData.author = this._utlityService.getAuthor();
    editData.blogURL = editData.title.replace("?", "").toLowerCase();
    editData.blogURL = editData.blogURL.replace(/ /g, "-").toLowerCase();
    this.clearCroppedImage();
    this.clearCroppedImage1();
    this._dataService.postAPI("/api/editBlog", editData).subscribe((res) => {
      if (res.data) {
        this._dataService.showSuccessToast(res.message);
        this.blogArray[this.editKey] = res.data;
        this.isUpdating = false;
        this.clearCroppedImage1();
        this.clearCroppedImage();
      } else {
        this._dataService.showErrorToast(res.message);
      }
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
  clearCroppedImage() {
    this.imgModel = "";
    this.selectedImage = "";
    this.imageChangedEvent = "";
    this.croppedImage = "";
  }
  clearCroppedImage1() {
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
  }

  onDeleteConfirm(event): void {
    if (this.isLoading) return;
    this.isLoading = true;
    this._dataService
      .postAPI("/api/deleteBlog", { _id: event.data._id })
      .subscribe((res) => {
        if (res.data) {
          this._dataService.showSuccessToast(res.message);
          this._dataService.deleteMedia(this.blogArray[this.dltIndex].img);
          if (this.blogArray[this.dltIndex].imgGrid1)
            this._dataService.deleteMedia(
              this.blogArray[this.dltIndex].imgGrid1
            );
          if (this.blogArray[this.dltIndex].imgGrid2)
            this._dataService.deleteMedia(
              this.blogArray[this.dltIndex].imgGrid2
            );
          if (this.blogArray[this.dltIndex].imgGrid3)
            this._dataService.deleteMedia(
              this.blogArray[this.dltIndex].imgGrid3
            );
          if (this.blogArray[this.dltIndex].imgGrid4)
            this._dataService.deleteMedia(
              this.blogArray[this.dltIndex].imgGrid4
            );
          if (this.blogArray[this.dltIndex].imgGrid5)
            this._dataService.deleteMedia(
              this.blogArray[this.dltIndex].imgGrid5
            );
          if (this.blogArray[this.dltIndex].imgGrid6)
            this._dataService.deleteMedia(
              this.blogArray[this.dltIndex].imgGrid6
            );
          if (this.blogArray[this.dltIndex].imgGrid7)
            this._dataService.deleteMedia(
              this.blogArray[this.dltIndex].imgGrid7
            );
          if (this.blogArray[this.dltIndex].imgGrid8)
            this._dataService.deleteMedia(
              this.blogArray[this.dltIndex].imgGrid8
            );
          if (this.blogArray[this.dltIndex].imgGrid9)
            this._dataService.deleteMedia(
              this.blogArray[this.dltIndex].imgGrid9
            );
          if (this.blogArray[this.dltIndex].imgGrid10)
            this._dataService.deleteMedia(
              this.blogArray[this.dltIndex].imgGrid10
            );
          this.blogArray.splice(this.dltIndex, 1);
          this.source.refresh();
        } else this._dataService.showErrorToast(res.message);
      });
  }
  openEditForm(event: any, editModal: TemplateRef<any>) {
    this.editObject = null;
    this.editObject = { ...event.data };
    this.editKey = event.index;
    this.windowRef = this.windowService.open(editModal, {
      title: `Edit Blog Form`,
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
