const notifications = require("../helper/notificationDataExample");
describe("NotificationService", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  describe("getNotifications", () => {
    it("should return notifications by userid", async () => {
      const userId = 1;
      const mockNotificationRepo = {
        getNotificationList: jest
          .fn()
          .mockReturnValue(Promise.resolve(notifications)),
      };
      jest.mock(
        "../../repositories/notificationRepository",
        () => mockNotificationRepo
      );
      const notificationService = require("../../services/notificationService");
      const result = await notificationService.getNotifications(userId);

      expect(mockNotificationRepo.getNotificationList).toHaveBeenCalledWith(
        userId
      );
      expect(result).toEqual(notifications);
    });
  });

  describe("markReadNotification", () => {
    it("should mark notification as read, return updated notification", async () => {
      const notification = notifications[0];
      const id = 1;
      const mockNotificationRepo = {
        markReadNotification: jest
          .fn()
          .mockReturnValue(Promise.resolve(notification)),
      };
      jest.mock(
        "../../repositories/notificationRepository",
        () => mockNotificationRepo
      );

      const notificationService = require("../../services/notificationService");
      const result = await notificationService.markReadNotification(id);

      expect(mockNotificationRepo.markReadNotification).toHaveBeenCalledWith(
        id
      );
      expect(result).toEqual(notification);
    });
  });
});
