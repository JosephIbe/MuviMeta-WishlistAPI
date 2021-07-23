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
            const { 
                id, name
            } = req.body;

            const wishlist = Wishlist({id, name});
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

    removeFromWishlist: async (req, res, next) => {}
};