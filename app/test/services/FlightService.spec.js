const flights = require("../helper/flightsDataExample");

describe("flightService", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  describe("searchFlights", () => {
    test.each([["one way"], ["round trip"]])(
      "should return flights data",
      async (flight_type) => {
        const mockFlightRepo = {
          findFlights: jest.fn().mockReturnValue(Promise.resolve(flights)),
          findReturnFlights: jest
            .fn()
            .mockReturnValue(Promise.resolve(flights)),
        };
        jest.mock("../../repositories/flightsRepository", () => mockFlightRepo);
        const flightService = require("../../services/flightService");

        const searchParams = {
          from: 1,
          to: 2,
          flight_date: new Date().toISOString(),
          return_flight_date: new Date().toISOString(),
          flight_type,
          flight_class: "economy",
        };

        const result = await flightService.searchFlights(searchParams);

        expect(mockFlightRepo.findFlights).toHaveBeenCalledWith(
          new Date(searchParams.flight_date),
          searchParams.from,
          searchParams.to,
          searchParams.flight_class
        );
        if (flight_type === "round trip") {
          let maxFlightDate = null;
          flights.forEach((flight) => {
            if (maxFlightDate === null || flight.arrival > maxFlightDate) {
              maxFlightDate = flight.arrival;
            }
          });
          expect(mockFlightRepo.findReturnFlights).toHaveBeenCalledWith(
            maxFlightDate,
            new Date(searchParams.return_flight_date),
            searchParams.from,
            searchParams.to,
            searchParams.flight_class
          );
          expect(result).toEqual({ flights, return_flights: flights });
        } else {
          expect(result).toEqual({ flights, return_flights: [] });
        }
      }
    );
  });
});
