let mongoose = require('mongoose');
let validator = require('mongoose-unique-validator');

let userSchema = mongoose.Schema({
    userName: { type: String, required: true, index: true, unique: true },
    userPass: { type: String, required: true, minlength: 6, maxLength: 14 },
    admin: { type: Boolean, required: true }
});

userSchema.plugin(validator);

module.exports = mongoose.model('User', userSchema);