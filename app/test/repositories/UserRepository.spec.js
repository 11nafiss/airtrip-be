const { User } = require("../../models");
const bcryptjs = require("bcryptjs");

function encryptPass(password) {
  return bcryptjs.hashSync(password);
}

const userData = {
  email: "email@email",
  encryptedPassword: encryptPass("userpass"),
};
const user = new User({
  ...userData,
  role_id: 2,
  Role: { id: 2, name: "BUYER" },
});

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
        role_id: 1,
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
    it("should return user by email", async () => {
      const mockUserModel = {
        findOne: jest.fn().mockReturnValue(Promise.resolve(user)),
      };

      jest.mock("../../models", () => {
        return { User: mockUserModel };
      });
      const { Role } = require("../../models");
      const UsersRepository = require("../../repositories/usersRepository");

      const result = await UsersRepository.findUserByEmail(userData.email);

      expect(mockUserModel.findOne).toHaveBeenCalledWith({
        include: Role,
        where: { email: userData.email },
      });
      expect(result).toBe(user);
    });
  });

  describe("updateUser", () => {
    it("should return updated user model", async () => {
      let params = {
        id: 1,
        name: "examplename",
        image: "imageurl.com",
        phone: "089212121",
        address: "probolinggo",
        email: "email@email",
        encryptedPassword: "dneujndeuwfneujsw",
      };
      const mockUserModel = {
        update: jest.fn().mockReturnValue(Promise.resolve([params, null])),
      };
      jest.mock("../../models", () => {
        return { User: mockUserModel };
      });

      const UsersRepository = require("../../repositories/usersRepository");

      let result = await UsersRepository.updateUser(params);

      const { id, ...noIdParams } = params;
      expect(mockUserModel.update).toHaveBeenCalledWith(noIdParams, {
        where: {
          id: id,
        },
      });
      expect(result).toBe(params);
    });
  });
});
