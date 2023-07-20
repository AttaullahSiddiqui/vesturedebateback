let mongoose = require('mongoose');

let categorySchema = mongoose.Schema({
  name: { type: String, unique: true },
  categoryURL: { type: String, required: true, unique: true },
  slug: { type: String, required: true },
  metaTitle: { type: String, required: true },
  metaDescription: { type: String, required: true },
  metaKeywords: { type: String, required: true },
  forBlogs: { type: Boolean, required: true },
  featuredForHome: { type: Boolean, required: true },
  CreatedAt: { type: String, default: Date.now() },
});

module.exports = mongoose.model('Category', categorySchema);