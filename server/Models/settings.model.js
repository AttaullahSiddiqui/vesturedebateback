let mongoose = require('mongoose');

let settingsSchema = mongoose.Schema({
    tags: { type: Array, required: true },
    eventName: { type: String },
    eventBarText: { type: String },
});
module.exports = mongoose.model('Settings', settingsSchema);

// let settingsSchema = mongoose.Schema({
//     categoriesMeta: { type: String, required: true },
//     storesMeta: { type: String, required: true },
//     blogsMeta: { type: String, required: true },
//     productsMeta: { type: String, required: true },
//     metaCategory: { type: String, required: true },
//     metaStore: { type: String, required: true },
//     metaBlog: { type: String, required: true },
//     metaProduct: { type: String, required: true },
//     titleHome: { type: String, required: true },
//     titleCategories: { type: String, required: true },
//     titleCategory: {
//         start: { type: String, required: true },
//         end: { type: String, required: true }
//     },
//     titleStores: { type: String, required: true },
//     titleStore: {
//         start: { type: String, required: true },
//         end: { type: String, required: true }
//     },
//     titleBlogs: { type: String, required: true },
//     titleBlog: {
//         start: { type: String, required: true },
//         end: { type: String, required: true }
//     },
//     titleProducts: { type: String, required: true },
//     titleProduct: {
//         start: { type: String, required: true },
//         end: { type: String, required: true }
//     },
//     tags: { type: Array, required: true }
// });

