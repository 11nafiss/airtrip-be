const {
  createWishlist,
  getWishlists,
  deleteWishlist,
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

async function handleDeleteWishlist(req, res, next) {
  try {
    const deleted = await deleteWishlist(req.params.id);
    if (deleted < 1) {
      return res
        .status(404)
        .json({ message: `Wishlist id ${req.params.id} not found!` });
    }
    res.status(200).json({ message: `Wishlist id ${req.params.id} deleted!` });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  handleCreateWishlist,
  handleGetWishlist,
  handleDeleteWishlist,
};
