let mongoose = require('mongoose');

let couponSchema = mongoose.Schema({
    offerBox: { type: String, required: true },
    offerDetail: { type: String, required: true },
    trackingLink: { type: String, required: true },
    expDate: { type: Date, required: true },
    activeStatus: { type: Boolean, required: true },
    code: { type: String },
    storeId: { type: String, required: true },
    featuredForHome: { type: Boolean, required: true },
    trending: { type: Boolean, required: true },
    newArrival: { type: Boolean, required: true },
    forEvent: { type: Boolean, required: true },
    sortNo: { type: Number, required: true },
    CreatedAt: { type: String, default: Date.now() }
});

module.exports = mongoose.model('Coupon', couponSchema);