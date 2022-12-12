const {
  UnauthorizedError,
  EmailAlreadyRegisteredError,
} = require("../../errors");
const { mockResponse, mockNext } = require("../helper/mockResponseNext");

describe("userController", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  describe("handleUpdateUser", () => {
    const mockRequest = {
      body: {
        email: "example@email",
        password: "examplepass",
        address: "jl.example",
      },
      file: "filebuffer",
      user: {
        id: 1,
        email: "example@email",
        password: "examplepass",
        address: "jl.example",
      },
      params: {
        id: "1",
      },
    };
    const mockServiceReturn = {
      data: { ...mockRequest.body, id: mockRequest.user.id },
      accessToken: "someExamplet0k3N",
    };
    test.each([
      [401, "token doesn't match the user id!"],
      [422, mockRequest.body.email],
      [200, mockServiceReturn],
    ])(
      "it should call res.status(%d) and res.json with ",
      async (status, serviceReturnValue) => {
        const {
          UnauthorizedError,
          EmailAlreadyRegisteredError,
        } = require("../../errors");

        switch (status) {
          case 401:
            serviceReturnValue = new UnauthorizedError(serviceReturnValue);
            break;
          case 422:
            serviceReturnValue = new EmailAlreadyRegisteredError(
              serviceReturnValue
            );
          default:
            break;
        }
        const mockUserService = {
          updateUser: jest.fn().mockReturnValue(serviceReturnValue),
        };

        jest.mock("../../services/userService", () => mockUserService);

        const controllers = require("../../controllers");

        await controllers.api.v1.userController.handleUpdateUser(
          mockRequest,
          mockResponse,
          mockNext
        );

        expect(mockUserService.updateUser).toHaveBeenCalledWith(
          mockRequest.params.id,
          {
            ...mockRequest.body,
            image: mockRequest.file,
          },
          mockRequest.user
        );

        expect(mockResponse.status).toHaveBeenCalledWith(status);

        let jsonResponse = serviceReturnValue;
        if (serviceReturnValue instanceof UnauthorizedError) {
          jsonResponse = {
            message: serviceReturnValue.message,
            cause: serviceReturnValue.cause,
          };
        } else if (serviceReturnValue instanceof EmailAlreadyRegisteredError) {
          jsonResponse = { message: serviceReturnValue.message };
        }
        expect(mockResponse.json).toHaveBeenCalledWith(jsonResponse);
      }
    );
  });
});
