const { create, list } = require("../repositories/wishlistRepository");

async function createWishlist(userId, flightId) {
  return await create(userId, flightId);
}

async function getWishlists(userId) {
  return await list(userId);
}

module.exports = { createWishlist, getWishlists };
