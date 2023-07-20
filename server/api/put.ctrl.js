const express = require("express");

let User = require("../Models/user.model");
let Category = require("../Models/categories.model");
let Store = require("../Models/stores.model");
let Coupon = require("../Models/coupon.model");
let Blog = require("../Models/blog.model");
let Banner = require("../Models/banner.model");
let postImg = require("../Models/postImage.model");
let Product = require("../Models/product.model");
let BlogItem = require("../Models/blogItems.model");
let gridProduct = require("../Models/gridProduct.model");
let Settings = require("../Models/settings.model");
let resHandler = require("../utils/responseHandler");

module.exports = {
  editCategory: editCategory,
  editStore: editStore,
  editCoupon: editCoupon,
  editBlog: editBlog,
  editUser: editUser,
  updateBanner: updateBanner,
  updatePostImage: updatePostImage,
  updateProduct: updateProduct,
  updateBlogItem: updateBlogItem,
  updateProductForBlog: updateProductForBlog,
  changeallCouponsDate: changeallCouponsDate,
  updateSettings: updateSettings,
};

function editCategory(req, res) {
  Category.findByIdAndUpdate(
    req.body._id,
    req.body,
    { new: true },
    function (err, updatedNode) {
      if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
      else if (!updatedNode)
        res.json(resHandler.respondError("Wrong format provided", -3));
      else
        res.json(
          resHandler.respondSuccess(
            updatedNode,
            "Category updated successfully",
            2
          )
        );
    }
  );
}
function editCoupon(req, res) {
  Coupon.findByIdAndUpdate(
    req.body._id,
    req.body,
    { new: true },
    function (err, updatedNode) {
      if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
      else if (!updatedNode)
        res.json(resHandler.respondError("Wrong format provided", -3));
      else
        res.json(
          resHandler.respondSuccess(
            updatedNode,
            "Coupon updated successfully",
            2
          )
        );
    }
  );
}
function editStore(req, res) {
  var updateCoupons = false;
  if (req.body.updateCoupons) updateCoupons = true;
  delete req.body.updateCoupons;
  Store.findByIdAndUpdate(
    req.body._id,
    req.body,
    { new: true },
    function (err, updatedNode) {
      if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
      else if (!updatedNode)
        res.json(resHandler.respondError("Wrong format provided", -3));
      else {
        Coupon.updateMany(
          { storeId: req.body._id },
          { trackingLink: req.body.trackUrl },
          function (error, result) {
            res.json(
              resHandler.respondSuccess(
                updatedNode,
                "Store updated successfully",
                2
              )
            );
          }
        );
      }
    }
  );
}
function editBlog(req, res) {
  Blog.findByIdAndUpdate(
    req.body._id,
    req.body,
    { new: true },
    function (err, updatedNode) {
      if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
      else if (!updatedNode)
        res.json(resHandler.respondError("Wrong format provided", -3));
      else
        res.json(
          resHandler.respondSuccess(updatedNode, "Blog updated successfully", 2)
        );
    }
  );
}
function updateBanner(req, res) {
  delete req.body.trigger;
  Banner.findByIdAndUpdate(
    req.body._id,
    req.body,
    { new: true },
    function (err, updatedNode) {
      if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
      else if (!updatedNode)
        res.json(resHandler.respondError("Wrong format provided", -3));
      else
        res.json(
          resHandler.respondSuccess(
            updatedNode,
            "Banner updated successfully",
            2
          )
        );
    }
  );
}
function updatePostImage(req, res) {
  delete req.body.trigger;
  postImg.findByIdAndUpdate(
    req.body._id,
    req.body,
    { new: true },
    function (err, updatedNode) {
      if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
      else if (!updatedNode)
        res.json(resHandler.respondError("Wrong format provided", -3));
      else
        res.json(
          resHandler.respondSuccess(
            updatedNode,
            "Post Image updated successfully",
            2
          )
        );
    }
  );
}
function updateProduct(req, res) {
  Product.findByIdAndUpdate(
    req.body._id,
    req.body,
    function (err, updatedNode) {
      if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
      else if (!updatedNode)
        res.json(resHandler.respondError("Wrong format provided", -3));
      else
        res.json(
          resHandler.respondSuccess(
            updatedNode,
            "Product updated successfully",
            2
          )
        );
    }
  );
}
function updateBlogItem(req, res) {
  BlogItem.findByIdAndUpdate(
    req.body._id,
    req.body,
    function (err, updatedNode) {
      if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
      else if (!updatedNode)
        res.json(resHandler.respondError("Wrong format provided", -3));
      else
        res.json(
          resHandler.respondSuccess(
            updatedNode,
            "Blog Item updated successfully",
            2
          )
        );
    }
  );
}
function updateProductForBlog(req, res) {
  gridProduct.findByIdAndUpdate(
    req.body._id,
    req.body,
    function (err, updatedNode) {
      if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
      else if (!updatedNode)
        res.json(resHandler.respondError("Wrong format provided", -3));
      else
        res.json(
          resHandler.respondSuccess(
            updatedNode,
            "Grid Product updated successfully",
            2
          )
        );
    }
  );
}
function changeallCouponsDate(req, res) {
  Coupon.find({ storeId: req.body.storeId }).exec(function (err, coupons) {
    if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
    else {
      if (coupons) {
        changeDateCallBack(coupons, req.body.dateToSave);
        setTimeout(function () {
          res.json(
            resHandler.respondSuccess(
              coupons,
              "Date for All Coupons updated successfully",
              2
            )
          );
        }, 1000);
      } else
        res.json(
          resHandler.respondError("Unable to change date of All Coupons", -3)
        );
    }
  });
}
function changeDateCallBack(coupons, newDate) {
  coupons.forEach((elm) => {
    Coupon.updateOne(
      { _id: elm._id },
      { expDate: newDate },
      function (err, data) {
        if (err) console.log(err);
        else console.log("Success");
      }
    );
  });
}
function editUser(req, res) {
  User.findByIdAndUpdate(
    req.body._id,
    req.body,
    { new: true },
    function (err, data) {
      if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
      else if (!data)
        res.json(resHandler.respondError("Wrong format provided", -3));
      else
        res.json(
          resHandler.respondSuccess(
            data,
            "User credentials updated successfully",
            2
          )
        );
    }
  );
}
function updateSettings(req, res) {
  // var newSetting = new Settings({
  //     categoriesMeta: req.body.categoriesMeta,
  //     storesMeta: req.body.storesMeta,
  //     blogsMeta: req.body.blogsMeta,
  //     productsMeta: req.body.productsMeta,
  //     metaCategory: req.body.metaCategory,
  //     metaStore: req.body.storesMeta,
  //     metaBlog: req.body.blogsMeta,
  //     metaProduct: req.body.productsMeta,
  //     titleHome: req.body.titleHome,
  //     titleCategories: req.body.titleCategories,
  //     titleCategory: req.body.titleCategory,
  //     titleStores: req.body.titleStores,
  //     titleStore: req.body.titleStore,
  //     titleBlogs: req.body.titleBlogs,
  //     titleBlog: req.body.titleBlog,
  //     titleProducts: req.body.titleProducts,
  //     titleProduct: req.body.titleProduct,
  //     tags: req.body.productsMeta
  // });
  // newSetting.save().then(function (result) {
  //     res.json(resHandler.respondSuccess(result, "Product added successfully", 2));
  // }, function (err) {
  //     var error = errHandler.handle(err);
  //     res.json(resHandler.respondError(error[0], (error[1] || -1)));
  // })
  Settings.findByIdAndUpdate(
    "6171a8a269f1ab50724f8e12",
    req.body,
    function (err, data) {
      if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
      else if (!data)
        res.json(resHandler.respondError("Wrong format provided", -3));
      else
        res.json(
          resHandler.respondSuccess(data, "Settings updated successfully", 2)
        );
    }
  );
}
