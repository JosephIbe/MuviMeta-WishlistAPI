const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    id: {type: Number},
});

module.exports = new mongoose.model('wishlist', wishlistSchema);