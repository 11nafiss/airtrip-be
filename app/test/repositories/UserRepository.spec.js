const { User } = require("../../models");
const userData = {
  name: "user",
  image: "userimg",
  phone: "0812345678",
  address: "Jl.kaki",
  email: "email@email",
};
const user = new User({ ...userData, roleId: 2 });

describe("UsersRepository", () => {
  describe("register", () => {
    beforeEach(() => {
      jest.resetModules();
    });

    it("should return created user model", async () => {
      const mockUserModel = {
        create: jest.fn().mockReturnValue(Promise.resolve(user)),
      };

      jest.mock("../../models", () => {
        return { User: mockUserModel };
      });
      const { User } = require("../../models");
      const UsersRepository = require("../../repositories/usersRepository");
      const res = await UsersRepository.register(userData);
      expect(mockUserModel.create).toHaveBeenCalledWith({
        ...userData,
        roleId: 2,
      });
      expect(res).toBe(user);
    });
  });
});
