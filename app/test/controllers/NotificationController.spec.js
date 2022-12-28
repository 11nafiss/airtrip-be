const notifications = require("../helper/notificationDataExample");
const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
};
const mockNext = jest.fn().mockReturnThis();

describe("NotificationController", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  describe("handleGetNotifications", () => {
    it("should call res.status(200) and res.json with notifications data", async () => {
      const mockNotificationService = {
        getNotifications: jest
          .fn()
          .mockReturnValue(Promise.resolve(notifications)),
      };
      const id = 1;
      const mockRequest = {
        user: { id },
      };
      jest.mock(
        "../../services/notificationService",
        () => mockNotificationService
      );

      const controllers = require("../../controllers");

      await controllers.api.v1.notificationController.handleGetNotifications(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockNotificationService.getNotifications).toHaveBeenCalledWith(id);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: notifications });
    });
  });

  describe("handleMarkRead", () => {
    const testCases = [
      // error case
      new Error("data not found"),
      true,
    ];
    test.each(testCases)(
      "should call res.status and res.json with message",
      async (serviceReturnValue) => {
        const { RecordNotFoundError } = require("../../errors");
        if (serviceReturnValue instanceof Error) {
          serviceReturnValue = new RecordNotFoundError(
            serviceReturnValue.message
          );
        }

        const mockNotificationService = {
          markReadNotification: jest
            .fn()
            .mockReturnValue(Promise.resolve(serviceReturnValue)),
        };

        const id = 1;
        const mockRequest = {
          params: { id },
        };
        jest.mock(
          "../../services/notificationService",
          () => mockNotificationService
        );

        const controllers = require("../../controllers");

        await controllers.api.v1.notificationController.handleMarkRead(
          mockRequest,
          mockResponse,
          mockNext
        );

        if (serviceReturnValue instanceof RecordNotFoundError) {
          expect(mockResponse.status).toHaveBeenCalledWith(404);
          expect(mockResponse.json).toHaveBeenCalledWith({
            message: serviceReturnValue.message,
          });
          return;
        }

        expect(
          mockNotificationService.markReadNotification
        ).toHaveBeenCalledWith(mockRequest.params.id);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
          message: "Notification marked as read!",
        });
      }
    );
  });
});
