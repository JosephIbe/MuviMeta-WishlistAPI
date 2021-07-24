const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    id: Number
});

module.exports = new mongoose.model('wishlist', wishlistSchema);