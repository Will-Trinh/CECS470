const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
 name: { type: String, required: true },
 email: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('User', userSchema);

// Here, we define a simple user schema with name and email fields.
