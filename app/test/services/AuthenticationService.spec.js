const { User } = require("../../models");
const userData = {
  name: "user",
  image: "userimg",
  phone: "0812345678",
  address: "Jl.kaki",
  email: "email@email",
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
  });
});
