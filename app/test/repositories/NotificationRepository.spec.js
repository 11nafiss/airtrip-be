const notifications = require("../helper/notificationDataExample");
describe("NotificationRepository", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe("createNotification", () => {
    it("should return created notification data", async () => {
      const userId = 1;
      const ticketId = 1;
      const message = "pemesanan berhasil!";
      const notification = notifications[0];
      const mockNotificationModel = {
        create: jest.fn().mockReturnValue(notification),
      };
      jest.mock("../../models", () => {
        return { Notification: mockNotificationModel };
      });
      const notificationRepository = require("../../repositories/notificationRepository");

      const result = await notificationRepository.createNotification(
        userId,
        ticketId,
        message
      );

      expect(mockNotificationModel.create).toHaveBeenCalledWith(
        {
          user_id: userId,
          ticket_id: ticketId,
          message,
          has_read: false,
        },
        { returning: true }
      );
      expect(result).toEqual(notification);
    });
  });

  describe("getNotificationList", () => {
    it("should return notification list", async () => {
      const userId = 1;
      const mockNotificationModel = {
        findAll: jest.fn().mockReturnValue(notifications),
      };
      jest.mock("../../models", () => {
        return { Notification: mockNotificationModel };
      });
      const notificationRepository = require("../../repositories/notificationRepository");

      const result = await notificationRepository.getNotificationList(userId);

      expect(mockNotificationModel.findAll).toHaveBeenCalledWith({
        where: { user_id: userId },
        order: [["createdAt", "DESC"]],
      });
      expect(result).toEqual(notifications);
    });
  });

  describe("getNotificationById", () => {
    it("should return notification by id", async () => {
      const notification = notifications[0];
      const id = 1;
      const mockNotificationModel = {
        findByPk: jest.fn().mockReturnValue(notification),
      };
      jest.mock("../../models", () => {
        return { Notification: mockNotificationModel };
      });
      const notificationRepository = require("../../repositories/notificationRepository");

      const result = await notificationRepository.getNotificationById(id);

      expect(mockNotificationModel.findByPk).toHaveBeenCalledWith(id);
      expect(result).toEqual(notification);
    });
  });

  describe("markReadNotification", () => {
    it("should return updated notification", async () => {
      const notification = notifications[0];
      const id = 1;
      const mockNotificationModel = {
        update: jest.fn().mockReturnValue([1, [notification]]),
      };
      jest.mock("../../models", () => {
        return { Notification: mockNotificationModel };
      });
      const notificationRepository = require("../../repositories/notificationRepository");

      const result = await notificationRepository.markReadNotification(id);

      expect(mockNotificationModel.update).toHaveBeenCalledWith(
        { has_read: true },
        { where: { id }, fields: ["has_read"], returning: true }
      );
      expect(result).toEqual(notification);
    });
  });
});
