const wishlists = require("../helper/wishlistDataExample");

describe("wishlistRepository", () => {
  const userId = 1;
  beforeEach(() => {
    jest.resetModules();
  });

  describe("create", () => {
    it("should return created wishlist data", async () => {
      const wishlist = wishlists[0];
      const mockWishlistModel = {
        create: jest.fn().mockReturnValue(Promise.resolve(wishlist)),
      };
      jest.mock("../../models", () => {
        return { Wishlist: mockWishlistModel };
      });
      const wishlistRepository = require("../../repositories/wishlistRepository");
      const result = await wishlistRepository.create(
        userId,
        wishlist.flight_id
      );

      expect(mockWishlistModel.create).toHaveBeenCalledWith({
        user_id: userId,
        flight_id: wishlist.flight_id,
      });
      expect(result).toEqual(wishlist);
    });
  });

  describe("list", () => {
    it("should return wishlists of user", async () => {
      const aiportFields = ["id", "iata", "name", "address"];
      const mockWishlistModel = {
        findAll: jest.fn().mockReturnValue(Promise.resolve(wishlists)),
      };
      const mockAirport = {};
      const mockFlight = {};
      jest.mock("../../models", () => {
        return {
          Wishlist: mockWishlistModel,
          Flight: mockFlight,
          Airport: mockAirport,
        };
      });
      const wishlistRepository = require("../../repositories/wishlistRepository");
      const result = await wishlistRepository.list(userId);

      expect(mockWishlistModel.findAll).toHaveBeenCalledWith({
        attributes: { exclude: ["flight_id"] },
        where: {
          user_id: userId,
        },
        include: [
          {
            model: mockFlight,
            as: "flight",
            attributes: { exclude: ["from", "to"] },
            include: [
              {
                model: mockAirport,
                as: "from_airport",
                attributes: aiportFields,
              },
              {
                model: mockAirport,
                as: "to_airport",
                attributes: aiportFields,
              },
            ],
          },
        ],
        order: [["createdAt", "DESC"]],
      });
      expect(result).toEqual(wishlists);
    });
  });
});
