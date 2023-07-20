let User = require('../Models/user.model');
let Category = require('../Models/categories.model');
let Store = require('../Models/stores.model');
let Coupon = require('../Models/coupon.model');
let Blog = require('../Models/blog.model');
let BlogItem = require('../Models/blogItems.model');
let gridProduct = require('../Models/gridProduct.model');
let Banner = require('../Models/banner.model');
let postImg = require('../Models/postImage.model');
let Product = require('../Models/product.model');
let resHandler = require('../utils/responseHandler');

module.exports = {
    deleteCategory: deleteCategory,
    deleteStore: deleteStore,
    deleteCoupon: deleteCoupon,
    deleteBlog: deleteBlog,
    deleteUser: deleteUser,
    deleteBanner: deleteBanner,
    deletePostImage: deletePostImage,
    deleteProduct: deleteProduct,
    deleteBlogItem: deleteBlogItem,
    deleteProductForBlog: deleteProductForBlog
};

function deleteCategory(req, res) {
    Category.findByIdAndRemove(req.body._id, function (err, deletedNode) {
        if (err) res.json(resHandler.respondError(error[0], error[1] || -1));
        else if (!deletedNode) res.json(resHandler.respondError("Some error occured", -3));
        else res.json(resHandler.respondSuccess(deletedNode, "Category deleted successfully", 2));
    })
}
function deleteStore(req, res) {
    Store.deleteOne({ _id: req.body._id }, function (err, deletedNode) {
        if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
        else if (!deletedNode) res.json(resHandler.respondError("Some error occured", -3));
        else {
            deleteAllCoupons(req.body._id);
            res.json(resHandler.respondSuccess(deletedNode, "Store deleted successfully", 2));
        }
    })
}
function deleteBanner(req, res) {
    Banner.deleteOne({ _id: req.body._id }, function (err, deletedNode) {
        if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
        else if (!deletedNode) res.json(resHandler.respondError("Some error occured", -3));
        else {
            res.json(resHandler.respondSuccess(deletedNode, "Banner deleted successfully", 2));
        }
    })
}
function deletePostImage(req, res) {
    postImg.deleteOne({ _id: req.body._id }, function (err, deletedNode) {
        if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
        else if (!deletedNode) res.json(resHandler.respondError("Some error occured", -3));
        else {
            res.json(resHandler.respondSuccess(deletedNode, "Post Image deleted successfully", 2));
        }
    })
}
function deleteProduct(req, res) {
    Product.deleteOne({ _id: req.body._id }, function (err, deletedNode) {
        if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
        else if (!deletedNode) res.json(resHandler.respondError("Some error occured", -3));
        else {
            res.json(resHandler.respondSuccess(deletedNode, "Product deleted successfully", 2));
        }
    })
}
function deleteBlogItem(req, res) {
    BlogItem.deleteOne({ _id: req.body._id }, function (err, deletedNode) {
        if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
        else if (!deletedNode) res.json(resHandler.respondError("Some error occured", -3));
        else {
            res.json(resHandler.respondSuccess(deletedNode, "Blog Item deleted successfully", 2));
        }
    })
}
function deleteProductForBlog(req, res) {
    gridProduct.deleteOne({ _id: req.body._id }, function (err, deletedNode) {
        if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
        else if (!deletedNode) res.json(resHandler.respondError("Some error occured", -3));
        else {
            res.json(resHandler.respondSuccess(deletedNode, "Grid product deleted successfully", 2));
        }
    })
}
function deleteAllCoupons(storeId) {
    Coupon.deleteMany({ storeId: storeId }, function (err, deletedNode) {
        if (err) console.log("Error in deleting remaining Coupons");
        else console.log("Remaining coupons deleted");
    })
}
function deleteCoupon(req, res) {
    Coupon.deleteOne({ _id: req.body._id }, function (err, deletedNode) {
        if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
        else if (!deletedNode) res.json(resHandler.respondError("Some error occured", -3));
        else {
            deleteCouponCallback(req.body);
            res.json(resHandler.respondSuccess(deletedNode, "Coupon deleted successfully", 2));
        }
    })
}
function deleteCouponCallback(couponDetail) {
    Coupon.updateMany({ storeId: couponDetail.storeId }, { $inc: { 'sortNo': -1 } }).where('sortNo').gt(couponDetail.sortNo).exec(function (err, data) {
        if (err) console.log("Errrorr " + err);
        else if (data) console.log("Dataaa " + data);
    })
}
function deleteBlog(req, res) {
    Blog.deleteOne({ _id: req.body._id }, function (err, deletedNode) {
        if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
        else if (!deletedNode) res.json(resHandler.respondError("Some error occured", -3));
        else res.json(resHandler.respondSuccess(deletedNode, "Blog deleted successfully", 2));
    })
}
function deleteUser(req, res) {
    User.deleteOne({ _id: req.body._id }, function (err, deletedNode) {
        if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
        else if (!deletedNode) res.json(resHandler.respondError("Some error occured", -3));
        else res.json(resHandler.respondSuccess(deletedNode, "User deleted successfully", 2));
    })
}
