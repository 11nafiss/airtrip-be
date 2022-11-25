const { User } = require("../../models");
const bcryptjs = require("bcryptjs");
const userData = {
  email: "email@email",
  password: "userpass",
};

function encryptPass(password) {
  return bcryptjs.hashSync(password);
}

const user = new User({
  ...userData,
  roleId: 2,
  password: encryptPass(userData.password),
});

describe("AuthenticationService", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  describe("register", () => {
    it("should return registered user data", async () => {
      const mockUserRepo = {
        register: jest.fn().mockReturnValue(Promise.resolve(user)),
        findUserByEmail: jest.fn().mockReturnValue(Promise.resolve(null)),
      };

      jest.mock("../../repositories/usersRepository", () => mockUserRepo);

      const authenticationService = require("../../services/AuthenticationService");

      const result = await authenticationService.register(userData);
      expect(mockUserRepo.findUserByEmail).toHaveBeenCalledWith(userData.email);
      expect(mockUserRepo.register).toHaveBeenCalledWith(
        expect.objectContaining({
          ...userData,
          password: expect.not.stringMatching(userData.password),
        })
      );
      expect(result).toBe(user);
    });

    it("should return instance of EmailAlreadyRegistered Error", async () => {
      const mockUserRepo = {
        findUserByEmail: jest.fn().mockReturnValue(Promise.resolve(user)),
      };

      jest.mock("../../repositories/usersRepository", () => mockUserRepo);

      const authenticationService = require("../../services/AuthenticationService");
      const { EmailAlreadyRegisteredError } = require("../../errors");

      const result = await authenticationService.register(userData);
      expect(mockUserRepo.findUserByEmail).toHaveBeenCalledWith(userData.email);

      expect(result).toBeInstanceOf(EmailAlreadyRegisteredError);

      expect(new EmailAlreadyRegisteredError("")).toBeInstanceOf(Error);
      expect(result.message).toBe(`${userData.email} already registered!`);
    });

    it("should return error obj", async () => {
      jest.mock("../../repositories/usersRepository", () => null);

      const authenticationService = require("../../services/AuthenticationService");

      const result = await authenticationService.register(userData);
      expect(result).toBeInstanceOf(Error);
    });
  });
});
