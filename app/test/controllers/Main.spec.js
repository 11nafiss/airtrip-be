const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
};
const mockNext = jest.fn();
describe("Main", () => {
  const main = require("../../controllers/main");
  describe("handleGetRoot", () => {
    it("should call res.status(200) and res.json with up and running message", () => {
      main.handleGetRoot({}, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "OK",
        message: "AIRTRIP API is up and running!",
      });
    });
  });

  describe("handleError", () => {
    it("should call res.status(500) and res.json with error data", () => {
      const mockErr = {
        name: "error",
        message: "error bruh",
      };
      main.handleError(mockErr, {}, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: {
          name: mockErr.name,
          message: mockErr.message,
        },
      });
    });
  });

  describe("handleNotFound", () => {
    it("should call res.status(404) and res.json with not found error", () => {
      main.handleNotFound({}, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Error not found!",
      });
    });
  });
});
