const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    id: Number,
    name: String
});

module.exports = new mongoose.model('wishlist', wishlistSchema);