let mongoose = require('mongoose');

let productSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    catId: { type: Array, required: true },
    tags: { type: Array, required: true },
    moreInfo: { type: Array, required: true },
    storeId: { type: String, required: true },
    img: { type: String },
    vid: { type: String },
    externalLink: { type: String, required: true },
    buttonText: { type: String, required: true },
    metaDes: { type: String, required: true },
    metaTitle: { type: String, required: true },
    pricing: { type: String, required: true },
    imageAlt: { type: String },
    sortNo: { type: Number, required: true },
    featured: { type: Boolean, required: true },
    clicks: { type: Number, required: true },
    CreatedAt: { type: String, default: Date.now() }
});

module.exports = mongoose.model('Product', productSchema);