const {
  createWishlist,
  getWishlists,
} = require("../../../services/wishlistService");

async function handleCreateWishlist(req, res, next) {
  // req.body = {flightId}
  try {
    const wishlist = await createWishlist(req.user.id, req.body.flightId);
    res.status(201).json({ data: wishlist });
  } catch (error) {
    next(error);
  }
}

async function handleGetWishlist(req, res, next) {
  try {
    const wishlists = await getWishlists(req.user.id);
    res.status(200).json({ data: wishlists });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  handleCreateWishlist,
  handleGetWishlist,
};
