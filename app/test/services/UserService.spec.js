const fs = require("fs");
const path = require("path");

// const base64Img = fs
//   .readFileSync(path.resolve(__dirname, "../helper/example-image-test.png"))
//   .toString("base64");

const base64Img = "boo";
describe("userService", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  describe("updateUser", () => {
    const user = {
      id: 1,
      email: "email@email",
      role: {
        id: 2,
        name: "BUYER",
      },
    };
    const existingUser = "emailme@email";
    const params = {
      name: "examplename",
      image: base64Img,
      phone: "089212121",
      address: "probolinggo",
      email: "emailmail@email",
      password: "dneujndeuwfneujsw",
    };

    const testCases = [
      // [id, params, user]
      ["2", params, user],
      ["1", { ...params, email: existingUser }, user],
      ["1", params, user],
    ];
    test.each(testCases)(
      "should return updated user data",
      async (id, updateParams, user) => {
        const userExist =
          updateParams.email === existingUser ? updateParams : null;
        const cloudinaryResponse = { secure_url: "exampleurl.com" };
        const mockUserRepo = {
          findUserByEmail: jest
            .fn()
            .mockReturnValue(Promise.resolve(userExist)),
          updateUser: jest.fn().mockReturnValue(
            Promise.resolve({
              dataValues: {
                id: id,
                ...updateParams,
                image: cloudinaryResponse.secure_url,
              },
            })
          ),
        };
        const accessToken = "3XamPl3T0kEn";
        const mockJwt = {
          sign: jest.fn().mockReturnValue(accessToken),
        };
        const mockUploadImg = jest
          .fn()
          .mockReturnValue(Promise.resolve(cloudinaryResponse));
        // const mockCloudinary = {
        //   uploader: {
        //     upload: jest
        //       .fn()
        //       .mockReturnValue(Promise.resolve(cloudinaryResponse)),
        //   },
        // };

        jest.mock("../../repositories/usersRepository", () => mockUserRepo);
        jest.mock("jsonwebtoken", () => mockJwt);
        // jest.mock("../../../config/cloudinary", () => mockCloudinary);
        jest.mock("../../services/utils/uploadImage", () => mockUploadImg);
        const userService = require("../../services/userService");
        const {
          EmailAlreadyRegisteredError,
          UnauthorizedError,
        } = require("../../errors");

        // const fileType = require("file-type");
        // const spyFromBuffer = jest.spyOn(fileType, "fromBuffer");
        process.env.JWT_SIGNATURE_KEY = "examplekey";

        const result = await userService.updateUser(id, updateParams, user);

        if (id !== user.id.toString()) {
          expect(result).toEqual(
            new UnauthorizedError("token doesn't match the user id!")
          );
          return;
        }
        expect(mockUserRepo.findUserByEmail).toHaveBeenCalledWith(
          updateParams.email
        );

        if (userExist !== null && updateParams.email !== user.email) {
          expect(result).toEqual(
            new EmailAlreadyRegisteredError(updateParams.email)
          );
          return;
        }

        // upload img proccess
        // expect(spyFromBuffer.toHaveBeenCalledWith(Buffer.from(base64Img)));

        expect(mockUploadImg).toHaveBeenCalledWith(base64Img);
        updateParams.image = cloudinaryResponse.secure_url;
        expect(mockJwt.sign).toHaveBeenCalledWith(
          {
            id,
            name: updateParams.name,
            image: updateParams.image,
            phone: updateParams.phone,
            address: updateParams.address,
            email: updateParams.email,
            role: {
              id: user.role.id,
              name: user.role.name,
            },
          },
          process.env.JWT_SIGNATURE_KEY
        );

        expect(mockUserRepo.updateUser).toHaveBeenCalledWith(id, updateParams);
        expect(result).toStrictEqual({
          data: { ...updateParams, id, password: expect.any(String) },
          accessToken,
        });
      }
    );
  });
});
