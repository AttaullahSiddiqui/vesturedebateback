var jwt = require("../utils/jwt.service");

let User = require("../Models/user.model");
let Category = require("../Models/categories.model");
let Store = require("../Models/stores.model");
let Coupon = require("../Models/coupon.model");
let Deal = require("../Models/deal.model");
let Blog = require("../Models/blog.model");
let Banner = require("../Models/banner.model");
let postImg = require("../Models/postImage.model");
let Product = require("../Models/product.model");
let BlogItem = require("../Models/blogItems.model");
let gridProduct = require("../Models/gridProduct.model");
let Slider = require("../Models/slide.model");
let errHandler = require("../utils/errorHandler");
let resHandler = require("../utils/responseHandler");

module.exports = {
  authUser: authUser,
  verifyUserToken: verifyUserToken,
  registerUser: registerUser,
  createCategory: createCategory,
  addStore: addStore,
  addCoupon: addCoupon,
  addDeal: addDeal,
  addBlog: addBlog,
  addSlide: addSlide,
  addBanner: addBanner,
  addPostImage: addPostImage,
  addProduct: addProduct,
  addBlogItem: addBlogItem,
  addProductForBlog: addProductForBlog,
  isAdmin: isAdmin,
};

function authUser(req, res) {
  if (!req.body.userPass || !req.body.userName)
    return res.respondError("Username & Password is required", -4);
  User.findOne({ userName: req.body.userName }, function (err, fetchedUser) {
    if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
    else if (!fetchedUser)
      res.json(resHandler.respondError("Wrong Username or Password", -3));
    else {
      if (req.body.userPass == fetchedUser.userPass) {
        jwt.generateToken(
          { userID: fetchedUser._id },
          function (jwtErr, jwtSuccess) {
            if (jwtErr) {
              res.json(resHandler.respondError("Unexpected Error", -1));
            }
            var loggedUser = {};
            loggedUser.token = jwtSuccess;
            loggedUser.admin = fetchedUser.admin;
            loggedUser.userName = fetchedUser.userName;
            res.json(
              resHandler.respondSuccess(
                loggedUser,
                "User login successfully",
                1
              )
            );
          }
        );
      } else res.json(resHandler.respondError("Wrong password", -3));
    }
  });
}
function verifyUserToken(req, res) {
  var token = req.body.token;
  if (!token)
    res.json(resHandler.respondError("Authorization token is required", -2));
  else jwt.verifyToken(token, function (err, data) {
    if (err) res.json(resHandler.respondError("Invalid token", -2));
    else {
      User.findById(data.userID, function (err, userNode) {
        if (err) res.json(resHandler.respondError("Unable to fetch User", -2));
        else res.json(resHandler.respondSuccess(userNode, "Token is Valid", 1));
      });
    }
  });
}
function isAdmin(req, res) {
  var token = req.body.token;
  if (!token)
    res.json(resHandler.respondError("Authorization token is required", -2));
  return jwt.verifyToken(token, function (err, data) {
    if (err) res.json(resHandler.respondError("Invalid token", -2));
    User.findById(data.userID, function (err, userNode) {
      if (err) res.json(resHandler.respondError("Unable to fetch User", -2));
      res.json(resHandler.respondSuccess(userNode, "Token is Valid", 1));
    });
  });
}

function registerUser(req, res) {
  var newUser = new User({
    userName: req.body.userName,
    userPass: req.body.userPass,
    admin: req.body.admin,
  });
  newUser.save().then(
    function (result) {
      res.json(
        resHandler.respondSuccess(
          result,
          "User account created successfully",
          2
        )
      );
    },
    function (err) {
      var error = errHandler.handle(err);
      res.json(resHandler.respondError(error[0], error[1] || -1));
    }
  );
}

function createCategory(req, res) {
  var newCategory = new Category({
    name: req.body.catName,
    categoryURL: req.body.categoryURL,
    slug: req.body.catSlug,
    metaTitle: req.body.catMetaTitle,
    metaDescription: req.body.catMetaDescription,
    metaKeywords: req.body.catMetaKeywords,
    forBlogs: req.body.forBlogs,
    featuredForHome: req.body.catFeatured,
  });
  newCategory.save().then(
    function (result) {
      res.json(
        resHandler.respondSuccess(result, "Category created successfully", 2)
      );
    },
    function (err) {
      var error = errHandler.handle(err);
      res.json(resHandler.respondError(error[0], error[1] || -1));
    }
  );
}

