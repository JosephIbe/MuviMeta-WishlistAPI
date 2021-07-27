const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    movieId: {type: Number},
});

module.exports = new mongoose.model('wishlist', wishlistSchema);