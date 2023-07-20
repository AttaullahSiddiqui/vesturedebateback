let mongoose = require('mongoose');

let dealSchema = mongoose.Schema({
    title: { type: String, required: true },
    shortDes: { type: String, required: true },
    longDes: { type: String, required: true },
    metaTitle: { type: String, required: true },
    metaDes: { type: String, required: true },
    CreatedAt: { type: String, default: Date.now() }
});

module.exports = mongoose.model('Deal', dealSchema);