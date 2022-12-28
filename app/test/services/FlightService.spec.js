const flights = require("../helper/flightsDataExample");

describe("flightService", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  describe("searchFlights", () => {
    it("should return flights data", async () => {
      const mockFlightRepo = {
        findFlights: jest.fn().mockReturnValue(Promise.resolve(flights)),
      };
      jest.mock("../../repositories/flightsRepository", () => mockFlightRepo);
      const flightService = require("../../services/flightService");

      const searchParams = {
        from: 1,
        to: 2,
        departureDate: new Date().toISOString(),
        flightClass: "economy",
      };

      const result = await flightService.searchFlights(searchParams);

      expect(mockFlightRepo.findFlights).toHaveBeenCalledWith(
        new Date(searchParams.departureDate),
        searchParams.from,
        searchParams.to,
        searchParams.flightClass
      );
      expect(result).toBe(flights);
    });
  });

  describe("searchReturnFlights", () => {
    it("return flights data", async () => {
      const mockFlightRepo = {
        findReturnFlights: jest.fn().mockReturnValue(Promise.resolve(flights)),
      };
      jest.mock("../../repositories/flightsRepository", () => mockFlightRepo);
      const flightService = require("../../services/flightService");

      const searchParams = {
        from: 1,
        to: 2,
        returnFlightDate: new Date().toISOString(),
        arrivalDate: new Date().toISOString(),
        flightClass: "economy",
      };

      const result = await flightService.searchReturnFlights(searchParams);

      expect(mockFlightRepo.findReturnFlights).toHaveBeenCalledWith(
        new Date(searchParams.returnFlightDate),
        new Date(searchParams.arrivalDate),

        searchParams.from,
        searchParams.to,
        searchParams.flightClass
      );
      expect(result).toBe(flights);
    });
  });

  describe("getflightById", () => {
    it("hould return flight data by id", async () => {
      const flight = flights[0];
      const id = 1;
      const mockFlightRepo = {
        getFlightById: jest.fn().mockReturnValue(Promise.resolve(flight)),
      };
      jest.mock("../../repositories/flightsRepository", () => mockFlightRepo);
      const flightService = require("../../services/flightService");

      const result = await flightService.getFlightById(id);

      expect(mockFlightRepo.getFlightById).toHaveBeenCalledWith(id);
      expect(result).toEqual(flight);
    });
  });

  describe("getAllFlights", () => {
    it("should return all flights datas", async () => {
      const mockFlightRepo = {
        list: jest.fn().mockReturnValue(Promise.resolve(flights)),
      };
      jest.mock("../../repositories/flightsRepository", () => mockFlightRepo);
      const flightService = require("../../services/flightService");

      const result = await flightService.getAllFlights();

      expect(mockFlightRepo.list).toHaveBeenCalled();
      expect(result).toEqual(flights);
    });
  });

  describe("createFlight", () => {
    it("should return created flight data", async () => {
      const flight = flights[0];
      const createArgs = { ...flight, from: 1, to: 2, airplane_id: 2 };
      const mockFlightRepo = {
        createFlight: jest.fn().mockReturnValue(Promise.resolve(createArgs)),
      };
      jest.mock("../../repositories/flightsRepository", () => mockFlightRepo);
      const flightService = require("../../services/flightService");

      const result = await flightService.createFlight(createArgs);

      expect(mockFlightRepo.createFlight).toHaveBeenCalledWith(createArgs);
      expect(result).toEqual(createArgs);
    });
  });

  describe("updateFlight", () => {
    it("should return updated flight data", async () => {
      const flight = flights[0];
      const id = 1;
      const updateArgs = { ...flight, from: 1, to: 2, airplane_id: 2 };
      const mockFlightRepo = {
        updateFlight: jest.fn().mockReturnValue(Promise.resolve(updateArgs)),
      };
      jest.mock("../../repositories/flightsRepository", () => mockFlightRepo);
      const flightService = require("../../services/flightService");

      const result = await flightService.updateFlight(id, updateArgs);

      expect(mockFlightRepo.updateFlight).toHaveBeenCalledWith(id, updateArgs);
      expect(result).toEqual(updateArgs);
    });
  });

  describe("deleteFlight", () => {
    it("should call deleteFlight", async () => {
      const id = 1;
      const mockFlightRepo = {
        deleteFlight: jest.fn().mockReturnValue(Promise.resolve()),
      };
      jest.mock("../../repositories/flightsRepository", () => mockFlightRepo);
      const flightService = require("../../services/flightService");

      await flightService.deleteFlight(id);

      expect(mockFlightRepo.deleteFlight).toHaveBeenCalledWith(id);
    });
  });
});
