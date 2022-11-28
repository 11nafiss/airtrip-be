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

describe("UsersRepository", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  describe("register", () => {
    it("should return created user model", async () => {
      const mockUserModel = {
        create: jest.fn().mockReturnValue(Promise.resolve(user)),
      };

      jest.mock("../../models", () => {
        return { User: mockUserModel };
      });

      const UsersRepository = require("../../repositories/usersRepository");

      const res = await UsersRepository.register(userData);
      expect(mockUserModel.create).toHaveBeenCalledWith({
        ...userData,
        roleId: 2,
      });
      expect(res).toBe(user);
    });

    it("should throw error", async () => {
      jest.mock("../../models", () => {
        return { User: null };
      });

      const UsersRepository = require("../../repositories/usersRepository");
      expect(
        async () => await UsersRepository.register(userData)
      ).rejects.toThrow();
    });
  });

  describe("findUserByEmail", () => {
    it("should return user model by email", async () => {
      const mockUserModel = {
        findOne: jest.fn().mockReturnValue(Promise.resolve(user)),
      };

      jest.mock("../../models", () => {
        return { User: mockUserModel };
      });

      const UsersRepository = require("../../repositories/usersRepository");

      const result = await UsersRepository.findUserByEmail(userData.email);

      expect(mockUserModel.findOne).toHaveBeenCalledWith({
        where: { email: userData.email },
      });
      expect(result).toBe(user);
    });
  });
});
