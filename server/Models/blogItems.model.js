let mongoose = require('mongoose');

let blogItemSchema = mongoose.Schema({
    name: { type: String, required: true },
    blogId: { type: String, required: true },
    img: { type: String, required: true },
    externalLink: { type: String, required: true },
    buttonText: { type: String, required: true },
    pricing: { type: String, required: true },
    imgAlt: { type: String, required: true },
    sortNo: { type: Number, required: true },
    rating: { type: Number, required: true },
    CreatedAt: { type: String, default: Date.now() }
});

module.exports = mongoose.model('BlogItem', blogItemSchema);