function addStore(req, res) {
  if (req.body.sortNo && req.body.editorChoice) {
    Store.find({ editorChoice: true })
      .sort({ sortNo: -1 })
      .limit(1)
      .then(
        (store) => {
          if (store[0]) {
            req.body.sortNo = store[0].sortNo + 1;
            addStoreCallBack(req, res);
          } else {
            req.body.sortNo = 1;
            addStoreCallBack(req, res);
          }
        },
        (err) => {
          var error = errHandler.handle(err);
          res.json(resHandler.respondError(error[0], error[1] || -1));
        }
      );
  } else {
    req.body.sortNo = 1;
    addStoreCallBack(req, res);
  }
}
function addStoreCallBack(req, res) {
  var newStore = new Store({
    name: req.body.name,
    storeURL: req.body.storeURL,
    heading: req.body.heading,
    categoryRef: req.body.categoryRef,
    shortDes: req.body.shortDes,
    longDes: req.body.longDes,
    img: req.body.img,
    thumbImg: req.body.thumbImg,
    imgAlt: req.body.imgAlt,
    directUrl: req.body.directUrl,
    trackUrl: req.body.trackUrl,
    metaTitle: req.body.metaTitle,
    metaDes: req.body.metaDes,
    metaKeywords: req.body.metaKeywords,
    fb: req.body.fb,
    pin: req.body.pin,
    wik: req.body.wik,
    twit: req.body.twit,
    gplus: req.body.gplus,
    android: req.body.android,
    ios: req.body.ios,
    topStore: req.body.topStore,
    editorChoice: req.body.editorChoice,
    sortNo: req.body.sortNo,
  });
  newStore.save().then(
    function (result) {
      res.json(
        resHandler.respondSuccess(result, "Store added successfully", 2)
      );
    },
    function (err) {
      var error = errHandler.handle(err);
      res.json(resHandler.respondError(error[0], error[1] || -1));
    }
  );
}
function addBanner(req, res) {
  var newBanner = new Banner({
    about: req.body.about,
    catId: req.body.catId,
    storeId: req.body.storeId,
    img: req.body.img,
    trackingLink: req.body.trackingLink,
    sortNo: req.body.sortNo,
  });
  newBanner.save().then(
    function (result) {
      res.json(
        resHandler.respondSuccess(result, "Banner added successfully", 2)
      );
    },
    function (err) {
      var error = errHandler.handle(err);
      res.json(resHandler.respondError(error[0], error[1] || -1));
    }
  );
}
function addPostImage(req, res) {
  var newPost = new postImg({
    about: req.body.about,
    catId: req.body.catId,
    storeId: req.body.storeId,
    img: req.body.img,
    trackingLink: req.body.trackingLink,
    sortNo: req.body.sortNo,
  });
  newPost.save().then(
    function (result) {
      res.json(
        resHandler.respondSuccess(result, "Post Image added successfully", 2)
      );
    },
    function (err) {
      var error = errHandler.handle(err);
      res.json(resHandler.respondError(error[0], error[1] || -1));
    }
  );
}
function addProduct(req, res) {
  var newProduct = new Product({
    name: req.body.name,
    description: req.body.description,
    catId: req.body.catId,
    storeId: req.body.storeId,
    img: req.body.img,
    vid: req.body.vid,
    externalLink: req.body.externalLink,
    sortNo: req.body.sortNo,
    featured: req.body.featured,
    clicks: req.body.clicks,
    pricing: req.body.pricing,
    tags: req.body.tags,
    moreInfo: req.body.moreInfo,
    buttonText: req.body.buttonText,
    metaTitle: req.body.metaTitle,
    metaDes: req.body.metaDes,
    imageAlt: req.body.imageAlt,
  });
  newProduct.save().then(
    function (result) {
      res.json(
        resHandler.respondSuccess(result, "Product added successfully", 2)
      );
    },
    function (err) {
      var error = errHandler.handle(err);
      res.json(resHandler.respondError(error[0], error[1] || -1));
    }
  );
}
function addBlogItem(req, res) {
  var newBlogItem = new BlogItem({
    name: req.body.name,
    blogId: req.body.blogId,
    img: req.body.img,
    externalLink: req.body.externalLink,
    sortNo: req.body.sortNo,
    pricing: req.body.pricing,
    rating: req.body.rating,
    buttonText: req.body.buttonText,
    imgAlt: req.body.imgAlt,
  });
  newBlogItem.save().then(
    function (result) {
      res.json(
        resHandler.respondSuccess(result, "Blog Item added successfully", 2)
      );
    },
    function (err) {
      var error = errHandler.handle(err);
      res.json(resHandler.respondError(error[0], error[1] || -1));
    }
  );
}
function addProductForBlog(req, res) {
  var newGridProduct = new gridProduct({
    title: req.body.title,
    price: req.body.price,
    imageLink: req.body.imageLink,
    detailLink: req.body.detailLink,
  });
  newGridProduct.save().then(
    function (result) {
      res.json(
        resHandler.respondSuccess(result, "Grid Product added successfully", 2)
      );
    },
    function (err) {
      var error = errHandler.handle(err);
      res.json(resHandler.respondError(error[0], error[1] || -1));
    }
  );
}
function addCoupon(req, res) {
  Coupon.find({ storeId: req.body.storeId })
    .sort({ sortNo: -1 })
    .limit(1)
    .then(
      (coupon) => {
        if (coupon[0]) {
          req.body.sortNo = coupon[0].sortNo + 1;
          addCouponCallback(req, res);
        } else {
          req.body.sortNo = 1;
          addCouponCallback(req, res);
        }
      },
      (err) => {
        var error = errHandler.handle(err);
        res.json(resHandler.respondError(error[0], error[1] || -1));
      }
    );
  // Coupon.countDocuments({ storeId: req.body.storeId }, function (err, response) {
  //     if (err) {
  //         var error = errHandler.handle(err);
  //         res.json(resHandler.respondError(error[0], (error[1] || -1)));
  //     }
  //     if (!response) {
  //         req.body.sortNo = 1;
  //         addCouponCallback(req, res)
  //     }
  //     if (response) {
  //         req.body.sortNo = response + 1;
  //         addCouponCallback(req, res)
  //     }
  // })
}
function addCouponCallback(req, res) {
  var newCoupon = new Coupon({
    offerBox: req.body.offerBox,
    offerDetail: req.body.offerDetail,
    trackingLink: req.body.trackingLink,
    expDate: req.body.expDate,
    activeStatus: req.body.activeStatus,
    code: req.body.code,
    storeId: req.body.storeId,
    featuredForHome: req.body.featuredForHome,
    trending: req.body.trending,
    newArrival: req.body.newArrival,
    forEvent: req.body.forEvent,
    sortNo: req.body.sortNo,
  });
  newCoupon.save().then(
    function (result) {
      Store.updateOne(
        { _id: req.body.storeId },
        { CreatedAt: Date.now() },
        function (err, data) {
          if (err) console.log(err);
        }
      );
      res.json(
        resHandler.respondSuccess(result, "Coupon added successfully", 2)
      );
    },
    function (err) {
      var error = errHandler.handle(err);
      res.json(resHandler.respondError(error[0], error[1] || -1));
    }
  );
}
function addDeal(req, res) {
  var newDeal = new Deal({
    title: req.body.title,
    shortDes: req.body.shortDes,
    longDes: req.body.longDes,
    metaTitle: req.body.metaTitle,
    metaDes: req.body.metaDes,
  });
  newDeal.save().then(
    function (result) {
      res.json(resHandler.respondSuccess(result, "Deal added successfully", 2));
    },
    function (err) {
      var error = errHandler.handle(err);
      res.json(resHandler.respondError(error[0], error[1] || -1));
    }
  );
}
function addBlog(req, res) {
  var newBlog = new Blog({
    title: req.body.title,
    blogURL: req.body.blogURL,
    categoryRef: req.body.categoryRef,
    shortDes: req.body.shortDes,
    longDesFirst: req.body.longDesFirst,
    longDesMiddle1: req.body.longDesMiddle1,
    longDesMiddle2: req.body.longDesMiddle2,
    longDesMiddle3: req.body.longDesMiddle3,
    longDesMiddle4: req.body.longDesMiddle4,
    longDesMiddle5: req.body.longDesMiddle5,
    longDesMiddle6: req.body.longDesMiddle6,
    longDesMiddle7: req.body.longDesMiddle7,
    longDesMiddle8: req.body.longDesMiddle8,
    longDesMiddle9: req.body.longDesMiddle9,
    longDesMiddle10: req.body.longDesMiddle10,
    longDesLast: req.body.longDesLast,
    img: req.body.img,
    imgGrid1: req.body.imgGrid1,
    imgGrid2: req.body.imgGrid2,
    imgGrid3: req.body.imgGrid3,
    imgGrid4: req.body.imgGrid4,
    imgGrid5: req.body.imgGrid5,
    imgGrid6: req.body.imgGrid6,
    imgGrid7: req.body.imgGrid7,
    imgGrid8: req.body.imgGrid8,
    imgGrid9: req.body.imgGrid9,
    imgGrid10: req.body.imgGrid10,
    amazonLink1: req.body.amazonLink1,
    amazonLink2: req.body.amazonLink2,
    amazonLink3: req.body.amazonLink3,
    amazonLink4: req.body.amazonLink4,
    amazonLink5: req.body.amazonLink5,
    amazonLink6: req.body.amazonLink6,
    amazonLink7: req.body.amazonLink7,
    amazonLink8: req.body.amazonLink8,
    amazonLink9: req.body.amazonLink9,
    amazonLink10: req.body.amazonLink10,
    pros1: req.body.pros1,
    pros2: req.body.pros2,
    pros3: req.body.pros3,
    pros4: req.body.pros4,
    pros5: req.body.pros5,
    pros6: req.body.pros6,
    pros7: req.body.pros7,
    pros8: req.body.pros8,
    pros9: req.body.pros9,
    pros10: req.body.pros10,
    cons1: req.body.cons1,
    cons2: req.body.cons2,
    cons3: req.body.cons3,
    cons4: req.body.cons4,
    cons5: req.body.cons5,
    cons6: req.body.cons6,
    cons7: req.body.cons7,
    cons8: req.body.cons8,
    cons9: req.body.cons9,
    cons10: req.body.cons10,
    buttonTxt: req.body.buttonTxt,
    author: req.body.author,
    imgAlt: req.body.imgAlt,
    metaTitle: req.body.metaTitle,
    metaDes: req.body.metaDes,
    metaKeywords: req.body.metaKeywords,
    storeId: req.body.storeId,
    relatedStores: req.body.relatedStores,
    showVertically: req.body.showVertically,
    featuredForHome: req.body.featuredForHome,
  });
  newBlog.save().then(
    function (result) {
      res.json(resHandler.respondSuccess(result, "Blog added successfully", 2));
    },
    function (err) {
      var error = errHandler.handle(err);
      res.json(resHandler.respondError(error[0], error[1] || -1));
    }
  );
}
function addSlide(req, res) {
  Slider.findOne({ arrIndex: req.body.arrIndex }).exec(function (err, slide) {
    if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
    else {
      if (slide) {
        req.body._id = slide._id;
        updateSlide(req, res);
      } else addNewSlide(req, res);
    }
  });
}
function addNewSlide(req, res) {
  var newSlider = new Slider({
    link: req.body.link,
    img: req.body.img,
    arrIndex: req.body.arrIndex,
  });
  newSlider.save().then(
    function (result) {
      res.json(
        resHandler.respondSuccess(result, "Slide added successfully", 2)
      );
    },
    function (err) {
      var error = errHandler.handle(err);
      res.json(resHandler.respondError(error[0], error[1] || -1));
    }
  );
}
function updateSlide(req, res) {
  Slider.findByIdAndUpdate(
    req.body._id,
    req.body,
    { new: true },
    function (err, updatedNode) {
      if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
      else if (!updatedNode)
        res.json(resHandler.respondError("Unknown error occured", -3));
      else
        res.json(
          resHandler.respondSuccess(
            updatedNode,
            "Slider updated successfully",
            2
          )
        );
    }
  );
}
