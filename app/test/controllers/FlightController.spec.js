const flights = require("../helper/flightsDataExample");

const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
};
const mockNext = jest.fn().mockReturnThis();

describe("flightController", () => {
  describe("searchFlights", () => {
    it("should call res.status(200) and res.json with flights data", async () => {
      const mockFlightService = {
        searchFlights: jest.fn().mockReturnValue(Promise.resolve(flights)),
      };

      jest.mock("../../services/flightService", () => mockFlightService);
      const controllers = require("../../controllers");
      const mockRequest = {
        body: {
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
        mockRequest.body
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: flights });
    });
  });
});
