describe("flightsRepository", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  describe("findFlights", () => {
    it("should return flights data based on search parameters", async () => {
      const flights = [
        {
          id: 1,
          departure_date: new Date(),
          from: {
            id: 1,
            iata: "TBJ",
            name: "Tabarka–Aïn Draham International Airport",
            location: "Tabarka, Tunisia",
          },
          to: {
            id: 2,
            iata: "CGK",
            name: "Soekarno–Hatta International Airport",
            location: "Jakarta, Indonesia",
          },
          description: "lorem ipsum",

          airplane: {
            id: 2,
            model_number: "boring 646",
          },
        },
        {
          id: 2,
          departure_date: new Date(),
          from: {
            id: 1,
            iata: "TBJ",
            name: "Tabarka–Aïn Draham International Airport",
            location: "Tabarka, Tunisia",
          },
          to: {
            id: 2,
            iata: "CGK",
            name: "Soekarno–Hatta International Airport",
            location: "Jakarta, Indonesia",
          },
          description: "lorem ipsum",

          airplane: {
            id: 2,
            model_number: "boring 737",
          },
        },
      ];
      const mockFlightModel = {
        findAll: jest.fn().mockReturnValue(flights),
      };

      jest.mock("../../models", () => {
        return { Flight: mockFlightModel };
      });
      const flightsRepository = require("../../repositories/flightsRepository");
      const { Op } = require("sequelize");
      const searchParams = {
        departure_date: new Date(),
        from: 1,
        to: 2,
      };
      const result = await flightsRepository.findFlights(
        searchParams.departure_date,
        searchParams.from,
        searchParams.to
      );

      expect(mockFlightModel.findAll).toHaveBeenCalledWith({
        where: {
          departure_date: {
            [Op.gte]: searchParams.departure_date,
          },
          from: searchParams.from,
          to: searchParams.to,
        },
      });
      expect(result).toBe(flights);
    });
  });
});
