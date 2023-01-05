const { create, list, destroy } = require("../repositories/wishlistRepository");

async function createWishlist(userId, flightId) {
  return await create(userId, flightId);
}

async function getWishlists(userId) {
  return await list(userId);
}

async function deleteWishlist(wishlistId) {
  return await destroy(wishlistId);
}

module.exports = { createWishlist, getWishlists, deleteWishlist };
