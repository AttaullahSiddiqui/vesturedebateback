let mongoose = require('mongoose');

let gridProductSchema = mongoose.Schema({
    title: { type: String, required: true },
    price: { type: String, required: true },
    imageLink: { type: String, required: true },
    detailLink: { type: String, required: true },
    CreatedAt: { type: String, default: Date.now() }
});

module.exports = mongoose.model('gridProduct', gridProductSchema);