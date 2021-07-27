const Wishlist = require('../../models/wishlist.model');
const axios = require('axios');

module.exports = {
    fetchAll: async (req, res, next) => {
        try {
            const wishlist = await Wishlist.find({});
            if (wishlist == null) {
                res.status(404)
                    .json({
                        success: false,
                        msg: 'No Movies Found in Wishlist',
                        wishlist: []
                    })
            }
            const idsArr = wishlist.map((item) => {
                return item.id;
            });
            console.log(idsArr);
            const promisesArr = idsArr.map(async (id) => {
                const shows = await axios.get(`https://api.tvmaze.com/shows/${id}`);
                return shows.data;
            });
            const showsArr = await Promise.all(promisesArr);
            console.log(showsArr);
            return res.status(200)
                      .json({
                        length: showsArr.length,
                        success: true,
                        msg: 'All Movies in Wishlist Fetched',
                        wishlist: showsArr
                      })
        } catch (err) {
            console.log(err);
            next(err);
        }
    },  
    
    saveToWishlist: async (req, res, next) => {
        try {
            const { id } = req.params;
            console.log(id);

            let found = await Wishlist.findOne({'movieId': id});
            console.log(found);

            if(found) {
                return res.status(409)
                   .json({success: false, msg: 'This movie is already in your wishlist'});
            }

            const wishlist = Wishlist({movieId: id});
            console.log(`wishlist to add\n ${wishlist}`);
            const savedWishlist = await wishlist.save();
            
            return res.status(201)
                      . json({
                          msg: `Movie with id ${id} Added to Wishlist`,
                          success: true,
                          movie: savedWishlist
                      });

        } catch (err){
            console.log(err);
            next(err);
        }
    },

    removeFromWishlist: async (req, res, next) => {},

    checkMovieExistsInWishlist: async (req, res, next) => {
        try {
            const { id } = req.params;
            console.log(id);

            let found = await Wishlist.findOne({}).select({'id': id});
            console.log(found);

            if(found) {
                return res.status(200)
                          .json({success: true, msg: 'This movie exists in your wishlist'});
            }
            return res.status(404)
                          .json({success: false, msg: 'This movie does not exist in your wishlist'});
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
};