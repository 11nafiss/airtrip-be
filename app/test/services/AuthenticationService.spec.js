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
  describe("register", () => {
    beforeEach(() => {
      jest.resetModules();
    });

    it("should return registered user data", async () => {
      const mockUserRepo = {
        register: jest.fn().mockReturnValue(Promise.resolve(user)),
      };

      jest.mock("../../repositories/usersRepository", () => mockUserRepo);
      const usersRepo = require("../../repositories/usersRepository");
      const authenticationService = require("../../services/AuthenticationService");

      const result = await authenticationService.register(userData);
      expect(mockUserRepo.register).toHaveBeenCalledWith(
        expect.objectContaining({
          ...userData,
          password: expect.not.stringMatching(userData.password),
        })
      );
      expect(result).toBe(user);
    });

    it("should return error obj", async () => {
      jest.mock("../../repositories/usersRepository", () => null);
      const usersRepo = require("../../repositories/usersRepository");
      const authenticationService = require("../../services/AuthenticationService");

      const result = await authenticationService.register(userData);
      expect(result).toBeInstanceOf(Error);
    });
  });
});
