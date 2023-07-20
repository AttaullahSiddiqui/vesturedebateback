let mongoose = require('mongoose');

let bannerSchema = mongoose.Schema({
    about: { type: String, required: true },
    catId: { type: Array, required: true },
    storeId: { type: String, required: true },
    img: { type: String, required: true },
    trackingLink: { type: String, required: true },
    sortNo: { type: Number, required: true },
    CreatedAt: { type: String, default: Date.now() }
});

module.exports = mongoose.model('Banner', bannerSchema);