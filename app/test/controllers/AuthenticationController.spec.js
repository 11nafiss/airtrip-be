const { User } = require("../../models");
const bcryptjs = require("bcryptjs");

function encryptPass(password) {
  return bcryptjs.hashSync(password);
}

const userData = {
  email: "email@email",
  password: encryptPass("userpass"),
};

const user = new User({ ...userData, roleId: 2 });

describe("AuthenticationController", () => {
  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  describe("register", () => {
    beforeEach(() => {
      jest.resetModules();
    });

    it("should call res.status(201) and res.json with user data", async () => {
      const mockRequest = {
        body: {
          email: "email@email",
          password: "userpass",
        },
      };
      const mockAuthService = {
        register: jest.fn().mockReturnValue(Promise.resolve(user)),
      };
      // mock auth service
      jest.mock("../../services/AuthenticationService", () => mockAuthService);

      const authenticationService = require("../../services/AuthenticationService");
      const { api } = require("../../controllers");
      await api.v1.authenticationController.register(mockRequest, mockResponse);

      expect(mockAuthService.register).toHaveBeenCalledWith(mockRequest.body);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(user);
    });

    it("should call res.status(500) ", () => {});
  });
});
