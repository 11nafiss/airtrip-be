const wishlists = require("../helper/wishlistDataExample");

describe("userService", () => {
  const userId = 1;
  beforeEach(() => {
    jest.resetModules();
  });

  describe("createWishlist", () => {
    it("should return created wishlist data", async () => {
      const wishlist = wishlists[0];
      const mockWishlistRepo = {
        create: jest.fn().mockReturnValue(Promise.resolve(wishlist)),
      };

      jest.mock(
        "../../repositories/wishlistRepository",
        () => mockWishlistRepo
      );
      const wishlistService = require("../../services/wishlistService");

      const result = await wishlistService.createWishlist(
        userId,
        wishlist.flight_id
      );
      expect(mockWishlistRepo.create).toHaveBeenCalledWith(
        userId,
        wishlist.flight_id
      );
      expect(result).toEqual(wishlist);
    });
  });

  describe("getWishlist", () => {
    it("should return wishlists of user", async () => {
      const mockWishlistRepo = {
        list: jest.fn().mockReturnValue(Promise.resolve(wishlists)),
      };

      jest.mock(
        "../../repositories/wishlistRepository",
        () => mockWishlistRepo
      );
      const wishlistService = require("../../services/wishlistService");

      const result = await wishlistService.getWishlists(userId);
      expect(mockWishlistRepo.list).toHaveBeenCalledWith(userId);
      expect(result).toEqual(wishlists);
    });
  });

  describe("deleteWishlist", () => {
    it("should returr number of deleted wishlist", async () => {
      const deleted = 1;
      const wishlistId = 1;
      const mockWishlistRepo = {
        destroy: jest.fn().mockReturnValue(Promise.resolve(deleted)),
      };

      jest.mock(
        "../../repositories/wishlistRepository",
        () => mockWishlistRepo
      );
      const wishlistService = require("../../services/wishlistService");

      const result = await wishlistService.deleteWishlist(wishlistId);
      expect(mockWishlistRepo.destroy).toHaveBeenCalledWith(wishlistId);
      expect(result).toEqual(deleted);
    });
  });
});
