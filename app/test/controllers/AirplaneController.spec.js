const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
};
const mockNext = jest.fn().mockReturnThis();
const airplanes = require("../helper/airplaneDataExample");

describe("AirplaneController", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  describe("handleCreateAirplane", () => {
    it("should call res.status(201) and res.json with message and airplane data", async () => {
      const airplane = airplanes[0];
      const mockRequest = { body: airplane };
      const mockAirplaneService = {
        createAirplane: jest.fn().mockReturnValue(Promise.resolve(airplane)),
      };
      jest.mock("../../services/airplaneService", () => mockAirplaneService);
      const controllers = require("../../controllers");

      await controllers.api.v1.airplaneController.handleCreateAirplane(
        mockRequest,
        mockResponse,
        mockNext
      );
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Airplane created successfully!",
        data: airplane,
      });
    });
  });

  describe("handleGetAirplanes", () => {
    it("should call res.status(201) and res.json with airplanes data", async () => {
      const mockAirplaneService = {
        getAirplanes: jest.fn().mockReturnValue(Promise.resolve(airplanes)),
      };
      jest.mock("../../services/airplaneService", () => mockAirplaneService);
      const controllers = require("../../controllers");

      await controllers.api.v1.airplaneController.handleGetAirplanes(
        {},
        mockResponse,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: airplanes });
    });
  });

  describe("handleUpdateAirplane", () => {
    const airplane = airplanes[0];
    const testCases = [airplane, new Error("Airplane id 1")];
    test.each(testCases)("should ", async (airplaneServiceReturn) => {
      const { RecordNotFoundError } = require("../../errors");
      if (airplaneServiceReturn instanceof Error) {
        airplaneServiceReturn = new RecordNotFoundError(
          airplaneServiceReturn.message
        );
      }
      const mockRequest = {
        params: { id: 1 },
        body: airplane,
      };
      const mockAirplaneService = {
        updateAirplane: jest
          .fn()
          .mockReturnValue(Promise.resolve(airplaneServiceReturn)),
      };
      jest.mock("../../services/airplaneService", () => mockAirplaneService);

      const controllers = require("../../controllers");

      await controllers.api.v1.airplaneController.handleUpdateAirplane(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockAirplaneService.updateAirplane).toHaveBeenCalledWith(
        mockRequest.params.id,
        airplane
      );

      if (airplaneServiceReturn instanceof RecordNotFoundError) {
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({
          message: airplaneServiceReturn.message,
        });
        return;
      }

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: airplane,
        message: `Airplane id ${mockRequest.params.id} updated successfully!`,
      });
    });
  });

  describe("handleDeleteAirplane", () => {
    const testCases = [1, new Error("Airplane id 1")];
    test.each(testCases)("should ", async (airplaneServiceReturn) => {
      const { RecordNotFoundError } = require("../../errors");
      if (airplaneServiceReturn instanceof Error) {
        airplaneServiceReturn = new RecordNotFoundError(
          airplaneServiceReturn.message
        );
      }
      const mockRequest = {
        params: { id: 1 },
      };
      const mockAirplaneService = {
        deleteAirplane: jest
          .fn()
          .mockReturnValue(Promise.resolve(airplaneServiceReturn)),
      };
      jest.mock("../../services/airplaneService", () => mockAirplaneService);

      const controllers = require("../../controllers");

      await controllers.api.v1.airplaneController.handleDeleteAirplane(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockAirplaneService.deleteAirplane).toHaveBeenCalledWith(
        mockRequest.params.id
      );

      if (airplaneServiceReturn instanceof RecordNotFoundError) {
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({
          message: airplaneServiceReturn.message,
        });
        return;
      }

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: `Airplane id ${mockRequest.params.id} deleted successfully!`,
      });
    });
  });

  describe("handleGetAirplaneById", () => {
    const airplane = airplanes[0];
    const testCases = [airplane, null];
    test.each(testCases)("should ", async (airplaneServiceReturn) => {
      const mockRequest = {
        params: { id: 1 },
      };
      const mockAirplaneService = {
        getAirplaneById: jest
          .fn()
          .mockReturnValue(Promise.resolve(airplaneServiceReturn)),
      };
      jest.mock("../../services/airplaneService", () => mockAirplaneService);
      const { RecordNotFoundError } = require("../../errors");
      const controllers = require("../../controllers");

      await controllers.api.v1.airplaneController.handleGetAirplaneById(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockAirplaneService.getAirplaneById).toHaveBeenCalledWith(
        mockRequest.params.id
      );

      if (!airplaneServiceReturn) {
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({
          message: new RecordNotFoundError(
            `Airplane id ${mockRequest.params.id}`
          ).message,
        });
        return;
      }

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        data: airplane,
      });
    });
  });
});
