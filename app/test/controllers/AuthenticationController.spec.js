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
  beforeEach(() => {
    jest.resetModules();
  });
  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  const mockRequest = {
    body: {
      email: "email@email",
      password: "userpass",
    },
  };
  const mockNext = jest.fn();
  describe("register", () => {
    it("should call res.status(201) and res.json with user data", async () => {
      const mockAuthService = {
        register: jest.fn().mockReturnValue(Promise.resolve(user)),
      };
      // mock auth service
      jest.mock("../../services/AuthenticationService", () => mockAuthService);
      const routes = require("../../../config/routes");
      const controllers = require("../../controllers");

      await controllers.api.v1.authenticationController.register(
        mockRequest,
        mockResponse
      );

      expect(mockAuthService.register).toHaveBeenCalledWith(mockRequest.body);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(user);
    });

    it("should call res.status(422) and res.json with email already registered error", async () => {
      const EmailAlreadyRegisteredError = require("../../errors/EmailAlreadyRegisteredError");
      const err = new EmailAlreadyRegisteredError(mockRequest.body.email);

      const mockAuthService = {
        register: jest.fn().mockReturnValue(Promise.resolve(err)),
      };
      // mock auth service
      jest.mock("../../services/AuthenticationService", () => mockAuthService);

      const routes = require("../../../config/routes");
      const controllers = require("../../controllers");
      await controllers.api.v1.authenticationController.register(
        mockRequest,
        mockResponse
      );

      expect(mockAuthService.register).toHaveBeenCalledWith(mockRequest.body);
      expect(mockResponse.status).toHaveBeenCalledWith(422);
      expect(mockResponse.json).toHaveBeenCalledWith(err.message);
    });

    it("should call next, req.err should contain error", async () => {
      const routes = require("../../../config/routes");
      const controllers = require("../../controllers");

      jest.mock("../../services/AuthenticationService", () => {
        return {
          register: () => {
            throw Error("error");
          },
        };
      });

      await controllers.api.v1.authenticationController.register(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockNext).toHaveBeenCalled();
      expect(mockRequest.error).toBeInstanceOf(Error);
    });
  });

  describe("login", () => {
    it("should call res.status(200) and res.json with jwt access token", async () => {
      const dummyToken = "somedummyjwttoken";
      const mockAuthService = {
        login: jest.fn().mockReturnValue(Promise.resolve(dummyToken)),
      };
      // mock auth service
      jest.mock("../../services/AuthenticationService", () => mockAuthService);
      const routes = require("../../../config/routes");
      const controllers = require("../../controllers");

      await controllers.api.v1.authenticationController.login(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockAuthService.login).toHaveBeenCalledWith(mockRequest.body);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        accessToken: dummyToken,
      });
    });

    it("should call res.status(404) and res.json with EmailNotRegisteredError", async () => {
      const EmailNotRegisteredError = require("../../errors/EmailNotRegistered");
      const err = new EmailNotRegisteredError(mockRequest.body.email);
      const mockAuthService = {
        login: jest.fn().mockReturnValue(Promise.resolve(err)),
      };
      // mock auth service
      jest.mock("../../services/AuthenticationService", () => mockAuthService);
      const routes = require("../../../config/routes");
      const controllers = require("../../controllers");

      await controllers.api.v1.authenticationController.login(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockAuthService.login).toHaveBeenCalledWith(mockRequest.body);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith(err.message);
    });

    it("should call res.status(401) and res.json with WrongPasswordError", async () => {
      const { WrongPasswordError } = require("../../errors");
      const err = new WrongPasswordError(mockRequest.body.email);
      const mockAuthService = {
        login: jest.fn().mockReturnValue(Promise.resolve(err)),
      };
      // mock auth service
      jest.mock("../../services/AuthenticationService", () => mockAuthService);
      const routes = require("../../../config/routes");
      const controllers = require("../../controllers");

      await controllers.api.v1.authenticationController.login(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockAuthService.login).toHaveBeenCalledWith(mockRequest.body);
      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith(err.message);
    });
  });
});
