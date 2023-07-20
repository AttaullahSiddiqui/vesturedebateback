let mongoose = require('mongoose');

let sliderSchema = mongoose.Schema({
    link: { type: String, required: true },
    img: { type: String, required: true },
    arrIndex: { type: Number, required: true },
    CreatedAt: { type: String, default: Date.now() }
});

module.exports = mongoose.model('Slider', sliderSchema);