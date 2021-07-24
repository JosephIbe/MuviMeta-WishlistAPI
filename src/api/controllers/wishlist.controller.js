const Wishlist = require('../../models/wishlist.model');

module.exports = {
    fetchAll: async (req, res, next) => {
        try {
            let wishlist = await Wishlist.find({});
            if (wishlist == null) {
                res.status(404)
                    .json({
                        success: false,
                        msg: 'No Movies Found in Wishlist',
                        wishlist: []
                    })
            }
            return res.status(200)
                      .json({
                        success: true,
                        msg: 'All Movies in Wishlist Fetched',
                        wishlist
                      })
        } catch (err) {
            console.log(err);
            next(err);
        }
    },
    
    saveToWishlist: async (req, res, next) => {
        try {
            const { id } = req.body;

            let found = await Wishlist.find({id: id});
            console.log(found);

            if(!found) {
                const wishlist = Wishlist({id});
                const savedWishlist = await wishlist.save();
            
                return res.status(201)
                      . json({
                          msg: `Movie with id ${id} Added to Wishlist`,
                          success: true,
                          movie: savedWishlist
                      });
            }
            return res.status(409)
                      .json({success: false, msg: 'This movie is already in your wishlist'});

        } catch (err){
            console.log(err);
            next(err);
        }
    },

    removeFromWishlist: async (req, res, next) => {}
};