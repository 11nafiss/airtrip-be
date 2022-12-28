const flights = require("../helper/flightsDataExample");
const airports = require("../helper/airportsDataExample");
const airplanes = require("../helper/airplaneDataExample");

const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
};
const mockNext = jest.fn().mockReturnThis();

describe("flightController", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  describe("handleListFlights", () => {
    const testCases = [
      // case no data
      null,
      flights,
    ];
    test.each(testCases)(
      "should call res.status and res.json",
      async (flightsData) => {
        const mockFlightService = {
          getAllFlights: jest
            .fn()
            .mockReturnValue(Promise.resolve(flightsData)),
        };
        jest.mock("../../services/flightService", () => mockFlightService);
        const controllers = require("../../controllers");

        await controllers.api.v1.flightController.handleListFlights(
          {},
          mockResponse,
          mockNext
        );

        expect(mockFlightService.getAllFlights).toHaveBeenCalled();
        if (!flightsData) {
          expect(mockResponse.status).toHaveBeenCalledWith(404);
          expect(mockResponse.json).toHaveBeenCalledWith({
            sttaus: "FAIL",
            message: "No Flight Data Found!",
          });
          return;
        }
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
          status: "OK",
          data: flights,
        });
      }
    );
  });

  describe("handleSearchFlights", () => {
    it("should call res.status(200) and res.json with flights data", async () => {
      const mockFlightService = {
        searchFlights: jest.fn().mockReturnValue(Promise.resolve(flights)),
      };

      jest.mock("../../services/flightService", () => mockFlightService);
      const controllers = require("../../controllers");
      const mockRequest = {
        query: {
          departure: new Date().toISOString(),
          from: 1,
          to: 2,
        },
      };

      await controllers.api.v1.flightController.handleSearchFlights(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockFlightService.searchFlights).toHaveBeenCalledWith(
        mockRequest.query
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: flights });
    });
  });

  describe("handleSearchReturnFlights", () => {
    it("should call res.status(200) and res.json with flights data", async () => {
      const mockFlightService = {
        searchReturnFlights: jest
          .fn()
          .mockReturnValue(Promise.resolve(flights)),
      };

      jest.mock("../../services/flightService", () => mockFlightService);
      const controllers = require("../../controllers");
      const mockRequest = {
        query: {
          departure: new Date().toISOString(),
          from: 1,
          to: 2,
        },
      };

      await controllers.api.v1.flightController.handleSearchReturnFlights(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockFlightService.searchReturnFlights).toHaveBeenCalledWith(
        mockRequest.query
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: flights });
    });
  });

  describe("handleCreateFlight", () => {
    const from = airports[0];
    const to = airports[1];
    const airplane = airplanes[0];
    const flight = flights[0];
    const testCases = [
      // no from_airport data
      [null, to, airplane],
      // no to_airport data
      [from, null, airplane],
      // no airplane data
      [from, to, null],
      [from, to, airplane],
    ];
    test.each(testCases)(
      "should call res.status and res json",
      async (from_airport, to_airport, airplaneData) => {
        const mockRequest = {
          body: {
            ...flight,
            from: flight.from_airport.id,
            to: flight.to_airport.id,
            airplane_id: flight.airplane.id,
          },
        };

        const mockFlightService = {
          createFlight: jest.fn().mockReturnValue(Promise.resolve(flight)),
        };
        const mockAirportService = {
          getAirportById: jest.fn((id) => {
            switch (id) {
              case mockRequest.body.from:
                return from_airport;
              case mockRequest.body.to:
                return to_airport;
            }
          }),
        };
        const mockAirplaneService = {
          getAirplaneById: jest.fn().mockReturnValue(airplaneData),
        };

        jest.mock("../../services/flightService", () => mockFlightService);
        jest.mock("../../services/airportService", () => mockAirportService);
        jest.mock("../../services/airplaneService", () => mockAirplaneService);

        const controllers = require("../../controllers");
        const RecordNotFoundError = require("../../errors/RecordNotFoundError");

        await controllers.api.v1.flightController.handleCreateFlight(
          mockRequest,
          mockResponse,
          mockNext
        );

        expect(mockAirportService.getAirportById).toHaveBeenCalledWith(
          mockRequest.body.from
        );
        if (!from_airport) {
          expect(mockResponse.status).toHaveBeenCalledWith(404);
          expect(mockResponse.json).toHaveBeenCalledWith(
            new RecordNotFoundError(`airport with id ${mockRequest.body.from}`)
          );
          return;
        }

        expect(mockAirportService.getAirportById).toHaveBeenCalledWith(
          mockRequest.body.to
        );
        if (!to_airport) {
          expect(mockResponse.status).toHaveBeenCalledWith(404);
          expect(mockResponse.json).toHaveBeenCalledWith(
            new RecordNotFoundError(`airport with id ${mockRequest.body.to}`)
          );
          return;
        }

        expect(mockAirplaneService.getAirplaneById).toHaveBeenCalledWith(
          mockRequest.body.airplane_id
        );
        if (!airplaneData) {
          expect(mockResponse.status).toHaveBeenCalledWith(404);
          expect(mockResponse.json).toHaveBeenCalledWith(
            new RecordNotFoundError(
              `airplane with id ${mockRequest.body.airplane_id}`
            )
          );
          return;
        }
        expect(mockFlightService.createFlight).toHaveBeenCalledWith(
          mockRequest.body
        );
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
          status: "OK",
          data: flight,
        });
      }
    );
  });

  describe("handleUpdateFlight", () => {
    const from = airports[0];
    const to = airports[1];
    const airplane = airplanes[0];
    const flight = flights[0];
    const testCases = [
      // no from_airport data
      [null, to, airplane, flight],
      // no to_airport data
      [from, null, airplane, flight],
      // no airplane data
      [from, to, null, flight],
      // no flight data
      [from, to, airplane, null],
      [from, to, airplane, flight],
    ];
    test.each(testCases)(
      "should call res.status and res json",
      async (from_airport, to_airport, airplaneData, flightData) => {
        const id = 1;
        const mockRequest = {
          body: {
            ...flight,
            from: flight.from_airport.id,
            to: flight.to_airport.id,
            airplane_id: flight.airplane.id,
          },
          params: { id },
        };

        const mockFlightService = {
          updateFlight: jest.fn().mockReturnValue(Promise.resolve(flight)),
          getFlightById: jest.fn(() => flightData),
        };
        const mockAirportService = {
          getAirportById: jest.fn((id) => {
            switch (id) {
              case mockRequest.body.from:
                return from_airport;
              case mockRequest.body.to:
                return to_airport;
            }
          }),
        };

        jest.mock("../../services/flightService", () => mockFlightService);
        jest.mock("../../services/airportService", () => mockAirportService);

        const controllers = require("../../controllers");
        const RecordNotFoundError = require("../../errors/RecordNotFoundError");

        await controllers.api.v1.flightController.handleUpdateFlight(
          mockRequest,
          mockResponse,
          mockNext
        );
        expect(mockFlightService.getFlightById).toHaveBeenCalledWith(
          mockRequest.params.id
        );
        if (!flightData) {
          expect(mockResponse.status).toHaveBeenCalledWith(404);
          expect(new RecordNotFoundError(`airplane with id ${id}`));
          return;
        }
        expect(mockAirportService.getAirportById).toHaveBeenCalledWith(
          mockRequest.body.from
        );
        if (!from_airport) {
          expect(mockResponse.status).toHaveBeenCalledWith(404);
          expect(mockResponse.json).toHaveBeenCalledWith(
            new RecordNotFoundError(`airport with id ${mockRequest.body.from}`)
          );
          return;
        }

        expect(mockAirportService.getAirportById).toHaveBeenCalledWith(
          mockRequest.body.to
        );
        if (!to_airport) {
          expect(mockResponse.status).toHaveBeenCalledWith(404);
          expect(mockResponse.json).toHaveBeenCalledWith(
            new RecordNotFoundError(`airport with id ${mockRequest.body.to}`)
          );
          return;
        }

        expect(mockFlightService.updateFlight).toHaveBeenCalledWith(
          mockRequest.params.id,
          mockRequest.body
        );
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith({
          status: "OK",
          data: flight,
        });
      }
    );
  });

  describe("handleDeleteFlight", () => {
    const flight = flights[0];
    const testCases = [
      // no data flight
      [null],
      [flight],
    ];
    test.each(testCases)("double(%d)", async (flightData) => {
      const mockFlightService = {
        getFlightById: jest.fn().mockReturnValue(Promise.resolve(flightData)),
        deleteFlight: jest.fn(),
      };

      const id = 1;
      const mockRequest = {
        params: { id },
      };

      jest.mock("../../services/flightService", () => mockFlightService);
      const controllers = require("../../controllers");
      const RecordNotFoundError = require("../../errors/RecordNotFoundError");

      await controllers.api.v1.flightController.handleDeleteFlight(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockFlightService.getFlightById).toHaveBeenCalledWith(id);

      if (!flightData) {
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith(
          new RecordNotFoundError(`airplane with id ${id}`)
        );
        return;
      }
      expect(mockFlightService.deleteFlight).toHaveBeenCalledWith(id);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "OK",
        message: "Flight data deleted successfully.",
      });
    });
  });
});
