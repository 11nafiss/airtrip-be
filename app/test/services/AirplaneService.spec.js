const airplanes = require("../helper/airplaneDataExample");

describe("AirplaneService", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  describe("getAirplaneById", () => {
    it("should return airplane model by id", async () => {
      const id = 1;
      const mockAirplaneRepo = {
        getAirplane: jest.fn().mockReturnValue(Promise.resolve(airplanes[0])),
      };
      jest.mock(
        "../../repositories/airplaneRepository",
        () => mockAirplaneRepo
      );
      const airplaneService = require("../../services/airplaneService");

      const result = await airplaneService.getAirplaneById(id);

      expect(mockAirplaneRepo.getAirplane).toHaveBeenCalledWith(id);
      expect(result).toBe(airplanes[0]);
    });
  });

  describe("createAirplane", () => {
    it("should return created airplane", async () => {
      const base64img = "base64image";
      const createArgs = { ...airplanes[0], image: base64img };
      const uploadImgReturn = "imageurl.com";
      const updateResult = { ...createArgs, image: uploadImgReturn };
      const mockAirplaneRepo = {
        createAirplane: jest.fn().mockReturnValue(Promise.resolve(createArgs)),
      };
      const mockUploadImg = jest
        .fn()
        .mockReturnValue(Promise.resolve(uploadImgReturn));

      jest.mock(
        "../../repositories/airplaneRepository",
        () => mockAirplaneRepo
      );
      jest.mock("../../services/utils/uploadImage", () => mockUploadImg);

      const airplaneService = require("../../services/airplaneService");

      const result = await airplaneService.createAirplane(createArgs);

      expect(mockUploadImg).toHaveBeenCalledWith(base64img);
      expect(mockAirplaneRepo.createAirplane).toHaveBeenCalledWith(
        updateResult
      );
      expect(result).toEqual(updateResult);
    });
  });

  describe("getAirplanes", () => {
    it("should return list of airplanes", async () => {
      const mockAirplaneRepo = {
        listAirplanes: jest.fn().mockReturnValue(Promise.resolve(airplanes)),
      };
      jest.mock(
        "../../repositories/airplaneRepository",
        () => mockAirplaneRepo
      );
      const airplaneService = require("../../services/airplaneService");

      const result = await airplaneService.getAirplanes();

      expect(mockAirplaneRepo.listAirplanes).toHaveBeenCalled();
      expect(result).toBe(airplanes);
    });
  });

  describe("deleteAirplane", () => {
    it("should return number of deleted rows", async () => {
      const id = 1;
      const mockAirplaneRepo = {
        deleteAirplane: jest.fn().mockReturnValue(Promise.resolve(1)),
      };
      jest.mock(
        "../../repositories/airplaneRepository",
        () => mockAirplaneRepo
      );
      const airplaneService = require("../../services/airplaneService");

      const result = await airplaneService.deleteAirplane(id);

      expect(mockAirplaneRepo.deleteAirplane).toHaveBeenCalledWith(id);
      expect(result).toBe(1);
    });
  });

  describe("updateAirplane", () => {
    const base64img = "base64image";
    const id = 1;
    const updateArgs = { ...airplanes[0], image: base64img };
    const uploadImgReturn = "imageurl.com";
    const repoUpdateArgs = { ...updateArgs, image: uploadImgReturn };
    const testCases = [[[repoUpdateArgs]], [[]]];
    test.each(testCases)(
      "should return updated airplane data",
      async (updateResult) => {
        const mockAirplaneRepo = {
          updateAirplane: jest
            .fn()
            .mockReturnValue(Promise.resolve(updateResult)),
        };
        const mockUploadImg = jest
          .fn()
          .mockReturnValue(Promise.resolve(uploadImgReturn));

        jest.mock(
          "../../repositories/airplaneRepository",
          () => mockAirplaneRepo
        );
        jest.mock("../../services/utils/uploadImage", () => mockUploadImg);

        const airplaneService = require("../../services/airplaneService");

        const result = await airplaneService.updateAirplane(id, {
          ...updateArgs,
        });

        expect(mockUploadImg).toHaveBeenCalledWith(base64img);
        expect(mockAirplaneRepo.updateAirplane).toHaveBeenCalledWith(
          id,
          repoUpdateArgs
        );

        if (updateResult.length < 1) {
          const { RecordNotFoundError } = require("../../errors");
          return expect(result).toEqual(
            new RecordNotFoundError(`Airplane id ${id}`)
          );
        }
        expect(result).toEqual(updateResult[0]);
      }
    );
  });
});
