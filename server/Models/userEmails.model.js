let mongoose = require('mongoose');

let userEmailSchema = mongoose.Schema({
    email: { type: String, required: true },
    CreatedAt: { type: String, default: Date.now() }
});

module.exports = mongoose.model('userEmails', userEmailSchema);