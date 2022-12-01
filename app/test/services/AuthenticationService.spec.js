const { User, Role } = require("../../models");
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
  role_id: 2,
  encryptedPassword: encryptPass(userData.password),
});
user.Role = new Role({
  id: 2,
  name: "USER",
});

describe("AuthenticationService", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe("register", () => {
    const userDataRegister = {
      ...userData,
      phone: "08123456789",
      name: "user name",
      address: "Probolinggo, Jawa Timur",
    };
    it("should return registered user email", async () => {
      const mockUserRepo = {
        register: jest.fn().mockReturnValue(Promise.resolve(user)),
        findUserByEmail: jest.fn().mockReturnValue(Promise.resolve(null)),
      };

      jest.mock("../../repositories/usersRepository", () => mockUserRepo);

      const authenticationService = require("../../services/AuthenticationService");

      const result = await authenticationService.register(userDataRegister);
      expect(mockUserRepo.findUserByEmail).toHaveBeenCalledWith(
        userDataRegister.email
      );
      expect(mockUserRepo.register).toHaveBeenCalledWith(
        expect.objectContaining({
          ...userDataRegister,
          encryptedPassword: expect.not.stringMatching(userData.password),
        })
      );

      expect(result).toBe(user.email);
    });

    it("should return instance of EmailAlreadyRegistered Error", async () => {
      const mockUserRepo = {
        findUserByEmail: jest.fn().mockReturnValue(Promise.resolve(user)),
      };

      jest.mock("../../repositories/usersRepository", () => mockUserRepo);

      const authenticationService = require("../../services/AuthenticationService");
      const { EmailAlreadyRegisteredError } = require("../../errors");

      const result = await authenticationService.register(userDataRegister);
      expect(mockUserRepo.findUserByEmail).toHaveBeenCalledWith(
        userDataRegister.email
      );

      expect(result).toBeInstanceOf(EmailAlreadyRegisteredError);
      expect(result.message).toBe(
        `${userDataRegister.email} already registered!`
      );
    });

    it("should throw error", async () => {
      jest.mock("../../repositories/usersRepository", () => null);
      const mockUserRepo = {
        findUserByEmail: () => {
          throw new Error("error");
        },
      };
      jest.mock("../../repositories/usersRepository", () => mockUserRepo);
      const authenticationService = require("../../services/AuthenticationService");

      expect(async () => {
        await authenticationService.register("octopus");
      }).rejects.toThrow();
    });
  });

  describe("login", () => {
    it("should return jwt access token", async () => {
      const mockUserRepo = {
        findUserByEmail: jest.fn().mockReturnValue(Promise.resolve(user)),
      };

      jest.mock("../../repositories/usersRepository", () => mockUserRepo);
      const authenticationService = require("../../services/AuthenticationService");
      const jsonwebtoken = require("jsonwebtoken");
      const bcryptjs = require("bcryptjs");

      const spyJwt = jest.spyOn(jsonwebtoken, "sign");
      const spyBcrypt = jest.spyOn(bcryptjs, "compareSync");

      const result = await authenticationService.login(userData);

      expect(mockUserRepo.findUserByEmail).toHaveBeenCalledWith(userData.email);
      expect(spyBcrypt).toHaveBeenCalledWith(
        userData.password,
        user.encryptedPassword
      );
      expect(spyJwt).toHaveBeenCalledWith(
        {
          id: user.id,
          name: user.name,
          image: user.image,
          phone: user.phone,
          address: user.address,
          email: user.email,
          role: {
            id: user.Role.id,
            name: user.Role.name,
          },
        },
        process.env.JWT_SIGNATURE_KEY
      );

      expect(result).toStrictEqual(expect.any(String));
    });

    it("should return EmailNotRegisteredError", async () => {
      const mockUserRepo = {
        findUserByEmail: jest.fn().mockReturnValue(Promise.resolve(null)),
      };

      jest.mock("../../repositories/usersRepository", () => mockUserRepo);
      const authenticationService = require("../../services/AuthenticationService");
      const EmailNotRegisteredError = require("../../errors/EmailNotRegistered");

      const result = await authenticationService.login(userData);
      expect(mockUserRepo.findUserByEmail).toHaveBeenCalledWith(userData.email);
      expect(result).toBeInstanceOf(EmailNotRegisteredError);
      expect(result.message).toBe(`${userData.email} is not registered!`);
    });

    it("should return WrongPasswordError", async () => {
      const wrongPassData = {
        email: userData.email,
        password: "wrongpassword",
      };
      const mockUserRepo = {
        findUserByEmail: jest.fn().mockReturnValue(Promise.resolve(user)),
      };

      jest.mock("../../repositories/usersRepository", () => mockUserRepo);
      const authenticationService = require("../../services/AuthenticationService");
      const bcryptjs = require("bcryptjs");
      const spyBcrypt = jest.spyOn(bcryptjs, "compareSync");

      const result = await authenticationService.login(wrongPassData);

      const WrongPasswordError = require("../../errors/WrongPasswordError");
      expect(mockUserRepo.findUserByEmail).toHaveBeenCalledWith(
        wrongPassData.email
      );

      expect(spyBcrypt).toHaveBeenCalledWith(
        wrongPassData.password,
        user.encryptedPassword
      );
      expect(result).toBeInstanceOf(WrongPasswordError);
      expect(result.message).toBe(`Incorrect password!`);
    });
  });

  describe("authorize", () => {
    const role = "BUYER";
    const userJson = user.toJSON();
    const jwt = require("jsonwebtoken");
    const token = jwt.sign(userJson, process.env.JWT_SIGNATURE_KEY);

    it("should return decoded and verified payload from jwt", async () => {
      const jwt = require("jsonwebtoken");
      const spyVerifyToken = jest.spyOn(jwt, "verify");

      const mockUserRepo = {
        findUserByEmail: jest.fn().mockReturnValue(Promise.resolve(user)),
      };
      const usersRepository = jest.mock(
        "../../repositories/usersRepository",
        () => mockUserRepo
      );
      const authenticationService = require("../../services/AuthenticationService");

      const result = await authenticationService.authorize(token);

      expect(spyVerifyToken).toHaveBeenCalledWith(
        token,
        process.env.JWT_SIGNATURE_KEY
      );
      expect(mockUserRepo.findUserByEmail).toHaveBeenCalledWith(userJson.email);
      expect(result).toStrictEqual(userJson);
    });

    it.each([{ token: "false token" }, { token, user: null }])(
      "should return UnauthorizedError",
      async (testObj) => {
        const jsonwebtoken = require("jsonwebtoken");
        const spyVerifyToken = jest.spyOn(jsonwebtoken, "verify");

        const mockUserRepo = {
          findUserByEmail: jest
            .fn()
            .mockReturnValue(Promise.resolve(testObj.user)),
        };
        const usersRepository = jest.mock(
          "../../repositories/usersRepository",
          () => mockUserRepo
        );

        const authenticationService = require("../../services/AuthenticationService");
        const result = await authenticationService.authorize(testObj.token);

        expect(spyVerifyToken).toHaveBeenCalledWith(
          testObj.token,
          process.env.JWT_SIGNATURE_KEY
        );
        if (testObj.token !== "false token") {
          expect(mockUserRepo.findUserByEmail).toHaveBeenCalledWith(
            userJson.email
          );
        }
        const { UnauthorizedError } = require("../../errors");
        expect(result).toBeInstanceOf(UnauthorizedError);
        expect(result.message).toBe("Action unauthorized!");
        expect(result.cause).toEqual(expect.any(String));
      }
    );
  });
});
