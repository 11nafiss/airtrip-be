const airplanes = require("../helper/airplaneDataExample");

describe("Airplane repository", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  describe("getAirplane", () => {
    it("should return airplane model by id", async () => {
      const mockAirplaneModel = {
        findByPk: jest.fn().mockReturnValue(Promise.resolve(airplanes[0])),
      };
      const id = 1;

      jest.mock("../../models", () => {
        return { Airplane: mockAirplaneModel };
      });
      const airplaneRepository = require("../../repositories/airplaneRepository");

      const result = await airplaneRepository.getAirplane(id);
      expect(mockAirplaneModel.findByPk).toHaveBeenCalledWith(id);
      expect(result).toBe(airplanes[0]);
    });
  });

  describe("createAirplane", () => {
    it("should return created airplane model", async () => {
      const createArgs = airplanes[0];
      const mockAirplaneModel = {
        create: jest.fn().mockReturnValue(Promise.resolve(createArgs)),
      };

      jest.mock("../../models", () => {
        return { Airplane: mockAirplaneModel };
      });
      const airplaneRepository = require("../../repositories/airplaneRepository");

      const result = await airplaneRepository.createAirplane(createArgs);
      expect(mockAirplaneModel.create).toHaveBeenCalledWith(createArgs, {
        returning: true,
      });
      expect(result).toBe(createArgs);
    });
  });

  describe("listAirplanes", () => {
    it("should return list of airplanes", async () => {
      const mockAirplaneModel = {
        findAll: jest.fn().mockReturnValue(Promise.resolve(airplanes)),
      };

      jest.mock("../../models", () => {
        return { Airplane: mockAirplaneModel };
      });
      const airplaneRepository = require("../../repositories/airplaneRepository");

      const result = await airplaneRepository.listAirplanes();
      expect(mockAirplaneModel.findAll).toHaveBeenCalled();
      expect(result).toBe(airplanes);
    });
  });

  describe("deleteAirplane", () => {
    it("should return number of deleted rows", async () => {
      const mockAirplaneModel = {
        destroy: jest.fn().mockReturnValue(Promise.resolve(1)),
      };
      const id = 1;

      jest.mock("../../models", () => {
        return { Airplane: mockAirplaneModel };
      });
      const airplaneRepository = require("../../repositories/airplaneRepository");

      const result = await airplaneRepository.deleteAirplane(id);
      expect(mockAirplaneModel.destroy).toHaveBeenCalledWith({ where: { id } });
      expect(result).toBe(1);
    });
  });

  describe("updateAirplane", () => {
    it("should return updated airplane model", async () => {
      const updateArgs = airplanes[0];
      const updateReturnValue = [1, [updateArgs]];
      const mockAirplaneModel = {
        update: jest.fn().mockReturnValue(Promise.resolve(updateReturnValue)),
      };
      const id = 1;

      jest.mock("../../models", () => {
        return { Airplane: mockAirplaneModel };
      });
      const airplaneRepository = require("../../repositories/airplaneRepository");

      const result = await airplaneRepository.updateAirplane(id, updateArgs);
      expect(mockAirplaneModel.update).toHaveBeenCalledWith(updateArgs, {
        where: { id },
        returning: true,
      });
      expect(result).toBe(updateReturnValue[1]);
    });
  });
});
