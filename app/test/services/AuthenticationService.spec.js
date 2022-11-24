const { User } = require("../../models");
const userData = {
  email: "email@email",
  password: "userpass",
};
const user = new User({ ...userData, roleId: 2 });

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
      expect(mockUserRepo.register).toHaveBeenCalledWith({
        ...userData,
      });
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
