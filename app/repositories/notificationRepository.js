const { Notification } = require("../models");

async function getNotificationList(userId) {
  return await Notification.findAll({
    where: { user_id: userId },
    order: [["createdAt", "DESC"]],
  });
}

async function getNotificationById(notificationId) {
  return await Notification.findByPk(notificationId);
}

async function createNotification(userId, ticketId, message) {
  return await Notification.create(
    {
      user_id: userId,
      ticket_id: ticketId,
      message,
      has_read: false,
    },
    { returning: true }
  );
}

async function markReadNotification(notificationId) {
  const notification = await Notification.update(
    { has_read: true },
    { where: { id: notificationId }, fields: ["has_read"], returning: true }
  );
  return notification[1][0];
}
module.exports = {
  getNotificationList,
  createNotification,
  markReadNotification,
  getNotificationById,
};
