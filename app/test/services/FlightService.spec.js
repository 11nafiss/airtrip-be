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

describe("flightService", () => {
  describe("searchFlights", () => {
    it("should return flights data", async () => {
      const mockFlightRepo = {
        findFlights: jest.fn().mockReturnValue(Promise.resolve(flights)),
      };
      jest.mock("../../repositories/flightsRepository", () => mockFlightRepo);
      const flightService = require("../../services/flightService");

      const searchParams = {
        departure_date: new Date().toISOString(),
        from: 1,
        to: 2,
      };

      const result = await flightService.searchFlights(searchParams);

      expect(mockFlightRepo.findFlights).toHaveBeenCalledWith(
        new Date(searchParams.departure_date),
        searchParams.from,
        searchParams.to
      );
      expect(result).toBe(flights);
    });
  });
});
